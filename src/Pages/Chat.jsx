import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constents";

const Chat = () => {
  //Dynamic params
  const { userName, toUserId } = useParams();

  // Local state variables
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const user = useSelector((state) => state.user);
  const userId = user?._id;

  const fetchMessages = async () => {
    try {
      if (!toUserId) {
        console.warn(
          "toUserId is not available yet for fetching chat history."
        );
        return;
      }
      const chat = await axios.get(`${BASE_URL}/chat/${toUserId}`, {
        withCredentials: true,
      });


      const chatMessages = chat?.data?.messages.map((msg) => {
        return {
          _id: msg._id,
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          text: msg.text,
          senderId: msg?.senderId?._id,
          timeStamp: msg.createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [toUserId]); // Depend on toUserId to re-fetch when chat target changes

  useEffect(() => {
    if (!userId || !toUserId) {
      return;
    }

    if (!socketRef.current) {
      socketRef.current = createSocketConnection();
    }
    const socket = socketRef.current;

    const handleConnect = () => {
      socket.emit("joinChat", {
        firstName: user.firstName,
        lastName: user.lastName,
        userId,
        toUserId,
      });
    };

    const handleMessageReceived = ({ firstName, lastName, text, senderId, timeStamp, _id }) => {
      setMessages((prevMessages) => {
        const existingMessageIndex = prevMessages.findIndex(
          (msg) => msg.tempId && msg.text === text && msg.senderId === senderId
        );

        if (existingMessageIndex > -1) {
          const updatedMessages = [...prevMessages];
          updatedMessages[existingMessageIndex] = {
            _id: _id, 
            firstName,
            lastName,
            text,
            senderId,
            timeStamp,
          };
          return updatedMessages;
        } else {
          return [...prevMessages, { _id, firstName, lastName, text, senderId, timeStamp }];
        }
      });
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
    };

    const handleConnectError = (err) => {
      console.error("Socket connection error:", err);
    };

    socket.on("connect", handleConnect);
    socket.on("messageReceived", handleMessageReceived);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("messageReceived", handleMessageReceived);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);

      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId, toUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // sendMessageHandler
  const sendMessageHandler = () => {
    if (newMessage.trim() === "") return;

    const socket = socketRef.current;
    if (socket && socket.connected) {
      const tempId = Date.now().toString() + Math.random().toString(36).substring(2, 9); 
      const messageToSend = {
        firstName: user.firstName,
        lastName: user.lastName,
        userId,
        toUserId,
        text: newMessage,
        tempId: tempId, 
      };
      socket.emit("sendMessages", messageToSend);
      setNewMessage("");

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...messageToSend, 
          senderId: userId, 
          timeStamp: new Date().toISOString(), 
        },
      ]);
    } else {
      console.error("Socket not connected. Cannot send message.");
    }
  };

  return (
    <div className="flex flex-col h-[75vh] max-w-3xl mx-auto my-10 border border-gray-700 rounded-lg shadow-lg bg-gray-800 text-white font-inter">
      {/* Header */}
      <h1 className="px-4 py-3 border-b border-gray-700 text-center text-2xl font-bold bg-gray-900 rounded-t-lg">
        Chat with {userName}
      </h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">Start a conversation!</p>
        ) : (
          messages.map((msg, index) => {
            const isCurrentUser = user._id === msg.senderId;

            return (
              <div
                key={msg._id || msg.tempId ||index}
                className={`flex flex-col max-w-[70%] ${
                  isCurrentUser ? "ml-auto items-end" : "items-start"
                }`}
              >
                <span className="text-sm text-gray-400 mb-1">
                  {msg.firstName} 
                </span>
                <div
                  className={`px-4 py-2 rounded-2xl text-white break-words ${
                    isCurrentUser ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.timeStamp && (
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timeStamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            );
          })
        )}
        {/* Empty div for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-3 bg-gray-900 rounded-b-lg">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessageHandler();
            }
          }}
          placeholder="Type your message...!"
          className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        />
        <button
          onClick={sendMessageHandler}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

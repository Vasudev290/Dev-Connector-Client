import { io } from "socket.io-client";

// In Production
export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io("http://localhost:6969", {
      withCredentials: true,
      path: "/socket.io",
    });
  } else {
    return io("/", { path: "/api/socket.io", withCredentials: true });
  }
};

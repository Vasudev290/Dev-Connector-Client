# Dev-Connector (Client-Side)

- Create a Vite + React application
- Remove unecessary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Install axios
- CORS - install cors in backend => add middleware to with configurations: orgin, credentials: true
- Whenever you're making API call so pass axios => { withCredentials: true }
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- Navbar should update as soon as login
- Refactor our code to add constents file, Create a component floder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout Feature
- Get the feed and add the feed in th store
- build the user card on feed
- Edit Profile Feature
- Show Toast Message on save of profile
- New Page - see all my connections
- New Page - see all my connection Request
- feature -Accept/Reject Connect Request
- Send / ignored the user card from thr feed
- Added signup form & some bug fixes

- Body NavBar Route=/ => Feed Route=/login => Login Route=/connetions => Connections Router=/profile => Profile

# Deployment

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- GitBash xyz@DESKTOP-SJ75Q55 MINGW64 ~ -> cd ~/Downloads -> chmod 400 <searet>-secret.pem -> ssh -i <secret>>-secret.pem ec2-user@your-ec2-ip-address
- Install Node version 20.18.0
- Git clone
- Frontend

  - npm install -> dependencies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx ( sudo apt update, sudo apt install nginx -y, sudo systemctl start nginx, sudo systemctl enable nginx, sudo systemctl status nginx)
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist(build files) to /var/www/html/ 
  - sudo scp -r dist/\* /var/www/html/
  - go to security set the in-boundary to :80 and save the rules
  - Enable port :80 of your instance

- Backend
  - updated DB password
  - allowed ec2 instance public IP on mongodb server
  - npm intsall pm2 -g
  - pm2 start npm --name "devconnector-backend" -- start
  - pm2 logs
  - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
  - config nginx - /etc/nginx/sites-available/default
  - restart nginx - sudo systemctl restart nginx
  - Modify the BASEURL in frontend project to "/api"

# Ngxinx config:

    Frontend = http://13.236.9.103/
    Backend = http://13.236.9.103:6969/

    Domain name = devtinder.com => http://13.236.9.103/

    Frontend = devtinder.com
    Backend = devtinder.com:6969 => devtinder.com/api

    nginx config :

    server_name 13.236.9.103;

    location /api/ {
        proxy_pass http://localhost:6969/;  # Pass the request to the Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

# Addding a custom Domain name

- purchased domain name from godaddy
- signup on cloudflare & add a new domain name
- change the nameservers on godaddy and point it to cloudflare
- wait for sometime till your nameservers are updated ~15 minutes
- DNS record: A devtinder.in 43.204.96.49
- Enable SSL for website

# Sending Emails via SES

- Create a IAM user
- Give Access to AmazonSESFullAccess
- Amazon SES: Create an Identity
- Verify your domain name
- Verify an email address identity
- Install AWS SDK - v3
- Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- Setup SesClient
- Access Credentials should be created in IAm under SecurityCredentials Tab
- Add the credentials to the env file
- Write code for SESClient
- Write code for Sending email address
- Make the email dynamic by passing more params to the run function

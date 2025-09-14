* * * * *

🖊️ WorkElate Whiteboard
========================

A collaborative, real-time whiteboard application designed to enhance team productivity and brainstorming sessions. Built with React, Socket.io, and Node.js, it provides an interactive platform where users can draw, share ideas, and communicate seamlessly.

This project aligns with WorkElate's mission of making AI-driven work execution more efficient by enabling teams to visually collaborate without interruptions.

* * * * *

🚀 Features
-----------

✅ Real-time drawing and collaboration\
✅ Multiple users can join the same room\
✅ User list with dynamic updates\
✅ Brush and eraser tools with customizable settings\
✅ Clear individual or all drawings\
✅ Responsive UI designed with Tailwind CSS

* * * * *

🛠️ Tech Stack
--------------

**Frontend:**

-   React.js

-   Tailwind CSS

-   React Router

**Backend:**

-   Node.js

-   Express.js

-   Socket.io

**Database:**

-   MongoDB (Mongoose)


📂 Project Structure
--------------------
```bash
/whiteboard/
  /client/              # React frontend
  /server/              # Node.js backend
  /README.md            # Project documentation`
```


⚙️ Setup Instructions
---------------------

### 1\. Clone the repository

`git clone https://github.com/MannShah312/WhiteBoard.git
cd WhiteBoard`

### 2\. Install dependencies

**Backend:**

`cd server
npm install`

**Frontend:**

`cd ../client
npm install`

### 3\. Run the application

Start the backend server:

`cd server
npm run dev`

Start the frontend development server:

`cd ../client
npm start`

The app will be accessible at `http://localhost:3000`.

* * * * *

📋 Environment Variables
------------------------

Create a `.env` file in the `server` folder with the following:

`MONGO_URI=your_mongo_connection_string
PORT=5000`

## API Documentation

### REST Endpoints
✅ POST  
```bash
/api/join-room
```
- Join or create a new room.
    - Request Body: { roomId: string, username: string }
    - Response: { message: "Joined room" }

✅ Socket Events
- Client → Server

    - join-room: { roomId, username }
    - leave-room: { roomId }
    - drawing: { roomId, data 
    - clear-all: { roomId }
    - clear-my: { roomId, username }
    
- Server → Client
    - user-list: Array<string>  updated user list
    - drawing: { username, data } – broadcast drawing data
    - clear-all: clear all drawings
    - clear-my: clear specific user’s drawings

## 🏗 Architecture Overview
1. Frontend – React with Tailwind CSS, provides UI for drawing, user management, and real-time interactions. 
2. Backend – Node.js and Express handle API requests and Socket.io manages bi-directional communication.
3. WebSockets – Real-time communication for drawing updates and user presence.
4. Database – MongoDB (via Mongoose) stores room and user data persistently.
5. State Management – React hooks manage UI states like color, tool selection, and connected users.

## 🚀 Deployment Guide
Here’s a deployment guide tailored to your setup:

✅ Requirements

- Backend deployed on Render
- Frontend deployed on another platform like vercel 
- MongoDB Atlas as your database

### 🚀 Backend Deployment on Render
1. Prepare Your Backend

Ensure your server folder has a package.json with start scripts:
```bash 
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Your .env file should include

```bash
MONGO_URI=your_mongodb_atlas_connection_string
```

2. Deploy to Render
  1. Go to Render Dashboard.
  2. Click New → Web Service.
  3. Connect your GitHub repository containing the backend.
  4. Select the server folder as the root directory
  5. Set the build and start commands:
  6. Build Command: npm install
  7. Start Command: npm star
  8. Set environment variables:
  MONGO_URI → your MongoDB Atlas connection string
    
After deployment, Render will give you a URL like https://your-backend.onrender.com. Save this

## 🚀 Frontend Deployment on Netlify or Vercel
Deploy to Vercel
    1. Go to Vercel
    2. Click New Project.
    3. Connect your GitHub repository.
    4. Choose the client folder.
    5. Set the build command to npm run build.
    6. Set the output directory to build.
    7. Set environment variables if needed.
    8. Deploy.

## 🔑 Important Notes

✔ The frontend must reference the backend’s full URL, since they will be on different domains.

✔ CORS must be handled in the backend:
```bash
const cors = require('cors');
app.use(cors());
```

✔ Keep your MongoDB Atlas connection secure by restricting IP addresses.

✔ You can add custom domains later on both platforms.

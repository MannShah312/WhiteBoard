const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const Room = require('./models/Room');
const port = 8080;
const cors = require('cors');
require('dotenv').config();

const roomRoutes = require('./routes/room');
const setUpSocket = require('./socket/index');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

mongoose
    .connect(
        "mongodb+srv://MannShah:" + 
        process.env.MONGO_PASSWORD + 
        "@cluster0.w7gzuhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    )
    .then((x) => {
        console.log("Connected to Mongo!");
    })
    .catch((err) => {
        console.log("Error while connecting to Mongo");
});

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use('/api/rooms', roomRoutes);

// Setup Socket.io
setUpSocket(server);

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
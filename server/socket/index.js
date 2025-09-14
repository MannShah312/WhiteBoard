// // const socketiO = require('socket.io');

// // let userInRoom = {}; // { roomId: { socketId: username } }

// // function setUpSocket(server) {
// //     const io = socketiO(server, {
// //         cors: {
// //             origin: "*",
// //             methods: ["GET", "POST"]
// //         }
// //     });

// //     io.on('connection', (socket) => {
// //         console.log('New client connected:', socket.id);

// //         socket.on('join-room', ({ roomId, username }) => {
// //             socket.join(roomId);

// //             if(!userInRooms[roomId]){
// //                 userInRooms[roomId] = {};
// //             }
// //             userInRooms[roomId][socket.id] = username;

// //             const usersInRoom = Object.values(userInRooms[roomId]); // 

// //             io.to(roomId).emit('user-list', usersInRoom);
// //             console.log(`${username} joined room: ${roomId}`);
// //         });

// //         socket.on('leave-room', ({ roomId }) => {
// //             if(userInRooms[roomId]) {
// //                 delete userInRooms[roomId][socket.id];
// //                 io.to(roomId).emit('user-list', Object.values(userInRooms[roomId]));
// //                 console.log(`User left room: ${roomId}`);
// //         }
// //     });

// //     socket.on('cursor-move', (data) => {
// //         const { roomId } = data;
// //         socket.to(roomId).emit('cursor-move', {socketId: socket.id, ...data});
// //     });

// //     socket.on('draw-start', (data) => {
// //         const { roomId } = data;
// //         socket.to(roomId).emit('draw-start', data);
// //     });

// //     socket.on('draw-move', (data) => {
// //         const { roomId } = data;
// //         socket.to(roomId).emit('draw-move', data);
// //     });
    
// //     socket.on('draw-end', (data) => {
// //         const { roomId } = data;
// //         socket.to(roomId).emit('draw-end', data);
// //     });

// //     socket.on('clear-canvas', (data) => {
// //         const { roomId } = data;
// //         socket.to(roomId).emit('clear-canvas');
// //     });

// //     socket.on('disconnect', () => {
// //         for (const roomId in userInRooms) {
// //             if (userInRooms[roomId][socket.id]) {
// //                 delete userInRooms[roomId][socket.id];
// //                 io.to(roomId).emit('user-list', Object.values(userInRooms[roomId]));
// //                 console.log(`User disconnected from room: ${roomId}`);
// //             }
// //         }
    
// //     });
// // });
// // }

// // module.exports = setUpSocket;

// const socketIO = require('socket.io');
// const Room = require('../models/Room');

// let userInRooms = {}; // { roomId: { socketId: username } }

// function setUpSocket(server) {
//     const io = socketIO(server, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST"]
//         }
//     });

//     io.on('connection', (socket) => {
//         console.log('New client connected:', socket.id);

//         // socket.on('join-room', async ({ roomId, username }) => {
//         //     socket.join(roomId);

//         //     if (!userInRooms[roomId]) {
//         //         userInRooms[roomId] = {};
//         //     }
//         //     userInRooms[roomId][socket.id] = username;

//         //     try {
//         //         let room = await Room.findOne({ roomId });

//         //         if (!room) {
//         //             room = new Room({
//         //                 roomId,
//         //                 users: [{ username, socketId: socket.id }]
//         //             });
//         //             await room.save();
//         //         } else {
//         //             // Check if username already exists in DB
//         //             const exists = room.users.some(user => user.username === username);
//         //             if (!exists) {
//         //                 room.users.push({ username, socketId: socket.id });
//         //                 room.lastActivity = Date.now();
//         //                 await room.save();
//         //             }
//         //         }

//         //         const usersInRoom = room.users.map(user => user.username);
//         //         io.to(roomId).emit('user-list', usersInRoom);
//         //         console.log(`${username} joined room: ${roomId}`);
//         //     } catch (error) {
//         //         console.error("Error handling join-room:", error);
//         //     }
//         // });

//         socket.on('join-room', async ({ roomId, username }) => {
//         socket.join(roomId);

//         if (!userInRooms[roomId]) userInRooms[roomId] = {};
//         userInRooms[roomId][socket.id] = username; // map unique socket.id to username

//         try {
//             let room = await Room.findOne({ roomId });

//             if (!room) {
//                 room = new Room({
//                     roomId,
//                     users: [{ username, socketId: socket.id }]
//                 });
//                 await room.save();
//             } else {
//                 const exists = room.users.some(user => user.username === username);
//                 if (!exists) {
//                     room.users.push({ username, socketId: socket.id });
//                     room.lastActivity = Date.now();
//                     await room.save();
//                 }
//             }

//             const usersInRoom = room.users.map(user => user.username);
//             io.to(roomId).emit('user-list', usersInRoom);

//             console.log(`${username} joined room: ${roomId}`);
//         } catch (error) {
//             console.error("Error handling join-room:", error);
//         }
//     });


//         socket.on('leave-room', async ({ roomId }) => {
//             if (userInRooms[roomId]) {
//                 const username = userInRooms[roomId][socket.id];
//                 delete userInRooms[roomId][socket.id];

//                 try {
//                     let room = await Room.findOne({ roomId });
//                     if (room) {
//                         room.users = room.users.filter(user => user.socketId !== socket.id);
//                         await room.save();
//                         io.to(roomId).emit('user-list', room.users.map(user => user.username));
//                     }
//                 } catch (error) {
//                     console.error("Error handling leave-room:", error);
//                 }

//                 console.log(`User ${username} left room: ${roomId}`);
//             }
//         });

//         socket.on('cursor-move', (data) => {
//             const { roomId } = data;
//             socket.to(roomId).emit('cursor-move', { socketId: socket.id, ...data });
//         });

//         socket.on('draw-start', (data) => {
//             const { roomId } = data;
//             socket.to(roomId).emit('draw-start', data);
//         });

//         socket.on('draw-move', (data) => {
//             const { roomId } = data;
//             socket.to(roomId).emit('draw-move', data);
//         });

//         socket.on('draw-end', (data) => {
//             const { roomId } = data;
//             socket.to(roomId).emit('draw-end', data);
//         });

//         socket.on('clear-canvas', (data) => {
//             const { roomId } = data;
//             socket.to(roomId).emit('clear-canvas');
//         });

//         socket.on('disconnect', async () => {
//             for (const roomId in userInRooms) {
//                 if (userInRooms[roomId][socket.id]) {
//                     const username = userInRooms[roomId][socket.id];
//                     delete userInRooms[roomId][socket.id];

//                     try {
//                         let room = await Room.findOne({ roomId });
//                         if (room) {
//                             room.users = room.users.filter(user => user.socketId !== socket.id);
//                             await room.save();
//                             io.to(roomId).emit('user-list', room.users.map(user => user.username));
//                         }
//                     } catch (error) {
//                         console.error("Error handling disconnect:", error);
//                     }

//                     console.log(`User ${username} disconnected from room: ${roomId}`);
//                 }
//             }
//         });
//     });
// }

// module.exports = setUpSocket;








// const socketIO = require('socket.io');
// const Room = require('../models/Room');

// let userInRooms = {}; // { roomId: { socketId: username } }

// function setUpSocket(server) {
//     const io = socketIO(server, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST"]
//         }
//     });

//     io.on('connection', (socket) => {
//         console.log('New client connected:', socket.id);

//         socket.on('join-room', async ({ roomId, username }) => {
//             socket.join(roomId);

//             if (!userInRooms[roomId]) userInRooms[roomId] = {};
//             userInRooms[roomId][socket.id] = username;

//             try {
//                 let room = await Room.findOne({ roomId });

//                 if (!room) {
//                     room = new Room({
//                         roomId,
//                         users: [{ username, socketId: socket.id }]
//                     });
//                     await room.save();
//                 } else {
//                     const user = room.users.find(u => u.username === username);
//                     if (user) {
//                         user.socketId = socket.id;
//                     } else {
//                         room.users.push({ username, socketId: socket.id });
//                     }
//                     room.lastActivity = Date.now();
//                     await room.save();
//                 }

//                 const usersInRoom = room.users.map(user => user.username);
//                 io.to(roomId).emit('user-list', usersInRoom);

//                 console.log(`${username} joined room: ${roomId}`);
//             } catch (error) {
//                 console.error("Error in join-room:", error);
//             }
//         });

//         socket.on('leave-room', async ({ roomId }) => {
//             if (userInRooms[roomId] && userInRooms[roomId][socket.id]) {
//                 const username = userInRooms[roomId][socket.id];
//                 delete userInRooms[roomId][socket.id];

//                 try {
//                     let room = await Room.findOne({ roomId });
//                     if (room) {
//                         room.users = room.users.filter(user => user.socketId !== socket.id);
//                         await room.save();
//                         io.to(roomId).emit('user-list', room.users.map(user => user.username));
//                     }
//                 } catch (error) {
//                     console.error("Error in leave-room:", error);
//                 }

//                 console.log(`${username} left room: ${roomId}`);
//             }
//         });

//         socket.on('cursor-move', (data) => {
//             const { roomId } = data;
//             socket.to(roomId).emit('cursor-move', { socketId: socket.id, ...data });
//         });

//         socket.on('draw-start', (data) => {
//             const { roomId } = data;
//             socket.to(roomId).emit('draw-start', data);
//         });

//         socket.on('draw-move', (data) => {
//             const { roomId } = data;
//             socket.to(roomId).emit('draw-move', data);
//         });

//         socket.on('draw-end', (data) => {
//             const { roomId } = data;
//             socket.to(roomId).emit('draw-end', data);
//         });

//         socket.on('clear-canvas', (data) => {
//             const { roomId } = data;
//             socket.to(roomId).emit('clear-canvas');
//         });

//         socket.on('disconnect', async () => {
//             for (const roomId in userInRooms) {
//                 if (userInRooms[roomId][socket.id]) {
//                     const username = userInRooms[roomId][socket.id];
//                     delete userInRooms[roomId][socket.id];

//                     try {
//                         let room = await Room.findOne({ roomId });
//                         if (room) {
//                             room.users = room.users.filter(user => user.socketId !== socket.id);
//                             await room.save();
//                             io.to(roomId).emit('user-list', room.users.map(user => user.username));
//                         }
//                     } catch (error) {
//                         console.error("Error in disconnect:", error);
//                     }

//                     console.log(`${username} disconnected from room: ${roomId}`);
//                 }
//             }
//         });
//     });
// }
// module.exports = setUpSocket;

const socketIO = require('socket.io');
const Room = require('../models/Room');

let userInRooms = {}; // { roomId: { socketId: username } }
let canvasHistory = {}; // { roomId: [line1, line2, ...] }

function setUpSocket(server) {
    const io = socketIO(server, {
        cors: { origin: "*", methods: ["GET", "POST"] }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('join-room', async ({ roomId, username }) => {
            socket.join(roomId);

            if (!userInRooms[roomId]) userInRooms[roomId] = {};
            userInRooms[roomId][socket.id] = username;

            if (!canvasHistory[roomId]) canvasHistory[roomId] = [];

            try {
                let room = await Room.findOne({ roomId });
                if (!room) {
                    room = new Room({ roomId, users: [{ username, socketId: socket.id }] });
                    await room.save();
                } else {
                    const user = room.users.find(u => u.username === username);
                    if (user) user.socketId = socket.id;
                    else room.users.push({ username, socketId: socket.id });
                    room.lastActivity = Date.now();
                    await room.save();
                }

                io.to(socket.id).emit('canvas-history', canvasHistory[roomId]); // send history to new user
                io.to(roomId).emit('user-list', room.users.map(u => u.username));

                console.log(`${username} joined room: ${roomId}`);
            } catch (err) {
                console.error("Error in join-room:", err);
            }
        });

        // socket.on('leave-room', async ({ roomId }) => {
        //     if (userInRooms[roomId]?.[socket.id]) {
        //         const username = userInRooms[roomId][socket.id];
        //         delete userInRooms[roomId][socket.id];

        //         try {
        //             let room = await Room.findOne({ roomId });
        //             if (room) {
        //                 room.users = room.users.filter(u => u.socketId !== socket.id);
        //                 await room.save();
        //                 io.to(roomId).emit('user-list', room.users.map(u => u.username));
        //             }
        //         } catch (err) { console.error(err); }

        //         console.log(`${username} left room: ${roomId}`);
        //     }
        // });
    
        socket.on('leave-room', async ({ roomId }) => {
            if (userInRooms[roomId]?.[socket.id]) {
                const username = userInRooms[roomId][socket.id];
                delete userInRooms[roomId][socket.id];

                try {
                    let room = await Room.findOne({ roomId });
                    if (room) {
                        room.users = room.users.filter(u => u.socketId !== socket.id);
                        await room.save();
                        io.to(roomId).emit('user-list', room.users.map(u => u.username));
                    }
                } catch (err) { console.error(err); }

                console.log(`${username} left room: ${roomId}`);
            }
        }); 

        socket.on('cursor-move', (data) => {
            const { roomId } = data;
            socket.to(roomId).emit('cursor-move', { socketId: socket.id, ...data });
        });

        socket.on('draw-start', (data) => {
            const { roomId } = data;
            socket.to(roomId).emit('draw-start', data);
        });

        socket.on('draw-move', (data) => {
            const { roomId } = data;
            socket.to(roomId).emit('draw-move', data);
        });

        socket.on('draw-end', ({ roomId, line }) => {
            if (!canvasHistory[roomId]) canvasHistory[roomId] = [];
            canvasHistory[roomId].push(line); // store line in server history
            socket.to(roomId).emit('draw-end', { line });
        });

        socket.on('clear-canvas', ({ roomId }) => {
            if (canvasHistory[roomId]) canvasHistory[roomId] = [];
            io.to(roomId).emit('clear-canvas'); // send to everyone including sender
        });

        // socket.on('disconnect', async () => {
        //     for (const roomId in userInRooms) {
        //         if (userInRooms[roomId][socket.id]) {
        //             const username = userInRooms[roomId][socket.id];
        //             delete userInRooms[roomId][socket.id];

        //             try {
        //                 let room = await Room.findOne({ roomId });
        //                 if (room) {
        //                     room.users = room.users.filter(u => u.socketId !== socket.id);
        //                     await room.save();
        //                     io.to(roomId).emit('user-list', room.users.map(u => u.username));
        //                 }
        //             } catch (err) { console.error(err); }

        //             console.log(`${username} disconnected from room: ${roomId}`);
        //         }
        //     }
        // });

        socket.on('disconnect', async () => {
        for (const roomId in userInRooms) {
            if (userInRooms[roomId][socket.id]) {
                const username = userInRooms[roomId][socket.id];
                delete userInRooms[roomId][socket.id];

                try {
                    let room = await Room.findOne({ roomId });
                    if (room) {
                        room.users = room.users.filter(u => u.socketId !== socket.id);
                        await room.save();
                        io.to(roomId).emit('user-list', room.users.map(u => u.username));
                    }
                } catch (err) { console.error(err); }

                console.log(`${username} disconnected from room: ${roomId}`);
            }
        }
    });

    });
}

module.exports = setUpSocket;
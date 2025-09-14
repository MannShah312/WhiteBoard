// // // const express = require('express');
// // // const router = express.Router();
// // // const Room = require('../models/Room');

// // // router.post(
// // //     '/create',
// // //     async (req, res) => {
// // //         const {roomId} = req.body;
// // //         if(!roomId){
// // //             return res.status(400).json({message: 'Room Id is required'});
// // //         }
// // //         try {
// // //             let room = await Room.findOne({roomId});
// // //             if(!room){
// // //                 room = new Room({roomId});
// // //                 await room.save();
// // //             }
// // //             res.json({roomId: room.roomId});
// // //         } catch (error) {
// // //             console.error('Error joining room:', error);
// // //             res.status(500).json({message: 'Internal server error'});
// // //         }   
// // //     }   
// // // );

// // // router.get(
// // //     '/:roomId',
// // //     async (req, res) => {
// // //         const {roomId} = req.params;
// // //         try {
// // //             const room = await Room.findOne({roomId});
// // //             if(!room){
// // //                 return res.status(404).json({message: 'Room not found'});
// // //             }
// // //         }
// // //         catch (error) {
// // //             console.error('Error fetching room:', error);
// // //             res.status(500).json({message: 'Internal server error'});
// // //         }
// // //     });

// // // module.exports = router;

// // const express = require('express');
// // const router = express.Router();
// // const Room = require('../models/Room');

// // // Join or create a room
// // router.post('/join', async (req, res) => {
// //   const { roomId } = req.body;

// //   if (!roomId || !/^[A-Za-z0-9]{6}$/.test(roomId)) {
// //     return res.status(400).json({ error: 'Room ID must be 6 alphanumeric characters' });
// //   }

// //   try {
// //     let room = await Room.findOne({ roomId });

// //     if (!room) {
// //       room = new Room({
// //         roomId,
// //         createdAt: new Date(),
// //         lastActivity: new Date(),
// //         drawingData: []
// //       });
// //       await room.save();
// //     }

// //     res.json(room);
// //   } catch (error) {
// //     console.error("Error joining room:", error);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // // Get room info
// // router.get('/:roomId', async (req, res) => {
// //   const { roomId } = req.params;

// //   if (!/^[A-Za-z0-9]{6}$/.test(roomId)) {
// //     return res.status(400).json({ error: 'Invalid Room ID format' });
// //   }

// //   try {
// //     const room = await Room.findOne({ roomId });

// //     if (!room) {
// //       return res.status(404).json({ error: "Room not found" });
// //     }

// //     res.json(room);
// //   } catch (error) {
// //     console.error("Error fetching room:", error);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });
// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Room = require('../models/Room');

// // // Join or create a room
// // router.post('/join', async (req, res) => {
// //   const { roomId, username, socketId } = req.body;

// //   if (!roomId || !username || !socketId) {
// //     return res.status(400).json({ error: 'Room ID, username and socket ID are required' });
// //   }

// //   try {
// //     let room = await Room.findOne({ roomId });

// //     if (!room) {
// //       // Create new room if it doesn't exist
// //       room = new Room({ roomId, users: [{ username, socketId }] });
// //       await room.save();
// //     } else {
// //       // Check if username already exists in this room
// //       const userExists = room.users.some(user => user.username === username);
// //       if (userExists) {
// //         return res.status(400).json({ error: 'Username already taken in this room' });
// //       }
// //       // Add new user
// //       room.users.push({ username, socketId });
// //       room.lastActivity = Date.now();
// //       await room.save();
// //     }

// //     res.json(room);
// //   } catch (error) {
// //     console.error("Error joining room:", error);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// router.post('/join', async (req, res) => {
//   const { roomId, username } = req.body; // REMOVE socketId

//   if (!roomId || !username) {
//     return res.status(400).json({ error: 'Room ID and username are required' });
//   }

//   try {
//     let room = await Room.findOne({ roomId });

//     if (!room) {
//       room = new Room({ roomId, users: [{ username }] });
//       await room.save();
//     } else {
//       // Check if username already exists in this room
//       const userExists = room.users.some(user => user.username === username);
//       if (userExists) {
//         return res.status(400).json({ error: 'Username already taken in this room' });
//       }
//       room.users.push({ username });
//       room.lastActivity = Date.now();
//       await room.save();
//     }

//     res.json(room);
//   } catch (error) {
//     console.error("Error joining room:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Get room info
// router.get('/:roomId', async (req, res) => {
//   const { roomId } = req.params;

//   try {
//     const room = await Room.findOne({ roomId });

//     if (!room) {
//       return res.status(404).json({ error: "Room not found" });
//     }

//     res.json(room);
//   } catch (error) {
//     console.error("Error fetching room:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;










const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Join a room
router.post('/join', async (req, res) => {
  const { roomId, username } = req.body; // No socketId needed from client

  if (!roomId || !username) {
    return res.status(400).json({ error: 'Room ID and username are required' });
  }

  try {
    let room = await Room.findOne({ roomId });

    if (!room) {
      room = new Room({ roomId, users: [{ username }] });
      await room.save();
    } else {
      const userExists = room.users.some(user => user.username === username);
      if (userExists) {
        return res.status(400).json({ error: 'Username already taken in this room' });
      }
      room.users.push({ username });
      room.lastActivity = Date.now();
      await room.save();
    }

    res.json(room);
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get room info
router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
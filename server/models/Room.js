// const mongoose = require('mongoose');

// const drawingCommandSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     required: true,
//   },
//   data: {
//     type: Object,
//     required: true 
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   socketId: {
//     type: String,

//   }
// });

// const roomSchema = new mongoose.Schema({
//   roomId: { 
//     type: String, 
//     unique: true, 
//     required: true
//     },
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
//   },
//   lastActivity: { 
//     type: Date, 
//     default: Date.now 
//   },
//   drawingData: [drawingCommandSchema],
//     users: [userSchema]
// });

// module.exports = mongoose.model('Room', roomSchema);

const mongoose = require('mongoose');

const drawingCommandSchema = new mongoose.Schema({
  type: { type: String, required: true },
  data: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  socketId: { type: String }
});

const roomSchema = new mongoose.Schema({
  roomId: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now },
  drawingData: [drawingCommandSchema],
  users: [userSchema]
});

module.exports = mongoose.model('Room', roomSchema);
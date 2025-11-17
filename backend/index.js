
// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import mongoose from 'mongoose';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import authRoutes from './routes/auth.js';
// import expenseRoutes from './routes/expenses.js';
// import roomRoutes from './routes/rooms.js';

// const app = express();
// dotenv.config()
// const server = createServer(app);

// app.use(express.json())
// app.use(cors({
//     origin: "http://localhost:5173"
// }));

// const io = new Server(server, { 
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true
//   },
//   path: "/socket.io/"
// });

// mongoose.connect(process.env.Mongodb).then(() => {
//   console.log("Mongodb connected")
// }).catch(() => {
//   console.log("connection error")
// })

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);
  
//   socket.on('join-room', (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room ${roomId}`);
//   });
  
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/rooms', roomRoutes);


// server.listen(process.env.Port, () => {
//     console.log("Server Start on port " + process.env.Port);
// });

// export { io };

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';
import roomRoutes from './routes/rooms.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config()
const server = createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}));

const io = new Server(server, { 
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  },
  path: "/socket.io/"
});

mongoose.connect(process.env.Mongodb).then(() => {
  console.log("Mongodb connected")
}).catch(() => {
  console.log("connection error")
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/rooms', roomRoutes);

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch all handler: send back React's index.html file for SPA
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


server.listen(process.env.Port, () => {
    console.log("Server Start on port " + process.env.Port);
});

export { io };
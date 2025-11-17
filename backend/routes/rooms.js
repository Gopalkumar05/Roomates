// // import express from 'express';
// // import Room from '../models/Room.js';
// // import { io } from '../index.js';

// // const router = express.Router();

// // // Get user's rooms
// // router.get('/my-rooms', async (req, res) => {
// //   try {
// //     const token = req.header('Authorization')?.replace('Bearer ', '');
// //     if (!token) {
// //       return res.status(401).json({ error: 'No token provided' });
// //     }

// //     const jwt = await import('jsonwebtoken');
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
// //     const rooms = await Room.find({ 
// //       'members.user': decoded.userId 
// //     })
// //     .populate('members.user', 'name email')
// //     .populate('createdBy', 'name email')
// //     .sort({ createdAt: -1 });

// //     res.json(rooms);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // });

// // // Get room by ID
// // router.get('/:roomId', async (req, res) => {
// //   try {
// //     const room = await Room.findById(req.params.roomId)
// //       .populate('members.user', 'name email upiId')
// //       .populate('createdBy', 'name email');

// //     if (!room) {
// //       return res.status(404).json({ error: 'Room not found' });
// //     }

// //     res.json(room);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // });

// // // Create room
// // router.post('/', async (req, res) => {
// //   try {
// //     const token = req.header('Authorization')?.replace('Bearer ', '');
// //     if (!token) {
// //       return res.status(401).json({ error: 'No token provided' });
// //     }

// //     const jwt = await import('jsonwebtoken');
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

// //     const { name, description, memberEmails = [] } = req.body;

// //     // Create room with creator as first member
// //     const room = new Room({
// //       name,
// //       description,
// //       createdBy: decoded.userId,
// //       members: [{ user: decoded.userId }]
// //     });

// //     // Add additional members by email (you'd need to implement user lookup by email)
// //     // This is a simplified version - you'd want to implement proper user invitation
// //     for (const email of memberEmails) {
// //       // In a real app, you'd look up users by email and add them
// //       // For now, we'll just add the creator
// //       if (email !== req.body.creatorEmail) {
// //         // Implement user lookup and addition here
// //       }
// //     }

// //     await room.save();
// //     await room.populate('members.user', 'name email');
// //     await room.populate('createdBy', 'name email');

// //     res.status(201).json(room);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // });

// // // Add member to room
// // router.post('/:roomId/members', async (req, res) => {
// //   try {
// //     const { email } = req.body;
    
// //     // Look up user by email and add to room
// //     const User = (await import('../models/User.js')).default;
// //     const user = await User.findOne({ email });
    
// //     if (!user) {
// //       return res.status(404).json({ error: 'User not found' });
// //     }

// //     const room = await Room.findById(req.params.roomId);
// //     if (!room) {
// //       return res.status(404).json({ error: 'Room not found' });
// //     }

// //     // Check if user is already a member
// //     const isAlreadyMember = room.members.some(member => 
// //       member.user.toString() === user._id.toString()
// //     );

// //     if (isAlreadyMember) {
// //       return res.status(400).json({ error: 'User is already a member' });
// //     }

// //     room.members.push({ user: user._id });
// //     await room.save();

// //     // Real-time update
// //     io.to(room._id.toString()).emit('member-added', user);

// //     res.json(room);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // });

// // export default router;
// import express from 'express';
// import Room from '../models/Room.js';
// import User from '../models/User.js';
// import { io } from '../index.js';
// import jwt from 'jsonwebtoken'
// const router = express.Router();

// // Debug middleware
// router.use((req, res, next) => {
//   console.log(`Rooms Route: ${req.method} ${req.path}`);
//   console.log('Body:', req.body);
//   console.log('Headers:', req.headers.authorization ? 'Authorization header present' : 'No authorization header');
//   next();
// });

// // Get user's rooms
// router.get('/my-rooms', async (req, res) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ error: 'No token provided' });
//     }


//     const decoded = jwt.verify(token, process.env.JWT_SECRET );
    
//     const rooms = await Room.find({ 
//       'members.user': decoded.userId 
//     })
//     .populate('members.user', 'name email')
//     .populate('createdBy', 'name email')
//     .sort({ createdAt: -1 });

//     res.json(rooms);
//   } catch (error) {
//     console.error('Error in my-rooms route:', error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // Create room - FIXED VERSION
// router.post('/', async (req, res) => {
//   try {
//     console.log('=== CREATE ROOM ENDPOINT HIT ===');
    
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//       console.log('No token provided');
//       return res.status(401).json({ error: 'No token provided' });
//     }

  
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded user ID:', decoded.userId);

//     const { name, description, memberEmails = [] } = req.body;

//     // Validation
//     if (!name) {
//       return res.status(400).json({ error: 'Room name is required' });
//     }

//     // Get the current user
//     const currentUser = await User.findById(decoded.userId);
//     if (!currentUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Create room with creator as first member
//     const room = new Room({
//       name,
//       description: description || '',
//       createdBy: decoded.userId,
//       members: [{ user: decoded.userId }]
//     });

//     // Add additional members by email (simplified - you can enhance this later)
//     const validMemberEmails = memberEmails.filter(email => email && email.trim() !== '');
    
//     if (validMemberEmails.length > 0) {
//       console.log('Looking up members by email:', validMemberEmails);
      
//       // For now, we'll just log this. You can implement user lookup later.
//       console.log('Member emails provided:', validMemberEmails);
//       // In a real app, you'd look up users by email and add them to the room
//     }

//     await room.save();
    
//     // Populate the room data for response
//     await room.populate('members.user', 'name email');
//     await room.populate('createdBy', 'name email');

//     console.log('Room created successfully:', room.name);

//     res.status(201).json(room);
//   } catch (error) {
//     console.error('Error creating room:', error);
    
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ error: 'Invalid token' });
//     }
    
//     res.status(400).json({ error: error.message });
//   }
// });

// // Get room by ID
// router.get('/:roomId', async (req, res) => {
//   try {
//     const room = await Room.findById(req.params.roomId)
//       .populate('members.user', 'name email upiId')
//       .populate('createdBy', 'name email');

//     if (!room) {
//       return res.status(404).json({ error: 'Room not found' });
//     }

//     res.json(room);
//   } catch (error) {
//     console.error('Error fetching room:', error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // Add member to room
// router.post('/:roomId/members', async (req, res) => {
//   try {
//     const { email } = req.body;
    
//     if (!email) {
//       return res.status(400).json({ error: 'Email is required' });
//     }

//     // Look up user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const room = await Room.findById(req.params.roomId);
//     if (!room) {
//       return res.status(404).json({ error: 'Room not found' });
//     }

//     // Check if user is already a member
//     const isAlreadyMember = room.members.some(member => 
//       member.user.toString() === user._id.toString()
//     );

//     if (isAlreadyMember) {
//       return res.status(400).json({ error: 'User is already a member' });
//     }

//     room.members.push({ user: user._id });
//     await room.save();

//     // Populate before sending response
//     await room.populate('members.user', 'name email');

//     // Real-time update
//     io.to(room._id.toString()).emit('member-added', user);

//     res.json(room);
//   } catch (error) {
//     console.error('Error adding member:', error);
//     res.status(400).json({ error: error.message });
//   }
// });

// export default router;



import express from 'express';
import Room from '../models/Room.js';
import User from '../models/User.js';
import Expense from '../models/Expense.js';
import { io } from '../index.js';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import nodemailer from 'nodemailer'

const router = express.Router();

// Enhanced debug middleware
router.use((req, res, next) => {
  console.log(`=== ROOM ROUTE HIT ===`);
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  console.log(`Original URL: ${req.originalUrl}`);
  console.log('Body:', req.body);
  console.log('Params:', req.params);
  console.log('========================');
  next();
});
// Add this temporary route to check users
router.get('/debug/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email');
    console.log('All users in database:', users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).json({ error: error.message });
  }
});


const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});


// STATIC ROUTES FIRST
router.get('/my-rooms', async (req, res) => {
  try {
    console.log('GET /my-rooms endpoint hit');
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const rooms = await Room.find({ 
      'members.user': decoded.userId 
    })
    .populate('members.user', 'name email')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

    res.json(rooms);
  } catch (error) {
    console.error('Error in my-rooms route:', error);
    res.status(400).json({ error: error.message });
  }
});

// Create room
router.post('/', async (req, res) => {
  try {
    console.log('POST / endpoint hit - Creating room');
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded user ID:', decoded.userId);

    const { name, description, memberEmails = [] } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Room name is required' });
    }

    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const room = new Room({
      name,
      description: description || '',
      createdBy: decoded.userId,
      members: [{ user: decoded.userId }]
    });

    const validMemberEmails = memberEmails.filter(email => email && email.trim() !== '');
    
    if (validMemberEmails.length > 0) {
      console.log('Looking up members by email:', validMemberEmails);
      const usersToAdd = await User.find({ 
        email: { $in: validMemberEmails } 
      });
      
      for (const user of usersToAdd) {
        if (user._id.toString() !== decoded.userId.toString()) {
          room.members.push({ user: user._id });
        }
      }
    }

    await room.save();
    await room.populate('members.user', 'name email');
    await room.populate('createdBy', 'name email');

    console.log('Room created successfully:', room.name);
    io.emit('room-created', room);

    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    res.status(400).json({ error: error.message });
  }
});

// DYNAMIC ROUTES - IN CORRECT ORDER

// Add member to room - PUT THIS BEFORE OTHER DYNAMIC ROUTES
router.post('/:roomId/members', async (req, res) => {
  try {
    console.log(`✅ POST /:roomId/members endpoint hit`);
    console.log(`✅ Room ID: ${req.params.roomId}`);
    console.log('✅ Request body:', req.body);
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded user ID:', decoded.userId);
    
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const room = await Room.findById(req.params.roomId);
    if (!room) {
      console.log('❌ Room not found with ID:', req.params.roomId);
      return res.status(404).json({ error: 'Room not found' });
    }

    // Check if current user is room member
    const isCurrentUserMember = room.members.some(
      member => member.user.toString() === decoded.userId.toString()
    );

    if (!isCurrentUserMember) {
      return res.status(403).json({ error: 'You must be a room member to add users' });
    }

    // Look up user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found with email:', email);
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user is already a member
    const isAlreadyMember = room.members.some(member => 
      member.user.toString() === user._id.toString()
    );

    if (isAlreadyMember) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    room.members.push({ user: user._id });
    await room.save();

    // Populate before sending response
    await room.populate('members.user', 'name email avatar');

    console.log('✅ Member added successfully:', user.email);

    // Real-time update
    io.to(room._id.toString()).emit('member-added', {
      user: user,
      addedBy: decoded.userId
    });

    res.json(room);
  } catch (error) {
    console.error('❌ Error adding member:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get room by ID
router.get('/:roomId', async (req, res) => {
  try {
    console.log(`GET /:roomId endpoint hit - Room ID: ${req.params.roomId}`);
    const room = await Room.findById(req.params.roomId)
      .populate('members.user', 'name email upiId avatar')
      .populate('createdBy', 'name email avatar');

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update room
router.put('/:roomId', async (req, res) => {
  try {
    console.log(`PUT /:roomId endpoint hit - Room ID: ${req.params.roomId}`);
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const { name, description } = req.body;
    
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (room.createdBy.toString() !== decoded.userId.toString()) {
      return res.status(403).json({ error: 'Only room creator can update the room' });
    }

    if (name) room.name = name;
    if (description !== undefined) room.description = description;

    await room.save();
    await room.populate('members.user', 'name email avatar');
    await room.populate('createdBy', 'name email avatar');

    io.to(room._id.toString()).emit('room-updated', room);

    res.json(room);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(400).json({ error: error.message });
  }
});

// Remove member from room
router.delete('/:roomId/members/:memberId', async (req, res) => {
  try {
    console.log(`DELETE /:roomId/members/:memberId endpoint hit`);
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (room.createdBy.toString() !== decoded.userId.toString()) {
      return res.status(403).json({ error: 'Only room creator can remove members' });
    }

    if (req.params.memberId === decoded.userId.toString()) {
      return res.status(400).json({ error: 'Room creator cannot remove themselves' });
    }

    room.members = room.members.filter(
      member => member.user.toString() !== req.params.memberId
    );

    await room.save();
    await room.populate('members.user', 'name email avatar');

    io.to(room._id.toString()).emit('member-removed', {
      memberId: req.params.memberId,
      roomId: room._id
    });

    res.json(room);
  } catch (error) {
    console.error('Error removing member:', error);
    res.status(400).json({ error: error.message });
  }
});

// Leave room
router.post('/:roomId/leave', async (req, res) => {
  try {
    console.log(`POST /:roomId/leave endpoint hit`);
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const memberIndex = room.members.findIndex(
      member => member.user.toString() === decoded.userId.toString()
    );

    if (memberIndex === -1) {
      return res.status(400).json({ error: 'You are not a member of this room' });
    }

    if (room.createdBy.toString() === decoded.userId.toString()) {
      return res.status(400).json({ 
        error: 'Room creator cannot leave the room. Transfer ownership or delete the room instead.' 
      });
    }

    room.members.splice(memberIndex, 1);
    await room.save();

    io.to(room._id.toString()).emit('member-left', { 
      userId: decoded.userId,
      roomId: room._id 
    });

    res.json({ message: 'Successfully left the room' });
  } catch (error) {
    console.error('Error leaving room:', error);
    res.status(400).json({ error: error.message });
  }
});

// Transfer room ownership
router.post('/:roomId/transfer-ownership', async (req, res) => {
  try {
    console.log(`POST /:roomId/transfer-ownership endpoint hit`);
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const { newOwnerId } = req.body;
    
    if (!newOwnerId) {
      return res.status(400).json({ error: 'New owner ID is required' });
    }

    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (room.createdBy.toString() !== decoded.userId.toString()) {
      return res.status(403).json({ error: 'Only room creator can transfer ownership' });
    }

    const isNewOwnerMember = room.members.some(
      member => member.user.toString() === newOwnerId
    );

    if (!isNewOwnerMember) {
      return res.status(400).json({ error: 'New owner must be a room member' });
    }

    room.createdBy = newOwnerId;
    await room.save();

    await room.populate('members.user', 'name email avatar');
    await room.populate('createdBy', 'name email avatar');

    io.to(room._id.toString()).emit('ownership-transferred', {
      newOwnerId,
      previousOwnerId: decoded.userId,
      room
    });

    res.json(room);
  } catch (error) {
    console.error('Error transferring ownership:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete room
router.delete('/:roomId', async (req, res) => {
  try {
    console.log(`DELETE /:roomId endpoint hit - Room ID: ${req.params.roomId}`);
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (room.createdBy.toString() !== decoded.userId.toString()) {
      return res.status(403).json({ error: 'Only room creator can delete the room' });
    }

    await Expense.deleteMany({ room: req.params.roomId });
    await Room.findByIdAndDelete(req.params.roomId);

    io.emit('room-deleted', { roomId: req.params.roomId });

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get room statistics
router.get('/:roomId/stats', async (req, res) => {
  try {
    console.log(`GET /:roomId/stats endpoint hit`);
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const expenses = await Expense.find({ room: req.params.roomId })
      .populate('paidBy', 'name')
      .populate('splitAmong.user', 'name');

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const expenseCount = expenses.length;

    const memberBalances = {};
    room.members.forEach(member => {
      memberBalances[member.user.toString()] = 0;
    });

    expenses.forEach(expense => {
      const paidBy = expense.paidBy._id.toString();
      const amountPerPerson = expense.amount / expense.splitAmong.length;

      expense.splitAmong.forEach(split => {
        const userId = split.user._id.toString();
        if (userId === paidBy) {
          memberBalances[userId] += expense.amount - amountPerPerson;
        } else {
          memberBalances[userId] -= amountPerPerson;
          memberBalances[paidBy] += amountPerPerson;
        }
      });
    });

    res.json({
      totalExpenses,
      expenseCount,
      memberCount: room.members.length,
      memberBalances,
      recentExpenses: expenses.slice(-5).reverse()
    });
  } catch (error) {
    console.error('Error fetching room stats:', error);
    res.status(400).json({ error: error.message });
  }
});



// Add this route to rooms.js

// router.post('/:roomId/remind', auth, async (req, res) => {
//   try {
//     const { roomId } = req.params;
//     const { memberId, message } = req.body;
    
//     console.log('=== REMINDER ROUTE - DEBUG ===');
//     console.log('Authenticated User ID:', req.user._id || req.user.userId);
//     console.log('Room ID:', roomId);
//     console.log('Target Member ID:', memberId);
//     console.log('Message:', message);

//     const userId = req.user._id || req.user.userId;

//     const room = await Room.findById(roomId)
//       .populate('members.user', 'name email')
//       .populate('createdBy', 'name email');

//     if (!room) {
//       console.log('Room not found with ID:', roomId);
//       return res.status(404).json({ error: 'Room not found' });
//     }

//     console.log('Room found:', room.name);
//     console.log('Room members:', room.members.map(m => ({
//       userId: m.user._id.toString(),
//       name: m.user.name
//     })));

//     // Check if user is room member
//     const isMember = room.members.some(member => 
//       member.user._id.toString() === userId.toString()
//     );
    
//     console.log('Is user member of room?', isMember);
    
//     if (!isMember) {
//       console.log('Access denied - User is not a member of this room');
//       return res.status(403).json({ error: 'Access denied. You are not a member of this room.' });
//     }

//     const currentUser = room.members.find(member => 
//       member.user._id.toString() === userId.toString()
//     ).user;

//     console.log('Current user:', currentUser.name);

//     const targetMember = room.members.find(member => 
//       member.user._id.toString() === memberId
//     );

//     if (!targetMember) {
//       console.log('Target member not found with ID:', memberId);
//       return res.status(404).json({ error: 'Member not found' });
//     }

//     console.log('Target member:', targetMember.user.name);

//     // Don't allow sending reminders to yourself
//     if (targetMember.user._id.toString() === userId.toString()) {
//       return res.status(400).json({ error: 'Cannot send reminder to yourself' });
//     }

//     console.log('Reminder sent successfully:', {
//       from: currentUser.name,
//       to: targetMember.user.name,
//       message: message,
//       room: room.name
//     });

//     // Send real-time notification
//     if (io) {
//       io.to(roomId).emit('reminder-sent', {
//         from: currentUser,
//         to: targetMember.user,
//         message: message
//       });
//     }

//     res.json({ 
//       message: 'Reminder sent successfully',
//       to: targetMember.user.name
//     });

//   } catch (error) {
//     console.error('Error sending reminder:', error);
//     res.status(400).json({ error: error.message });
//   }
// });


router.post('/:roomId/remind', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { memberId, message } = req.body;
    
    console.log('=== REMINDER ROUTE - DEBUG ===');
    console.log('Authenticated User ID:', req.user._id || req.user.userId);
    console.log('Room ID:', roomId);
    console.log('Target Member ID:', memberId);
    console.log('Message:', message);

    const userId = req.user._id || req.user.userId;

    const room = await Room.findById(roomId)
      .populate('members.user', 'name email')
      .populate('createdBy', 'name email');

    if (!room) {
      console.log('Room not found with ID:', roomId);
      return res.status(404).json({ error: 'Room not found' });
    }

    console.log('Room found:', room.name);
    console.log('Room members:', room.members.map(m => ({
      userId: m.user._id.toString(),
      name: m.user.name,
      email: m.user.email
    })));

    // Check if user is room member
    const isMember = room.members.some(member => 
      member.user._id.toString() === userId.toString()
    );
    
    console.log('Is user member of room?', isMember);
    
    if (!isMember) {
      console.log('Access denied - User is not a member of this room');
      return res.status(403).json({ error: 'Access denied. You are not a member of this room.' });
    }

    const currentUser = room.members.find(member => 
      member.user._id.toString() === userId.toString()
    ).user;

    console.log('Current user:', currentUser.name);

    const targetMember = room.members.find(member => 
      member.user._id.toString() === memberId
    );

    if (!targetMember) {
      console.log('Target member not found with ID:', memberId);
      return res.status(404).json({ error: 'Member not found' });
    }

    console.log('Target member:', targetMember.user.name, targetMember.user.email);

    // Don't allow sending reminders to yourself
    if (targetMember.user._id.toString() === userId.toString()) {
      return res.status(400).json({ error: 'Cannot send reminder to yourself' });
    }

    // Send email reminder
    let emailSent = false;
    let emailError = null;

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@yourapp.com',
        to: targetMember.user.email,
        subject: `💰 Expense Reminder - ${room.name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
              .message-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              .button { display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>💰 Expense Reminder</h1>
                <p>Room: ${room.name}</p>
              </div>
              <div class="content">
                <h2>Hello ${targetMember.user.name},</h2>
                <p>You have received a reminder from <strong>${currentUser.name}</strong> regarding expenses in your shared room <strong>"${room.name}"</strong>.</p>
                
                <div class="message-box">
                  <p><strong>Message from ${currentUser.name}:</strong></p>
                  <p>"${message}"</p>
                </div>

                <p>Please log in to the app to view your expense details and settle any pending balances.</p>
                
                <a href="http://localhost:5000/dashboard" class="button">View Expenses</a>
                
                <p>If you have any questions, please contact your roommate directly.</p>
              </div>
              <div class="footer">
                <p>This is an automated reminder from Roommate Expenses App.</p>
                <p>If you believe you received this email in error, please ignore it.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `Hello ${targetMember.user.name},\n\nYou have received a reminder from ${currentUser.name} regarding expenses in your shared room "${room.name}".\n\nMessage: "${message}"\n\nPlease log in to the app to view your expense details.\n\nBest regards,\nRoommate Expenses App`
      };

      // Send email
      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log('Email sent successfully to:', targetMember.user.email);
      
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      emailError = emailError.message;
      // Don't fail the entire request if email fails, just log it
    }

    // Send real-time notification
    if (io) {
      io.to(roomId).emit('reminder-sent', {
        from: currentUser,
        to: targetMember.user,
        message: message,
        emailSent: emailSent
      });
    }

    console.log('Reminder sent successfully:', {
      from: currentUser.name,
      to: targetMember.user.name,
      toEmail: targetMember.user.email,
      message: message,
      room: room.name,
      emailSent: emailSent,
      emailError: emailError
    });

    res.json({ 
      message: 'Reminder sent successfully',
      to: targetMember.user.name,
      emailSent: emailSent,
      emailError: emailError
    });

  } catch (error) {
    console.error('Error sending reminder:', error);
    res.status(400).json({ error: error.message });
  }
});
export default router;
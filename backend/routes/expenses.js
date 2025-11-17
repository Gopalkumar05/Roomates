// // backend/routes/expenses.js
// import express from 'express';
// import Expense from '../models/Expense.js';
// import Room from '../models/Room.js';
// import { io } from '../index.js';

// const router = express.Router();

// // Create expense
// router.post('/', async (req, res) => {
//   try {
//     const expense = new Expense(req.body);
//     await expense.save();
    
//     // Populate for response
//     await expense.populate('paidBy', 'name email');
//     await expense.populate('splits.user', 'name email');
    
//     // Real-time update to room
//     io.to(expense.room.toString()).emit('expense-added', expense);
    
//     res.status(201).json(expense);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Get expenses for room
// router.get('/room/:roomId', async (req, res) => {
//   try {
//     const expenses = await Expense.find({ room: req.params.roomId })
//       .populate('paidBy', 'name email')
//       .populate('splits.user', 'name email')
//       .sort({ date: -1 });
    
//     res.json(expenses);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Calculate balances
// router.get('/room/:roomId/balances', async (req, res) => {
//   try {
//     const expenses = await Expense.find({ room: req.params.roomId })
//       .populate('paidBy', 'name email')
//       .populate('splits.user', 'name email');
    
//     const balances = {};
    
//     expenses.forEach(expense => {
//       const paidBy = expense.paidBy._id.toString();
      
//       expense.splits.forEach(split => {
//         const userId = split.user._id.toString();
        
//         if (!balances[userId]) {
//           balances[userId] = { totalOwed: 0, totalPaid: 0, netBalance: 0 };
//         }
        
//         if (userId !== paidBy) {
//           balances[userId].totalOwed += split.amount;
//         }
//       });
      
//       if (!balances[paidBy]) {
//         balances[paidBy] = { totalOwed: 0, totalPaid: 0, netBalance: 0 };
//       }
//       balances[paidBy].totalPaid += expense.amount;
//     });
    
//     // Calculate net balance
//     Object.keys(balances).forEach(userId => {
//       balances[userId].netBalance = 
//         balances[userId].totalPaid - balances[userId].totalOwed;
//     });
    
//     res.json(balances);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// export default router;

import express from 'express';
import Expense from '../models/Expense.js';
import Room from '../models/Room.js';
import { io } from '../index.js';

const router = express.Router();

// Create expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    
    // Populate for response
    await expense.populate('paidBy', 'name email');
    await expense.populate('splits.user', 'name email');
    
    // Real-time update to room
    io.to(expense.room.toString()).emit('expense-added', expense);
    
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get expenses for room
router.get('/room/:roomId', async (req, res) => {
  try {
    const expenses = await Expense.find({ room: req.params.roomId })
      .populate('paidBy', 'name email')
      .populate('splits.user', 'name email')
      .sort({ date: -1 });
    
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update expense
router.put('/:expenseId', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.expenseId,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('paidBy', 'name email')
    .populate('splits.user', 'name email');
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    // Real-time update to room
    io.to(expense.room.toString()).emit('expense-updated', expense);
    
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete expense
router.delete('/:expenseId', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.expenseId);
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    await Expense.findByIdAndDelete(req.params.expenseId);
    
    // Real-time update to room
    io.to(expense.room.toString()).emit('expense-deleted', expense._id);
    
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Calculate balances
router.get('/room/:roomId/balances', async (req, res) => {
  try {
    const expenses = await Expense.find({ room: req.params.roomId })
      .populate('paidBy', 'name email')
      .populate('splits.user', 'name email');
    
    const balances = {};
    
    expenses.forEach(expense => {
      const paidBy = expense.paidBy._id.toString();
      
      expense.splits.forEach(split => {
        const userId = split.user._id.toString();
        
        if (!balances[userId]) {
          balances[userId] = { totalOwed: 0, totalPaid: 0, netBalance: 0 };
        }
        
        if (userId !== paidBy) {
          balances[userId].totalOwed += split.amount;
        }
      });
      
      if (!balances[paidBy]) {
        balances[paidBy] = { totalOwed: 0, totalPaid: 0, netBalance: 0 };
      }
      balances[paidBy].totalPaid += expense.amount;
    });
    
    // Calculate net balance
    Object.keys(balances).forEach(userId => {
      balances[userId].netBalance = 
        balances[userId].totalPaid - balances[userId].totalOwed;
    });
    
    res.json(balances);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
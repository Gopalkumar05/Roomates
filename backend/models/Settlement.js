import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank_transfer', 'upi', 'paypal', 'credit_card', 'debit_card', 'other'],
    default: 'other'
  },
  transactionId: {
    type: String,
    sparse: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  settledAt: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted amount
settlementSchema.virtual('formattedAmount').get(function() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: this.currency || 'USD',
  }).format(this.amount);
});

// Virtual for isOverdue
settlementSchema.virtual('isOverdue').get(function() {
  if (this.dueDate && this.status === 'pending') {
    return new Date() > this.dueDate;
  }
  return false;
});

// Indexes for better query performance
settlementSchema.index({ fromUser: 1, status: 1 });
settlementSchema.index({ toUser: 1, status: 1 });
settlementSchema.index({ room: 1, status: 1 });
settlementSchema.index({ fromUser: 1, toUser: 1 });
settlementSchema.index({ status: 1, dueDate: 1 });
settlementSchema.index({ createdAt: 1 });

// Static method to find settlements by user
settlementSchema.statics.findByUserId = function(userId, status = null) {
  const query = {
    $or: [
      { fromUser: userId },
      { toUser: userId }
    ]
  };
  
  if (status) {
    query.status = status;
  }
  
  return this.find(query)
    .populate('fromUser', 'name email avatar')
    .populate('toUser', 'name email avatar')
    .populate('room', 'name')
    .sort({ createdAt: -1 });
};

// Static method to get settlement summary for a user
settlementSchema.statics.getUserSummary = async function(userId) {
  const result = await this.aggregate([
    {
      $match: {
        $or: [
          { fromUser: mongoose.Types.ObjectId(userId) },
          { toUser: mongoose.Types.ObjectId(userId) }
        ]
      }
    },
    {
      $facet: {
        totalOwed: [
          {
            $match: {
              fromUser: mongoose.Types.ObjectId(userId),
              status: 'pending'
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' }
            }
          }
        ],
        totalOwedToYou: [
          {
            $match: {
              toUser: mongoose.Types.ObjectId(userId),
              status: 'pending'
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' }
            }
          }
        ],
        completedCount: [
          {
            $match: {
              $or: [
                { fromUser: mongoose.Types.ObjectId(userId) },
                { toUser: mongoose.Types.ObjectId(userId) }
              ],
              status: 'completed'
            }
          },
          {
            $count: 'count'
          }
        ],
        pendingCount: [
          {
            $match: {
              $or: [
                { fromUser: mongoose.Types.ObjectId(userId) },
                { toUser: mongoose.Types.ObjectId(userId) }
              ],
              status: 'pending'
            }
          },
          {
            $count: 'count'
          }
        ]
      }
    }
  ]);

  const summary = result[0];
  
  return {
    totalOwed: summary.totalOwed[0]?.total || 0,
    totalOwedToYou: summary.totalOwedToYou[0]?.total || 0,
    completedCount: summary.completedCount[0]?.count || 0,
    pendingCount: summary.pendingCount[0]?.count || 0
  };
};

// Static method to find settlements by room
settlementSchema.statics.findByRoomId = function(roomId, status = null) {
  const query = { room: roomId };
  
  if (status) {
    query.status = status;
  }
  
  return this.find(query)
    .populate('fromUser', 'name email avatar')
    .populate('toUser', 'name email avatar')
    .sort({ createdAt: -1 });
};

// Instance method to mark as completed
settlementSchema.methods.markAsCompleted = function(transactionId = null, notes = '') {
  this.status = 'completed';
  this.settledAt = new Date();
  
  if (transactionId) {
    this.transactionId = transactionId;
  }
  
  if (notes) {
    this.notes = notes;
  }
  
  return this.save();
};

// Instance method to cancel settlement
settlementSchema.methods.cancel = function(reason = '') {
  this.status = 'cancelled';
  if (reason) {
    this.notes = reason;
  }
  return this.save();
};

// Middleware to validate that fromUser and toUser are different
settlementSchema.pre('save', function(next) {
  if (this.fromUser.equals(this.toUser)) {
    next(new Error('From user and to user cannot be the same'));
  }
  next();
});

// Middleware to set due date if not provided (default: 7 days from creation)
settlementSchema.pre('save', function(next) {
  if (!this.dueDate && this.status === 'pending') {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    this.dueDate = dueDate;
  }
  next();
});

// Static method to create bulk settlements
settlementSchema.statics.createBulkSettlements = async function(settlementsData) {
  try {
    const settlements = await this.insertMany(settlementsData);
    return settlements;
  } catch (error) {
    throw new Error(`Failed to create bulk settlements: ${error.message}`);
  }
};

// Static method to find overdue settlements
settlementSchema.statics.findOverdueSettlements = function() {
  return this.find({
    status: 'pending',
    dueDate: { $lt: new Date() }
  })
  .populate('fromUser', 'name email')
  .populate('toUser', 'name email')
  .populate('room', 'name');
};

// Static method to get room settlement summary
settlementSchema.statics.getRoomSettlementSummary = async function(roomId) {
  const result = await this.aggregate([
    {
      $match: {
        room: mongoose.Types.ObjectId(roomId)
      }
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$amount' }
      }
    }
  ]);

  const summary = {
    pending: { count: 0, totalAmount: 0 },
    completed: { count: 0, totalAmount: 0 },
    cancelled: { count: 0, totalAmount: 0 },
    total: { count: 0, totalAmount: 0 }
  };

  result.forEach(item => {
    summary[item._id] = {
      count: item.count,
      totalAmount: item.totalAmount
    };
    summary.total.count += item.count;
    summary.total.totalAmount += item.totalAmount;
  });

  return summary;
};

const Settlement = mongoose.model('Settlement', settlementSchema);

export default  Settlement;
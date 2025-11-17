

import React, { useState, useEffect } from 'react';
import { X, IndianRupee, Users, User, Calculator, Receipt, Tag } from 'lucide-react';
import axios from 'axios';

const AddExpenseModal = ({ room, expense, onClose, onExpenseAdded }) => {
  const isEditing = !!expense;
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food',
    splitType: 'equal',
    paidBy: room.members[0]?.user._id || '',
  });
  const [loading, setLoading] = useState(false);
  const [customSplits, setCustomSplits] = useState({});

  // Initialize form when expense prop changes (for editing)
  useEffect(() => {
    if (isEditing && expense) {
      setFormData({
        title: expense.title || '',
        amount: expense.amount?.toString() || '',
        category: expense.category || 'food',
        splitType: expense.splitType || 'equal',
        paidBy: expense.paidBy?._id || room.members[0]?.user._id,
      });

      // Initialize custom splits for editing
      if (expense.splits && expense.splitType === 'custom') {
        const splitsObj = {};
        expense.splits.forEach(split => {
          splitsObj[split.user._id] = split.amount;
        });
        setCustomSplits(splitsObj);
      }
    } else {
      // Reset for new expense
      setFormData({
        title: '',
        amount: '',
        category: 'food',
        splitType: 'equal',
        paidBy: room.members[0]?.user._id || '',
      });
      setCustomSplits({});
    }
  }, [expense, isEditing, room.members]);

  // Initialize custom splits when amount changes or when switching to equal split
  useEffect(() => {
    if (formData.splitType === 'equal' && formData.amount) {
      const equalSplits = calculateEqualSplits();
      const splitsObj = {};
      equalSplits.forEach(split => {
        splitsObj[split.user] = split.amount;
      });
      setCustomSplits(splitsObj);
    }
  }, [formData.amount, formData.splitType, room.members]);

  const calculateEqualSplits = () => {
    const amount = parseFloat(formData.amount) || 0;
    const memberCount = room.members.length;
    const splitAmount = amount / memberCount;
    
    return room.members.map(member => ({
      user: member.user._id,
      amount: parseFloat(splitAmount.toFixed(2))
    }));
  };

  const handleCustomSplitChange = (userId, amount) => {
    setCustomSplits(prev => ({
      ...prev,
      [userId]: parseFloat(amount) || 0
    }));
  };

  const getFinalSplits = () => {
    if (formData.splitType === 'equal') {
      return calculateEqualSplits();
    } else {
      const total = Object.values(customSplits).reduce((sum, amount) => sum + amount, 0);
      const expenseAmount = parseFloat(formData.amount) || 0;
      
      if (total !== expenseAmount) {
        // Distribute remaining amount equally
        const remaining = expenseAmount - total;
        const memberIds = Object.keys(customSplits);
        const adjustment = remaining / memberIds.length;
        
        const adjustedSplits = { ...customSplits };
        memberIds.forEach(userId => {
          adjustedSplits[userId] = parseFloat((customSplits[userId] + adjustment).toFixed(2));
        });
        
        return Object.entries(adjustedSplits).map(([userId, amount]) => ({
          user: userId,
          amount: amount
        }));
      }
      
      return Object.entries(customSplits).map(([userId, amount]) => ({
        user: userId,
        amount: amount
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const splits = getFinalSplits();

      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        room: room._id,
        splits: splits
      };

      if (isEditing) {
        // Update existing expense
        await axios.put(`https://roomates-k4tg.onrender.com/api/expenses/${expense._id}`, expenseData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new expense
        await axios.post('https://roomates-k4tg.onrender.com/api/expenses', expenseData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      onExpenseAdded();
      onClose();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} expense:`, error);
      alert(`Failed to ${isEditing ? 'update' : 'create'} expense. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const totalCustomAmount = Object.values(customSplits).reduce((sum, amount) => sum + amount, 0);
  const amountDifference = (parseFloat(formData.amount) || 0) - totalCustomAmount;
  const isAmountValid = formData.splitType !== 'custom' || Math.abs(amountDifference) < 0.01;

  const categories = [
    { value: 'food', label: '🍕 Food & Groceries', color: 'from-green-500 to-emerald-600' },
    { value: 'rent', label: '🏠 Rent', color: 'from-purple-500 to-indigo-600' },
    { value: 'utilities', label: '💡 Utilities', color: 'from-blue-500 to-cyan-600' },
    { value: 'entertainment', label: '🎬 Entertainment', color: 'from-pink-500 to-rose-600' },
    { value: 'transportation', label: '🚗 Transportation', color: 'from-orange-500 to-amber-600' },
    { value: 'shopping', label: '🛍️ Shopping', color: 'from-indigo-500 to-purple-600' },
    { value: 'other', label: '💰 Other', color: 'from-gray-500 to-gray-600' }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-200 mx-2 sm:mx-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Receipt className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  {isEditing ? 'Edit Expense' : 'Add Expense'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  {isEditing ? 'Update expense details' : 'Split costs with roommates'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1 sm:p-2 hover:bg-white/50 rounded-lg sm:rounded-xl transition-all duration-200 flex-shrink-0"
            >
              <X size={18} className="sm:w-5 sm:h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              What was this for? *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
              placeholder="e.g., Groceries, Rent, Electricity Bill"
            />
          </div>

          {/* Amount & Category Row */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            {/* Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Amount *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee size={16} className="sm:w-4 sm:h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                </div>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white text-sm sm:text-base"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Paid By & Split Type Row */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            {/* Paid By */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Paid By *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                </div>
                <select
                  required
                  value={formData.paidBy}
                  onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
                  className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white text-sm sm:text-base"
                >
                  {room.members.map((member) => (
                    <option key={member.user._id} value={member.user._id}>
                      {member.user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Split Type */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Split Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calculator size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                </div>
                <select
                  value={formData.splitType}
                  onChange={(e) => setFormData({ ...formData, splitType: e.target.value })}
                  className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white text-sm sm:text-base"
                >
                  <option value="equal">Equal Split</option>
                  <option value="custom">Custom Split</option>
                </select>
              </div>
            </div>
          </div>

          {/* Split Information */}
          {formData.splitType === 'equal' && formData.amount && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={12} className="sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-blue-900 text-sm sm:text-base">
                    Split equally among {room.members.length} people
                  </p>
                  <p className="text-blue-700 text-xs sm:text-sm">
                    ₹{(parseFloat(formData.amount) / room.members.length).toFixed(2)} each
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Custom Split Inputs */}
          {formData.splitType === 'custom' && formData.amount && (
            <div className="space-y-3 sm:space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Custom Split Amounts
              </label>
              
              <div className="space-y-2 sm:space-y-3">
                {room.members.map((member) => (
                  <div key={member.user._id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0">
                        {member.user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {member.user.name}
                      </span>
                    </div>
                    <div className="relative w-20 sm:w-24 flex-shrink-0">
                      <div className="absolute inset-y-0 left-0 pl-1.5 sm:pl-2 flex items-center pointer-events-none">
                        <IndianRupee size={10} className="sm:w-3 sm:h-3 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={customSplits[member.user._id] || ''}
                        onChange={(e) => handleCustomSplitChange(member.user._id, e.target.value)}
                        className="w-full pl-5 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded sm:rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Amount Validation */}
              {!isAmountValid && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-yellow-200">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-yellow-800 font-medium">Amount adjustment needed</span>
                    <span className="text-yellow-700">
                      ₹{Math.abs(amountDifference).toFixed(2)} {amountDifference > 0 ? 'over' : 'under'}
                    </span>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">
                    Amounts will be automatically adjusted to match the total.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 font-medium transition-all duration-200 disabled:opacity-50 text-sm sm:text-base order-2 xs:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.title || !formData.amount}
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-indigo-700 font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 xs:order-2"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isEditing ? 'Updating...' : 'Adding...'}
                </div>
              ) : (
                isEditing ? 'Update Expense' : 'Add Expense'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;

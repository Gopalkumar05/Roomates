

import React from 'react';
import { IndianRupee, User, Calendar, MoreVertical, Receipt, Users, Edit3, Trash2 } from 'lucide-react';

const ExpenseList = ({ 
  expenses, 
  onEditExpense, 
  onDeleteExpense, 
  editingExpense, 
  currentUser 
}) => {
  // Safe default for expenses
  const safeExpenses = expenses || [];

  const getCategoryColor = (category) => {
    const colors = {
      rent: 'from-purple-500 to-purple-600',
      food: 'from-green-500 to-green-600',
      utilities: 'from-blue-500 to-blue-600',
      entertainment: 'from-pink-500 to-pink-600',
      transportation: 'from-orange-500 to-orange-600',
      shopping: 'from-indigo-500 to-indigo-600',
      other: 'from-gray-500 to-gray-600'
    };
    return colors[category] || colors.other;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      rent: '🏠',
      food: '🍕',
      utilities: '💡',
      entertainment: '🎬',
      transportation: '🚗',
      shopping: '🛍️',
      other: '💰'
    };
    return icons[category] || icons.other;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  const formatAmount = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return '₹0';
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSplitTypeText = (splitType) => {
    const types = {
      equal: 'Equal',
      custom: 'Custom',
      percentage: 'Percentage'
    };
    return types[splitType] || splitType;
  };

  const canEditExpense = (expense) => {
    return expense?.paidBy?._id === currentUser?.userId;
  };

  const [showMenu, setShowMenu] = React.useState(null);

  const handleMenuToggle = (expenseId, e) => {
    e?.stopPropagation();
    setShowMenu(showMenu === expenseId ? null : expenseId);
  };

  const handleEdit = (expense) => {
    setShowMenu(null);
    if (onEditExpense && expense) {
      onEditExpense(expense);
    }
  };

  const handleDelete = (expenseId) => {
    setShowMenu(null);
    if (onDeleteExpense && expenseId) {
      onDeleteExpense(expenseId);
    }
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setShowMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Safe check for empty expenses
  if (!safeExpenses || safeExpenses.length === 0) {
    return (
      <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:p-12 text-center mx-2 sm:mx-0">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Receipt className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">No expenses yet</h3>
          <p className="text-gray-500 text-sm sm:text-base mb-2">
            Start adding expenses to track shared costs with your roommates.
          </p>
          <p className="text-xs sm:text-sm text-gray-400">
            Your expenses will appear here once you add them.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Expenses</h2>
        <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
          {safeExpenses.length} expense{safeExpenses.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Expenses List */}
      <div className="space-y-2 sm:space-y-3">
        {safeExpenses.map((expense) => (
          <div
            key={expense?._id || Math.random()}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4 lg:p-5 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              {/* Left Section - Category and Details */}
              <div className="flex items-start gap-2 sm:gap-3 lg:gap-4 flex-1 min-w-0">
                {/* Category Icon */}
                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${getCategoryColor(expense?.category)} rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg flex-shrink-0`}>
                  {getCategoryIcon(expense?.category)}
                </div>

                {/* Expense Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                      {expense?.title || 'Untitled Expense'}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(expense?.category)} text-white w-fit`}>
                      {(expense?.category?.charAt(0).toUpperCase() + expense?.category?.slice(1)) || 'Other'}
                    </span>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-col xs:flex-row xs:flex-wrap items-start xs:items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={10} className="sm:w-3 sm:h-3 text-blue-600" />
                      </div>
                      <span className="font-medium truncate">
                        Paid by {expense?.paidBy?.name || 'Unknown'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar size={10} className="sm:w-3 sm:h-3 text-green-600" />
                      </div>
                      <span>{formatDate(expense?.date)}</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users size={10} className="sm:w-3 sm:h-3 text-purple-600" />
                      </div>
                      <span className="font-medium truncate">
                        {getSplitTypeText(expense?.splitType)} split
                      </span>
                    </div>
                  </div>

                  {/* Split Details */}
                  {expense?.splits && expense.splits.length > 0 && (
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {expense.splits.slice(0, 3).map((split, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-gray-50 to-blue-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-gray-200"
                          >
                            <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {split.user?.name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[60px] sm:max-w-none">
                              {split.user?.name || 'Unknown'}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-900 flex-shrink-0">
                              {formatAmount(split.amount)}
                            </span>
                          </div>
                        ))}
                        {expense.splits.length > 3 && (
                          <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-gray-50 to-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-gray-200">
                            <span className="text-xs sm:text-sm font-medium text-gray-600">
                              +{expense.splits.length - 3} more
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Section - Amount and Actions */}
              <div className="flex items-start gap-2 sm:gap-3 ml-2 sm:ml-3 lg:ml-4">
                <div className="text-right">
                  <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {formatAmount(expense?.amount)}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 sm:mt-1 hidden xs:block">
                    Total amount
                  </div>
                </div>
                
                {/* Action Menu */}
                {canEditExpense(expense) && (
                  <div className="relative">
                    <button 
                      onClick={(e) => handleMenuToggle(expense._id, e)}
                      className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-200 flex-shrink-0"
                    >
                      <MoreVertical size={16} className="sm:w-4 sm:h-5 text-gray-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu === expense._id && (
                      <div className="absolute right-0 top-8 sm:top-10 bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 py-1 sm:py-2 z-10 min-w-[120px] sm:min-w-[140px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(expense);
                          }}
                          className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Edit3 size={14} className="sm:w-4 sm:h-4 text-blue-500" />
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(expense._id);
                          }}
                          className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} className="sm:w-4 sm:h-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;

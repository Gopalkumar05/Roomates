


import React from 'react';
import { CreditCard, BarChart3, Users } from 'lucide-react';

const RoomTabs = ({ activeTab, onTabChange, expensesCount, membersCount }) => {
  const tabs = [
    { id: 'expenses', label: 'Expenses', icon: CreditCard, count: expensesCount },
    { id: 'balances', label: 'Balances', icon: BarChart3 },
    { id: 'members', label: 'Members', icon: Users, count: membersCount }
  ];

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg p-1 sm:p-2 mb-4 sm:mb-6 border border-gray-100 mx-2 sm:mx-0">
      <div className="flex space-x-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 flex-1 justify-center min-h-[44px] ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon size={16} className="sm:w-4 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                {tab.label}
              </span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium ${
                  activeTab === tab.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoomTabs;

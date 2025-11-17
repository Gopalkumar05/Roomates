
// import React from 'react';
// import { IndianRupee, ArrowUpRight, ArrowDownLeft, Bell } from 'lucide-react';

// const BalanceSummary = ({ balances, room, onSendReminder }) => {
//   const formatAmount = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   const getMemberName = (userId) => {
//     const member = room.members.find(m => m.user._id === userId);
//     return member ? member.user.name : 'Unknown User';
//   };

//   const getMemberEmail = (userId) => {
//     const member = room.members.find(m => m.user._id === userId);
//     return member ? member.user.email : '';
//   };

//   const getMemberAvatar = (userId) => {
//     const member = room.members.find(m => m.user._id === userId);
//     return member ? member.user.name.charAt(0).toUpperCase() : 'U';
//   };

//   const balanceEntries = Object.entries(balances).filter(([userId, balance]) => 
//     balance.netBalance !== 0
//   );

//   if (balanceEntries.length === 0) {
//     return (
//       <div className="p-8 text-center">
//         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <ArrowUpRight className="h-8 w-8 text-green-600" />
//         </div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">All settled up! 🎉</h3>
//         <p className="text-gray-600">No outstanding balances between roommates.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="space-y-6">
//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {balanceEntries.map(([userId, balance]) => (
//             <div
//               key={userId}
//               className={`p-4 rounded-xl border ${
//                 balance.netBalance > 0
//                   ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
//                   : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
//               }`}
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
//                     {getMemberAvatar(userId)}
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">{getMemberName(userId)}</h4>
//                     <p className="text-xs text-gray-600">{getMemberEmail(userId)}</p>
//                   </div>
//                 </div>
//                 {balance.netBalance < 0 && (
//                   <button
//                     onClick={() => onSendReminder(userId)}
//                     className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
//                     title="Send Reminder"
//                   >
//                     <Bell size={16} />
//                   </button>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Paid</span>
//                   <span className="font-semibold text-green-600">
//                     {formatAmount(balance.totalPaid)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Owes</span>
//                   <span className="font-semibold text-red-600">
//                     {formatAmount(balance.totalOwed)}
//                   </span>
//                 </div>
//                 <div className="border-t pt-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium text-gray-700">Net Balance</span>
//                     <span className={`font-bold text-lg ${
//                       balance.netBalance > 0 ? 'text-green-600' : 'text-red-600'
//                     }`}>
//                       {balance.netBalance > 0 ? '+' : ''}{formatAmount(balance.netBalance)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Settlement Suggestions */}
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
//           <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <ArrowUpRight className="h-5 w-5 text-blue-600" />
//             Settlement Suggestions
//           </h3>
//           <div className="space-y-3">
//             {balanceEntries
//               .filter(([_, balance]) => balance.netBalance < 0)
//               .map(([debtorId, debtorBalance]) => {
//                 const debtor = room.members.find(m => m.user._id === debtorId);
//                 const creditors = balanceEntries
//                   .filter(([creditorId, creditorBalance]) => 
//                     creditorBalance.netBalance > 0 && creditorId !== debtorId
//                   )
//                   .sort((a, b) => b[1].netBalance - a[1].netBalance);

//                 return creditors.map(([creditorId, creditorBalance]) => {
//                   const creditor = room.members.find(m => m.user._id === creditorId);
//                   const amount = Math.min(
//                     Math.abs(debtorBalance.netBalance),
//                     creditorBalance.netBalance
//                   );

//                   if (amount > 0) {
//                     return (
//                       <div
//                         key={`${debtorId}-${creditorId}`}
//                         className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
//                       >
//                         <div className="flex items-center space-x-3">
//                           <div className="flex items-center space-x-2">
//                             <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-semibold">
//                               {debtor.user.name.charAt(0)}
//                             </div>
//                             <span className="font-medium text-gray-900">{debtor.user.name}</span>
//                           </div>
//                           <ArrowDownLeft className="h-4 w-4 text-gray-400" />
//                           <div className="flex items-center space-x-2">
//                             <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-semibold">
//                               {creditor.user.name.charAt(0)}
//                             </div>
//                             <span className="font-medium text-gray-900">{creditor.user.name}</span>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <div className="font-semibold text-gray-900">
//                             {formatAmount(amount)}
//                           </div>
//                           <button
//                             onClick={() => onSendReminder(debtorId)}
//                             className="text-xs text-blue-500 hover:text-blue-600 mt-1"
//                           >
//                             Send Reminder
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   }
//                   return null;
//                 });
//               })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BalanceSummary;

// import React from 'react';
// import { IndianRupee, ArrowUpRight, ArrowDownLeft, Bell } from 'lucide-react';

// const BalanceSummary = ({ balances, room, onSendReminder }) => {
//   const formatAmount = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   const getMemberName = (userId) => {
//     const member = room.members.find(m => m.user._id === userId);
//     return member ? member.user.name : 'Unknown User';
//   };

//   const getMemberEmail = (userId) => {
//     const member = room.members.find(m => m.user._id === userId);
//     return member ? member.user.email : '';
//   };

//   const getMemberAvatar = (userId) => {
//     const member = room.members.find(m => m.user._id === userId);
//     return member ? member.user.name.charAt(0).toUpperCase() : 'U';
//   };

//   const balanceEntries = Object.entries(balances).filter(([userId, balance]) => 
//     balance.netBalance !== 0
//   );

//   if (balanceEntries.length === 0) {
//     return (
//       <div className="p-8 text-center">
//         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <ArrowUpRight className="h-8 w-8 text-green-600" />
//         </div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">All settled up! 🎉</h3>
//         <p className="text-gray-600">No outstanding balances between roommates.</p>
//       </div>
//     );
//   }

//   // Generate settlement suggestions safely
//   const generateSettlementSuggestions = () => {
//     const suggestions = [];
    
//     // Get all debtors (people who owe money)
//     const debtors = balanceEntries
//       .filter(([_, balance]) => balance.netBalance < 0)
//       .map(([debtorId, debtorBalance]) => ({
//         id: debtorId,
//         balance: debtorBalance,
//         member: room.members.find(m => m.user._id === debtorId)
//       }))
//       .filter(debtor => debtor.member); // Filter out undefined members

//     // Get all creditors (people who are owed money)
//     const creditors = balanceEntries
//       .filter(([_, balance]) => balance.netBalance > 0)
//       .map(([creditorId, creditorBalance]) => ({
//         id: creditorId,
//         balance: creditorBalance,
//         member: room.members.find(m => m.user._id === creditorId)
//       }))
//       .filter(creditor => creditor.member); // Filter out undefined members

//     // Generate settlement pairs
//     debtors.forEach(debtor => {
//       creditors.forEach(creditor => {
//         if (debtor.id !== creditor.id) {
//           const amount = Math.min(
//             Math.abs(debtor.balance.netBalance),
//             creditor.balance.netBalance
//           );

//           if (amount > 0) {
//             suggestions.push({
//               debtor,
//               creditor,
//               amount
//             });
//           }
//         }
//       });
//     });

//     return suggestions;
//   };

//   const settlementSuggestions = generateSettlementSuggestions();

//   return (
//     <div className="p-6">
//       <div className="space-y-6">
//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {balanceEntries.map(([userId, balance]) => {
//             const member = room.members.find(m => m.user._id === userId);
            
//             // Skip if member not found
//             if (!member) return null;

//             return (
//               <div
//                 key={userId}
//                 className={`p-4 rounded-xl border ${
//                   balance.netBalance > 0
//                     ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
//                     : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
//                 }`}
//               >
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
//                       {getMemberAvatar(userId)}
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900">{member.user.name}</h4>
//                       <p className="text-xs text-gray-600">{member.user.email}</p>
//                     </div>
//                   </div>
//                   {balance.netBalance < 0 && (
//                     <button
//                       onClick={() => onSendReminder(userId, member.user.name)}
//                       className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
//                       title="Send Reminder"
//                     >
//                       <Bell size={16} />
//                     </button>
//                   )}
//                 </div>
                
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-600">Paid</span>
//                     <span className="font-semibold text-green-600">
//                       {formatAmount(balance.totalPaid)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-600">Owes</span>
//                     <span className="font-semibold text-red-600">
//                       {formatAmount(balance.totalOwed)}
//                     </span>
//                   </div>
//                   <div className="border-t pt-2">
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm font-medium text-gray-700">Net Balance</span>
//                       <span className={`font-bold text-lg ${
//                         balance.netBalance > 0 ? 'text-green-600' : 'text-red-600'
//                       }`}>
//                         {balance.netBalance > 0 ? '+' : ''}{formatAmount(balance.netBalance)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Settlement Suggestions - Only show if there are suggestions */}
//         {settlementSuggestions.length > 0 && (
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <ArrowUpRight className="h-5 w-5 text-blue-600" />
//               Settlement Suggestions
//             </h3>
//             <div className="space-y-3">
//               {settlementSuggestions.map((suggestion, index) => (
//                 <div
//                   key={`${suggestion.debtor.id}-${suggestion.creditor.id}-${index}`}
//                   className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className="flex items-center space-x-2">
//                       <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-semibold">
//                         {suggestion.debtor.member.user.name.charAt(0)}
//                       </div>
//                       <span className="font-medium text-gray-900">
//                         {suggestion.debtor.member.user.name}
//                       </span>
//                     </div>
//                     <ArrowDownLeft className="h-4 w-4 text-gray-400" />
//                     <div className="flex items-center space-x-2">
//                       <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-semibold">
//                         {suggestion.creditor.member.user.name.charAt(0)}
//                       </div>
//                       <span className="font-medium text-gray-900">
//                         {suggestion.creditor.member.user.name}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-semibold text-gray-900">
//                       {formatAmount(suggestion.amount)}
//                     </div>
//                     <button
//                       onClick={() => onSendReminder(suggestion.debtor.id, suggestion.debtor.member.user.name)}
//                       className="text-xs text-blue-500 hover:text-blue-600 mt-1"
//                     >
//                       Send Reminder
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Show message when no settlement suggestions but there are balances */}
//         {balanceEntries.length > 0 && settlementSuggestions.length === 0 && (
//           <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
//             <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
//               <ArrowUpRight className="h-5 w-5 text-yellow-600" />
//               Balance Information
//             </h3>
//             <p className="text-gray-600">
//               {room.members.length === 1 
//                 ? "Add more members to see settlement suggestions."
//                 : "All balances are settled between members."
//               }
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BalanceSummary;

import React from 'react';
import { IndianRupee, ArrowUpRight, ArrowDownLeft, Bell } from 'lucide-react';

const BalanceSummary = ({ balances, room, onSendReminder }) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getMemberName = (userId) => {
    const member = room.members.find(m => m.user._id === userId);
    return member ? member.user.name : 'Unknown User';
  };

  const getMemberAvatar = (userId) => {
    const member = room.members.find(m => m.user._id === userId);
    return member ? member.user.name.charAt(0).toUpperCase() : 'U';
  };

  const balanceEntries = Object.entries(balances).filter(([userId, balance]) => 
    balance.netBalance !== 0
  );

  if (balanceEntries.length === 0) {
    return (
      <div className="p-4 sm:p-8 text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">All settled up! 🎉</h3>
        <p className="text-gray-600 text-sm sm:text-base">No outstanding balances between roommates.</p>
      </div>
    );
  }

  // Generate settlement suggestions safely
  const generateSettlementSuggestions = () => {
    const suggestions = [];
    
    // Get all debtors (people who owe money)
    const debtors = balanceEntries
      .filter(([_, balance]) => balance.netBalance < 0)
      .map(([debtorId, debtorBalance]) => ({
        id: debtorId,
        balance: debtorBalance,
        member: room.members.find(m => m.user._id === debtorId)
      }))
      .filter(debtor => debtor.member); // Filter out undefined members

    // Get all creditors (people who are owed money)
    const creditors = balanceEntries
      .filter(([_, balance]) => balance.netBalance > 0)
      .map(([creditorId, creditorBalance]) => ({
        id: creditorId,
        balance: creditorBalance,
        member: room.members.find(m => m.user._id === creditorId)
      }))
      .filter(creditor => creditor.member); // Filter out undefined members

    // Generate settlement pairs
    debtors.forEach(debtor => {
      creditors.forEach(creditor => {
        if (debtor.id !== creditor.id) {
          const amount = Math.min(
            Math.abs(debtor.balance.netBalance),
            creditor.balance.netBalance
          );

          if (amount > 0) {
            suggestions.push({
              debtor,
              creditor,
              amount
            });
          }
        }
      });
    });

    return suggestions;
  };

  const settlementSuggestions = generateSettlementSuggestions();

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {balanceEntries.map(([userId, balance]) => {
            const member = room.members.find(m => m.user._id === userId);
            
            // Skip if member not found
            if (!member) return null;

            return (
              <div
                key={userId}
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${
                  balance.netBalance > 0
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                    : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
                      {getMemberAvatar(userId)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        {member.user.name}
                      </h4>
                      <p className="text-gray-600 text-xs truncate">
                        {member.user.email}
                      </p>
                    </div>
                  </div>
                  {balance.netBalance < 0 && (
                    <button
                      onClick={() => onSendReminder(userId, member.user.name)}
                      className="p-1.5 sm:p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0 ml-2"
                      title="Send Reminder"
                    >
                      <Bell size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
                
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-xs sm:text-sm">Paid</span>
                    <span className="font-semibold text-green-600 text-sm sm:text-base">
                      {formatAmount(balance.totalPaid)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-xs sm:text-sm">Owes</span>
                    <span className="font-semibold text-red-600 text-sm sm:text-base">
                      {formatAmount(balance.totalOwed)}
                    </span>
                  </div>
                  <div className="border-t pt-1.5 sm:pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 text-xs sm:text-sm">Net Balance</span>
                      <span className={`font-bold text-base sm:text-lg ${
                        balance.netBalance > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {balance.netBalance > 0 ? '+' : ''}{formatAmount(balance.netBalance)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Settlement Suggestions - Only show if there are suggestions */}
        {settlementSuggestions.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Settlement Suggestions
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {settlementSuggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.debtor.id}-${suggestion.creditor.id}-${index}`}
                  className="flex items-center justify-between p-2 sm:p-3 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xs sm:text-sm font-semibold flex-shrink-0">
                        {suggestion.debtor.member.user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                        {suggestion.debtor.member.user.name}
                      </span>
                    </div>
                    <ArrowDownLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs sm:text-sm font-semibold flex-shrink-0">
                        {suggestion.creditor.member.user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                        {suggestion.creditor.member.user.name}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2 sm:ml-3">
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">
                      {formatAmount(suggestion.amount)}
                    </div>
                    <button
                      onClick={() => onSendReminder(suggestion.debtor.id, suggestion.debtor.member.user.name)}
                      className="text-blue-500 hover:text-blue-600 mt-0.5 sm:mt-1 text-xs"
                    >
                      Send Reminder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show message when no settlement suggestions but there are balances */}
        {balanceEntries.length > 0 && settlementSuggestions.length === 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-yellow-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
              Balance Information
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {room.members.length === 1 
                ? "Add more members to see settlement suggestions."
                : "All balances are settled between members."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceSummary;


// import React from 'react';
// import ExpenseList from '../ExpenseList';
// import BalanceSummary from '../BalanceSummary';
// import MembersList from './MembersList';

// const RoomContent = ({
//   activeTab,
//   expenses,
//   balances,
//   room,
//   currentUser,
//   onEditExpense,
//   onUpdateExpense,
//   onDeleteExpense,
//   onSendReminder,
//   onRemoveMember,
//   onTransferOwnership,
//   onAddMember, // Add this prop
//   editingExpense
// }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//       {activeTab === 'expenses' && (
//         <ExpenseList 
//           expenses={expenses} 
//           onEditExpense={onEditExpense}
//           onUpdateExpense={onUpdateExpense}
//           onDeleteExpense={onDeleteExpense}
//           editingExpense={editingExpense}
//           currentUser={currentUser}
//         />
//       )}
      
//       {activeTab === 'balances' && (
//         <BalanceSummary 
//           balances={balances} 
//           room={room} 
//           onSendReminder={onSendReminder}
//         />
//       )}
      
//       {activeTab === 'members' && (
//         <MembersList
//           room={room}
//           currentUser={currentUser}
//           onSendReminder={onSendReminder}
//           onRemoveMember={onRemoveMember}
//           onTransferOwnership={onTransferOwnership}
//           onAddMember={onAddMember} // Pass the function to MembersList
//         />
//       )}
//     </div>
//   );
// };

// export default RoomContent;

import React from 'react';
import ExpenseList from '../ExpenseList';
import BalanceSummary from '../BalanceSummary';
import MembersList from './MembersList';

const RoomContent = ({
  activeTab,
  expenses,
  balances,
  room,
  currentUser,
  onEditExpense,
  onUpdateExpense,
  onDeleteExpense,
  onSendReminder,
  onRemoveMember,
  onTransferOwnership,
  onAddMember,
  editingExpense
}) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden mx-2 sm:mx-0">
      {activeTab === 'expenses' && (
        <ExpenseList 
          expenses={expenses} 
          onEditExpense={onEditExpense}
          onUpdateExpense={onUpdateExpense}
          onDeleteExpense={onDeleteExpense}
          editingExpense={editingExpense}
          currentUser={currentUser}
        />
      )}
      
      {activeTab === 'balances' && (
        <BalanceSummary 
          balances={balances} 
          room={room} 
          onSendReminder={onSendReminder}
        />
      )}
      
      {activeTab === 'members' && (
        <MembersList
          room={room}
          currentUser={currentUser}
          onSendReminder={onSendReminder}
          onRemoveMember={onRemoveMember}
          onTransferOwnership={onTransferOwnership}
          onAddMember={onAddMember}
        />
      )}
    </div>
  );
};

export default RoomContent;
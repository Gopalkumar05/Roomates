// import React, { useState } from 'react';
// import { Crown, Bell, Trash2, UserPlus } from 'lucide-react';

// const MembersList = ({ 
//   room, 
//   currentUser, 
//   onSendReminder, 
//   onRemoveMember, 
//   onTransferOwnership,
//   onAddMember 
// }) => {
//   const [showAddMember, setShowAddMember] = useState(false);
//   const [newMemberEmail, setNewMemberEmail] = useState('');

//   const isRoomCreator = room && currentUser && room.createdBy._id === currentUser.userId;

//   const handleAddMember = async () => {
//     if (!newMemberEmail.trim()) return;
    
//     const success = await onAddMember(newMemberEmail);
//     if (success) {
//       setNewMemberEmail('');
//       setShowAddMember(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="font-semibold text-xl text-gray-900">Room Members</h3>
//           <p className="text-gray-600 text-sm mt-1">
//             {room.members.length} member{room.members.length !== 1 ? 's' : ''} in this room
//           </p>
//         </div>
//         {isRoomCreator && (
//           <button
//             onClick={() => setShowAddMember(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             <UserPlus size={16} />
//             Add Member
//           </button>
//         )}
//       </div>

//       {/* Add Member Form */}
//       {showAddMember && (
//         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
//           <h4 className="font-semibold mb-3 text-blue-900">Add New Member</h4>
//           <div className="flex gap-2">
//             <input
//               type="email"
//               value={newMemberEmail}
//               onChange={(e) => setNewMemberEmail(e.target.value)}
//               placeholder="Enter email address"
//               className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//             />
//             <button
//               onClick={handleAddMember}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Add
//             </button>
//             <button
//               onClick={() => setShowAddMember(false)}
//               className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Members Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {room.members.map((member) => (
//           <MemberCard
//             key={member.user._id}
//             member={member}
//             roomCreatorId={room.createdBy._id}
//             currentUserId={currentUser?.userId}
//             isRoomCreator={isRoomCreator}
//             onSendReminder={onSendReminder}
//             onRemoveMember={onRemoveMember}
//             onTransferOwnership={onTransferOwnership}
//           />
//         ))}
//       </div>

//       {room.members.length === 0 && (
//         <div className="text-center py-12">
//           <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//             <UserPlus className="h-8 w-8 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">No Members Yet</h3>
//           <p className="text-gray-600 mb-4">Add members to start sharing expenses</p>
//           {isRoomCreator && (
//             <button
//               onClick={() => setShowAddMember(true)}
//               className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Add Your First Member
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // Individual Member Card Component
// const MemberCard = ({ 
//   member, 
//   roomCreatorId, 
//   currentUserId, 
//   isRoomCreator, 
//   onSendReminder, 
//   onRemoveMember, 
//   onTransferOwnership 
// }) => {
//   const isCurrentUser = member.user._id === currentUserId;
//   const isCreator = member.user._id === roomCreatorId;

//   return (
//     <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
//       isCurrentUser 
//         ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm' 
//         : 'bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200 hover:shadow-md'
//     }`}>
//       {/* Avatar */}
//       <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-lg ${
//         isCreator 
//           ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
//           : 'bg-gradient-to-r from-blue-500 to-indigo-600'
//       }`}>
//         {member.user.name.charAt(0).toUpperCase()}
//       </div>

//       {/* Member Info */}
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center gap-2 mb-1">
//           <p className="font-semibold text-gray-900 truncate">
//             {member.user.name}
//             {isCurrentUser && (
//               <span className="text-blue-600 text-sm ml-2">(You)</span>
//             )}
//           </p>
//           {isCreator && (
//             <Crown className="h-4 w-4 text-yellow-500 flex-shrink-0" />
//           )}
//         </div>
//         <p className="text-sm text-gray-600 truncate">{member.user.email}</p>
//         {isCreator && (
//           <p className="text-xs text-yellow-600 font-medium mt-1">Room Creator</p>
//         )}
//       </div>

//       {/* Action Buttons */}
//       {isRoomCreator && !isCurrentUser && (
//         <div className="flex gap-1">
//           <button
//             onClick={() => onSendReminder(member.user._id, member.user.name)}
//             className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//             title="Send Reminder"
//           >
//             <Bell size={16} />
//           </button>
//           <button
//             onClick={() => onTransferOwnership(member.user._id)}
//             className="p-2 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
//             title="Transfer Ownership"
//           >
//             <Crown size={16} />
//           </button>
//           <button
//             onClick={() => onRemoveMember(member.user._id)}
//             className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//             title="Remove Member"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       )}

//       {/* Current User Actions */}
//       {isCurrentUser && !isCreator && (
//         <div className="text-xs">
//           <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
//             Member
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MembersList;


// import React, { useState } from 'react';
// import { Crown, Bell, Trash2, UserPlus } from 'lucide-react';

// const MembersList = ({ 
//   room, 
//   currentUser, 
//   onSendReminder, 
//   onRemoveMember, 
//   onTransferOwnership,
//   onAddMember // Make sure this prop is defined
// }) => {
//   const [showAddMember, setShowAddMember] = useState(false);
//   const [newMemberEmail, setNewMemberEmail] = useState('');

//   const isRoomCreator = room && currentUser && room.createdBy._id === currentUser.userId;

//   const handleAddMember = async () => {
//     if (!newMemberEmail.trim()) return;
    
//     // Check if onAddMember is provided and is a function
//     if (onAddMember && typeof onAddMember === 'function') {
//       const success = await onAddMember(newMemberEmail);
//       if (success) {
//         setNewMemberEmail('');
//         setShowAddMember(false);
//       }
//     } else {
//       console.error('onAddMember is not a function');
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="font-semibold text-xl text-gray-900">Room Members</h3>
//           <p className="text-gray-600 text-sm mt-1">
//             {room.members.length} member{room.members.length !== 1 ? 's' : ''} in this room
//           </p>
//         </div>
//         {isRoomCreator && (
//           <button
//             onClick={() => setShowAddMember(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             <UserPlus size={16} />
//             Add Member
//           </button>
//         )}
//       </div>

//       {/* Add Member Form */}
//       {showAddMember && (
//         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
//           <h4 className="font-semibold mb-3 text-blue-900">Add New Member</h4>
//           <div className="flex gap-2">
//             <input
//               type="email"
//               value={newMemberEmail}
//               onChange={(e) => setNewMemberEmail(e.target.value)}
//               placeholder="Enter email address"
//               className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//             />
//             <button
//               onClick={handleAddMember}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Add
//             </button>
//             <button
//               onClick={() => setShowAddMember(false)}
//               className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Members Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {room.members.map((member) => (
//           <MemberCard
//             key={member.user._id}
//             member={member}
//             roomCreatorId={room.createdBy._id}
//             currentUserId={currentUser?.userId}
//             isRoomCreator={isRoomCreator}
//             onSendReminder={onSendReminder}
//             onRemoveMember={onRemoveMember}
//             onTransferOwnership={onTransferOwnership}
//           />
//         ))}
//       </div>

//       {room.members.length === 0 && (
//         <div className="text-center py-12">
//           <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//             <UserPlus className="h-8 w-8 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">No Members Yet</h3>
//           <p className="text-gray-600 mb-4">Add members to start sharing expenses</p>
//           {isRoomCreator && (
//             <button
//               onClick={() => setShowAddMember(true)}
//               className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Add Your First Member
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // Individual Member Card Component
// const MemberCard = ({ 
//   member, 
//   roomCreatorId, 
//   currentUserId, 
//   isRoomCreator, 
//   onSendReminder, 
//   onRemoveMember, 
//   onTransferOwnership 
// }) => {
//   const isCurrentUser = member.user._id === currentUserId;
//   const isCreator = member.user._id === roomCreatorId;

//   return (
//     <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
//       isCurrentUser 
//         ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm' 
//         : 'bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200 hover:shadow-md'
//     }`}>
//       {/* Avatar */}
//       <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-lg ${
//         isCreator 
//           ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
//           : 'bg-gradient-to-r from-blue-500 to-indigo-600'
//       }`}>
//         {member.user.name.charAt(0).toUpperCase()}
//       </div>

//       {/* Member Info */}
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center gap-2 mb-1">
//           <p className="font-semibold text-gray-900 truncate">
//             {member.user.name}
//             {isCurrentUser && (
//               <span className="text-blue-600 text-sm ml-2">(You)</span>
//             )}
//           </p>
//           {isCreator && (
//             <Crown className="h-4 w-4 text-yellow-500 flex-shrink-0" />
//           )}
//         </div>
//         <p className="text-sm text-gray-600 truncate">{member.user.email}</p>
//         {isCreator && (
//           <p className="text-xs text-yellow-600 font-medium mt-1">Room Creator</p>
//         )}
//       </div>

//       {/* Action Buttons */}
//       {isRoomCreator && !isCurrentUser && (
//         <div className="flex gap-1">
//           <button
//             onClick={() => onSendReminder(member.user._id, member.user.name)}
//             className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//             title="Send Reminder"
//           >
//             <Bell size={16} />
//           </button>
//           <button
//             onClick={() => onTransferOwnership(member.user._id)}
//             className="p-2 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
//             title="Transfer Ownership"
//           >
//             <Crown size={16} />
//           </button>
//           <button
//             onClick={() => onRemoveMember(member.user._id)}
//             className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//             title="Remove Member"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       )}

//       {/* Current User Actions */}
//       {isCurrentUser && !isCreator && (
//         <div className="text-xs">
//           <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
//             Member
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MembersList;

import React, { useState } from 'react';
import { Crown, Bell, Trash2, UserPlus } from 'lucide-react';

const MembersList = ({ 
  room, 
  currentUser, 
  onSendReminder, 
  onRemoveMember, 
  onTransferOwnership,
  onAddMember
}) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');

  const isRoomCreator = room && currentUser && room.createdBy._id === currentUser.userId;

  const handleAddMember = async () => {
    if (!newMemberEmail.trim()) return;
    
    if (onAddMember && typeof onAddMember === 'function') {
      const success = await onAddMember(newMemberEmail);
      if (success) {
        setNewMemberEmail('');
        setShowAddMember(false);
      }
    } else {
      console.error('onAddMember is not a function');
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg sm:text-xl text-gray-900 truncate">
            Room Members
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {room.members.length} member{room.members.length !== 1 ? 's' : ''} in this room
          </p>
        </div>
        {isRoomCreator && (
          <button
            onClick={() => setShowAddMember(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
          >
            <UserPlus size={16} />
            <span>Add Member</span>
          </button>
        )}
      </div>

      {/* Add Member Form */}
      {showAddMember && (
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-semibold mb-3 text-blue-900">Add New Member</h4>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              placeholder="Enter email address"
              className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddMember}
                className="flex-1 sm:flex-none px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddMember(false)}
                className="flex-1 sm:flex-none px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3">
        {room.members.map((member) => (
          <MemberCard
            key={member.user._id}
            member={member}
            roomCreatorId={room.createdBy._id}
            currentUserId={currentUser?.userId}
            isRoomCreator={isRoomCreator}
            onSendReminder={onSendReminder}
            onRemoveMember={onRemoveMember}
            onTransferOwnership={onTransferOwnership}
          />
        ))}
      </div>

      {/* Empty State */}
      {room.members.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            No Members Yet
          </h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Add members to start sharing expenses
          </p>
          {isRoomCreator && (
            <button
              onClick={() => setShowAddMember(true)}
              className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
            >
              Add Your First Member
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Individual Member Card Component
const MemberCard = ({ 
  member, 
  roomCreatorId, 
  currentUserId, 
  isRoomCreator, 
  onSendReminder, 
  onRemoveMember, 
  onTransferOwnership 
}) => {
  const isCurrentUser = member.user._id === currentUserId;
  const isCreator = member.user._id === roomCreatorId;

  return (
    <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
      isCurrentUser 
        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm' 
        : 'bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200 hover:shadow-md'
    }`}>
      {/* Avatar */}
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-semibold text-base sm:text-lg shadow-lg flex-shrink-0 ${
        isCreator 
          ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
          : 'bg-gradient-to-r from-blue-500 to-indigo-600'
      }`}>
        {member.user.name.charAt(0).toUpperCase()}
      </div>

      {/* Member Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 sm:gap-2 mb-1">
          <p className="font-semibold text-gray-900 truncate text-sm sm:text-base">
            {member.user.name}
            {isCurrentUser && (
              <span className="text-blue-600 text-xs sm:text-sm ml-1 sm:ml-2">(You)</span>
            )}
          </p>
          {isCreator && (
            <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
          )}
        </div>
        <p className="text-xs sm:text-sm text-gray-600 truncate">{member.user.email}</p>
        {isCreator && (
          <p className="text-xs text-yellow-600 font-medium mt-0.5 sm:mt-1">Room Creator</p>
        )}
      </div>

      {/* Action Buttons */}
      {isRoomCreator && !isCurrentUser && (
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => onSendReminder(member.user._id, member.user.name)}
            className="p-1.5 sm:p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Send Reminder"
          >
            <Bell size={14} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => onTransferOwnership(member.user._id)}
            className="p-1.5 sm:p-2 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
            title="Transfer Ownership"
          >
            <Crown size={14} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => onRemoveMember(member.user._id)}
            className="p-1.5 sm:p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove Member"
          >
            <Trash2 size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      )}

      {/* Current User Actions */}
      {isCurrentUser && !isCreator && (
        <div className="text-xs flex-shrink-0">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium text-xs">
            Member
          </span>
        </div>
      )}
    </div>
  );
};

export default MembersList;
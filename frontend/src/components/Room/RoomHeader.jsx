// import React, { useState } from 'react';
// import { Plus, Download, Home, Crown, Edit3, Settings, Trash2, LogOut, UserPlus } from 'lucide-react';

// const RoomHeader = ({ 
//   room, 
//   currentUser, 
//   onUpdateRoom, 
//   onDeleteRoom, 
//   onLeaveRoom, 
//   onAddMember, 
//   onGeneratePDF, 
//   onAddExpense 
// }) => {
//   const [editingRoom, setEditingRoom] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showAddMember, setShowAddMember] = useState(false);
//   const [newMemberEmail, setNewMemberEmail] = useState('');
//   const [editForm, setEditForm] = useState({ 
//     name: room?.name || '', 
//     description: room?.description || '' 
//   });

//   const isRoomCreator = room && currentUser && room.createdBy._id === currentUser.userId;

//   const handleUpdateRoom = async () => {
//     const success = await onUpdateRoom(editForm);
//     if (success) {
//       setEditingRoom(false);
//     }
//   };

//   const handleAddMember = async () => {
//     if (!newMemberEmail.trim()) return;
    
//     const success = await onAddMember(newMemberEmail);
//     if (success) {
//       setNewMemberEmail('');
//       setShowAddMember(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div className="space-y-2 flex-1">
//           {editingRoom ? (
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 value={editForm.name}
//                 onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
//                 className="text-2xl lg:text-3xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
//               />
//               <textarea
//                 value={editForm.description}
//                 onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
//                 className="text-gray-600 bg-transparent border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none w-full resize-none"
//                 rows="2"
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleUpdateRoom}
//                   className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditingRoom(false)}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Home className="h-6 w-6 text-white" />
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2">
//                   <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{room.name}</h1>
//                   {isRoomCreator && <Crown className="h-5 w-5 text-yellow-500" />}
//                 </div>
//                 <p className="text-gray-600">{room.description}</p>
//               </div>
//             </div>
//           )}
//         </div>
        
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex gap-2">
//             {isRoomCreator && !editingRoom && (
//               <button
//                 onClick={() => setEditingRoom(true)}
//                 className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
//               >
//                 <Edit3 size={16} />
//                 Edit
//               </button>
//             )}
//             <button
//               onClick={() => setShowSettings(!showSettings)}
//               className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
//             >
//               <Settings size={16} />
//               Settings
//             </button>
//           </div>
//           <button
//             onClick={onGeneratePDF}
//             className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
//           >
//             <Download size={20} />
//             Export PDF
//           </button>
//           <button
//             onClick={onAddExpense}
//             className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25"
//           >
//             <Plus size={20} />
//             Add Expense
//           </button>
//         </div>
//       </div>

//       {showSettings && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//           <div className="flex flex-col sm:flex-row gap-3">
//             {isRoomCreator ? (
//               <>
//                 <button
//                   onClick={onDeleteRoom}
//                   className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                   <Trash2 size={16} />
//                   Delete Room
//                 </button>
//                 <button
//                   onClick={() => setShowAddMember(true)}
//                   className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//                 >
//                   <UserPlus size={16} />
//                   Add Member
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={onLeaveRoom}
//                 className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//               >
//                 <LogOut size={16} />
//                 Leave Room
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {showAddMember && (
//         <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-lg">
//           <h3 className="font-semibold mb-3">Add New Member</h3>
//           <div className="flex gap-2">
//             <input
//               type="email"
//               value={newMemberEmail}
//               onChange={(e) => setNewMemberEmail(e.target.value)}
//               placeholder="Enter email address"
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
//     </div>
//   );
// };

// export default RoomHeader;




// import React, { useState } from 'react';
// import { Plus, Download, Home, Crown, Edit3, Settings, Trash2, LogOut, UserPlus, MessageSquare } from 'lucide-react';

// const RoomHeader = ({ 
//   room, 
//   currentUser, 
//   onUpdateRoom, 
//   onDeleteRoom, 
//   onLeaveRoom, 
//   onAddMember, 
//   onGeneratePDF, 
//   onAddExpense,
//   onToggleChat,
//   showChat,
//   reminderCount
// }) => {
//   const [editingRoom, setEditingRoom] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showAddMember, setShowAddMember] = useState(false);
//   const [newMemberEmail, setNewMemberEmail] = useState('');
//   const [editForm, setEditForm] = useState({ 
//     name: room?.name || '', 
//     description: room?.description || '' 
//   });

//   const isRoomCreator = room && currentUser && room.createdBy._id === currentUser.userId;

//   const handleUpdateRoom = async () => {
//     const success = await onUpdateRoom(editForm);
//     if (success) {
//       setEditingRoom(false);
//     }
//   };

//   const handleAddMember = async () => {
//     if (!newMemberEmail.trim()) return;
    
//     const success = await onAddMember(newMemberEmail);
//     if (success) {
//       setNewMemberEmail('');
//       setShowAddMember(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div className="space-y-2 flex-1">
//           {editingRoom ? (
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 value={editForm.name}
//                 onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
//                 className="text-2xl lg:text-3xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
//               />
//               <textarea
//                 value={editForm.description}
//                 onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
//                 className="text-gray-600 bg-transparent border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none w-full resize-none"
//                 rows="2"
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleUpdateRoom}
//                   className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditingRoom(false)}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Home className="h-6 w-6 text-white" />
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2">
//                   <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{room.name}</h1>
//                   {isRoomCreator && <Crown className="h-5 w-5 text-yellow-500" />}
//                 </div>
//                 <p className="text-gray-600">{room.description}</p>
//               </div>
//             </div>
//           )}
//         </div>
        
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex gap-2">
//             {isRoomCreator && !editingRoom && (
//               <button
//                 onClick={() => setEditingRoom(true)}
//                 className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
//               >
//                 <Edit3 size={16} />
//                 Edit
//               </button>
//             )}
//             <button
//               onClick={() => setShowSettings(!showSettings)}
//               className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
//             >
//               <Settings size={16} />
//               Settings
//             </button>
//             <button
//               onClick={onToggleChat}
//               className={`flex items-center gap-2 px-4 py-3 border rounded-xl transition-all duration-200 ${
//                 showChat
//                   ? 'bg-blue-500 text-white border-blue-500'
//                   : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <MessageSquare size={16} />
//               Messages
//               {reminderCount > 0 && (
//                 <span className={`px-2 py-1 rounded-full text-xs ${
//                   showChat ? 'bg-white/20 text-white' : 'bg-blue-500 text-white'
//                 }`}>
//                   {reminderCount}
//                 </span>
//               )}
//             </button>
//           </div>
//           <button
//             onClick={onGeneratePDF}
//             className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
//           >
//             <Download size={20} />
//             Export PDF
//           </button>
//           <button
//             onClick={onAddExpense}
//             className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25"
//           >
//             <Plus size={20} />
//             Add Expense
//           </button>
//         </div>
//       </div>

//       {/* Rest of the component remains the same */}
//       {showSettings && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//           <div className="flex flex-col sm:flex-row gap-3">
//             {isRoomCreator ? (
//               <>
//                 <button
//                   onClick={onDeleteRoom}
//                   className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                   <Trash2 size={16} />
//                   Delete Room
//                 </button>
//                 <button
//                   onClick={() => setShowAddMember(true)}
//                   className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//                 >
//                   <UserPlus size={16} />
//                   Add Member
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={onLeaveRoom}
//                 className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//               >
//                 <LogOut size={16} />
//                 Leave Room
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {showAddMember && (
//         <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-lg">
//           <h3 className="font-semibold mb-3">Add New Member</h3>
//           <div className="flex gap-2">
//             <input
//               type="email"
//               value={newMemberEmail}
//               onChange={(e) => setNewMemberEmail(e.target.value)}
//               placeholder="Enter email address"
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
//     </div>
//   );
// };

// export default RoomHeader;

import React, { useState } from 'react';
import { Plus, Download, Home, Crown, Edit3, Settings, Trash2, LogOut, UserPlus, MessageSquare } from 'lucide-react';

const RoomHeader = ({ 
  room, 
  currentUser, 
  onUpdateRoom, 
  onDeleteRoom, 
  onLeaveRoom, 
  onAddMember, 
  onGeneratePDF, 
  onAddExpense,
  onToggleChat,
  showChat,
  reminderCount
}) => {
  const [editingRoom, setEditingRoom] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [editForm, setEditForm] = useState({ 
    name: room?.name || '', 
    description: room?.description || '' 
  });

  const isRoomCreator = room && currentUser && room.createdBy._id === currentUser.userId;

  const handleUpdateRoom = async () => {
    const success = await onUpdateRoom(editForm);
    if (success) {
      setEditingRoom(false);
    }
  };

  const handleAddMember = async () => {
    if (!newMemberEmail.trim()) return;
    
    const success = await onAddMember(newMemberEmail);
    if (success) {
      setNewMemberEmail('');
      setShowAddMember(false);
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100 mx-2 sm:mx-0">
      {/* Main Header Content */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Room Info Section */}
        <div className="space-y-2 flex-1 min-w-0">
          {editingRoom ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full py-1"
                placeholder="Room name"
              />
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="text-gray-600 bg-transparent border border-gray-300 rounded-lg p-2 sm:p-3 focus:border-blue-500 focus:outline-none w-full resize-none text-sm sm:text-base"
                rows="2"
                placeholder="Room description"
              />
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleUpdateRoom}
                  className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingRoom(false)}
                  className="px-3 sm:px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Home className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                    {room.name}
                  </h1>
                  {isRoomCreator && <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0" />}
                </div>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                  {room.description}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Buttons Section */}
        <div className="flex flex-col xs:flex-row sm:flex-col lg:flex-row gap-2 sm:gap-3">
          {/* Primary Action Buttons */}
          <div className="flex gap-2 order-2 xs:order-1 sm:order-2 lg:order-1">
            <button
              onClick={onGeneratePDF}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium text-sm sm:text-base flex-1 xs:flex-none"
            >
              <Download size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Export PDF</span>
            </button>
            <button
              onClick={onAddExpense}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25 flex-1 xs:flex-none text-sm sm:text-base"
            >
              <Plus size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Add Expense</span>
            </button>
          </div>

          {/* Secondary Action Buttons */}
          <div className="flex gap-2 order-1 xs:order-2 sm:order-1 lg:order-2">
            {isRoomCreator && !editingRoom && (
              <button
                onClick={() => setEditingRoom(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base flex-1 xs:flex-none justify-center"
              >
                <Edit3 size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Edit</span>
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base flex-1 xs:flex-none justify-center"
            >
              <Settings size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Settings</span>
            </button>
            <button
              onClick={onToggleChat}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base flex-1 xs:flex-none justify-center ${
                showChat
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MessageSquare size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Messages</span>
              {reminderCount > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  showChat ? 'bg-white/20 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {reminderCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Dropdown */}
      {showSettings && (
        <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
            {isRoomCreator ? (
              <>
                <button
                  onClick={onDeleteRoom}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base flex-1 xs:flex-none"
                >
                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  Delete Room
                </button>
                <button
                  onClick={() => setShowAddMember(true)}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base flex-1 xs:flex-none"
                >
                  <UserPlus size={14} className="sm:w-4 sm:h-4" />
                  Add Member
                </button>
              </>
            ) : (
              <button
                onClick={onLeaveRoom}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
              >
                <LogOut size={14} className="sm:w-4 sm:h-4" />
                Leave Room
              </button>
            )}
          </div>
        </div>
      )}

      {/* Add Member Form */}
      {showAddMember && (
        <div className="mt-4 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-lg">
          <h3 className="font-semibold mb-3 text-sm sm:text-base">Add New Member</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              placeholder="Enter email address"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddMember}
                className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base flex-1"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddMember(false)}
                className="px-3 sm:px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomHeader;
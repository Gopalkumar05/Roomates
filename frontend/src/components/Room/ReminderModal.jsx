// import React from 'react';
// import { Bell, Send, X } from 'lucide-react';

// const ReminderModal = ({ 
//   isOpen, 
//   onClose, 
//   onSendReminder, 
//   memberName, 
//   roomName, 
//   message, 
//   onMessageChange 
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Bell className="h-5 w-5 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Send Reminder</h2>
//                 <p className="text-sm text-gray-600">
//                   Send reminder to {memberName || 'member'}
//                 </p>
//               </div>
//             </div>
//             <button 
//               onClick={onClose}
//               className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200"
//             >
//               <X size={20} className="text-gray-500" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-4">
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               Message to {memberName}
//             </label>
//             <textarea
//               value={message}
//               onChange={(e) => onMessageChange(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
//               rows="4"
//               placeholder={`Hi! Just a friendly reminder about pending expenses in ${roomName}. Please check the app for details.`}
//             />
//             <p className="text-xs text-gray-500">
//               This message will be sent via email to {memberName}
//             </p>
//           </div>
          
//           <div className="flex gap-3 pt-2">
//             <button
//               onClick={onClose}
//               className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all duration-200"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onSendReminder}
//               disabled={!message.trim()}
//               className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               <Send size={16} />
//               Send Reminder
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReminderModal;

import React from 'react';
import { Bell, Send, X } from 'lucide-react';

const ReminderModal = ({ 
  isOpen, 
  onClose, 
  onSendReminder, 
  memberName, 
  roomName, 
  message, 
  onMessageChange 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200">
          <div className="flex items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  Send Reminder
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  Send reminder to {memberName || 'member'}
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

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Message to <span className="text-blue-600">{memberName}</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-sm sm:text-base"
              rows="4"
              placeholder={`Hi! Just a friendly reminder about pending expenses in ${roomName}. Please check the app for details.`}
            />
            <p className="text-xs text-gray-500">
              This message will be sent via email to {memberName}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 font-medium transition-all duration-200 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={onSendReminder}
              disabled={!message.trim()}
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-indigo-700 font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Send size={14} className="sm:w-4 sm:h-4" />
              Send Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
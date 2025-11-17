// import React from 'react';
// import { AlertTriangle } from 'lucide-react';

// const ConfirmationModal = ({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   title, 
//   message, 
//   confirmText = "Confirm", 
//   cancelText = "Cancel",
//   type = "danger" 
// }) => {
//   if (!isOpen) return null;

//   const buttonColor = type === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600';

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
//         <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-5 border-b border-gray-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
//               <AlertTriangle className="h-5 w-5 text-white" />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-900">{title}</h2>
//               <p className="text-sm text-gray-600">This action cannot be undone</p>
//             </div>
//           </div>
//         </div>

//         <div className="p-6">
//           <p className="text-gray-700 mb-6">{message}</p>
          
//           <div className="flex gap-3">
//             <button
//               onClick={onClose}
//               className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all duration-200"
//             >
//               {cancelText}
//             </button>
//             <button
//               onClick={onConfirm}
//               className={`flex-1 px-6 py-3 ${buttonColor} text-white rounded-xl font-medium shadow-lg transition-all duration-200 flex items-center justify-center gap-2`}
//             >
//               <AlertTriangle size={16} />
//               {confirmText}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationModal;


import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "danger" 
}) => {
  if (!isOpen) return null;

  const buttonColor = type === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 mx-2 sm:mx-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200">
          <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                This action cannot be undone
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
            {message}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 font-medium transition-all duration-200 text-sm sm:text-base order-2 xs:order-1"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 ${buttonColor} text-white rounded-lg sm:rounded-xl font-medium shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base order-1 xs:order-2`}
            >
              <AlertTriangle size={14} className="sm:w-4 sm:h-4" />
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
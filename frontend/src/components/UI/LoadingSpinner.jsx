// import React from 'react';

// const LoadingSpinner = ({ message = "Loading..." }) => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
//       <div className="text-center space-y-4">
//         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//         <div className="space-y-2">
//           <p className="text-gray-700 font-medium">{message}</p>
//           <p className="text-gray-500 text-sm">Getting everything ready for you</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadingSpinner;

import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="text-center space-y-3 sm:space-y-4 max-w-xs sm:max-w-sm mx-auto">
        {/* Spinner */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        
        {/* Text Content */}
        <div className="space-y-1.5 sm:space-y-2">
          <p className="text-gray-700 font-medium text-sm sm:text-base">
            {message}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
            Getting everything ready for you
          </p>
        </div>

        {/* Optional: Loading dots animation */}
        <div className="flex justify-center space-x-1 pt-1">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
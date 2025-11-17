// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Home, AlertCircle } from 'lucide-react';

// const NotFound = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
//       <div className="max-w-md w-full text-center">
//         <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
//           <AlertCircle className="text-red-600 dark:text-red-400" size={32} />
//         </div>
        
//         <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
//         <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
//           Page Not Found
//         </h2>
        
//         <p className="text-gray-500 dark:text-gray-400 mb-8">
//           The page you're looking for doesn't exist or has been moved.
//         </p>
        
//         <Link
//           to="/"
//           className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
//         >
//           <Home size={20} />
//           <span>Back to Dashboard</span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default NotFound;


// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <AlertCircle className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 font-medium shadow-lg shadow-blue-500/25 transition-all duration-200"
        >
          <Home size={20} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
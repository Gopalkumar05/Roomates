

// import React, { useState } from 'react';
// import { X, Users, Plus, Minus, Home, Mail } from 'lucide-react';
// import axios from 'axios';

// const CreateRoomModal = ({ onClose, onRoomCreated }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     memberEmails: ['']
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (!formData.name.trim()) {
//       setError('Room name is required');
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No authentication token found. Please login again.');
//         setLoading(false);
//         return;
//       }

//       const response = await axios.post('http://localhost:5000/api/rooms', {
//         name: formData.name.trim(),
//         description: formData.description.trim(),
//         memberEmails: formData.memberEmails.filter(email => email.trim() !== '')
//       }, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       onRoomCreated();
//       onClose();
//     } catch (error) {
//       console.error('Error creating room:', error);
      
//       if (error.response) {
//         setError(error.response.data.error || `Error: ${error.response.status}`);
//       } else if (error.request) {
//         setError('No response from server. Please check if the server is running.');
//       } else {
//         setError('Failed to create room. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addMemberField = () => {
//     setFormData({
//       ...formData,
//       memberEmails: [...formData.memberEmails, '']
//     });
//   };

//   const removeMemberField = (index) => {
//     const newEmails = formData.memberEmails.filter((_, i) => i !== index);
//     setFormData({ ...formData, memberEmails: newEmails });
//   };

//   const updateMemberEmail = (index, email) => {
//     const newEmails = [...formData.memberEmails];
//     newEmails[index] = email;
//     setFormData({ ...formData, memberEmails: newEmails });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden border border-gray-200">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Home className="h-5 w-5 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Create New Room</h2>
//                 <p className="text-sm text-gray-600">Start managing shared expenses</p>
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

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
//               {error}
//             </div>
//           )}

//           {/* Room Name */}
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               Room Name *
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Home size={18} className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                 placeholder="e.g., Apartment 4B, PG House"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               Description
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
//               rows="3"
//               placeholder="Brief description of your shared space..."
//             />
//           </div>

//           {/* Roommates */}
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <label className="block text-sm font-semibold text-gray-700">
//                 Add Roommates
//               </label>
//               <button
//                 type="button"
//                 onClick={addMemberField}
//                 className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
//               >
//                 <Plus size={16} />
//                 Add More
//               </button>
//             </div>
            
//             <div className="space-y-3">
//               {formData.memberEmails.map((email, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <div className="flex-1 relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail size={16} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => updateMemberEmail(index, e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                       placeholder="roommate@email.com"
//                     />
//                   </div>
//                   {formData.memberEmails.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeMemberField(index)}
//                       className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
//                     >
//                       <Minus size={16} />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <p className="text-sm text-gray-500">
//               Enter email addresses to invite roommates (optional)
//             </p>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={loading}
//               className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all duration-200 disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading || !formData.name.trim()}
//               className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   Creating...
//                 </div>
//               ) : (
//                 'Create Room'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateRoomModal;

// import React, { useState } from 'react';
// import { X, Users, Plus, Minus, Home, Mail, Settings, Trash2, LogOut, Crown } from 'lucide-react';
// import axios from 'axios';

// const CreateRoomModal = ({ onClose, onRoomCreated }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     memberEmails: ['']
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (!formData.name.trim()) {
//       setError('Room name is required');
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No authentication token found. Please login again.');
//         setLoading(false);
//         return;
//       }

//       const response = await axios.post('http://localhost:5000/api/rooms', {
//         name: formData.name.trim(),
//         description: formData.description.trim(),
//         memberEmails: formData.memberEmails.filter(email => email.trim() !== '')
//       }, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       onRoomCreated();
//       onClose();
//     } catch (error) {
//       console.error('Error creating room:', error);
      
//       if (error.response) {
//         setError(error.response.data.error || `Error: ${error.response.status}`);
//       } else if (error.request) {
//         setError('No response from server. Please check if the server is running.');
//       } else {
//         setError('Failed to create room. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addMemberField = () => {
//     setFormData({
//       ...formData,
//       memberEmails: [...formData.memberEmails, '']
//     });
//   };

//   const removeMemberField = (index) => {
//     const newEmails = formData.memberEmails.filter((_, i) => i !== index);
//     setFormData({ ...formData, memberEmails: newEmails });
//   };

//   const updateMemberEmail = (index, email) => {
//     const newEmails = [...formData.memberEmails];
//     newEmails[index] = email;
//     setFormData({ ...formData, memberEmails: newEmails });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden border border-gray-200">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Home className="h-5 w-5 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Create New Room</h2>
//                 <p className="text-sm text-gray-600">Start managing shared expenses</p>
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

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
//               {error}
//             </div>
//           )}

//           {/* Room Name */}
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               Room Name *
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Home size={18} className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                 placeholder="e.g., Apartment 4B, PG House"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               Description
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
//               rows="3"
//               placeholder="Brief description of your shared space..."
//             />
//           </div>

//           {/* Roommates */}
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <label className="block text-sm font-semibold text-gray-700">
//                 Add Roommates
//               </label>
//               <button
//                 type="button"
//                 onClick={addMemberField}
//                 className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
//               >
//                 <Plus size={16} />
//                 Add More
//               </button>
//             </div>
            
//             <div className="space-y-3">
//               {formData.memberEmails.map((email, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <div className="flex-1 relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail size={16} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => updateMemberEmail(index, e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                       placeholder="roommate@email.com"
//                     />
//                   </div>
//                   {formData.memberEmails.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeMemberField(index)}
//                       className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
//                     >
//                       <Minus size={16} />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <p className="text-sm text-gray-500">
//               Enter email addresses to invite roommates (optional)
//             </p>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={loading}
//               className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all duration-200 disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading || !formData.name.trim()}
//               className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   Creating...
//                 </div>
//               ) : (
//                 'Create Room'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateRoomModal;

import React, { useState } from 'react';
import { X, Users, Plus, Minus, Home, Mail, Settings, Trash2, LogOut, Crown } from 'lucide-react';
import axios from 'axios';

const CreateRoomModal = ({ onClose, onRoomCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    memberEmails: ['']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name.trim()) {
      setError('Room name is required');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please login again.');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:5000/api/rooms', {
        name: formData.name.trim(),
        description: formData.description.trim(),
        memberEmails: formData.memberEmails.filter(email => email.trim() !== '')
      }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      onRoomCreated();
      onClose();
    } catch (error) {
      console.error('Error creating room:', error);
      
      if (error.response) {
        setError(error.response.data.error || `Error: ${error.response.status}`);
      } else if (error.request) {
        setError('No response from server. Please check if the server is running.');
      } else {
        setError('Failed to create room. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const addMemberField = () => {
    setFormData({
      ...formData,
      memberEmails: [...formData.memberEmails, '']
    });
  };

  const removeMemberField = (index) => {
    const newEmails = formData.memberEmails.filter((_, i) => i !== index);
    setFormData({ ...formData, memberEmails: newEmails });
  };

  const updateMemberEmail = (index, email) => {
    const newEmails = [...formData.memberEmails];
    newEmails[index] = email;
    setFormData({ ...formData, memberEmails: newEmails });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200 mx-2 sm:mx-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Home className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  Create New Room
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  Start managing shared expenses
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm">
              {error}
            </div>
          )}

          {/* Room Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Room Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Home size={16} className="sm:w-4 sm:h-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                placeholder="e.g., Apartment 4B, PG House"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-sm sm:text-base"
              rows="3"
              placeholder="Brief description of your shared space..."
            />
          </div>

          {/* Roommates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Add Roommates
              </label>
              <button
                type="button"
                onClick={addMemberField}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                <Plus size={14} className="sm:w-4 sm:h-4" />
                Add More
              </button>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {formData.memberEmails.map((email, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => updateMemberEmail(index, e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                      placeholder="roommate@email.com"
                    />
                  </div>
                  {formData.memberEmails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMemberField(index)}
                      className="p-2 sm:p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all duration-200 flex-shrink-0"
                    >
                      <Minus size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Enter email addresses to invite roommates (optional)
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 font-medium transition-all duration-200 disabled:opacity-50 text-sm sm:text-base order-2 xs:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.name.trim()}
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-indigo-700 font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 xs:order-2"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                'Create Room'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
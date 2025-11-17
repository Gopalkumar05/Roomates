

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Plus, Users, Download, Bell, Home, TrendingUp, Wallet } from 'lucide-react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import CreateRoomModal from '../components/CreateRoomModal';

// const Dashboard = () => {
//   const [rooms, setRooms] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const fetchRooms = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:5000/api/rooms/my-rooms', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       const roomsData = Array.isArray(response.data) ? response.data : [];
//       setRooms(roomsData);
//     } catch (error) {
//       console.error('Error fetching rooms:', error);
//       setError('Failed to load rooms. Please try again.');
//       setRooms([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate actual statistics
//   const totalRooms = rooms.length;
//   const totalMembers = rooms.reduce((sum, room) => sum + (room.members?.length || 0), 0);
//   const pendingSettlements = rooms.reduce((sum, room) => sum + (room.pendingSettlements || 0), 0);

//   const handleRoomCreated = () => {
//     fetchRooms();
//     setShowCreateModal(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="text-center space-y-4">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <div className="space-y-2">
//             <p className="text-gray-700 font-medium">Loading your dashboard</p>
//             <p className="text-gray-500 text-sm">Getting everything ready for you</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
//           <div className="space-y-3">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Home className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//                   Welcome back, {user?.name || 'User'}!
//                 </h1>
//                 <p className="text-gray-600">Manage shared expenses with your roommates</p>
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={() => setShowCreateModal(true)}
//             className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25 w-full lg:w-auto"
//           >
//             <Plus size={20} />
//             Create New Room
//           </button>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
//             <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
//               <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//             </div>
//             {error}
//           </div>
//         )}

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Home className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 font-medium">Active Rooms</p>
//                 <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Users className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 font-medium">Total Members</p>
//                 <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Bell className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 font-medium">Pending Settlements</p>
//                 <p className="text-2xl font-bold text-gray-900">{pendingSettlements}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Rooms Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900">Your Rooms</h2>
//               <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                 {rooms.length} room{rooms.length !== 1 ? 's' : ''}
//               </span>
//             </div>
//           </div>

//           {rooms.length === 0 ? (
//             <div className="text-center py-12 px-6">
//               <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <Home className="h-8 w-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">No rooms yet</h3>
//               <p className="text-gray-500 mb-6 max-w-sm mx-auto">
//                 Create your first room to start managing shared expenses with your roommates.
//               </p>
//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25"
//               >
//                 Create Your First Room
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//               {rooms.map(room => (
//                 <Link
//                   key={room._id}
//                   to={`/room/${room._id}`}
//                   className="group bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 block"
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//                       <Home className="h-6 w-6 text-white" />
//                     </div>
//                     <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
//                       <Users size={14} />
//                       <span>{room.members?.length || 0}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
//                     {room.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {room.description || 'No description provided'}
//                   </p>
                  
//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
//                       Active
//                     </span>
//                     <span>{new Date(room.createdAt).toLocaleDateString()}</span>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Create Room Modal */}
//         {showCreateModal && (
//           <CreateRoomModal
//             onClose={() => setShowCreateModal(false)}
//             onRoomCreated={handleRoomCreated}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Users, Bell, Home, TrendingUp, Crown, Calendar, 
  Activity, Sparkles, Zap, ArrowRight, Settings, Download,
  Filter, Search, MoreVertical, Wallet, PieChart
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import CreateRoomModal from '../components/CreateRoomModal';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/rooms/my-rooms', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const roomsData = Array.isArray(response.data) ? response.data : [];
      setRooms(roomsData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to load rooms. Please try again.');
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalRooms = rooms.length;
  const totalMembers = rooms.reduce((sum, room) => sum + (room.members?.length || 0), 0);
  const userCreatedRooms = rooms.filter(room => room.createdBy?._id === user?.userId).length;
  const recentRooms = rooms.filter(room => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(room.createdAt) > weekAgo;
  }).length;

  // Filter and search rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (activeFilter) {
      case 'created':
        return room.createdBy?._id === user?.userId;
      case 'recent':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(room.createdAt) > weekAgo;
      case 'active':
        return room.members?.length > 2;
      default:
        return true;
    }
  });

  const handleRoomCreated = () => {
    fetchRooms();
    setShowCreateModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <PieChart className="h-6 w-6 text-blue-500 animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-gray-800 font-semibold text-lg">Loading your expense hub</p>
            <p className="text-gray-600 text-sm">Preparing your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-green-200 to-cyan-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 lg:mb-12">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <Wallet className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                RentSaathi
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1 lg:mt-2">
                  Smart expense tracking for shared living
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl flex items-center justify-center gap-2 lg:gap-3 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-xl lg:shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-105 w-full lg:w-auto"
          >
            <div className="relative">
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </div>
            <span className="text-sm lg:text-base">New Room</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 lg:mb-8 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700 px-4 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl flex items-center gap-3 shadow-lg">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-red-100 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm lg:text-base">{error}</p>
              <button 
                onClick={fetchRooms}
                className="text-xs lg:text-sm text-red-600 hover:text-red-700 underline mt-1"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-12">
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-white/20 shadow-lg lg:shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide">Rooms</p>
                <p className="text-xl lg:text-3xl font-bold text-gray-900 mt-1 lg:mt-2">{totalRooms}</p>
                <p className="text-xs text-green-500 font-medium mt-1 flex items-center gap-1">
                  <TrendingUp size={10} className="lg:w-3 lg:h-3" />
                  <span className="hidden lg:inline">{recentRooms} new</span>
                  <span className="lg:hidden">{recentRooms}</span>
                </p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Home className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-white/20 shadow-lg lg:shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide">Members</p>
                <p className="text-xl lg:text-3xl font-bold text-gray-900 mt-1 lg:mt-2">{totalMembers}</p>
                <p className="text-xs text-blue-500 font-medium mt-1 flex items-center gap-1">
                  <Users size={10} className="lg:w-3 lg:h-3" />
                  <span className="hidden lg:inline">Across rooms</span>
                </p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-white/20 shadow-lg lg:shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide">Created</p>
                <p className="text-xl lg:text-3xl font-bold text-gray-900 mt-1 lg:mt-2">{userCreatedRooms}</p>
                <p className="text-xs text-purple-500 font-medium mt-1 flex items-center gap-1">
                  <Crown size={10} className="lg:w-3 lg:h-3" />
                  <span className="hidden lg:inline">By you</span>
                </p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Crown className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-white/20 shadow-lg lg:shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide">Activity</p>
                <p className="text-xl lg:text-3xl font-bold text-gray-900 mt-1 lg:mt-2">{recentRooms}</p>
                <p className="text-xs text-orange-500 font-medium mt-1 flex items-center gap-1">
                  <Activity size={10} className="lg:w-3 lg:h-3" />
                  <span className="hidden lg:inline">This week</span>
                </p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl border border-white/20 overflow-hidden">
          {/* Header with Search and Filters */}
          <div className="p-4 lg:p-8 border-b border-gray-200/50">
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                  Your Rooms
                </h2>
                <p className="text-gray-600 text-sm lg:text-base mt-1 lg:mt-2">
                  Manage shared expense groups
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex bg-gray-100 rounded-lg lg:rounded-xl p-1 overflow-x-auto">
                  {[
                    { key: 'all', label: 'All', icon: Home },
                    { key: 'created', label: 'Created', icon: Crown },
                    { key: 'recent', label: 'Recent', icon: Calendar },
                    { key: 'active', label: 'Active', icon: Activity }
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveFilter(key)}
                      className={`flex items-center gap-1 lg:gap-2 px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                        activeFilter === key
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={14} className="lg:w-4 lg:h-4" />
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {filteredRooms.length === 0 ? (
            <div className="text-center py-12 lg:py-16 px-4 lg:px-6">
              <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-inner">
                <Home className="h-6 w-6 lg:h-10 lg:w-10 text-gray-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 lg:mb-3">
                {searchQuery ? 'No rooms found' : activeFilter === 'all' ? 'No rooms yet' : `No ${activeFilter} rooms`}
              </h3>
              <p className="text-gray-500 mb-6 lg:mb-8 max-w-md mx-auto leading-relaxed text-sm lg:text-base">
                {searchQuery 
                  ? "Try adjusting your search terms or create a new room."
                  : "Create your first room to start managing shared expenses with your roommates."
                }
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-xl lg:shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-105 inline-flex items-center gap-2 lg:gap-3"
              >
                <Plus size={18} className="lg:w-5 lg:h-5" />
                Create Room
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 p-4 lg:p-8">
              {filteredRooms.map((room, index) => (
                <Link
                  key={room._id}
                  to={`/room/${room._id}`}
                  className="group relative bg-gradient-to-br from-white to-gray-50/80 rounded-xl lg:rounded-2xl border border-gray-200/50 p-4 lg:p-6 hover:shadow-xl lg:hover:shadow-2xl hover:border-blue-200/50 hover:scale-105 transition-all duration-500 block overflow-hidden"
                >
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4 lg:mb-5">
                      <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                        <Home className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2">
                        {room.createdBy?._id === user?.userId && (
                          <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                            <Crown size={10} className="lg:w-3 lg:h-3" />
                            <span className="hidden sm:inline">Creator</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs lg:text-sm text-gray-500 bg-gray-100 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full">
                          <Users size={12} className="lg:w-4 lg:h-4" />
                          <span className="font-semibold">{room.members?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg lg:text-xl text-gray-900 mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                      {room.name}
                    </h3>
                    <p className="text-gray-600 text-xs lg:text-sm mb-4 lg:mb-6 line-clamp-2 leading-relaxed">
                      {room.description || 'No description provided for this room.'}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs lg:text-sm">
                      <div className="flex items-center gap-1 lg:gap-2 text-gray-500">
                        <Calendar size={12} className="lg:w-4 lg:h-4" />
                        <span>{new Date(room.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2 text-blue-500 font-semibold group-hover:gap-2 lg:group-hover:gap-3 transition-all duration-300">
                        <span className="hidden sm:inline">Open</span>
                        <ArrowRight size={14} className="lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions Footer */}
        {rooms.length > 0 && (
          <div className="mt-8 lg:mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-blue-200/30">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
              <div className="flex-1">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-1 lg:mb-2">Need assistance?</h3>
                <p className="text-gray-600 text-sm lg:text-base">Explore guides and manage your account</p>
              </div>
              <div className="flex gap-3 lg:gap-4">
                <button className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-white text-gray-700 rounded-lg lg:rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium shadow-lg border border-gray-200 text-sm lg:text-base">
                  <Download size={16} className="lg:w-5 lg:h-5" />
                  Export
                </button>
                <button className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg lg:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/30 text-sm lg:text-base">
                  <Settings size={16} className="lg:w-5 lg:h-5" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Room Modal */}
        {showCreateModal && (
          <CreateRoomModal
            onClose={() => setShowCreateModal(false)}
            onRoomCreated={handleRoomCreated}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
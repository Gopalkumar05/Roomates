

import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Calendar, MapPin, Phone, Edit3, Save, X, 
  Camera, CreditCard, CheckCircle, AlertCircle,
  Users, ReceiptIndianRupee, HandCoins, Home
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [userStats, setUserStats] = useState({
    roomsJoined: 0,
    activeRooms: 0,
    totalExpenses: 0,
    settlements: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        dateOfBirth: user.dateOfBirth || ''
      });
      setImagePreview(user.avatar || '');
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      setStatsLoading(true);
      const token = localStorage.getItem('token');
      
     
      const response = await axios.get(
        'https://roomates-k4tg.onrender.com/api/auth/stats',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setUserStats({
        roomsJoined: response.data.roomsJoined || 0,
        activeRooms: response.data.activeRooms || 0,
        totalExpenses: response.data.totalExpenses || 0,
        settlements: response.data.settlements || 0
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Set default values if API fails
      setUserStats({
        roomsJoined: 0,
        activeRooms: 0,
        totalExpenses: 0,
        settlements: 0
      });
    } finally {
      setStatsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const updateData = { ...formData };
      
      if (profileImage) {
        const imageFormData = new FormData();
        imageFormData.append('avatar', profileImage);
        
        const imageResponse = await axios.post(
          'https://roomates-k4tg.onrender.com/api/auth/upload-avatar',
          imageFormData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        updateData.avatar = imageResponse.data.avatarUrl;
      }

      const response = await axios.put(
        'https://roomates-k4tg.onrender.com/api/auth/profile',
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setUser(prev => ({
        ...prev,
        ...updateData,
      }));
    
      setIsEditing(false);
      setMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
      
      fetchUserStats();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to update profile'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      dateOfBirth: user.dateOfBirth || ''
    });
    setImagePreview(user.avatar || '');
    setProfileImage(null);
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '?';
    try {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    } catch (error) {
      return '?';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

const formatCurrency = (amount) => {
  // Handle invalid amounts
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }

  // Indian numbering system: Lakhs and Crores
  if (amount >= 10000000) { // 1 Crore = 10,000,000
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  }
  
  if (amount >= 100000) { // 1 Lakh = 100,000
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }

  // Format with Indian numbering system (comma separators)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

  const stats = [
    { 
      label: 'Rooms Joined', 
      value: userStats.roomsJoined, 
      icon: Home,
      color: 'from-blue-500 to-cyan-500',
      description: 'Total rooms you are member of'
    },
    { 
      label: 'Active Rooms', 
      value: userStats.activeRooms, 
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      description: 'Rooms with recent activity'
    },
    { 
      label: 'Total Expenses', 
      value: formatCurrency(userStats.totalExpenses), 
      icon: ReceiptIndianRupee,
      color: 'from-purple-500 to-pink-500',
      description: 'Total amount you have spent'
    },
    { 
      label: 'Settlements', 
      value: userStats.settlements, 
      icon: HandCoins,
      color: 'from-orange-500 to-amber-500',
      description: 'Completed settlements'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            Profile 
          </h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center space-x-3 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sticky top-8">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl mx-auto overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                  
                  {isEditing && (
                    <label className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 border">
                      <Camera className="h-4 w-4 text-gray-600" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mt-4">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full text-center bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      placeholder="Your name"
                    />
                  ) : (
                    user.name
                  )}
                </h2>
                
                <p className="text-gray-500 text-sm mt-1 flex items-center justify-center gap-1">
                  <Mail className="h-3 w-3" />
                  {user.email}
                </p>
                
                <div className="mt-3">
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows="3"
                    />
                  ) : (
                    user.bio && <p className="text-gray-600 text-sm">{user.bio}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {isEditing ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Details & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  Personal Information
                </h3>
                <div className={`w-2 h-2 rounded-full animate-pulse ${isEditing ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Email Address', name: 'email', type: 'email', icon: Mail, required: true },
                  { label: 'Phone Number', name: 'phone', type: 'tel', icon: Phone, placeholder: 'Add phone number' },
                  { label: 'Location', name: 'location', type: 'text', icon: MapPin, placeholder: 'Add your location' },
                  { label: 'Date of Birth', name: 'dateOfBirth', type: 'date', icon: Calendar }
                ].map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <field.icon className="h-3 w-3" />
                      {field.label}
                    </label>
                    {isEditing ? (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {user[field.name] || field.placeholder || 'Not provided'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  Your Activity
                </h3>
                <button 
                  onClick={fetchUserStats}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  Refresh
                </button>
              </div>
              
              {statsLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 text-center border border-gray-200/50"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3 animate-pulse">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 text-center border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                        <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {stat.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

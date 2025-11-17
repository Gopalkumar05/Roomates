

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Download,
  Moon,
  Sun,
  LogOut,
  Eye,
  EyeOff,
  Save,
  X,
  Palette,
  Database,
  ArrowLeft,
  Menu
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ControlPanel = ({ isOpen, onClose, isPage = false }) => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reminders: true,
    settlements: true
  });
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    upiId: ''
  });
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        upiId: user.upiId || ''
      });
    }
  }, [user]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Close mobile menu when tab changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeTab]);

  const handleClose = () => {
    if (isPage) {
      navigate('/');
    } else {
      onClose();
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.put('https://roomates-k4tg.onrender.com/api/auth/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(prev => ({
        ...prev,
        ...profileData,
      }));
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (securityData.newPassword !== securityData.confirmPassword) {
      setMessage('New passwords do not match');
      setLoading(false);
      return;
    }

    if (securityData.newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('https://roomates-k4tg.onrender.com/api/auth/change-password', {
        currentPassword: securityData.currentPassword,
        newPassword: securityData.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('Password changed successfully!');
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (key, value) => {
    const updatedNotifications = {
      ...notifications,
      [key]: value
    };
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const exportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://roomates-k4tg.onrender.com/api/export/data', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expense-manager-backup-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setMessage('Failed to export data');
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'export', label: 'Data & Export', icon: Database },
  ];

  if (!isPage && !isOpen) return null;

  const MobileMenuButton = () => (
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
    >
      <Menu size={20} className="text-gray-600 dark:text-gray-300" />
    </button>
  );

  const MobileSidebar = () => (
    <div className={`lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
      mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <div className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Manage your account</p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded-lg"
            >
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <nav className="p-3 sm:p-4 space-y-1 overflow-y-auto h-[calc(100%-120px)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'
                }`}
              >
                <Icon size={18} className="sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  const DesktopSidebar = () => (
    <div className="hidden lg:block w-80 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  const content = (
    <div className={`bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-6xl w-full ${isPage ? 'my-4 sm:my-8 mx-2 sm:mx-4 lg:mx-auto' : 'max-h-[90vh]'} overflow-hidden flex flex-col lg:flex-row border border-gray-200 dark:border-gray-700`}>
      <MobileSidebar />
      <DesktopSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6 lg:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <MobileMenuButton />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm lg:text-base truncate">
                  {activeTab === 'profile' && 'Update your personal information'}
                  {activeTab === 'notifications' && 'Manage your notification preferences'}
                  {activeTab === 'security' && 'Secure your account and change password'}
                  {activeTab === 'preferences' && 'Customize your app experience'}
                  {activeTab === 'export' && 'Export data and account actions'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 lg:p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 flex-shrink-0"
            >
              {isPage ? 
                <ArrowLeft size={18} className="sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" /> : 
                <X size={18} className="sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
              }
            </button>
          </div>

          {/* Message Alert */}
          {message && (
            <div className={`mb-3 sm:mb-4 lg:mb-6 p-3 sm:p-4 rounded-xl text-sm sm:text-base ${
              message.includes('successfully') 
                ? 'bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
                : 'bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
            }`}>
              {message}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileUpdate} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-600 dark:text-gray-300 cursor-not-allowed text-sm sm:text-base"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email cannot be changed
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 text-sm sm:text-base"
                    placeholder="+91 9876543210"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={profileData.upiId}
                    onChange={(e) => setProfileData({ ...profileData, upiId: e.target.value })}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 text-sm sm:text-base"
                    placeholder="yourname@upi"
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-3 sm:pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full lg:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    <>
                      <Save size={16} className="sm:w-4 sm:h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-600 p-3 sm:p-4 lg:p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6 text-base sm:text-lg">Notification Preferences</h4>
                
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2 sm:p-3 lg:p-4 bg-white dark:bg-gray-600 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-500">
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-blue-100 dark:bg-blue-900 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                          <Bell size={14} className="sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base capitalize truncate">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                            {key === 'email' && 'Receive email notifications'}
                            {key === 'push' && 'Browser push notifications'}
                            {key === 'reminders' && 'Payment reminder alerts'}
                            {key === 'settlements' && 'Settlement notifications'}
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-2">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleNotificationChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 sm:w-10 sm:h-5 lg:w-12 lg:h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-4 sm:after:w-4 lg:after:h-5 lg:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={handlePasswordChange} className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-600 p-3 sm:p-4 lg:p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6 text-base sm:text-lg">Change Password</h4>
                
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { key: 'current', label: 'Current Password', value: securityData.currentPassword },
                    { key: 'new', label: 'New Password', value: securityData.newPassword },
                    { key: 'confirm', label: 'Confirm New Password', value: securityData.confirmPassword }
                  ].map((field) => (
                    <div key={field.key} className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords[field.key] ? "text" : "password"}
                          value={field.value}
                          onChange={(e) => setSecurityData({ ...securityData, [`${field.key}Password`]: e.target.value })}
                          className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white pr-10 sm:pr-12 transition-all duration-200 text-sm sm:text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(field.key)}
                          className="absolute inset-y-0 right-0 pr-3 lg:pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          {showPasswords[field.key] ? <EyeOff size={16} className="sm:w-4 sm:h-5" /> : <Eye size={16} className="sm:w-4 sm:h-5" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end pt-3 sm:pt-4 lg:pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full lg:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Updating...
                      </div>
                    ) : (
                      <>
                        <Save size={16} className="sm:w-4 sm:h-5" />
                        Change Password
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-600 p-3 sm:p-4 lg:p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6 text-base sm:text-lg">Appearance</h4>
                
                <div className="flex items-center justify-between p-2 sm:p-3 lg:p-4 bg-white dark:bg-gray-600 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-500">
                  <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-purple-100 dark:bg-purple-900 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      {darkMode ? <Sun size={14} className="sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" /> : <Moon size={14} className="sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Dark Mode</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        Switch between light and dark themes
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-200 flex-shrink-0 ${
                      darkMode 
                        ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-400'
                    }`}
                  >
                    {darkMode ? <Sun size={16} className="sm:w-5 sm:h-5" /> : <Moon size={16} className="sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Export Tab */}
          {activeTab === 'export' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-600 p-3 sm:p-4 lg:p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6 text-base sm:text-lg">Export Data</h4>
                
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    Download all your expense data in JSON format for backup or analysis.
                  </p>
                  
                  <button
                    onClick={exportData}
                    className="w-full lg:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700 font-medium shadow-lg shadow-green-500/25 transition-all duration-200 text-sm sm:text-base"
                  >
                    <Download size={16} className="sm:w-4 sm:h-5" />
                    Export All Data
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-600 p-3 sm:p-4 lg:p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6 text-base sm:text-lg">Account Actions</h4>
                
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 lg:py-4 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg sm:rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-all duration-200 text-sm sm:text-base"
                >
                  <LogOut size={16} className="sm:w-4 sm:h-5" />
                  Sign Out from All Devices
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isPage) {
    return content;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-3 lg:p-4 z-50">
      {content}
    </div>
  );
};

export default ControlPanel;

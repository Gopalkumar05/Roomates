// src/pages/Settings.jsx
import React from 'react';
import ControlPanel from '../components/ControlPanel';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ControlPanel isPage={true} onClose={() => window.history.back()} />
      </div>
    </div>
  );
};

export default Settings;
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Toast = ({ message, type = 'success', show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg z-50 transition-all duration-300 max-w-md`}>
      <div className="flex items-start gap-2">
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="text-white hover:text-gray-200 flex-shrink-0">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
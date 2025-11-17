

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Home } from 'lucide-react';
import RoomHeader from '../components/Room/RoomHeader';
import RoomTabs from '../components/Room/RoomTabs';
import RoomContent from '../components/Room/RoomContent';
import AddExpenseModal from '../components/AddExpenseModal';
import ReminderModal from '../components/Room/ReminderModal';
import ChatBox from '../components/Room/ChatBox';
import Toast from '../components/UI/Toast';
import ConfirmationModal from '../components/UI/ConfirmationModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState({});
  const [activeTab, setActiveTab] = useState('expenses');
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showReminder, setShowReminder] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedMemberName, setSelectedMemberName] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmData, setConfirmData] = useState(null);
  
  // Chat state
  const [showChat, setShowChat] = useState(false);
  const [reminderMessages, setReminderMessages] = useState([]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  const showConfirmation = (action, data = null) => {
    setConfirmAction(() => action);
    setConfirmData(data);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    setShowConfirm(false);
    setConfirmAction(null);
    setConfirmData(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setConfirmAction(null);
    setConfirmData(null);
  };

  // Add reminder message to chat
  const addReminderMessage = (messageData) => {
    const newMessage = {
      id: Date.now(),
      type: 'reminder',
      from: messageData.from,
      to: messageData.to,
      message: messageData.message,
      timestamp: new Date(),
      roomId: roomId
    };
    
    setReminderMessages(prev => [newMessage, ...prev]);
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchRoomData();
    setupWebSocket();
    
    // Load existing reminder messages from localStorage
    const savedMessages = localStorage.getItem(`room_${roomId}_reminders`);
    if (savedMessages) {
      setReminderMessages(JSON.parse(savedMessages));
    }
  }, [roomId]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (reminderMessages.length > 0) {
      localStorage.setItem(`room_${roomId}_reminders`, JSON.stringify(reminderMessages));
    }
  }, [reminderMessages, roomId]);

  const fetchCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setCurrentUser(decoded);
    }
  };

  const fetchRoomData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const [roomRes, expensesRes, balancesRes] = await Promise.all([
        axios.get(`https://roomates-k4tg.onrender.com/api/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`https://roomates-k4tg.onrender.com/api/expenses/room/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`https://roomates-k4tg.onrender.com/api/expenses/room/${roomId}/balances`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setRoom(roomRes.data);
      setExpenses(expensesRes.data);
      setBalances(balancesRes.data);
    } catch (error) {
      console.error('Error fetching room data:', error);
      showToast('Failed to load room data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const setupWebSocket = () => {
    const socket = io('https://roomates-k4tg.onrender.com');
    socket.emit('join-room', roomId);
    
    socket.on('expense-added', (newExpense) => {
      setExpenses(prev => [newExpense, ...prev]);
      fetchRoomData();
      showToast('Expense added successfully');
    });

    socket.on('expense-updated', (updatedExpense) => {
      setExpenses(prev => prev.map(exp => 
        exp._id === updatedExpense._id ? updatedExpense : exp
      ));
      fetchRoomData();
      showToast('Expense updated successfully');
    });

    socket.on('expense-deleted', (deletedExpenseId) => {
      setExpenses(prev => prev.filter(exp => exp._id !== deletedExpenseId));
      fetchRoomData();
      showToast('Expense deleted successfully');
    });

    socket.on('room-updated', (updatedRoom) => {
      setRoom(updatedRoom);
      showToast('Room updated successfully');
    });

    socket.on('member-added', ({ user }) => {
      fetchRoomData();
      showToast('Member added successfully');
    });

    socket.on('member-removed', ({ memberId }) => {
      fetchRoomData();
      showToast('Member removed successfully');
    });

    socket.on('reminder-sent', ({ from, to, message }) => {
      // Add to chat
      addReminderMessage({ from, to, message });
      
      // Show toast
      const reminderInfo = `Reminder sent to ${to.name} (${to.email}): "${message}"`;
      showToast(reminderInfo, 'success');
    });

    socket.on('room-deleted', ({ roomId: deletedRoomId }) => {
      if (deletedRoomId === roomId) {
        showToast('Room has been deleted');
        navigate('/dashboard');
      }
    });
    
    return () => socket.disconnect();
  };

  const generatePDFReport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://roomates-k4tg.onrender.com/api/expenses/room/${roomId}/report`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expense-report-${roomId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('PDF report downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showToast('Failed to generate PDF report', 'error');
    }
  };

  const updateRoom = async (editForm) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://roomates-k4tg.onrender.com/api/rooms/${roomId}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRoom(response.data);
      showToast('Room updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating room:', error);
      showToast(error.response?.data?.error || 'Failed to update room', 'error');
      return false;
    }
  };

  const deleteRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://roomates-k4tg.onrender.com/api/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Room deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting room:', error);
      showToast(error.response?.data?.error || 'Failed to delete room', 'error');
    }
  };

  const leaveRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://roomates-k4tg.onrender.com/api/rooms/${roomId}/leave`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('You have left the room');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error leaving room:', error);
      showToast(error.response?.data?.error || 'Failed to leave room', 'error');
    }
  };

  const addMember = async (email) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `https://roomates-k4tg.onrender.com/api/rooms/${roomId}/members`, 
        { email: email.trim() }, 
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      fetchRoomData();
      showToast('Member added successfully');
      return true;
    } catch (error) {
      console.error('Error adding member:', error);
      showToast(error.response?.data?.error || 'Failed to add member', 'error');
      return false;
    }
  };

  const removeMember = async (memberId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://roomates-k4tg.onrender.com/api/rooms/${roomId}/members/${memberId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRoomData();
      showToast('Member removed successfully');
    } catch (error) {
      console.error('Error removing member:', error);
      showToast(error.response?.data?.error || 'Failed to remove member', 'error');
    }
  };

  const transferOwnership = async (newOwnerId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://roomates-k4tg.onrender.com/api/rooms/${roomId}/transfer-ownership`, {
        newOwnerId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRoomData();
      showToast('Ownership transferred successfully');
    } catch (error) {
      console.error('Error transferring ownership:', error);
      showToast(error.response?.data?.error || 'Failed to transfer ownership', 'error');
    }
  };

  const sendReminder = async (memberId, customMessage = '') => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://roomates-k4tg.onrender.com/api/rooms/${roomId}/remind`, {
        memberId,
        message: customMessage || `Hi! Just a friendly reminder about pending expenses in ${room.name}. Please check the app for details.`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const member = room.members.find(m => m.user._id === memberId);
      const successMessage = `Reminder sent to ${member.user.name} (${member.user.email}): "${customMessage || `Hi! Just a friendly reminder about pending expenses in ${room.name}. Please check the app for details.`}"`;
      
      // Add to local chat immediately
      addReminderMessage({
        from: { name: currentUser?.name || 'You', email: currentUser?.email },
        to: { name: member.user.name, email: member.user.email },
        message: customMessage || `Hi! Just a friendly reminder about pending expenses in ${room.name}. Please check the app for details.`
      });
      
      setShowReminder(false);
      setReminderMessage('');
      setSelectedMember('');
      setSelectedMemberName('');
      showToast(successMessage, 'success');
    } catch (error) {
      console.error('Error sending reminder:', error);
      showToast(error.response?.data?.error || 'Failed to send reminder', 'error');
    }
  };

  const updateExpense = async (expenseId, expenseData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://roomates-k4tg.onrender.com/api/expenses/${expenseId}`, expenseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingExpense(null);
      fetchRoomData();
      showToast('Expense updated successfully');
      return response.data;
    } catch (error) {
      console.error('Error updating expense:', error);
      showToast(error.response?.data?.error || 'Failed to update expense', 'error');
      throw error;
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://roomates-k4tg.onrender.com/api/expenses/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRoomData();
      showToast('Expense deleted successfully');
    } catch (error) {
      console.error('Error deleting expense:', error);
      showToast(error.response?.data?.error || 'Failed to delete expense', 'error');
    }
  };

  const handleSendReminder = (memberId, memberName) => {
    setSelectedMember(memberId);
    setSelectedMemberName(memberName);
    setShowReminder(true);
  };

  const clearChatHistory = () => {
    setReminderMessages([]);
    localStorage.removeItem(`room_${roomId}_reminders`);
    showToast('Chat history cleared', 'success');
  };

  const isRoomCreator = room && currentUser && room.createdBy._id === currentUser.userId;

  if (loading) {
    return <LoadingSpinner message="Loading room data" />;
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="text-center space-y-4">
          <Home className="h-12 w-12 text-gray-400 mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900">Room not found</h2>
          <p className="text-gray-600">The room you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Toast 
        message={toast.message} 
        type={toast.type} 
        show={toast.show}
        onClose={hideToast} 
      />

      <ConfirmationModal
        isOpen={showConfirm}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title={confirmData?.title || "Confirm Action"}
        message={confirmData?.message || "Are you sure you want to proceed?"}
        confirmText={confirmData?.confirmText || "Confirm"}
        type={confirmData?.type || "danger"}
      />

      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
        <RoomHeader
          room={room}
          currentUser={currentUser}
          onUpdateRoom={updateRoom}
          onDeleteRoom={() => showConfirmation(deleteRoom, {
            title: "Delete Room",
            message: "Are you sure you want to delete this room? All expenses and data will be permanently lost.",
            confirmText: "Delete Room"
          })}
          onLeaveRoom={() => showConfirmation(leaveRoom, {
            title: "Leave Room",
            message: "Are you sure you want to leave this room? You will need to be re-invited to join again.",
            confirmText: "Leave Room"
          })}
          onAddMember={addMember}
          onGeneratePDF={generatePDFReport}
          onAddExpense={() => setShowAddExpense(true)}
          onToggleChat={() => setShowChat(!showChat)}
          showChat={showChat}
          reminderCount={reminderMessages.length}
        />

        <RoomTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          expensesCount={expenses.length}
          membersCount={room.members.length}
        />

        {/* Main Layout */}
        <div className={`flex flex-col lg:flex-row gap-4 lg:gap-6 ${showChat ? 'lg:h-[calc(100vh-200px)]' : ''}`}>
          {/* Main Content */}
          <div className={`${showChat ? 'lg:flex-1 min-h-0' : 'w-full'}`}>
            <RoomContent
              activeTab={activeTab}
              expenses={expenses}
              balances={balances}
              room={room}
              currentUser={currentUser}
              onEditExpense={setEditingExpense}
              onUpdateExpense={updateExpense}
              onDeleteExpense={(expenseId) => showConfirmation(
                () => deleteExpense(expenseId), 
                {
                  title: "Delete Expense",
                  message: "Are you sure you want to delete this expense? This action cannot be undone.",
                  confirmText: "Delete Expense"
                }
              )}
              onSendReminder={handleSendReminder}
              onRemoveMember={(memberId) => showConfirmation(
                () => removeMember(memberId),
                {
                  title: "Remove Member",
                  message: "Are you sure you want to remove this member from the room?",
                  confirmText: "Remove Member"
                }
              )}
              onTransferOwnership={(newOwnerId) => showConfirmation(
                () => transferOwnership(newOwnerId),
                {
                  title: "Transfer Ownership",
                  message: "Are you sure you want to transfer room ownership? You will become a regular member.",
                  confirmText: "Transfer Ownership",
                  type: "warning"
                }
              )}
              onAddMember={addMember}
              editingExpense={editingExpense}
            />
          </div>

          {/* Chat Box */}
          {showChat && (
            <div className="lg:w-96 lg:flex-shrink-0">
              <ChatBox
                messages={reminderMessages}
                currentUser={currentUser}
                onClearHistory={() => showConfirmation(clearChatHistory, {
                  title: "Clear Chat History",
                  message: "Are you sure you want to clear all reminder messages? This action cannot be undone.",
                  confirmText: "Clear History"
                })}
                onClose={() => setShowChat(false)}
              />
            </div>
          )}
        </div>

        {/* Modals */}
        {showAddExpense && (
          <AddExpenseModal
            room={room}
            onClose={() => setShowAddExpense(false)}
            onExpenseAdded={fetchRoomData}
          />
        )}

        {editingExpense && (
          <AddExpenseModal
            room={room}
            expense={editingExpense}
            onClose={() => setEditingExpense(null)}
            onExpenseAdded={fetchRoomData}
          />
        )}

        {showReminder && (
          <ReminderModal
            isOpen={showReminder}
            onClose={() => {
              setShowReminder(false);
              setReminderMessage('');
              setSelectedMember('');
              setSelectedMemberName('');
            }}
            onSendReminder={() => sendReminder(selectedMember, reminderMessage)}
            memberName={selectedMemberName}
            roomName={room.name}
            message={reminderMessage}
            onMessageChange={setReminderMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Room;

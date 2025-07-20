import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigation } from '../navigation/Navigation';
import { Sidebar } from '../sidebar/Sidebar';
import { Dashboard } from '../dashboard/Dashboard';
import { Profile } from '../profile/Profile';
import { Chat } from '../chat/Chat';
import { ProfileCompletion } from '../profile/ProfileCompletion';
import { AskGemini } from '../gemini/AskGemini';
import { ViewType } from '../../types';

export const Home = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedChatPartner, setSelectedChatPartner] = useState<{
    id: string;
    name: string;
    avatar: string;
  } | null>(null);

  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [showAskGemini, setShowAskGemini] = useState(false);

  // Show profile completion modal for incomplete profiles
  React.useEffect(() => {
    // For now, skip profile completion check as we're using Firebase auth
    // This can be implemented later when user profiles are stored in Firestore
  }, [user]);

  const handleViewProfile = () => {
    setCurrentView('profile');
  };

  const handleSendMessage = () => {
    // For demo purposes, use a mock partner
    setSelectedChatPartner({
      id: 'demo-partner',
      name: 'Maya Patel',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1'
    });
    setCurrentView('chat');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedChatPartner(null);
  };

  const handleAskGemini = () => {
    setShowAskGemini(true);
  };

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onViewProfile={handleViewProfile}
        onAskGemini={handleAskGemini}
        onLogout={handleLogout}
        user={user}
      />
      
      <div className="flex-1 flex flex-col">
        <Navigation
          user={user}
          currentView={currentView}
          onBackToDashboard={handleBackToDashboard}
        />
        
        <main className="flex-1 overflow-hidden">
          {currentView === 'dashboard' && (
            <Dashboard
              user={user}
              onViewProfile={handleViewProfile}
              onSendMessage={handleSendMessage}
            />
          )}
          
          {currentView === 'profile' && (
            <Profile user={user} />
          )}
          
          {currentView === 'chat' && selectedChatPartner && (
            <Chat
              user={user}
              partner={selectedChatPartner}
              onBackToDashboard={handleBackToDashboard}
            />
          )}
        </main>
      </div>

      {showProfileCompletion && (
        <ProfileCompletion
          user={user}
          onClose={() => setShowProfileCompletion(false)}
        />
      )}

      {showAskGemini && (
        <AskGemini onClose={() => setShowAskGemini(false)} />
      )}
    </div>
  );
};
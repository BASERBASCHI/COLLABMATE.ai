import React, { useState } from 'react';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import { LoadingScreen } from './components/common/LoadingScreen';
import { LoginModal } from './components/auth/LoginModal';
import { SignupModal } from './components/auth/SignupModal';
import { Navigation } from './components/navigation/Navigation';
import { Sidebar } from './components/sidebar/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { Profile } from './components/profile/Profile';
import { Chat } from './components/chat/Chat';
import { ProfileCompletion } from './components/profile/ProfileCompletion';
import { ViewType } from './types';

function App() {
  const {
    user,
    loading,
    showLoginModal,
    showSignupModal,
    setShowLoginModal,
    setShowSignupModal,
    login,
    loginWithGoogle,
    signup,
    logout
  } = useFirebaseAuth();

  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedChatPartner, setSelectedChatPartner] = useState<{
    id: string;
    name: string;
    avatar: string;
  } | null>(null);

  const [showProfileCompletion, setShowProfileCompletion] = useState(false);

  // Show profile completion modal for incomplete profiles
  React.useEffect(() => {
    if (user && !user.isProfileComplete && user.profileStrength < 60) {
      setShowProfileCompletion(true);
    }
  }, [user]);

  const handleShowSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleShowLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleFindTeammates = () => {
    alert('🔍 Finding teammates based on your skills and preferences...\n\nThis would connect to our AI matching engine to find compatible collaborators!');
  };

  const handleCreateTeam = () => {
    alert('🚀 Create a new team!\n\nThis would open a team creation wizard where you can:\n• Set team goals and project focus\n• Define required skills\n• Set collaboration preferences\n• Invite specific members');
  };

  const handleRecommendedProjects = () => {
    alert('💡 AI-Generated Project Recommendations\n\nBased on your skills and interests, here are some project ideas:\n• AI-powered study buddy app\n• Sustainable campus initiative tracker\n• Student marketplace platform\n• Virtual reality campus tour');
  };

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

  const handleRefresh = () => {
    // Show loading state briefly
    const refreshButton = document.querySelector('#refresh-btn');
    if (refreshButton) {
      refreshButton.innerHTML = '<svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Refreshing...';
    }
    
    setTimeout(() => {
      if (refreshButton) {
        refreshButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg><span>Refresh</span>';
      }
      alert('✅ Dashboard refreshed!\n\nUpdated with latest matches, messages, and project suggestions.');
    }, 1500);
  };

  const handleUpdateProfile = async (updates: any) => {
    if (user) {
      await updateUserProfile(updates);
      setShowProfileCompletion(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={login}
          onGoogleLogin={loginWithGoogle}
          onShowSignup={handleShowSignup}
        />
        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSignup={signup}
          onShowLogin={handleShowLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation user={user} onLogout={logout} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar
            user={user}
            onFindTeammates={handleFindTeammates}
            onCreateTeam={handleCreateTeam}
            onRecommendedProjects={handleRecommendedProjects}
          />
          
          <div className="w-full lg:w-3/4">
            {currentView === 'dashboard' && (
              <Dashboard
                user={user}
                onViewProfile={handleViewProfile}
                onSendMessage={handleSendMessage}
                onRefresh={handleRefresh}
              />
            )}
            
            {currentView === 'profile' && (
              <Profile
                user={user}
                onBack={handleBackToDashboard}
              />
            )}
            
            {currentView === 'chat' && (
              <Chat 
                userId={user.id}
                partnerId={selectedChatPartner?.id || ''}
                partnerName={selectedChatPartner?.name || ''}
                partnerAvatar={selectedChatPartner?.avatar || ''}
                onBack={handleBackToDashboard} 
              />
            )}
          </div>
        </div>
        
        {user && showProfileCompletion && (
          <ProfileCompletion
            user={user}
            onUpdateProfile={handleUpdateProfile}
            onClose={() => setShowProfileCompletion(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
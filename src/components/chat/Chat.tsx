import React, { useState } from 'react';
import { ArrowLeft, Phone, Video, MoreHorizontal, Send, Paperclip } from 'lucide-react';
import { useFirebaseMessages } from '../../hooks/useFirebaseMessages';

interface ChatProps {
  userId: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  onBack: () => void;
}

export const Chat: React.FC<ChatProps> = ({ 
  userId, 
  partnerId, 
  partnerName, 
  partnerAvatar, 
  onBack 
}) => {
  const [message, setMessage] = useState('');
  const { messages, loading, sendMessage: sendMsg } = useFirebaseMessages(userId, partnerId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMsg(message);
      setMessage('');
    }
  };

  const handlePhoneCall = () => {
    alert(`📞 Starting voice call with ${partnerName}...\n\nThis would initiate a WebRTC voice call.`);
  };

  const handleVideoCall = () => {
    alert(`📹 Starting video call with ${partnerName}...\n\nThis would open a video conference room.`);
  };

  const handleMoreOptions = () => {
    alert('⚙️ Chat Options\n\n• Mute notifications\n• Share files\n• Schedule meeting\n• View shared projects\n• Block user');
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4 flex items-center">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center flex-1">
          <img
            src={partnerAvatar}
            alt={partnerName}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <h3 className="font-bold text-gray-800">{partnerName}</h3>
            <p className="text-xs text-gray-500 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Online now
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={handlePhoneCall}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Phone className="h-5 w-5 text-gray-600" />
          </button>
          <button 
            onClick={handleVideoCall}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Video className="h-5 w-5 text-gray-600" />
          </button>
          <button 
            onClick={handleMoreOptions}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MoreHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="p-4 h-96 overflow-y-auto space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading messages...</p>
          </div>
        ) : (
          messages.map((msg) => (
          <div key={msg.id}>
            {msg.type === 'ai-suggestion' ? (
              <div className="flex justify-center">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md text-center">
                  <div className="flex items-center justify-center mb-2">
                    <img
                      src={msg.senderAvatar}
                      alt="AI"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-sm font-medium text-purple-800">Gemini AI Suggestion</span>
                  </div>
                  <p className="text-sm text-gray-700">{msg.message}</p>
                </div>
              </div>
            ) : msg.senderId === userId ? (
              <div className="flex justify-end">
                <div className="flex flex-col items-end">
                  <div className="bg-indigo-100 rounded-lg p-3 max-w-xs md:max-w-md">
                    <p className="text-gray-800">{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">You • {msg.timestamp}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start">
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs md:max-w-md">
                    <p className="text-gray-800">{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{msg.senderName} • {msg.timestamp}</p>
                </div>
              </div>
            )}
          </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <button
            type="button"
            onClick={() => alert('📎 File attachment feature would open here')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-2"
          >
            <Paperclip className="h-5 w-5 text-gray-600" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
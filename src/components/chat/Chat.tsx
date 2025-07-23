import React, { useState } from 'react';
import { ArrowLeft, Phone, Video, MoreHorizontal, Send, Paperclip, Sparkles, Brain, Zap } from 'lucide-react';
import { useGeminiChat } from '../../hooks/useGeminiChat';
import { generateChatSuggestion } from '../../lib/gemini';
import { User } from '../../types';

interface ChatInterfaceProps {
  user: User;
  partner: User;
  onBackToDashboard: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  user,
  partner,
  onBackToDashboard,
}) => {
  const [message, setMessage] = useState('');
  const { messages, loading, sendMessage, clearMessages } = useGeminiChat();
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    await sendMessage(message);
    setMessage('');
  };

  const handleMoreOptions = () => {
    alert('⚙️ AI-Enhanced Chat Options\n\n• 🤖 Get AI conversation suggestions\n• 📁 Share files with smart organization\n• 📅 AI-scheduled meeting suggestions\n• 🚀 View shared projects with AI insights\n• 🔇 Smart notification management');
  };

  const handleClearChat = () => {
    clearMessages();
    setAiSuggestions([]);
  };

  const generateSmartSuggestions = async () => {
    if (messages.length === 0) return;
    
    setLoadingSuggestions(true);
    try {
      const lastUserMessage = messages.filter(m => m.type === 'user').pop();
      if (lastUserMessage) {
        const suggestion1 = await generateChatSuggestion(
          lastUserMessage.content,
          user.name,
          partner.name,
          'Generate a follow-up question about technical implementation'
        );
        const suggestion2 = await generateChatSuggestion(
          lastUserMessage.content,
          user.name,
          partner.name,
          'Suggest next steps for collaboration'
        );
        const suggestion3 = await generateChatSuggestion(
          lastUserMessage.content,
          user.name,
          partner.name,
          'Recommend tools or resources'
        );
        
        setAiSuggestions([suggestion1, suggestion2, suggestion3]);
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      setAiSuggestions([
        "What technologies are you most excited to work with?",
        "Should we set up a shared GitHub repository?",
        "When would be a good time for a video call to discuss the project?"
      ]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-purple-100">
      {/* Chat Header */}
      <div className="border-b border-purple-100 p-4 flex items-center bg-gradient-to-r from-purple-50 to-indigo-50">
        <button
          onClick={onBackToDashboard}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center flex-1">
          <img
            src={partner.avatar}
            alt={partner.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-bold text-gray-800">{partner.name}</h3>
            <p className="text-xs text-gray-500 flex items-center">
              <Brain className="h-3 w-3 text-purple-500 mr-1" />
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              AI-Enhanced Chat • Online now
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={generateSmartSuggestions}
            disabled={loadingSuggestions || messages.length === 0}
            className="p-2 rounded-full hover:bg-purple-100 transition-colors disabled:opacity-50"
            title="Get AI conversation suggestions"
          >
            {loadingSuggestions ? (
              <Zap className="h-5 w-5 text-purple-600 animate-pulse" />
            ) : (
              <Brain className="h-5 w-5 text-purple-600" />
            )}
          </button>
          <button 
            onClick={handleClearChat}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Clear chat"
          >
            <Sparkles className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Phone className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
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

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 mb-4 border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <p className="font-medium text-gray-700">Gemini AI-Powered Chat</p>
              <p className="text-sm mt-1">Start a conversation and get intelligent suggestions for collaboration!</p>
              <div className="flex justify-center space-x-2 mt-3">
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Smart Responses</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Project Ideas</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Tech Advice</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' 
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
                }`}>
                  {msg.type === 'ai' && (
                    <div className="flex items-center mb-1">
                      <Brain className="h-3 w-3 text-purple-600 mr-1" />
                      <span className="text-xs font-medium text-purple-600">Gemini AI</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-75">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {loading && (
          <div className="flex justify-start mt-4">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-4 py-2 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-purple-600 animate-pulse" />
                <span className="text-sm">Gemini AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        {/* AI Suggestions */}
        {aiSuggestions.length > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-purple-700">AI Conversation Suggestions</span>
            </div>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  className="block w-full text-left text-xs bg-white hover:bg-purple-50 text-purple-700 p-2 rounded border border-purple-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-purple-100 p-4 bg-gradient-to-r from-purple-50 to-indigo-50">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message... (AI will provide smart suggestions)"
            disabled={loading}
            className="flex-1 border border-purple-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 bg-white"
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="ml-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-full p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <Brain className="h-5 w-5 animate-pulse" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
        
        <div className="mt-2 text-center">
          <p className="text-xs text-purple-600">
            <Sparkles className="h-3 w-3 inline mr-1" />
            Powered by Gemini AI for intelligent conversation assistance
          </p>
        </div>
      </div>
    </div>
  );
};
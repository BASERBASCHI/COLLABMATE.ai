import React, { useState } from 'react';
import { MessageCircle, Send, Sparkles, X, Loader, Lightbulb, Users, Code, Rocket } from 'lucide-react';
import { generateGeminiResponse } from '../../lib/gemini';
import { useAuth } from '../../hooks/useAuth';

interface AskGeminiProps {
  onClose: () => void;
  context?: string;
  placeholder?: string;
  initialQuestion?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'gemini';
  content: string;
  timestamp: string;
}

export const AskGemini: React.FC<AskGeminiProps> = ({ 
  onClose, 
  context = '',
  placeholder = "Ask Gemini anything about collaboration, projects, or development...",
  initialQuestion = ''
}) => {
  const { user } = useAuth();
  const [question, setQuestion] = useState(initialQuestion);
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);

  React.useEffect(() => {
    if (initialQuestion) {
      handleSubmit(new Event('submit') as any);
    }
  }, [initialQuestion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const userMessage = question.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message to history
    const userChatMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userMessage,
      timestamp
    };
    
    setConversationHistory(prev => [...prev, userChatMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const geminiResponse = await generateGeminiResponse(
        userMessage, 
        context,
        user // Pass user profile for personalized responses
      );
      
      // Add Gemini response to history
      const geminiChatMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'gemini',
        content: geminiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setConversationHistory(prev => [...prev, geminiChatMessage]);
    } catch (error) {
      console.error('Error getting Gemini response:', error);
      const fallbackResponse = "I'm having trouble connecting right now, but here are some general tips: Consider breaking down your project into smaller tasks, collaborate with teammates who have complementary skills, and don't hesitate to ask for help when needed!";
      
      const errorChatMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'gemini',
        content: fallbackResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setConversationHistory(prev => [...prev, errorChatMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setConversationHistory([]);
  };

  const quickQuestions = [
    {
      icon: Users,
      text: "How do I find the right teammates?",
      category: "Team Building"
    },
    {
      icon: Lightbulb,
      text: "What makes a good project idea?",
      category: "Project Planning"
    },
    {
      icon: Code,
      text: "Best practices for code collaboration?",
      category: "Development"
    },
    {
      icon: Rocket,
      text: "How to manage project timelines?",
      category: "Project Management"
    }
  ];

  const handleQuickQuestion = (questionText: string) => {
    setQuestion(questionText);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Ask Gemini AI</h3>
              <p className="text-sm text-gray-600">Your intelligent collaboration assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {conversationHistory.length > 0 && (
              <button
                onClick={clearConversation}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                Clear Chat
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[400px] max-h-[500px] bg-gray-50">
          {conversationHistory.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-purple-500" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Welcome to Gemini AI!</h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                I'm here to help you with collaboration, project planning, technical questions, and career advice.
              </p>
              
              {/* Quick Question Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {quickQuestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(item.text)}
                    className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 text-left"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.text}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {conversationHistory.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                  } rounded-2xl p-4`}>
                    {message.type === 'gemini' && (
                      <div className="flex items-center mb-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mr-2">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-purple-600">Gemini AI</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-3 ${
                      message.type === 'user' ? 'text-indigo-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 max-w-[80%] shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Loader className="h-4 w-4 animate-spin text-purple-600" />
                    <span className="text-sm text-gray-600">Gemini is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-6 bg-white">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={placeholder}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12 text-sm"
                disabled={loading}
              />
              <MessageCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button
              type="submit"
              disabled={!question.trim() || loading}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full p-4 transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
          
          {/* Quick Suggestions */}
          {conversationHistory.length === 0 && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {[
                "Help me plan a web app project",
                "What skills should I learn next?",
                "How to improve team communication?",
                "Best practices for code reviews"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setQuestion(suggestion)}
                  className="text-xs bg-gray-100 hover:bg-purple-50 hover:text-purple-700 text-gray-600 px-3 py-2 rounded-full transition-colors border hover:border-purple-200"
                  disabled={loading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
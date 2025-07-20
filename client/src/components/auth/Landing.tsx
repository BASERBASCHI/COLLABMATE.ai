import React from 'react';
import { Button } from '@/components/ui/button';

export const Landing = () => {
  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">CollabMate</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with talented developers, students, and creators to build amazing projects together. 
          Find your perfect teammate with AI-powered matching.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="font-semibold mb-2">Smart Matching</h3>
            <p className="text-gray-600 text-sm">AI-powered algorithm finds teammates based on skills, interests, and work style</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="font-semibold mb-2">Project Ideas</h3>
            <p className="text-gray-600 text-sm">Get personalized project suggestions tailored to your skills and goals</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="font-semibold mb-2">Real-time Chat</h3>
            <p className="text-gray-600 text-sm">Chat with AI-powered conversation suggestions to break the ice</p>
          </div>
        </div>

        <Button 
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Get Started - Sign In
        </Button>
        
        <p className="text-gray-500 mt-4 text-sm">
          Secure authentication powered by Replit
        </p>
      </div>
    </div>
  );
};
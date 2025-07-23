@@ .. @@
 import React from 'react';
-import { Bell, Menu, Sparkles } from 'lucide-react';
+import { Bell, Menu, Sparkles, Brain, Zap } from 'lucide-react';
 import { User } from '../../types';

@@ .. @@
 export const Navigation: React.FC<NavigationProps> = ({ user, onLogout, onAskGemini }) => {
   const handleNotificationsClick = () => {
-    alert('🔔 Notifications\n\n• Alex Chen viewed your profile (1 hour ago)\n• Maya Patel sent you a message (3 hours ago)\n• New hackathon match available (5 hours ago)');
+    alert('🔔 AI-Powered Notifications\n\n• 🤖 Gemini found 3 new compatible matches (2 min ago)\n• 💬 AI suggests responding to Maya\'s message (1 hour ago)\n• 🚀 New project idea generated based on your skills (3 hours ago)\n• 📈 Your profile strength increased to 85% (5 hours ago)');
   };

@@ .. @@
         <div className="flex items-center space-x-3">
           <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
-            <Menu className="h-6 w-6" />
+            <Brain className="h-6 w-6" />
           </div>
-          <span className="text-xl font-bold">CollabMate</span>
+          <div>
+            <span className="text-xl font-bold">CollabMate</span>
+            <div className="flex items-center text-xs text-purple-100">
+              <Sparkles className="h-3 w-3 mr-1" />
+              <span>Powered by Gemini AI</span>
+            </div>
+          </div>
         </div>
         
         <div className="flex items-center space-x-4">
+          <button 
+            onClick={() => onAskGemini()}
+            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-3 py-2 rounded-lg transition-colors shadow-lg"
+          >
+            <Zap className="h-4 w-4" />
+            <span className="hidden md:inline font-medium">Smart Assistant</span>
+          </button>
+          
           <button 
             onClick={onAskGemini}
-            className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg transition-colors"
+            className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg transition-colors border border-white border-opacity-20"
           >
             <Sparkles className="h-5 w-5" />
-            <span className="hidden md:inline">Ask Gemini</span>
+            <span className="hidden md:inline">Ask AI</span>
           </button>
           
           <button 
             onClick={handleNotificationsClick}
-            className="relative p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
+            className="relative p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors border border-white border-opacity-20"
           >
             <Bell className="h-6 w-6" />
-            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
-              3
+            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
+              4
             </span>
           </button>
           
           <div 
             id="profile-btn"
             onClick={handleProfileClick}
-            className="flex items-center space-x-3 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-lg px-2 py-1 transition-colors">
+            className="flex items-center space-x-3 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-lg px-2 py-1 transition-colors border border-white border-opacity-20">
             <img
               src={user.avatar}
               alt={user.name}
@@ .. @@
             <div className="hidden md:block">
               <p className="font-medium">{user.name}</p>
-              <p className="text-xs text-purple-100">{user.email}</p>
+              <div className="flex items-center text-xs text-purple-100">
+                <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
+                <span>AI Enhanced Profile</span>
+              </div>
             </div>
           </div>
         </div>
       </div>
     </nav>
   );
 };
@@ .. @@
 import React from 'react';
-import { Users, Plus, FileText, Activity, MapPin, TrendingUp, Sparkles } from 'lucide-react';
+import { Users, Plus, FileText, Activity, MapPin, TrendingUp, Sparkles, Brain, Zap, Rocket } from 'lucide-react';
 import { User } from '../../types';

@@ .. @@
       {/* User Card */}
-      <div className="bg-white rounded-lg shadow-md p-6">
+      <div className="bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-md p-6 border border-purple-100">
         <div className="flex items-center space-x-4 mb-4">
           <img
             src={user.avatar}
@@ .. @@
             <div className="flex mt-2 space-x-1">
               <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
-                Hackathons
+                AI-Enhanced
               </span>
               <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
-                Projects
+                Smart Matching
               </span>
             </div>
           </div>
@@ .. @@
         <div className="space-y-3">
           {user.profileStrength < 80 && (
-            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
+            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 mb-4">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-medium text-yellow-800">Complete Profile</span>
-                <TrendingUp className="h-4 w-4 text-yellow-600" />
+                <Brain className="h-4 w-4 text-yellow-600" />
               </div>
               <p className="text-xs text-yellow-700 mb-2">
-                Boost your profile to get better matches!
+                AI suggests completing your profile for better matches!
               </p>
               <button
                 onClick={() => {
                   window.location.reload(); // Simple way to trigger profile completion check
                 }}
-                className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition-colors"
+                className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-3 py-1 rounded transition-colors"
               >
-                Complete Now
+                AI Optimize
               </button>
             </div>
           )}
           
           <div className="flex justify-between items-center">
-            <span className="text-sm font-medium text-gray-700">Profile Strength</span>
-            <span className="text-sm font-bold text-indigo-600">{user.profileStrength}%</span>
+            <span className="text-sm font-medium text-gray-700 flex items-center">
+              <Sparkles className="h-3 w-3 mr-1 text-purple-500" />
+              AI Profile Score
+            </span>
+            <span className="text-sm font-bold text-purple-600">{user.profileStrength}%</span>
           </div>
           <div className="w-full bg-gray-200 rounded-full h-2">
             <div
-              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
+              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
               style={{ width: `${user.profileStrength}%` }}
             />
           </div>
@@ .. @@
       {/* Quick Actions */}
-      <div className="bg-white rounded-lg shadow-md p-6">
-        <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
+      <div className="bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-md p-6 border border-indigo-100">
+        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
+          <Zap className="h-5 w-5 text-indigo-500 mr-2" />
+          AI-Powered Actions
+        </h3>
         <div className="space-y-3">
           <button
             onClick={onAskGemini}
-            className="w-full flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 text-purple-700 rounded-lg px-4 py-3 transition-colors"
+            className="w-full flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg px-4 py-3 transition-colors shadow-lg"
           >
-            <Sparkles className="h-5 w-5" />
-            <span>Ask Gemini AI</span>
+            <Brain className="h-5 w-5" />
+            <span>Ask Gemini AI Assistant</span>
           </button>
           
           <button
             onClick={onFindTeammates}
-            className="w-full flex items-center space-x-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg px-4 py-3 transition-colors"
+            className="w-full flex items-center space-x-3 bg-gradient-to-r from-indigo-100 to-blue-100 hover:from-indigo-200 hover:to-blue-200 text-indigo-700 rounded-lg px-4 py-3 transition-colors"
           >
-            <Users className="h-5 w-5" />
-            <span>Find Teammates</span>
+            <div className="flex items-center">
+              <Users className="h-5 w-5 mr-1" />
+              <Sparkles className="h-3 w-3" />
+            </div>
+            <span>AI Smart Matching</span>
           </button>
           
           <button
             onClick={onCreateTeam}
-            className="w-full flex items-center space-x-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg px-4 py-3 transition-colors"
+            className="w-full flex items-center space-x-3 bg-gradient-to-r from-green-100 to-teal-100 hover:from-green-200 hover:to-teal-200 text-green-700 rounded-lg px-4 py-3 transition-colors"
           >
-            <Plus className="h-5 w-5" />
-            <span>Create Team</span>
+            <div className="flex items-center">
+              <Plus className="h-5 w-5 mr-1" />
+              <Brain className="h-3 w-3" />
+            </div>
+            <span>AI Team Builder</span>
           </button>
           
           <button
             onClick={onRecommendedProjects}
-            className="w-full flex items-center space-x-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg px-4 py-3 transition-colors"
+            className="w-full flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 rounded-lg px-4 py-3 transition-colors"
           >
-            <FileText className="h-5 w-5" />
-            <span>Recommended Projects</span>
+            <div className="flex items-center">
+              <Rocket className="h-5 w-5 mr-1" />
+              <Sparkles className="h-3 w-3" />
+            </div>
+            <span>AI Project Ideas</span>
           </button>
         </div>
       </div>

@@ .. @@
       {/* Recent Activity */}
-      <div className="bg-white rounded-lg shadow-md p-6">
-        <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
+      <div className="bg-gradient-to-br from-white to-green-50 rounded-lg shadow-md p-6 border border-green-100">
+        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
+          <Activity className="h-5 w-5 text-green-500 mr-2" />
+          AI-Tracked Activity
+        </h3>
         <div className="space-y-4">
           <div className="flex items-start space-x-3">
+            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
+              <Brain className="h-4 w-4 text-white" />
+            </div>
+            <div>
+              <p className="text-sm">
+                <span className="font-semibold">Gemini AI</span> found 3 new compatible matches
+              </p>
+              <p className="text-xs text-gray-500">2 minutes ago</p>
+            </div>
+          </div>
+          
+          <div className="flex items-start space-x-3">
             <img
               src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1"
               alt="Alex Chen"
@@ .. @@
             <div>
               <p className="text-sm">
-                <span className="font-semibold">Alex Chen</span> viewed your profile
+                <span className="font-semibold">Alex Chen</span> viewed your AI-enhanced profile
               </p>
               <p className="text-xs text-gray-500">1 hour ago</p>
             </div>
@@ .. @@
             <div>
               <p className="text-sm">
-                <span className="font-semibold">Maya Patel</span> sent you a message
+                <span className="font-semibold">Maya Patel</span> sent an AI-assisted message
               </p>
               <p className="text-xs text-gray-500">3 hours ago</p>
             </div>
@@ .. @@
           
           <div className="flex items-start space-x-3">
-            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
-              <Activity className="h-4 w-4 text-white" />
+            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
+              <Rocket className="h-4 w-4 text-white" />
             </div>
             <div>
               <p className="text-sm">
-                You joined <span className="font-semibold">FinTech Innovators</span> team
+                AI suggested joining <span className="font-semibold">FinTech Innovators</span> team
               </p>
               <p className="text-xs text-gray-500">Yesterday</p>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };
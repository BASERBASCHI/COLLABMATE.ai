@@ .. @@
 import React from 'react';
-import { TrendingUp, Eye, MessageSquare, MapPin, Clock } from 'lucide-react';
+import { TrendingUp, Eye, MessageSquare, MapPin, Clock, Sparkles, Brain } from 'lucide-react';
 import { Match } from '../../types';

@@ .. @@
   return (
-    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200">
+    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 relative">
+      {/* AI Badge */}
+      <div className="absolute top-3 right-3">
+        <div className="flex items-center bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
+          <Brain className="h-3 w-3 mr-1" />
+          AI Match
+        </div>
+      </div>
+      
       <div className="flex items-start space-x-4">
         <img
           src={match.user.avatar}
@@ .. @@
           <div className="flex justify-between items-start">
             <h4 className="font-bold text-gray-800">{match.user.name}</h4>
             <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
-              <TrendingUp className="h-3 w-3 mr-1" />
+              <Sparkles className="h-3 w-3 mr-1" />
               {match.compatibility}%
             </div>
           </div>
@@ .. @@
           <div className="mt-3">
-            <p className="text-xs text-gray-500 italic">"{match.reason}"</p>
+            <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
+              <div className="flex items-center mb-1">
+                <Sparkles className="h-3 w-3 text-purple-500 mr-1" />
+                <span className="text-xs font-medium text-purple-700">AI Analysis</span>
+              </div>
+              <p className="text-xs text-purple-600 italic">"{match.reason}"</p>
+            </div>
           </div>
           
           <div className="flex space-x-3 mt-4">
             <button
               onClick={handleViewProfile}
-              className="flex items-center space-x-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
+              className="flex items-center space-x-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
             >
               <Eye className="h-4 w-4" />
               <span>View Profile</span>
             </button>
             <button
               onClick={handleSendMessage}
-              className="flex items-center space-x-2 text-sm border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
+              className="flex items-center space-x-2 text-sm border border-purple-300 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors"
             >
               <MessageSquare className="h-4 w-4" />
-              <span>Send Message</span>
+              <span>AI Chat</span>
             </button>
           </div>
         </div>
       </div>
     </div>
   );
 };
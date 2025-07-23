@@ .. @@
 import React from 'react';
-import { Clock, Users } from 'lucide-react';
+import { Clock, Users, Brain, Sparkles, TrendingUp } from 'lucide-react';
 import { ProjectSuggestion as ProjectSuggestionType } from '../../types';

@@ .. @@
   return (
-    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
+    <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow relative">
+      {/* AI Badge */}
+      <div className="absolute top-4 right-4">
+        <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
+          <Brain className="h-3 w-3 mr-1" />
+          Gemini AI
+        </div>
+      </div>
+      
       <div className="flex justify-between items-start">
         <div className="flex-1">
-          <h4 className="font-bold text-gray-800 mb-2">{suggestion.title}</h4>
+          <div className="flex items-center mb-2">
+            <Sparkles className="h-5 w-5 text-green-500 mr-2" />
+            <h4 className="font-bold text-gray-800">{suggestion.title}</h4>
+          </div>
           <p className="text-sm text-gray-600 mb-4">{suggestion.description}</p>
           
           <div className="flex flex-wrap gap-2 mb-4">
             {suggestion.technologies.map((tech, index) => (
               <span
                 key={index}
-                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
+                className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
               >
                 {tech}
               </span>
@@ .. @@
           <div className="space-y-2">
             <div className="flex items-center text-xs text-gray-500">
               <Clock className="h-4 w-4 mr-2" />
-              Estimated time: {suggestion.estimatedTime}
+              <span>Estimated time: {suggestion.estimatedTime}</span>
             </div>
             <div className="flex items-center text-xs text-gray-500">
               <Users className="h-4 w-4 mr-2" />
-              {suggestion.suggestedTeammates} potential teammates
+              <span>{suggestion.suggestedTeammates} potential teammates</span>
+            </div>
+            <div className="flex items-center text-xs text-gray-500">
+              <TrendingUp className="h-4 w-4 mr-2" />
+              <span>High collaboration potential</span>
             </div>
           </div>
           
-          <div className="mt-3">
-            <p className="text-xs text-gray-500">{suggestion.reason}</p>
+          <div className="mt-3 bg-white bg-opacity-50 rounded-lg p-3">
+            <div className="flex items-center mb-1">
+              <Brain className="h-3 w-3 text-green-500 mr-1" />
+              <span className="text-xs font-medium text-green-700">AI Recommendation</span>
+            </div>
+            <p className="text-xs text-green-600">{suggestion.reason}</p>
           </div>
         </div>
         
         <button
           onClick={handleFindTeam}
-          className="ml-4 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
+          className="ml-4 text-sm bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
         >
-          Find Team
+          <Users className="h-4 w-4" />
+          <span>Find AI Matches</span>
         </button>
       </div>
     </div>
   );
 };
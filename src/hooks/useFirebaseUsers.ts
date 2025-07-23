@@ .. @@
       snapshot.docs.forEach(doc => {
         const userData = doc.data() as FirebaseUser;
         
         fetchedUsers.push({
-          id: userData.uid,
-          name: userData.displayName || 'Anonymous User',
+          id: userData.uid || doc.id,
+          name: userData.displayName || 'User',
           email: userData.email,
-          title: userData.title || 'Developer',
-          avatar: userData.photoURL || generateRealisticAvatar(userData.displayName || 'User', userData.email),
+          title: userData.title || 'Software Developer',
+          avatar: userData.photoURL || generateRealisticAvatar(userData.displayName || 'User', userData.email || ''),
           skills: userData.skills || [],
           interests: userData.interests || [],
-          experience: userData.experience || 'Beginner',
+          experience: userData.experience || 'Intermediate',
           github: userData.github,
           linkedin: userData.linkedin,
           portfolio: userData.portfolio,
           location: userData.location,
-          isProfileComplete: userData.isProfileComplete || false,
+          isProfileComplete: userData.isProfileComplete || true,
           preferences: {
-            availability: userData.availability || 'Weekends',
-            timezone: userData.timezone || 'UTC',
-            roles: userData.preferredRoles || [],
-            communication: userData.communicationStyle || 'Slack',
-            hackathonPreference: userData.hackathonPreference || 'Virtual',
+            availability: userData.preferences?.availability || userData.availability || 'Part-time',
+            timezone: userData.preferences?.timezone || userData.timezone || 'UTC-8',
+            roles: userData.preferences?.roles || userData.preferredRoles || ['Frontend Developer'],
+            communication: userData.preferences?.communication || userData.communicationStyle || 'Slack',
+            hackathonPreference: userData.preferences?.hackathonPreference || userData.hackathonPreference || 'Virtual',
             remoteWork: userData.remoteWork || true,
-            maxDistance: userData.maxDistance,
-            workStyle: userData.workStyle || [],
-            personalityTags: userData.personalityTags || [],
-            codingHours: userData.codingHours || '',
-            collaborationStyle: userData.collaborationStyle || '',
-            projectPace: userData.projectPace || ''
+            maxDistance: userData.preferences?.maxDistance || userData.maxDistance || 50,
+            workStyle: userData.preferences?.workStyle || userData.workStyle || ['Agile/Scrum'],
+            personalityTags: userData.preferences?.personalityTags || userData.personalityTags || ['🤖 Tech Geek'],
+            codingHours: userData.preferences?.codingHours || userData.codingHours || '🌆 Evening (5-9 PM)',
+            collaborationStyle: userData.preferences?.collaborationStyle || userData.collaborationStyle || '🤝 Highly Collaborative',
+            projectPace: userData.preferences?.projectPace || userData.projectPace || '⚡ Quick Sprints'
           },
           profileStrength: userData.profileStrength || 75,
-          about: userData.bio || '',
+          about: userData.bio || 'Passionate about building innovative solutions and collaborating with talented teams.',
           projects: [], // Will be fetched separately if needed
-          createdAt: userData.createdAt ? new Date(userData.createdAt.toDate()).toISOString() : new Date().toISOString(),
-          lastActive: userData.lastActive ? new Date(userData.lastActive.toDate()).toISOString() : new Date().toISOString()
+          createdAt: userData.createdAt?.toDate ? userData.createdAt.toDate().toISOString() : new Date().toISOString(),
+          lastActive: userData.lastActive?.toDate ? userData.lastActive.toDate().toISOString() : new Date().toISOString()
         });
       });
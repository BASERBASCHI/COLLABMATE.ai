@@ .. @@
   useEffect(() => {
     if (!firebaseUser) {
       setUserProfile(null);
       setLoading(false);
       return;
     }

     fetchUserProfile();
   }, [firebaseUser]);

   const fetchUserProfile = async () => {
     if (!firebaseUser) return;

     try {
       setLoading(true);
       const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, firebaseUser.uid));
       
       if (userDoc.exists()) {
         const data = userDoc.data();
+        
+        // Convert Firestore data to User interface format
         setUserProfile({
           id: firebaseUser.uid,
-          name: data.displayName || firebaseUser.displayName || 'Anonymous User',
+          name: data.displayName || firebaseUser.displayName || 'User',
           email: firebaseUser.email || '',
-          avatar: data.photoURL || firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
-          title: data.title || 'Developer',
-          about: data.about || 'No bio available',
+          avatar: data.photoURL || firebaseUser.photoURL || generateRealisticAvatar(firebaseUser.displayName || 'User', firebaseUser.email || ''),
+          title: data.title || 'Software Developer',
+          about: data.bio || 'Passionate about building innovative solutions and collaborating with talented teams.',
           skills: data.skills || [],
           interests: data.interests || [],
-          experience: data.experience || 'Beginner',
-          location: data.location || { city: '', country: '' },
+          experience: data.experience || 'Intermediate',
+          location: data.location || { city: 'San Francisco', country: 'United States' },
           github: data.github,
           linkedin: data.linkedin,
           portfolio: data.portfolio,
           preferences: data.preferences || {
-            availability: '',
-            timezone: '',
+            availability: 'Part-time',
+            timezone: 'UTC-8',
             roles: [],
-            communication: '',
-            hackathonPreference: '',
+            communication: 'Slack',
+            hackathonPreference: 'Virtual',
             remoteWork: true,
             maxDistance: 50,
             workStyle: [],
             personalityTags: [],
-            codingHours: '',
-            collaborationStyle: '',
-            projectPace: ''
+            codingHours: '🌆 Evening (5-9 PM)',
+            collaborationStyle: '🤝 Highly Collaborative',
+            projectPace: '⚡ Quick Sprints'
           },
-          profileStrength: data.profileStrength || 20,
-          isProfileComplete: data.isProfileComplete || false,
-          createdAt: data.createdAt || new Date(),
-          updatedAt: data.updatedAt || new Date()
+          profileStrength: data.profileStrength || 75,
+          isProfileComplete: data.isProfileComplete || true,
+          projects: [], // Will be populated separately if needed
+          createdAt: data.createdAt?.toDate?.() || new Date(),
+          lastActive: data.lastActive?.toDate?.() || new Date()
         });
       } else {
-        // Create a new user profile
-        const newProfile: Partial<User> = {
-          displayName: firebaseUser.displayName || 'New User',
+        // User doesn't exist in Firestore, this shouldn't happen with proper auth flow
+        // But we'll handle it gracefully
+        const newProfile = {
+          uid: firebaseUser.uid,
           email: firebaseUser.email || '',
-          photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
-          title: 'Developer',
-          about: 'Welcome to CollabMate! Let me help you find your perfect coding partner.',
-          skills: [],
-          interests: [],
-          experience: 'Beginner',
-          location: { city: '', country: '' },
+          displayName: firebaseUser.displayName || 'New User',
+          photoURL: firebaseUser.photoURL || generateRealisticAvatar(firebaseUser.displayName || 'User', firebaseUser.email || ''),
+          title: 'Software Developer',
+          bio: 'Passionate about building innovative solutions and collaborating with talented teams.',
+          skills: ['JavaScript', 'React', 'Node.js'],
+          interests: ['Web Development', 'Open Source'],
+          experience: 'Intermediate',
+          location: { city: 'San Francisco', country: 'United States' },
           preferences: {
-            availability: '',
-            timezone: '',
-            roles: [],
-            communication: '',
-            hackathonPreference: '',
+            availability: 'Part-time',
+            timezone: 'UTC-8',
+            roles: ['Frontend Developer'],
+            communication: 'Slack',
+            hackathonPreference: 'Virtual',
             remoteWork: true,
             maxDistance: 50,
-            workStyle: [],
-            personalityTags: [],
-            codingHours: '',
-            collaborationStyle: '',
-            projectPace: ''
+            workStyle: ['Agile/Scrum'],
+            personalityTags: ['🤖 Tech Geek', '☕ Coffee Addict'],
+            codingHours: '🌆 Evening (5-9 PM)',
+            collaborationStyle: '🤝 Highly Collaborative',
+            projectPace: '⚡ Quick Sprints'
           },
-          profileStrength: 20,
-          isProfileComplete: false,
+          profileStrength: 75,
+          isProfileComplete: true,
           createdAt: new Date(),
-          updatedAt: new Date()
+          updatedAt: new Date(),
+          lastActive: new Date()
         };

         await setDoc(doc(db, COLLECTIONS.USERS, firebaseUser.uid), newProfile);
         
         setUserProfile({
           id: firebaseUser.uid,
-          name: newProfile.displayName!,
-          email: newProfile.email!,
-          avatar: newProfile.photoURL!,
-          title: newProfile.title!,
-          about: newProfile.about!,
-          skills: newProfile.skills!,
-          interests: newProfile.interests!,
-          experience: newProfile.experience!,
-          location: newProfile.location!,
+          name: newProfile.displayName,
+          email: newProfile.email,
+          avatar: newProfile.photoURL,
+          title: newProfile.title,
+          about: newProfile.bio,
+          skills: newProfile.skills,
+          interests: newProfile.interests,
+          experience: newProfile.experience,
+          location: newProfile.location,
           github: '',
           linkedin: '',
           portfolio: '',
-          preferences: newProfile.preferences!,
-          profileStrength: newProfile.profileStrength!,
-          isProfileComplete: newProfile.isProfileComplete!,
-          createdAt: newProfile.createdAt!,
-          updatedAt: newProfile.updatedAt!
+          preferences: newProfile.preferences,
+          profileStrength: newProfile.profileStrength,
+          isProfileComplete: newProfile.isProfileComplete,
+          projects: [],
+          createdAt: newProfile.createdAt,
+          lastActive: newProfile.lastActive
         });
       }
     } catch (err) {
@@ .. @@
     return Math.min(strength, 100);
   };

   return {
     userProfile,
     loading,
     error,
     updateProfile,
     refreshProfile: fetchUserProfile
   };
 };
+
+// Generate realistic avatars based on user info
+const generateRealisticAvatar = (name: string, email: string): string => {
+  const avatars = [
+    'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
+    'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
+    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
+    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
+    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
+    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
+    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
+    'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
+  ];
+  
+  // Use email hash to consistently assign same avatar to same user
+  const hash = email.split('').reduce((a, b) => {
+    a = ((a << 5) - a) + b.charCodeAt(0);
+    return a & a;
+  }, 0);
+  
+  return avatars[Math.abs(hash) % avatars.length];
+};
@@ .. @@
   const signup = async (email: string, password: string, displayName?: string) => {
     try {
       const result = await createUserWithEmailAndPassword(auth, email, password);
       
-      // Create user profile in Firestore
+      // Create comprehensive user profile in Firestore with realistic data
+      const userProfile = createRealisticUserProfile(result.user, displayName);
       await setDoc(doc(db, 'users', result.user.uid), {
-        email: result.user.email,
-        displayName: displayName || '',
+        uid: result.user.uid,
+        email: result.user.email,
+        displayName: displayName || result.user.displayName || 'New User',
+        photoURL: result.user.photoURL || generateRealisticAvatar(displayName || 'User', result.user.email || ''),
+        ...userProfile,
         createdAt: new Date(),
-        profileComplete: false,
+        updatedAt: new Date(),
+        lastActive: new Date(),
+        isProfileComplete: true,
+        profileStrength: 75
       });
 
       return result.user as FirebaseUser;
@@ .. @@
       // Check if user profile exists, create if not
       const userDoc = await getDoc(doc(db, 'users', result.user.uid));
       if (!userDoc.exists()) {
+        const userProfile = createRealisticUserProfile(result.user);
         await setDoc(doc(db, 'users', result.user.uid), {
+          uid: result.user.uid,
           email: result.user.email,
           displayName: result.user.displayName || '',
           photoURL: result.user.photoURL || '',
+          ...userProfile,
           createdAt: new Date(),
-          profileComplete: false,
+          updatedAt: new Date(),
+          lastActive: new Date(),
+          isProfileComplete: true,
+          profileStrength: 80
         });
       }
 
@@ .. @@
     updateProfile,
   };
 };
+
+// Helper function to create realistic user profiles based on email domain and name
+const createRealisticUserProfile = (user: any, displayName?: string) => {
+  const email = user.email || '';
+  const name = displayName || user.displayName || '';
+  const domain = email.split('@')[1]?.toLowerCase() || '';
+  
+  // Determine user type based on email domain
+  const isStudent = domain.includes('edu') || domain.includes('student') || 
+                   domain.includes('university') || domain.includes('college');
+  const isTech = domain.includes('google') || domain.includes('microsoft') || 
+                domain.includes('apple') || domain.includes('meta') || 
+                domain.includes('amazon') || domain.includes('netflix');
+  
+  // Base profile structure
+  let profile = {
+    title: 'Software Developer',
+    bio: 'Passionate about building innovative solutions and collaborating with talented teams.',
+    experience: 'Intermediate',
+    skills: ['JavaScript', 'React', 'Node.js'],
+    interests: ['Web Development', 'Open Source'],
+    location: {
+      city: 'San Francisco',
+      country: 'United States'
+    },
+    preferences: {
+      availability: 'Part-time',
+      timezone: 'UTC-8',
+      roles: ['Frontend Developer'],
+      communication: 'Slack',
+      hackathonPreference: 'Virtual',
+      remoteWork: true,
+      maxDistance: 50,
+      workStyle: ['Agile/Scrum'],
+      personalityTags: ['🤖 Tech Geek', '☕ Coffee Addict'],
+      codingHours: '🌆 Evening (5-9 PM)',
+      collaborationStyle: '🤝 Highly Collaborative',
+      projectPace: '⚡ Quick Sprints'
+    }
+  };
+  
+  // Customize based on user type
+  if (isStudent) {
+    profile = {
+      ...profile,
+      title: 'Computer Science Student',
+      bio: 'CS student passionate about learning new technologies and working on exciting projects with fellow students.',
+      experience: 'Beginner',
+      skills: ['Python', 'Java', 'HTML', 'CSS', 'JavaScript'],
+      interests: ['Machine Learning', 'Web Development', 'Mobile Apps'],
+      location: {
+        city: 'Boston',
+        country: 'United States'
+      },
+      preferences: {
+        ...profile.preferences,
+        availability: 'Weekends',
+        roles: ['Full Stack Developer', 'ML Engineer'],
+        hackathonPreference: 'Both',
+        personalityTags: ['📚 Bookworm', '🎮 Gamer', '🌱 Eco-Friendly'],
+        codingHours: '🦉 Night Owl (9 PM-1 AM)',
+        collaborationStyle: '⚖️ Balanced Team/Solo',
+        projectPace: '🎯 Steady Progress'
+      }
+    };
+  } else if (isTech) {
+    profile = {
+      ...profile,
+      title: 'Senior Software Engineer',
+      bio: 'Experienced engineer with a passion for scalable systems and mentoring junior developers.',
+      experience: 'Expert',
+      skills: ['TypeScript', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
+      interests: ['Cloud Architecture', 'DevOps', 'System Design'],
+      location: {
+        city: 'Seattle',
+        country: 'United States'
+      },
+      preferences: {
+        ...profile.preferences,
+        availability: 'Full-time',
+        timezone: 'UTC-8',
+        roles: ['Tech Lead', 'Senior Developer'],
+        communication: 'Slack',
+        workStyle: ['Agile/Scrum', 'Code Review Focused'],
+        personalityTags: ['🚀 Startup Enthusiast', '🧘 Zen Coder', '💡 Idea Generator'],
+        codingHours: '☀️ Morning (9 AM-12 PM)',
+        collaborationStyle: '👥 Pair Programming Lover',
+        projectPace: '🚀 Fast & Furious'
+      }
+    };
+  }
+  
+  // Add some randomization based on name/email
+  const nameHash = (name + email).split('').reduce((a, b) => {
+    a = ((a << 5) - a) + b.charCodeAt(0);
+    return a & a;
+  }, 0);
+  
+  const additionalSkills = [
+    'Vue.js', 'Angular', 'Svelte', 'Flutter', 'React Native',
+    'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Firebase',
+    'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn'
+  ];
+  
+  const additionalInterests = [
+    'Blockchain', 'Cryptocurrency', 'IoT', 'Cybersecurity', 'Game Development',
+    'Data Visualization', 'UX/UI Design', 'Technical Writing', 'Open Source'
+  ];
+  
+  // Add 2-3 random additional skills and interests
+  const randomSkills = additionalSkills
+    .sort(() => 0.5 - Math.random())
+    .slice(0, Math.abs(nameHash) % 3 + 1);
+  
+  const randomInterests = additionalInterests
+    .sort(() => 0.5 - Math.random())
+    .slice(0, Math.abs(nameHash) % 2 + 1);
+  
+  profile.skills = [...profile.skills, ...randomSkills];
+  profile.interests = [...profile.interests, ...randomInterests];
+  
+  return profile;
+};
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
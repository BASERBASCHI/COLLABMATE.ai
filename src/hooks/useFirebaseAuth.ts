import { useState, useEffect } from 'react';
import { 
  User as FirebaseAuthUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db, COLLECTIONS, FirebaseUser } from '../lib/firebase';
import { User } from '../types';

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await fetchUserProfile(firebaseUser);
        setShowLoginModal(false);
        setShowSignupModal(false);
      } else {
        setUser(null);
        setShowLoginModal(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (firebaseUser: FirebaseAuthUser) => {
    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as FirebaseUser;
        
        // Fetch user's projects
        const projectsQuery = query(
          collection(db, COLLECTIONS.PROJECTS),
          where('userId', '==', firebaseUser.uid)
        );
        const projectsSnapshot = await getDocs(projectsQuery);
        const projects = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const userProfile: User = {
          id: userData.uid,
          name: userData.displayName,
          email: userData.email,
          title: userData.title,
          avatar: userData.photoURL || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          skills: userData.skills || [],
          interests: userData.interests || [],
          experience: userData.experience || 'Beginner',
          github: userData.github,
          linkedin: userData.linkedin,
          portfolio: userData.portfolio,
          location: userData.location,
          isProfileComplete: userData.isProfileComplete || false,
          preferences: {
            availability: userData.availability || '',
            timezone: userData.timezone || '',
            roles: userData.preferredRoles || [],
            communication: userData.communicationStyle || '',
            hackathonPreference: userData.hackathonPreference || '',
            remoteWork: userData.remoteWork || true,
            maxDistance: userData.maxDistance,
            workStyle: userData.workStyle || [],
            personalityTags: userData.personalityTags || [],
            codingHours: userData.codingHours || '',
            collaborationStyle: userData.collaborationStyle || '',
            projectPace: userData.projectPace || ''
          },
          profileStrength: userData.profileStrength || 20,
          about: userData.bio || '',
          createdAt: userData.createdAt ? new Date(userData.createdAt.toDate()).toISOString() : new Date().toISOString(),
          lastActive: userData.lastActive ? new Date(userData.lastActive.toDate()).toISOString() : new Date().toISOString(),
          projects: projects.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            technologies: p.technologies,
            status: p.status
          }))
        };
        setUser(userProfile);
      } else {
        // Create initial profile for new user
        await createInitialProfile(firebaseUser);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Set a basic user profile even if there's an error
      const basicProfile: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'New User',
        email: firebaseUser.email || '',
        title: 'New User',
        avatar: firebaseUser.photoURL || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        skills: ['JavaScript', 'React', 'Node.js'],
        interests: ['Web Development', 'Mobile Apps'],
        experience: 'Beginner',
        isProfileComplete: false,
        preferences: {
          availability: 'Weekends',
          timezone: 'UTC',
          roles: ['Frontend Developer'],
          communication: 'Slack',
          hackathonPreference: 'Virtual',
          remoteWork: true,
          workStyle: [],
          personalityTags: [],
          codingHours: '',
          collaborationStyle: '',
          projectPace: ''
        },
        profileStrength: 20,
        about: 'New user exploring collaboration opportunities',
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        projects: []
      };
      setUser(basicProfile);
    }
  };

  const createInitialProfile = async (firebaseUser: FirebaseAuthUser) => {
    try {
      const initialProfile: FirebaseUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'New User',
        photoURL: firebaseUser.photoURL,
        title: 'New User',
        bio: '',
        skills: [],
        interests: [],
        experience: 'Beginner',
        isProfileComplete: false,
        availability: '',
        timezone: '',
        preferredRoles: [],
        communicationStyle: '',
        hackathonPreference: '',
        remoteWork: true,
        workStyle: [],
        personalityTags: [],
        codingHours: '',
        collaborationStyle: '',
        projectPace: '',
        maxDistance: 50,
        profileStrength: 20,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastActive: serverTimestamp()
      };

      await setDoc(doc(db, COLLECTIONS.USERS, firebaseUser.uid), initialProfile);
      await fetchUserProfile(firebaseUser);
    } catch (error) {
      console.error('Error creating initial profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Google login error:', error);
      alert(`Google login failed: ${error.message}`);
    }
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });

      // The profile will be created automatically by the auth state change listener
    } catch (error: any) {
      console.error('Signup error:', error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserProfile = async (updates: Partial<FirebaseUser>) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, user.id);
      
      // Prepare updates with proper field mapping
      const cleanUpdates: any = {
        updatedAt: serverTimestamp(),
        lastActive: serverTimestamp()
      };

      // Map the updates to the correct Firestore field names
      if (updates.displayName !== undefined) cleanUpdates.displayName = updates.displayName;
      if (updates.title !== undefined) cleanUpdates.title = updates.title;
      if (updates.bio !== undefined) cleanUpdates.bio = updates.bio;
      if (updates.skills !== undefined) cleanUpdates.skills = updates.skills;
      if (updates.interests !== undefined) cleanUpdates.interests = updates.interests;
      if (updates.experience !== undefined) cleanUpdates.experience = updates.experience;
      if (updates.github !== undefined) cleanUpdates.github = updates.github;
      if (updates.linkedin !== undefined) cleanUpdates.linkedin = updates.linkedin;
      if (updates.portfolio !== undefined) cleanUpdates.portfolio = updates.portfolio;
      if (updates.location !== undefined) cleanUpdates.location = updates.location;
      if (updates.availability !== undefined) cleanUpdates.availability = updates.availability;
      if (updates.timezone !== undefined) cleanUpdates.timezone = updates.timezone;
      if (updates.preferredRoles !== undefined) cleanUpdates.preferredRoles = updates.preferredRoles;
      if (updates.communicationStyle !== undefined) cleanUpdates.communicationStyle = updates.communicationStyle;
      if (updates.hackathonPreference !== undefined) cleanUpdates.hackathonPreference = updates.hackathonPreference;
      if (updates.remoteWork !== undefined) cleanUpdates.remoteWork = updates.remoteWork;
      if (updates.maxDistance !== undefined) cleanUpdates.maxDistance = updates.maxDistance;
      if (updates.workStyle !== undefined) cleanUpdates.workStyle = updates.workStyle;
      if (updates.personalityTags !== undefined) cleanUpdates.personalityTags = updates.personalityTags;
      if (updates.codingHours !== undefined) cleanUpdates.codingHours = updates.codingHours;
      if (updates.collaborationStyle !== undefined) cleanUpdates.collaborationStyle = updates.collaborationStyle;
      if (updates.projectPace !== undefined) cleanUpdates.projectPace = updates.projectPace;
      if (updates.profileStrength !== undefined) cleanUpdates.profileStrength = updates.profileStrength;
      if (updates.isProfileComplete !== undefined) cleanUpdates.isProfileComplete = updates.isProfileComplete;
      
      console.log('Updating profile with:', cleanUpdates);
      await updateDoc(userDocRef, cleanUpdates);
      
      // Refresh user profile
      const currentUser = auth.currentUser;
      if (currentUser) {
        await fetchUserProfile(currentUser);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error; // Re-throw to handle in calling function
    }
  };

  return {
    user,
    loading,
    showLoginModal,
    showSignupModal,
    setShowLoginModal,
    setShowSignupModal,
    login,
    loginWithGoogle,
    signup,
    logout,
    updateUserProfile
  };
};
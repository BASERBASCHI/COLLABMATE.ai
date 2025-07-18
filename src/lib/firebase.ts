import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6YwCfTn79hYO0iEBGbKU-TqvABUQiE_U",
  authDomain: "collabmate-1b221.firebaseapp.com",
  projectId: "collabmate-1b221",
  storageBucket: "collabmate-1b221.firebasestorage.app",
  messagingSenderId: "420991959380",
  appId: "1:420991959380:web:4fe9203020b5d1953fc8c1",
  measurementId: "G-SSNSGGCZVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

// Firestore collection names
export const COLLECTIONS = {
  USERS: 'users',
  PROJECTS: 'projects',
  MATCHES: 'matches',
  MESSAGES: 'messages',
  TEAMS: 'teams'
};

// User profile interface for Firestore
export interface FirebaseUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  title: string;
  bio: string;
  skills: string[];
  interests: string[];
  experience: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  location?: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  isProfileComplete: boolean;
  availability: string;
  timezone: string;
  preferredRoles: string[];
  communicationStyle: string;
  hackathonPreference: string;
  remoteWork: boolean;
  maxDistance?: number;
  workStyle: string[];
  personalityTags: string[];
  codingHours: string;
  collaborationStyle: string;
  projectPace: string;
  profileStrength: number;
  createdAt: any;
  updatedAt: any;
  lastActive: any;
}

export interface FirebaseProject {
  id: string;
  userId: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned';
  createdAt: any;
  updatedAt: any;
}

export interface FirebaseMatch {
  id: string;
  userId: string;
  matchedUserId: string;
  compatibilityScore: number;
  reason: string;
  commonSkills: string[];
  createdAt: any;
}

export interface FirebaseMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  messageType: 'user' | 'ai-suggestion';
  createdAt: any;
}
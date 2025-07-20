import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "collabmate-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "collabmate-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "collabmate-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Collection references
export const COLLECTIONS = {
  USERS: 'users',
  MATCHES: 'matches',
  MESSAGES: 'messages',
  PROJECTS: 'projects'
};

// Firebase types
export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isProfileComplete?: boolean;
  profileStrength?: number;
}

export interface FirebaseMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'suggestion';
}

export interface FirebaseMatch {
  id: string;
  userId: string;
  matchedUserId: string;
  score: number;
  status: 'pending' | 'accepted' | 'declined';
  timestamp: Date;
}

export default app;
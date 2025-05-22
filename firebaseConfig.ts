// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // if you're using Firestore
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBjI6guDe-XWCjvUYIPFYz1Aa3ZKxdduG4',
  authDomain: 'cs278-29576.firebaseapp.com',
  databaseURL: 'https://cs278-29576-default-rtdb.firebaseio.com',
  projectId: 'cs278-29576',
  storageBucket: 'cs278-29576.firebasestorage.app',
  messagingSenderId: '467508675893',
  appId: '1:467508675893:web:5b183b7334e7b2d7ec387c',
  measurementId: 'G-S2RVM5MPWF',
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// TODO: auth persistence
export const auth = initializeAuth(app);
// const analytics = getAnalytics(app);

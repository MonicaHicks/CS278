import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);

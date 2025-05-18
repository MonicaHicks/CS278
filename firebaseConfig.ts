// firebaseConfig.ts
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // if you're using Firestore

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

export const db = getFirestore(app);
// export const auth = getAuth(app);
const analytics = getAnalytics(app);

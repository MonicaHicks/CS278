import { auth, db } from '@/firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const getUserId = () => {
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  } else {
    console.error('No user is currently logged in.');
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signUp = async (
  email: string,
  password: string,
  name: string,
  screenName: string,
  photoURL: string,
  isClub: boolean,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      // Update firestore profile
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || undefined,
      });

      // Initializing user data in Firestore
      const userId = userCredential.user.uid;
      const userData = {
        name: name,
        image: photoURL || null,
        displayName: screenName,
        events: [],
        followers: [],
        following: [],
        createdAt: new Date(),
        isClub: false,
      };

      // Save user data in the 'users' table in Firestore
      await setDoc(doc(db, 'users', userId), userData);
      return userCredential.user;
    }
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
  return null;
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

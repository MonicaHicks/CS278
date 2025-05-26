import { User } from '@/components/types';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

// getUser
export async function getUser(userId: string): Promise<User | null> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  console.log('User id:', userId);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return {
      id: userId,
      name: userData.name,
      displayName: userData.displayName,
      image: userData.image,
      events: userData.events || [],
      following: userData.following || [],
      followers: userData.followers || [],
      isClub: userData.isClub || false,
    };
  }
  return null; // User does not exist
}

export const getUserImage = async (userId: string): Promise<string> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData.image || '';
    } else {
      console.warn(`No user found with ID: ${userId}`);
      return '';
    }
  } catch (error) {
    console.error('Error fetching user image:', error);
    return '';
  }
};

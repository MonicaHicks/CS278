import { User } from '@/components/types';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

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

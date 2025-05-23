import { doc, getDoc, DocumentReference } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

// getFollowers - probably want to change the return type to a list of user objects
// Return a list of reference IDs to a given user's followers
export async function getFollowers(userId: string): Promise<string[]> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const followers = userData.followers || [];
    return followers.map((docRef: DocumentReference) => docRef.id);
  }
  console.log('User does not exist');
  return [];
}

// getFollowing
// Return a list of reference IDs to a given user's following
export async function getFollowing(userId: string): Promise<string[]> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const following = userData.following || [];
    return following.map((docRef: DocumentReference) => docRef.id);
  }
  console.log('User does not exist');
  return [];
}

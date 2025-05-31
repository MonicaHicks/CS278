import { Friend, User } from '@/components/types';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { getRsvps } from './rsvpHooks';

// Fetch all friends for a user
// TODO: we could narrow this down by only considering
// the friends that mutually follow each other
export async function fetchFriends(userId: string): Promise<Friend[]> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const followingRefs = userData.following || [];
    console.log('Following:', followingRefs);
    const friends: Friend[] = [];

    for (const followingRef of followingRefs) {
      const followingDoc = await getDoc(followingRef);
      if (followingDoc.exists()) {
        const friendData: User = followingDoc.data() as User; // type: User

        // Get the events for this friend
        const friendEvents = await getRsvps(followingDoc.id);
        friends.push({
          id: followingDoc.id,
          name: friendData.name,
          image: friendData.image,
          displayName: friendData.displayName,
          events: friendEvents,
        });
      }
    }
    return friends;
  }
  return []; // User does not exist
}

import {
  doc,
  getDoc,
  DocumentReference,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { isDocumentReferenceInList } from './helpers';

// isFollowing
// Check if 'follower' is following a user
export async function isFollowing(followerId: string, userId: string): Promise<boolean> {
  const followerRef = doc(db, 'users', followerId);
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists() && followerRef) {
    const userData = userDoc.data();

    // Check if the followerRef is in the user's followers list
    const followers = userData.followers || [];
    return isDocumentReferenceInList(followerRef, followers);
  }
  console.log('User does not exist');
  return false;
}

// handleFollow
export async function handleFollow(followerId: string, userId: string): Promise<boolean> {
  // Validate the userId and eventId
  const followerRef = doc(db, 'users', followerId);
  const followerDoc = await getDoc(followerRef);
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!followerDoc.exists()) {
    console.log('Follower does not exist');
    return false; // Event does not exist
  } else if (!userDoc.exists()) {
    console.log('Followee does not exist');
    return false; // User does not exist
  }

  // Validate that the follower is not already in the follower list
  const followerData = followerDoc.data();
  const following = followerData.following || [];
  const userData = userDoc.data();
  const followers = userData.followers || [];
  if (
    isDocumentReferenceInList(userRef, following) ||
    isDocumentReferenceInList(followerRef, followers)
  ) {
    console.log('Follower is already following');
    return false;
  }

  // If everything looks good, update the user documents
  await updateDoc(followerRef, {
    following: arrayUnion(userRef),
  });

  await updateDoc(userRef, {
    followers: arrayUnion(followerRef),
  });
  return true; // follow successful
}

// handleUnfollow
export async function handleUnfollow(followerId: string, userId: string): Promise<boolean> {
  // Validate the userId and eventId
  const followerRef = doc(db, 'users', followerId);
  const followerDoc = await getDoc(followerRef);
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!followerDoc.exists()) {
    console.log('Follower does not exist');
    return false; // Event does not exist
  } else if (!userDoc.exists()) {
    console.log('Followee does not exist');
    return false; // User does not exist
  }

  // Validate that the follower is in the follower list
  const followerData = followerDoc.data();
  const following = followerData.following || [];
  const userData = userDoc.data();
  const followers = userData.followers || [];
  if (
    !isDocumentReferenceInList(userRef, following) ||
    !isDocumentReferenceInList(followerRef, followers)
  ) {
    console.log('Follower is not following');
    return false;
  }

  // If everything looks good, update the user documents
  await updateDoc(followerRef, {
    following: arrayRemove(userRef),
  });

  await updateDoc(userRef, {
    followers: arrayRemove(followerRef),
  });
  return true; // unfollow successful
}

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

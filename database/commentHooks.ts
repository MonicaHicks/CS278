import { Comment } from '@/components/types';
import { db } from '@/firebaseConfig';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
// getComments
// Get the list of comments under a given event
export async function getComments(eventId: string): Promise<string[]> {
  const eventRef = doc(db, 'events', eventId);
  const eventDoc = await getDoc(eventRef);
  if (eventDoc.exists()) {
    const eventData = eventDoc.data();
    const comments = eventData.comments || [];
    return comments.map((docRef: DocumentReference) => docRef.id);
  }
  console.log('Event does not exist');
  return [];
}

// Add a comment to an event
export async function addComment(
  userId: string,
  eventId: string,
  content: string,
): Promise<boolean> {
  try {
    // Generate a new document with a random ID using addDoc
    const commentRef = await addDoc(collection(db, 'comments'), {
      userId,
      eventId,
      content,
      timestamp: new Date(),
      likes: [],
    });

    // Add the comment ID to the event's 'comments' field
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, {
      comments: arrayUnion(commentRef.id),
    });

    console.log('Comment added successfully');
    return true;
  } catch (error) {
    console.error('Error adding comment:', error);
    return false;
  }
}

// Remove a comment from an event
export async function removeComment(
  userId: string,
  eventId: string,
  commentId: string,
): Promise<boolean> {
  try {
    // Delete the comment document
    const commentRef = doc(db, 'comments', commentId);
    await deleteDoc(commentRef); // This is the correct way to delete a document in Firestore

    // Remove the comment ID from the event's 'comments' field
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, {
      comments: arrayRemove(commentId),
    });

    console.log('Comment removed successfully');
    return true;
  } catch (error) {
    console.error('Error removing comment:', error);
    return false;
  }
}

// Fetch comments for an event
export async function fetchComments(eventId: string): Promise<Comment[]> {
  const commentsRef = collection(db, 'comments');
  const q = query(commentsRef, where('eventId', '==', eventId)); // Filter by eventId

  const querySnapshot = await getDocs(q);

  // Map Firestore documents to the Comment type
  const comments: Comment[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Comment; // Cast doc.data() to DocumentData (optional)

    // Manually cast the data to Comment type
    const comment: Comment = {
      id: doc.id, // Firestore document ID
      userId: data.userId || '', // User ID who made the comment
      eventId: data.eventId || '', // Event ID the comment is related to
      content: data.content || '', // Comment content
      timestamp: data.timestamp ? data.timestamp : new Date(), // Firestore timestamp to JavaScript Date
      parentId: data.parentId || undefined, // Parent comment (if it's a reply)
      likes: data.likes || [], // List of user IDs who liked the comment
    };

    return comment;
  });

  return comments;
}

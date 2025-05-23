import { doc, getDoc, DocumentReference } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

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

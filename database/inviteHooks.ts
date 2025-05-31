import { db } from '@/firebaseConfig';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

export const sendInvite = async (eventId: string, senderId: string, recipientId: string) => {
  await addDoc(collection(db, 'invites'), {
    eventId,
    senderId,
    recipientId,
    status: 'pending',
    sentAt: new Date(),
  });
};

export const updateInvite = async (inviteId: string, status: string) => {
  await updateDoc(doc(db, 'invites', inviteId), { status: status });
};

export async function getPendingInvites(userId: string) {
  const q = query(
    collection(db, 'invites'),
    where('recipientId', '==', userId),
    where('status', '==', 'pending'),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

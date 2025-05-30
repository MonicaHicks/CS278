import { db } from '@/firebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Friend } from '@/components/types';

// fetchResults
export async function fetchResults(queryString: string, searchField: string): Promise<Friend[]> {
  const q = query(
    collection(db, 'users'),
    // search by name (case-insensitive, prefix match)
    where(searchField, '>=', queryString),
    where(searchField, '<=', queryString + '\uf8ff'),
  );
  const querySnapshot = await getDocs(q);
  const results: Friend[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    results.push({
      id: doc.id,
      name: data.name,
      displayName: data.displayName || '',
      image: data.image || '',
      events: data.events || [],
    });
  });
  return results;
}

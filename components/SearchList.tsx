import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import FriendShortCard from './FriendShortCard';
import { useEffect, useState } from 'react';
import { fetchResults } from '@/database/searchHooks';
import { Friend } from './types';
import { ActivityIndicator } from 'react-native';

type SearchListProps = {
  query: string;
  field: 'name' | 'displayName'; // Optional field to search by
};

export default function SearchList({ query, field }: SearchListProps) {
  const [results, setResults] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length == 0) {
      setResults([]);
      return;
    }
    setLoading(true);
    fetchResults(query, field)
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return (
      <ThemedView>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  if (results.length === 0) {
    return (
      <ThemedView>
        <ThemedText>No results found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      {results.map((friend) => (
        <FriendShortCard friendInfo={friend} key={friend.id} />
      ))}
    </ThemedView>
  );
}

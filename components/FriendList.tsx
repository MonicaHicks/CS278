import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import FriendCard from './FriendCard';
import { sampleEvents } from '@/components/types';
import { getUserId } from '@/database/authHooks';
import { fetchFriends } from '@/database/friendHooks';
import { Friend } from '@/components/types';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function FriendList() {
  const userId = getUserId();
  if (!userId) {
    return null;
  }

  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const now = new Date();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const allFriends = await fetchFriends(userId);
        console.log('Fetched friends:', allFriends);
        const filtered = allFriends.filter((friend) =>
          // Only show upcoming events
          friend.events.some((event) => event.dateTime >= now),
        );
        console.log('Filtered friends:', filtered);
        setFriends(filtered);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ThemedText>Loading friends...</ThemedText>
      </ThemedView>
    );
  }

  if (!friends) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Failed to load friends</ThemedText>
      </ThemedView>
    );
  }

  if (friends.length === 0) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>No friends found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      {friends.map((friend) => (
        <FriendCard friendInfo={friend} key={friend.id} />
      ))}
    </ThemedView>
  );
}

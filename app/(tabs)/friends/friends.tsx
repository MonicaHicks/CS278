import { StyleSheet, ActivityIndicator } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FriendList from '@/components/FriendList';
import GlobalHeaderImage from '@/components/GlobalHeaderImage';
import { getUserId } from '@/database/authHooks';
import { Redirect } from 'expo-router';
import CreateEventButton from '@/components/CreateEventButton';
import { getUserIsClub } from '@/database/userHooks';
import { useEffect, useState } from 'react';

export default function FriendsScreen() {
  const userId = getUserId();
  if (!userId) {
    return <Redirect href="/login" />;
  }

  // Check if the user is a club, if so, show the event creation page
  const [isClub, setIsClub] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserIsClub(userId)
      .then((clubStatus) => {
        setIsClub(clubStatus);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error checking if user is a club:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    // return an activity indicator while loading
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  // If the user is a club, show the event creation page
  if (isClub) {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={<GlobalHeaderImage />}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Create Event</ThemedText>
        </ThemedView>
        <CreateEventButton />
      </ParallaxScrollView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<GlobalHeaderImage />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Friends</ThemedText>
      </ThemedView>
      <ThemedText>See your friends top 3 upcoming events:</ThemedText>
      <FriendList />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

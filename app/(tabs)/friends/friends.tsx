import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FriendList from '@/components/FriendList';
import GlobalHeaderImage from '@/components/GlobalHeaderImage';
import { getUserId } from '@/database/authHooks';
import { Redirect } from 'expo-router';

export default function FriendsScreen() {
  const userId = getUserId();
  if (!userId) {
    return <Redirect href="/login" />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<GlobalHeaderImage />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Friends</ThemedText>
      </ThemedView>
      <ThemedText>See what your friends are up to.</ThemedText>
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

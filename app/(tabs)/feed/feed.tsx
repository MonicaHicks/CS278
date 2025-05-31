import Feed from '@/components/Feed';
import GlobalHeaderImage from '@/components/GlobalHeaderImage';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getUserId } from '@/database/authHooks';
import { Redirect } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  const userId = getUserId();
  if (!userId) {
    return <Redirect href="/login" />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<GlobalHeaderImage />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Upcoming Events</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}></ThemedView>
      <ThemedView style={styles.feed}>
        <Feed filter="upcoming" />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 1,
    width: 100,
  },
  feed: {
    width: '100%',
  },
});

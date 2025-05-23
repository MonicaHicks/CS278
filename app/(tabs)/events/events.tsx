import theme from '@/assets/theme';
import Feed from '@/components/Feed';
import GlobalHeaderImage from '@/components/GlobalHeaderImage';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { auth } from '@/firebaseConfig';

export default function HomeScreen() {
  const user = auth.currentUser!; // Guarantee that user is not null
  const [view, setView] = useState<'upcomingEvents' | 'pastEvents'>('upcomingEvents');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<GlobalHeaderImage />}
    >
      <ThemedText type="title">My Events</ThemedText>
      <View style={theme.toggleContainer}>
        <TouchableOpacity
          style={[
            theme.toggleButton,
            view === 'upcomingEvents' ? theme.activeButton : theme.inactiveButton,
            { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
          ]}
          onPress={() => setView('upcomingEvents')}
        >
          <ThemedText
            style={
              view === 'upcomingEvents'
                ? theme.typography.activeText
                : theme.typography.inactiveText
            }
          >
            Upcoming Events
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            theme.toggleButton,
            view === 'pastEvents' ? theme.activeButton : theme.inactiveButton,
            { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
          ]}
          onPress={() => setView('pastEvents')}
        >
          <ThemedText
            style={
              view === 'pastEvents' ? theme.typography.activeText : theme.typography.inactiveText
            }
          >
            Past Events
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.feed}>
        {view === 'upcomingEvents' ? (
          <View>
            <Feed filter="upcoming" userId={user.uid} />
          </View>
        ) : (
          <View>
            <Feed filter="past" userId={user.uid} />
          </View>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  feed: {
    width: '100%',
  },
});

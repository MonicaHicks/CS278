import { Image, View, TouchableOpacity, Pressable } from 'react-native';
import theme from '../assets/theme';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { EventType } from '../components/types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Friend } from '../components/types';

export default function FriendCard({ friendInfo }: { friendInfo: Friend }) {
  const router = useRouter();
  return (
    <ThemedView style={theme.friendCard}>
      <TouchableOpacity
        onPress={() => {
          console.log('Friend profile pressed');
          router.push(`/profile/${friendInfo.id}`);
        }}
      >
        <View style={theme.profilePicNameContainer}>
          <Image
            source={require('../assets/images/Placeholder_Club.png')}
            style={theme.profilePic}
          />
          <ThemedText style={[theme.typography.subtitle]}>{friendInfo.name}</ThemedText>
          <ThemedText style={[theme.typography.body]}>
            is attending {friendInfo.events.length} event{friendInfo.events.length > 1 ? 's' : ''}:
          </ThemedText>
        </View>
      </TouchableOpacity>
      <EventList eventsAttending={friendInfo.events} />
    </ThemedView>
  );
  // List the soonest 3 events for each friend
}

function EventList({ eventsAttending }: { eventsAttending: EventType[] }) {
  const router = useRouter();
  // TODO: Only list the most recent 3 events
  return (
    <ThemedView>
      {eventsAttending.map((event) => (
        <TouchableOpacity
          key={event.id}
          onPress={() => {
            console.log('Event pressed');
            router.push(`/events/${event.id}`);
          }}
        >
          <ThemedView
            key={event.id}
            style={{
              marginTop: 6,
              marginLeft: 12,
              marginBottom: 6,
              gap: 8,
              flexDirection: 'row' as const,
            }}
          >
            <ThemedText style={theme.typography.friendEventList}>{event.eventTitle}</ThemedText>
            <ThemedText style={theme.typography.body}>by {event.hostName}</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}

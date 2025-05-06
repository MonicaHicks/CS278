import { ThemedView } from './ThemedView';
import FriendCard from './FriendCard';
import { sampleEvents } from '@/components/types';

const FRIENDS = [
  {
    id: '1',
    name: 'Shannon K.',
    image: '',
    eventsAttending: sampleEvents,
  },
  {
    id: '2',
    name: 'Holly J.',
    image: '',
    eventsAttending: sampleEvents,
  },
  {
    id: '3',
    name: 'Andrew K.',
    image: '',
    eventsAttending: sampleEvents,
  },
  {
    id: '4',
    name: 'Tina A.',
    image: '',
    eventsAttending: sampleEvents,
  },
  {
    id: '5',
    name: 'Akaash M.',
    image: '',
    eventsAttending: sampleEvents,
  },
];

export default function FriendList() {
  return (
    <ThemedView>
      {FRIENDS.map((friend) => (
        <FriendCard friendInfo={friend} key={friend.id} />
      ))}
    </ThemedView>
  );
}

import { ThemedView } from './ThemedView';
import FriendShortCard from './FriendShortCard';

const FRIENDS = [
  {
    id: '1',
    name: 'Shannon K.',
    image: '',
    eventsAttending: ['baseball', 'coffee', 'tech free night'],
  },
  {
    id: '2',
    name: 'Holly J.',
    image: '',
    eventsAttending: ['food fight', 'fencing'],
  },
  {
    id: '3',
    name: 'Andrew K.',
    image: '',
    eventsAttending: ['leather making', 'yoga', 'mario kart tournament'],
  },
  {
    id: '4',
    name: 'Tina A.',
    image: '',
    eventsAttending: ['mv watch party', 'champions league watch party', 'tech coffee night'],
  },
  {
    id: '5',
    name: 'Akaash M.',
    image: '',
    eventsAttending: ['sf tour', 'mario kart tournament'],
  },
];

export default function SearchList() {
  return (
    <ThemedView>
      {FRIENDS.map((friend) => (
        <FriendShortCard friendInfo={friend} key={friend.id} />
      ))}
    </ThemedView>
  );
}

import { Image, View } from "react-native";
import theme from "../assets/theme";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function FriendCard({
  friendInfo,
}: {
  // Not fully sold on this freinds schema yet.
  friendInfo: {
    id: string;
    name: string;
    image: string;
    eventsAttending: string[];
  };
}) {
  return (
    <ThemedView style={theme.friendCard}>
      <View style={theme.profilePicNameContainer}>
        <Image
          source={require("../assets/images/Placeholder_Club.png")}
          style={theme.profilePic}
        />
        <ThemedText style={[theme.typography.subtitle]}>
          {friendInfo.name}
        </ThemedText>
        <ThemedText style={[theme.typography.body]}>
          is attending {friendInfo.eventsAttending.length} events:
        </ThemedText>
      </View>
      <EventList eventsAttending={friendInfo.eventsAttending} />
    </ThemedView>
  );
  // List the soonest 3 events for each friend
}

function EventList({ eventsAttending }: { eventsAttending: string[] }) {
  return (
    <ThemedView>
      {eventsAttending.map((event) => (
        <ThemedText
          key={event}
          style={[
            theme.typography.friendEventList,
            { marginTop: 6, marginLeft: 12, marginBottom: 6 },
          ]}
        >
          {event}
        </ThemedText>
      ))}
    </ThemedView>
  );
}

// app/(tabs)/events/[id].tsx
import { mockEvents } from "@/assets/data/mockEvents";
import EventPage from "@/components/EventPage";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export const options = {
  href: null,
};

export default function EventPageRoute() {
  const { id } = useLocalSearchParams();
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <View>
        <Text>Event not found</Text>
      </View>
    );
  }

  return <EventPage item={event} />;
}

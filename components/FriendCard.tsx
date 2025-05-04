import { Image, View, StyleSheet } from "react-native";
import theme from "../assets/theme";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Event } from "../app/types";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function FriendCard({
  friendInfo,
}: {
    // Not fully sold on this freinds schema yet.
    friendInfo: {
        id: string;
        name: string;
        image: string;
        eventsAttending: Event[];
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
};

function EventList({
    eventsAttending,
}: {
    eventsAttending: Event[];
}) {
    // Only list the most revent 3 events
    return (
        <ThemedView>
            {eventsAttending.map((event) => (
                <ThemedView 
                    key={event.id} 
                    style={{ 
                        marginTop: 6, 
                        marginLeft: 12, 
                        marginBottom: 6,
                        gap: 8,
                        flexDirection: "row" as const }}>
                    <ThemedText style={theme.typography.friendEventList}>
                        {event.eventTitle} 
                    </ThemedText>
                    <ThemedText style={theme.typography.body}>
                        by {event.hostName}
                    </ThemedText>
                </ThemedView>
            ))}
        </ThemedView>
    );
}

import { Image, View, TouchableOpacity } from "react-native";
import theme from "../assets/theme";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useRouter } from "expo-router";

export default function FriendShortCard({
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
  const router = useRouter();
  return (
    <ThemedView style={theme.friendCard}>
      <TouchableOpacity
        onPress={() => {
          console.log("Friend card pressed");
          router.navigate("/(tabs)/profile");
        }}
      >
        <View style={theme.profilePicNameContainer}>
          <Image
            source={require("../assets/images/Placeholder_Club.png")}
            style={theme.profilePic}
          />
          <View style={theme.profileAndDisplayName}>
            <ThemedText type="subtitle">{friendInfo.name}</ThemedText>
            <ThemedText type="default">displayname</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
  // List the soonest 3 events for each friend
}

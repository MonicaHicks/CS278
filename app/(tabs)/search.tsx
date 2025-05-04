import { Image, View, StyleSheet, TextInput } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { sampleUser } from "../types";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import theme from "@/assets/theme";
import FriendList from "@/components/FriendList";

const Separator = () => <View style={styles.separator} />;

export default function ProfileScreen() {
    // Ger user data from the server
    let user = sampleUser;
    return (
        <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
            <Image
            source={require("@/assets/images/Stanford_Oval.png")}
            style={styles.reactLogo}
            />
        }
        >
        <ThemedView>
            <ThemedText type="title">
                Find friends and clubs
            </ThemedText>
            <TextInput
                style={theme.searchBar}
                placeholder="Enter name here"
                placeholderTextColor="#808080"
            />
        </ThemedView>
        <FriendList/>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
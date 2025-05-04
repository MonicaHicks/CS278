import { Image, View, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ProfileHeader from "@/components/ProfileHeader";
import { sampleUser } from "../types";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import FollowButton from "@/components/FollowButton";
import theme from "@/assets/theme";
import Feed from "@/components/Feed";

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
            <ProfileHeader {...user} />
        </ThemedView>
        <Separator />
        <FollowButton isFollowing={false} />
        <Separator />
        <ThemedView>
            <ThemedText style={{ alignItems: "center", gap: 8, marginBottom: 10 }}>
                Upcomping Events
            </ThemedText>
            <Feed/>
        </ThemedView>
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
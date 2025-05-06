import Feed from "@/components/Feed";
import FollowButton from "@/components/FollowButton";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ProfileHeader from "@/components/ProfileHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet, View } from "react-native";
import { sampleUser } from "../../../components/types";
import theme from "@/assets/theme";
import GlobalHeaderImage from "@/components/GlobalHeaderImage";

const Separator = () => <View style={styles.separator} />;

export default function ProfileScreen() {
    // Ger user data from the server
    let user = sampleUser;
    return (
        <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
            <GlobalHeaderImage/>
        }
        >
        <ThemedView>
            <ProfileHeader {...user} />
        </ThemedView>
        <FollowButton isFollowing={false} />
        <Separator />
        <ThemedView>
            <ThemedText style={[theme.typography.subtitle, { alignItems: "center", gap: 8, marginBottom: 10 }]}>
                Upcomping Events
            </ThemedText>
            <Feed/>
        </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

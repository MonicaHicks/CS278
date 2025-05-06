import Feed from "@/components/Feed";
import FollowButton from "@/components/FollowButton";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ProfileHeader from "@/components/ProfileHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { sampleUser } from "../../../components/types";
import theme from "@/assets/theme";
import GlobalHeaderImage from "@/components/GlobalHeaderImage";
import { useState } from "react";

const Separator = () => <View style={styles.separator} />;

export default function ProfileScreen() {
    const [view, setView] = useState<"upcomingEvents" | "pastEvents">("upcomingEvents");
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
            <View style={theme.toggleContainer}>
            <TouchableOpacity
              style={[
                theme.toggleButton,
                view === "upcomingEvents" ? theme.activeButton : theme.inactiveButton,
                { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
              ]}
              onPress={() => setView("upcomingEvents")}
            >
              <ThemedText
                style={
                  view === "upcomingEvents"
                    ? theme.typography.activeText
                    : theme.typography.inactiveText
                }
              >
                Upcoming Events
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                theme.toggleButton,
                view === "pastEvents" ? theme.activeButton : theme.inactiveButton,
                { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
              ]}
              onPress={() => setView("pastEvents")}
            >
              <ThemedText
                style={
                  view === "pastEvents"
                    ? theme.typography.activeText
                    : theme.typography.inactiveText
                }
              >
                Past Events
              </ThemedText>
        </TouchableOpacity>
        </View>
        <ThemedView style={styles.feed}>
          {view === "upcomingEvents" ? (
            <View>
              <Feed />
            </View>
          ) : (
            <View>
            </View>
          )}
        </ThemedView>
        </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },  feed: {
    width: "100%",
  },
});

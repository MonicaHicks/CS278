import { StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "@/assets/theme";
import Feed from "@/components/Feed";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import GlobalHeaderImage from "@/components/GlobalHeaderImage";

export default function HomeScreen() {
  const [view, setView] = useState<"myEvents" | "upcoming">("myEvents");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <GlobalHeaderImage/>
      }
    >
      <View style={theme.toggleContainer}>
        <TouchableOpacity
          style={[
            theme.toggleButton,
            view === "myEvents" ? theme.activeButton : theme.inactiveButton,
            { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
          ]}
          onPress={() => setView("myEvents")}
        >
          <ThemedText
            style={
              view === "myEvents"
                ? theme.typography.activeText
                : theme.typography.inactiveText
            }
          >
            My Events
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            theme.toggleButton,
            view === "upcoming" ? theme.activeButton : theme.inactiveButton,
            { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
          ]}
          onPress={() => setView("upcoming")}
        >
          <ThemedText
            style={
              view === "upcoming"
                ? theme.typography.activeText
                : theme.typography.inactiveText
            }
          >
            All Events
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.feed}>
        {view === "myEvents" ? (
          <View>
            <ThemedText type="title">My Events</ThemedText>
          </View>
        ) : (
          <View>
            <ThemedText type="title">All Events</ThemedText>
            <Feed />
          </View>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  feed: {
    width: "100%",
  },
});

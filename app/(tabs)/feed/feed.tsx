import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "@/assets/theme";
import Feed from "@/components/Feed";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import GlobalHeaderImage from "@/components/GlobalHeaderImage";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <GlobalHeaderImage/>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Upcoming Events</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}></ThemedView>
      <ThemedView style={styles.feed}>
        <Feed />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 1,
    width: 100,
  },
  feed: {
    width: "100%",
  }
});

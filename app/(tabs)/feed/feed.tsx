import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "@/assets/theme";
import Feed from "@/components/Feed";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <View style={styles.headerWrapper}>
          <Image
            source={require("@/assets/images/Stanford_Oval.png")}
            style={styles.reactLogo}
            resizeMode="cover"
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon}
              onPress={() => {
                // Navigate to profile screen
                router.push("/(tabs)/profile");
              }}
            >
              <Ionicons name="person-circle" size={40} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconSearch}
              onPress={() => {
                // Navigate to profile screen
                router.push("/(tabs)/search");
              }}>
              <Ionicons name="search" size={35} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
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
  headerWrapper: {
    height: 250,
    width: "100%",
    position: "relative",
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  feed: {
    width: "100%",
  },
  backgroundImage: {
    height: 250,
    width: "100%",
  },
  iconContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 40,
    right: 10,
    alignItems: "center",
  },
  icon: {
    zIndex: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    right: 15,
  },
  iconSearch: {
    zIndex: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 17,
    height: 32,
  },
});

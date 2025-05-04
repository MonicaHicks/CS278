import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import theme from "@/assets/theme";
import FriendList from "@/components/FriendList";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";

export default function FriendsScreen() {
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
            <TouchableOpacity style={styles.icon}>
              <Ionicons name="person-circle" size={40} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconSearch}>
              <Ionicons name="search" size={35} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Friends</ThemedText>
      </ThemedView>
      <ThemedText>See what your friends are up to.</ThemedText>
      <FriendList />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  headerWrapper: {
    height: 250,
    width: "100%",
    position: "relative",
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

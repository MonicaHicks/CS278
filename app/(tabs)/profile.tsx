import { Image, StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ProfileHeader from "@/components/ProfileHeader";
import { sampleUser } from "../types";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import theme from "@/assets/theme";

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
            <View style={theme.profilePicNameContainer}> 
                <ProfileHeader {...user} />
                <View style={theme.profileNameAndInfoContainer}>
                    <ThemedText type="title">
                        {user.name}
                    </ThemedText>
                    <ThemedText type="default">
                        attended {user.events.length} events
                    </ThemedText>
                </View>
            </View>
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
  }
});
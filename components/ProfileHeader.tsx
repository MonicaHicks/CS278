import { Image, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { User } from "../app/types";
import theme from "../assets/theme";

export default function ProfileHeader(userProfile: User) {
    return (
        <View style={theme.profilePicNameContainer}>
            <Image
                source={require("../assets/images/placeholderClub.png")}
                style={theme.profileLargePic}
            />
            <View style={theme.profileNameAndInfoContainer}>
            <ThemedText type="title">
                {userProfile.name}
            </ThemedText>
            <ThemedText type="subtitle">
                {userProfile.displayName}
            </ThemedText>
            <ThemedText type="default">
                attended {userProfile.events.length} events
            </ThemedText>
            </View>
        </View>
);
}
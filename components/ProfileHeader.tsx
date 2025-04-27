import { Image } from "react-native";
import { User } from "../app/types";
import theme from "../assets/theme";

export default function ProfileHeader(userProfile: User) {
    return (
        <Image
            source={require("../assets/images/placeholderClub.png")}
            style={theme.profileLargePic}
        />
    );
}
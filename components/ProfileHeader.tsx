import theme from '@/assets/theme';
import { ThemedText } from '@/components/ThemedText'; // or wherever ThemedText is from
import { Image, View } from 'react-native';
import { User } from './types'; // adjust path if needed

export default function ProfileHeader(userProfile: User) {
  const userIsClub = userProfile.isClub || false;
  const hasProfileImage = !!userProfile.image;

  return (
    <View style={theme.profilePicNameContainer}>
      <Image
        source={
          hasProfileImage
            ? { uri: userProfile.image }
            : require('../assets/images/Placeholder_Club.png')
        }
        style={theme.profileLargePic}
      />
      <View style={theme.profileNameAndInfoContainer}>
        <ThemedText type="title">{userProfile.name}</ThemedText>
        <ThemedText type="subtitle">{userProfile.displayName}</ThemedText>
        <ThemedText type="default">attended {userProfile.events.length} events</ThemedText>
      </View>
    </View>
  );
}

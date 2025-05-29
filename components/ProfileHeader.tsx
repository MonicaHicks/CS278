import theme from '@/assets/theme';
import { ThemedText } from '@/components/ThemedText'; // or wherever ThemedText is from
import { Image, View } from 'react-native';
import { User } from './types'; // adjust path if needed

export default function ProfileHeader(userProfile: User) {
  const userIsClub = userProfile.isClub || false;
  const hasProfileImage = !!userProfile.image;

  let summaryText = '';
  if (userIsClub) {
    if (userProfile.events.length === 0) {
      summaryText = 'has not hosted any events yet';
    } else {
      summaryText = `has hosted ${userProfile.events.length} event${
        userProfile.events.length > 1 ? 's' : ''
      }`;
    }
  } else {
    if (userProfile.events.length === 0) {
      summaryText = 'has not RSVPd to any events yet';
    } else {
      summaryText = `has RSVPd to ${userProfile.events.length} event${
        userProfile.events.length > 1 ? 's' : ''
      }`;
    }
  }

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
        <ThemedText type="default">{summaryText}</ThemedText>
      </View>
    </View>
  );
}

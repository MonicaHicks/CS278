import { View, Image, StyleSheet } from 'react-native';
import BackButton from './BackButton';
import ProfileAndSearchButtons from './ProfileAndSeachButtons';

export default function GlobalHeaderImage() {
  return (
    <View style={styles.headerWrapper}>
      <Image
        source={require('@/assets/images/Stanford_Oval.png')}
        style={styles.reactLogo}
        resizeMode="cover"
      />
      <BackButton />
      <ProfileAndSearchButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});

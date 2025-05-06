import theme from '@/assets/theme';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native';
import { sampleUser } from '../../components/types';
import SearchList from '@/components/SearchList';
import GlobalHeaderImage from '@/components/GlobalHeaderImage';

export default function SearchScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<GlobalHeaderImage />}
    >
      <ThemedView>
        <ThemedText type="title">Find friends and clubs</ThemedText>
        <TextInput
          style={theme.searchBar}
          placeholder="Enter name here"
          placeholderTextColor="#808080"
        />
      </ThemedView>
      <SearchList />
    </ParallaxScrollView>
  );
}

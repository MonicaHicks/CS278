import theme from '@/assets/theme';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SearchList from '@/components/SearchList';
import GlobalHeaderImage from '@/components/GlobalHeaderImage';
import { useState } from 'react';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [searchField, setSearchField] = useState<'name' | 'displayName'>('name'); // 'name' or 'displayName'

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<GlobalHeaderImage />}
    >
      <ThemedView>
        <ThemedText type="title">Find friends and clubs</ThemedText>
        <ThemedText type="default">
          Search by name or display name. Queries are case sensitive.
        </ThemedText>
        <View style={{ flexDirection: 'row', marginBottom: 12, paddingTop: 10 }}>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: searchField === 'name' ? theme.colors.primary : '#eee',
            }}
            onPress={() => setSearchField('name')}
          >
            <Text style={{ color: searchField === 'name' ? '#fff' : '#333' }}>Name</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: searchField === 'displayName' ? theme.colors.primary : '#eee',
            }}
            onPress={() => setSearchField('displayName')}
          >
            <Text style={{ color: searchField === 'displayName' ? '#fff' : '#333' }}>
              Display Name
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={theme.searchBar}
          placeholder="Enter name here"
          placeholderTextColor="#808080"
          value={query}
          onChangeText={setQuery}
        />
      </ThemedView>
      <SearchList query={query} field={searchField} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});

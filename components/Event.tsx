import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import theme from '../assets/theme';
import EventModal from './EventModal';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { EventType } from './types';

export default function EventComponent({ item }: { item: EventType }) {
  const [modalVisible, setModalVisible] = useState(false);

  const formattedDateTime = `${item.dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })} · ${item.dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })}`;

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <ThemedView style={theme.eventCard}>
          <View style={theme.profilePicNameContainer}>
            <Image
              source={
                item.hostImage
                  ? { uri: item.hostImage }
                  : require('../assets/images/Placeholder_Club.png')
              }
              style={theme.profilePic}
            />

            <ThemedText style={[theme.typography.subtitle, { marginTop: 12 }]}>
              {item.hostName}
            </ThemedText>
          </View>
          <View style={{ alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <ThemedText style={theme.typography.eventTitle}>{item.eventTitle}</ThemedText>
            <ThemedText style={theme.typography.body}>
              {formattedDateTime} · {item.location}
            </ThemedText>
          </View>
        </ThemedView>
      </Pressable>

      <EventModal visible={modalVisible} onClose={() => setModalVisible(false)} item={item} />
    </>
  );
}

// components/EventModal.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import theme from '../assets/theme';
import RSVPButton from './RSVPButton';
import { ThemedText } from './ThemedText';
import { EventType } from './types';

export default function EventModal({
  visible,
  onClose,
  item,
}: {
  visible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
  item: EventType;
}) {
  const router = useRouter();
  const formattedDate = `${item.dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })}`;
  const formattedTime = `${item.dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })}`;

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={theme.eventModalOverlay}>
          <View style={theme.eventModalContent}>
            <TouchableOpacity
              onPress={() => {
                router.push(`/profile/${item.hostId}`);
              }}
            >
              <View style={[theme.profilePicNameContainer, { marginVertical: 8 }]}>
                <Image
                  source={
                    item.hostImage
                      ? { uri: item.hostImage }
                      : require('../assets/images/Placeholder_Club.png')
                  }
                  style={theme.profilePic}
                />
                <ThemedText
                  style={[
                    theme.typography.eventTitle,
                    {
                      marginTop: 12,
                      textAlign: 'center',
                    },
                  ]}
                  adjustsFontSizeToFit
                  numberOfLines={2}
                >
                  {item.hostName}
                </ThemedText>
              </View>
            </TouchableOpacity>
            {/* <View > */}
            <TouchableOpacity
              style={{ alignItems: 'center', gap: 8, margin: 10 }}
              onPress={() => {
                onClose();
                setTimeout(() => {
                  router.push(`/event/${item.id}`);
                }, 200);
              }}
            >
              <ThemedText style={theme.typography.title}>{item.eventTitle}</ThemedText>
            </TouchableOpacity>
            {/* </View> */}
            {/* make it so you can click on the flyer to englarge */}
            <Image
              source={
                item.hostFlyer
                  ? { uri: item.hostFlyer }
                  : require('../assets/images/Sample_Flyer.png')
              }
              style={[
                theme.flyerFull,
                {
                  width: '100%',
                  height: 200,
                  resizeMode: 'cover',
                  borderRadius: 8,
                  marginBottom: 12,
                },
              ]}
            />
            <View style={{ alignItems: 'center' as const, gap: 6 }}>
              <ThemedText style={theme.typography.subtitle}>{formattedTime}</ThemedText>
              <ThemedText style={theme.typography.subtitle}>{formattedDate}</ThemedText>
              <ThemedText style={theme.typography.subtitle}>Location: {item.location}</ThemedText>
            </View>
            <RSVPButton item={item} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

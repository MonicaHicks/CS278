import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Home Page',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default behavior
            e.preventDefault();
            // Navigate to the events screen
            router.replace('../friends');
          },
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'My Events',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelStyle: { display: 'none' },
          tabBarItemStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelStyle: { display: 'none' },
          tabBarItemStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelStyle: { display: 'none' },
          tabBarItemStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}

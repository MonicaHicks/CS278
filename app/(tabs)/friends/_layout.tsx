import { Stack } from 'expo-router';
import React from 'react';

export default function FriendsLayout() {
  return (
    <React.Fragment>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </React.Fragment>
  );
}

import { Stack } from 'expo-router';
import React from 'react';

export default function EventsLayout() {
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

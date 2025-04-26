import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Event from "./Event";

const dummyDate = new Date(1714590600000);

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    hostName: "CS198",
    hostImage: "",
    eventTitle: "SL Welcome BBQ",
    hostFlyer: "",
    attendees: [] as string[],
    dateTime: dummyDate,
    location: "CoDa B45",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    hostName: "Latin Student Society",
    hostImage: "",
    hostFlyer: "",
    eventTitle: "Study Hours",
    attendees: [] as string[],
    dateTime: dummyDate,
    location: "Old Union",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    hostName: "CS + Social Good",
    eventTitle: "Hackathon",
    hostImage: "",
    hostFlyer: "",
    attendees: [] as string[],
    dateTime: dummyDate,
    location: "CoDa E160",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28b",
    hostName: "Women's Volleyball",
    eventTitle: "Home vs. Cal",
    hostImage: "",
    hostFlyer: "",
    attendees: [] as string[],
    dateTime: dummyDate,
    location: "Sandpit 3",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6",
    hostName: "Stanford Transfer Network",
    eventTitle: "Transfer Prom",
    hostImage: "",
    hostFlyer: "",
    attendees: [] as string[],
    dateTime: dummyDate,
    location: "Alumni Center",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d7",
    hostName: "ASSU",
    eventTitle: "Elections",
    hostImage: "",
    hostFlyer: "",
    attendees: [] as string[],
    dateTime: dummyDate,
    location: "White Plaza",
  },
];

export default function Feed() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {DATA.map((item) => (
          <Event item={item} key={item.id} />
        ))}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 32,
  },
});

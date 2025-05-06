// data/mockEvents.ts
import { Event } from "@/components/types";

const now = Date.now();

export const mockEvents: Event[] = [
  {
    id: "1",
    hostName: "CS198",
    hostImage: "",
    eventTitle: "SL Welcome BBQ",
    location: "CoDa B45",
    attendees: [],
    dateTime: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    comments: [],
  },
  {
    id: "2",
    hostName: "Latin Student Society",
    hostImage: "",
    eventTitle: "Study Hours",
    location: "Old Union",
    attendees: [],
    dateTime: new Date(now - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    comments: [],
  },
  {
    id: "3",
    hostName: "CS + Social Good",
    hostImage: "",
    eventTitle: "Hackathon",
    location: "CoDa E160",
    attendees: [],
    dateTime: new Date(now + 1 * 24 * 60 * 60 * 1000), // tomorrow
    comments: [],
  },
  {
    id: "4",
    hostName: "Women's Volleyball",
    hostImage: "",
    eventTitle: "Home vs. Cal",
    location: "Sandpit 3",
    attendees: [],
    dateTime: new Date(now + 3 * 24 * 60 * 60 * 1000), // in 3 days
    comments: [],
  },
  {
    id: "5",
    hostName: "Stanford Transfer Network",
    hostImage: "",
    eventTitle: "Transfer Prom",
    location: "Alumni Center",
    attendees: [],
    dateTime: new Date(now + 7 * 24 * 60 * 60 * 1000), // next week
    comments: [],
  },
  {
    id: "6",
    hostName: "ASSU",
    hostImage: "",
    eventTitle: "Elections",
    location: "White Plaza",
    attendees: [],
    dateTime: new Date(now + 14 * 24 * 60 * 60 * 1000), // in 2 weeks
    comments: [],
  },
];

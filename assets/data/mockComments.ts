// assets/data/mockComments.ts
import { Comment } from "@/components/types";

export const mockComments: Comment[] = [
  {
    id: "c1",
    userId: "u1",
    eventId: "1", // SL Welcome BBQ
    content: "Excited for this! Will there be veggie options?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    likes: ["u2", "u3"],
  },
  {
    id: "c2",
    userId: "u2",
    eventId: "1",
    content: "Yeah, they had Beyond burgers last time :)",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    parentId: "c1",
    likes: ["u1"],
  },
  {
    id: "c3",
    userId: "u3",
    eventId: "2", // Study Hours
    content: "Do I need to RSVP or can I just drop in?",
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    likes: [],
  },
  {
    id: "c4",
    userId: "u4",
    eventId: "3", // Hackathon
    content: "Looking for a team! DM me if you need a designer.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    likes: ["u2", "u3", "u5"],
  },
];

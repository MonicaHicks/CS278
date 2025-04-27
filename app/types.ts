// Defining the types for the database schema

export type User = {
    id: string;                     // Unique identifier for the user
    name: string;                   // Name of the user
    displayName: string;            // Display name of the user
    email: string;                  // Email address of the user
    image: string;                  // URL to the user's profile image
    events: string[];               // List of event IDs the has or will attend
    friends: string[];              // List of user IDs of the user's friends
};

export const sampleUser: User = {
    id: "1",
    name: "First Last",
    displayName: "firstlast",
    email: "firstlast@stanford.edu",
    image: "",
    events: ["event1", "event2", "event3"],
    friends: ["friend1", "friend2", "friend3"],
};

export type Event = {
    id: string;                     // Unique identifier for the event
    hostName: string;               // Name of the club
    hostImage: string;              // URL to the club's profile image
    eventTitle: string;             // Name of the event
    hostFlyer?: string;             // URL to the club's flyer image
    attendees: string[];            // List of user IDs
    dateTime: Date;                 // Date and time of the event
    location: string;               // Location of the event
};
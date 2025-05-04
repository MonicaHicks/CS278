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
    name: "Shannon K.",
    displayName: "skomguem",
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
    comments: string[];             // List of comment IDs
};

export type Comment = {
    id: string;                     // Unique identifier for the comment
    userId: string;                 // ID of the user who made the comment
    eventId: string;                // ID of the event the comment is associated with
    content: string;                // Content of the comment
    timestamp: Date;                // Date and time the comment was made
    parentId?: string;              // ID of the parent comment if it's a reply
    likes: string[];                // List of user IDs who liked the comment
};
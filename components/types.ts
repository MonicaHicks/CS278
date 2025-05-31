// Defining the types for the database schema

export type User = {
  id: string; // Unique identifier for the user
  name: string; // Name of the user
  displayName: string; // Display name of the user
  image: string; // URL to the user's profile image
  events: string[]; // List of event IDs the has or will attend
  following: string[]; // List of user and club IDs the user follows
  followers: string[]; // List of user IDs who follow the user
  isClub: boolean; // Flag indicating if the user is a club
};

export type Club = {
  id: string; // Unique identifier for the club
  name: string; // Name of the club
  email: string; // Email address of the club
  image: string; // URL to the club's profile image
  events: string[]; // List of event IDs the club has hosted
  followers: string[]; // List of user IDs who follow the club
  description: string; // Description of the club
};

export type Invite = {
  eventId: string;
  senderId: string;
  recipientId: string;
  status: 'pending' | 'accepted' | 'declined';
  sentAt: Date;
};

export const sampleUser: User = {
  id: '1',
  name: 'Shannon K.',
  displayName: 'skomguem',
  image: '',
  events: ['event1', 'event2', 'event3'],
  following: ['friend1', 'friend2', 'friend3'],
  followers: ['friend4', 'friend5'],
  isClub: false,
};

export type EventType = {
  id?: string; // Unique identifier for the event
  hostName: string; // Name of the club
  hostImage: string; // URL to the club's profile image
  eventTitle: string; // Name of the event
  hostFlyer?: string; // URL to the club's flyer image
  attendees: string[]; // List of user IDs
  dateTime: Date; // Date and time of the event
  location: string; // Location of the event
  hostId: string;
  comments: string[]; // List of comment IDs
};

const dummyDate = new Date(1714590600000);

export const sampleEvents: EventType[] = [
  {
    id: '3BStOcn4LjJHwD0zrcBZ',
    hostName: 'CS198',
    hostImage: '',
    eventTitle: 'SL Welcome BBQ',
    hostFlyer: '',
    attendees: [] as string[],
    dateTime: dummyDate,
    location: 'CoDa B45',
    hostId: '',
    comments: [],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    hostName: 'Latin Student Society',
    hostImage: '',
    hostFlyer: '',
    eventTitle: 'Study Hours',
    attendees: [] as string[],
    dateTime: dummyDate,
    location: 'Old Union',
    hostId: '',
    comments: [],
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    hostName: 'CS + Social Good',
    eventTitle: 'Hackathon',
    hostImage: '',
    hostFlyer: '',
    attendees: [] as string[],
    dateTime: dummyDate,
    location: 'CoDa E160',
    hostId: '',
    comments: [],
  },
];

export type Comment = {
  id: string; // Unique identifier for the comment
  userId: string; // ID of the user who made the comment
  eventId: string; // ID of the event the comment is associated with
  content: string; // Content of the comment
  timestamp: Date; // Date and time the comment was made
  parentId?: string; // ID of the parent comment if it's a reply
  likes: string[]; // List of user IDs who liked the comment
};

// A shortened version of the user schema for the friend list
export type Friend = {
  id: string; // Unique identifier for the friend
  name: string; // Name of the friend
  displayName: string; // Display name of the friend
  image: string; // URL to the friend's profile image
  events: EventType[]; // List of events the friend is or has attending
};

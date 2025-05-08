import { Event } from '@/components/types';

const now = Date.now();

function setDateWithTime(baseDate: Date, hour: number, minute: number): Date {
  const d = new Date(baseDate);
  d.setHours(hour, minute, 0, 0);
  return d;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    hostName: 'CS198',
    hostImage: '',
    eventTitle: 'SL Welcome BBQ',
    location: 'CoDa B45',
    attendees: [],
    dateTime: setDateWithTime(new Date(now - 2 * 24 * 60 * 60 * 1000), 17, 0), // 5:00 PM
    comments: [],
  },
  {
    id: '2',
    hostName: 'Latin Student Society',
    hostImage: '',
    eventTitle: 'Study Hours',
    location: 'Old Union',
    attendees: [],
    dateTime: setDateWithTime(new Date(now - 7 * 24 * 60 * 60 * 1000), 19, 30), // 7:30 PM
    comments: [],
  },
  {
    id: '3',
    hostName: 'CS + Social Good',
    hostImage: '',
    eventTitle: 'Hackathon',
    location: 'CoDa E160',
    attendees: [],
    dateTime: setDateWithTime(new Date(now + 1 * 24 * 60 * 60 * 1000), 14, 0), // 2:00 PM
    comments: [],
  },
  {
    id: '4',
    hostName: "Women's Volleyball",
    hostImage: '',
    eventTitle: 'Home vs. Cal',
    location: 'Sandpit 3',
    attendees: [],
    dateTime: setDateWithTime(new Date(now + 3 * 24 * 60 * 60 * 1000), 18, 30), // 6:30 PM
    comments: [],
  },
  {
    id: '5',
    hostName: 'Stanford Transfer Network',
    hostImage: '',
    eventTitle: 'Transfer Prom',
    location: 'Alumni Center',
    attendees: [],
    dateTime: setDateWithTime(new Date(now + 7 * 24 * 60 * 60 * 1000), 20, 0), // 8:00 PM
    comments: [],
  },
  {
    id: '6',
    hostName: 'ASSU',
    hostImage: '',
    eventTitle: 'Elections',
    location: 'White Plaza',
    attendees: [],
    dateTime: setDateWithTime(new Date(now + 14 * 24 * 60 * 60 * 1000), 16, 0), // 4:00 PM
    comments: [],
  },
];

import { DimensionValue } from 'react-native';
const colors = {
  primary: '#8C1515', // Stanford red
  background: '#FDF8F3', // creamy beige
  cardBackground: '#FFFFFF', // bright white background
  text: '#333333', // dark grey
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const borderRadius = {
  sm: 6,
  md: 12,
  lg: 24,
};

const shadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
};

const cardBase = {
  backgroundColor: colors.cardBackground, // bright white
  borderRadius: borderRadius.sm, // 5%
  ...shadow,
};

const typography = {
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 36, // optional: a little taller than fontSize
    textAlign: 'center' as 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  eventTitle: {
    fontSize: 26,
    fontWeight: '600' as const,
    lineHeight: 32,
    textAlign: 'center' as 'center',
  },
  friendEventList: {
    fontSize: 20,
    fontWeight: '500' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  activeText: {
    color: colors.cardBackground,
    fontWeight: '600' as const,
  },
  inactiveText: {
    color: colors.text,
    fontWeight: '500' as const,
  },
};

const eventCard = {
  ...cardBase,
  hostName: typography.subtitle,
  eventName: typography.caption,
  marginVertical: spacing.sm, // 8
  gap: spacing.md, // 12
};

const profilePic = {
  marginLeft: 10,
  marginTop: 10,
  width: 40,
  height: 40,
  borderRadius: 20, // half of width/height for perfect circle
  backgroundColor: '#ccc', // fallback background color
  overflow: 'hidden' as const,
};

const profilePicNameContainer = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  gap: 8,
  width: '80%' as DimensionValue,
};

const friendCard = {
  ...cardBase,
  marginVertical: spacing.sm,
  gap: spacing.md,
};

const profileLargePic = {
  width: 100,
  height: 100,
  borderRadius: 50,
  // backgroundColor: "#ccc", // fallback background color
  overflow: 'hidden' as const,
};

const profileNameAndInfoContainer = {
  flexDirection: 'column' as const,
  gap: 8,
  marginLeft: 10,
};

const searchBar = {
  borderRadius: borderRadius.sm,
  padding: spacing.sm,
  marginVertical: spacing.md,
  height: 50,
  borderWidth: 1,
  borderColor: colors.primary,
  borderStyle: 'solid' as const,
};

const eventModalOverlay = {
  flex: 1,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent dark backdrop
};

const eventModalContent = {
  width: '85%' as DimensionValue, // 👈 fix here
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
};

const closeButton = {
  marginTop: 20,
  color: 'white',
  backgroundColor: colors.primary,
  width: 60,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  borderRadius: 5,
  borderColor: '#000',
  borderWidth: 1,
};

const flyerFull = {
  width: '30%' as DimensionValue,
  resizeMode: 'contain' as const,
  marginBottom: 16,
};

const profileAndDisplayName = {
  flexDirection: 'column' as const,
  gap: 4,
  marginLeft: 10,
  marginTop: 10,
  marginBottom: 10,
};

const toggleContainer = {
  flexDirection: 'row' as const,
  alignSelf: 'center' as const,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#ccc',
  overflow: 'hidden' as const,
  marginTop: 16,
};
const toggleButton = {
  paddingVertical: 8,
  paddingHorizontal: 16,
  backgroundColor: '#ccc',
};
const activeButton = {
  backgroundColor: colors.primary,
};

const inactiveButton = {
  backgroundColor: colors.cardBackground,
};

const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
  cardBase,
  eventCard,
  profilePic,
  profilePicNameContainer,
  friendCard,
  profileLargePic,
  profileNameAndInfoContainer,
  searchBar,
  eventModalOverlay,
  eventModalContent,
  closeButton,
  flyerFull,
  profileAndDisplayName,
  toggleButton,
  toggleContainer,
  activeButton,
  inactiveButton,
};
export default theme;

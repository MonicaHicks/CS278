const colors = {
  primary: "#8C1515", // Stanford red
  background: "#FDF8F3", // creamy beige
  cardBackground: "#FFFFFF", // bright white background
  text: "#333333", // dark grey
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
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
};

const cardBase = {
  backgroundColor: colors.cardBackground, // bright white
  borderRadius: borderRadius.sm, // 5%
  ...shadow,
};

const eventCard = {
  ...cardBase,
  marginVertical: spacing.sm, // 2%
  gap: spacing.lg, // 10%
};

const theme = { colors, spacing, borderRadius, shadow, cardBase, eventCard };
export default theme;

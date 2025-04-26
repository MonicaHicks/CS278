import { Image, StyleSheet } from "react-native";
import theme from "../assets/theme";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function Event({
  item,
}: {
  item: { id: string; title: string; image?: string };
}) {
  return (
    <ThemedView style={theme.eventCard}>
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <ThemedText style={styles.title}>{item.title}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 12,
  },
});

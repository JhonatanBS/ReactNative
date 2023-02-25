import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 24,
  },
  eventName: {
    color: "#FDFCFE",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50
  },
  date: {
    color: "#FDFCFE",
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    height: 56,
    backgroundColor: "#1F1E25",
    borderRadius: 5,
    color: "FFF",
    padding: 16,
    fontSize: 16
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: "#31CF67",
    alignItems: "center",
    justifyContent: "center"
  }
});
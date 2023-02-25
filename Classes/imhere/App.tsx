import { Text, View } from "react-native";

export default function App() {
  return(
    <View style={{
      flex: 1,
      backgroundColor: "#212121",
      padding: 24,
    }}>
      <Text style={{
        color: "#FFFFFF",
        fontSize: 50,
        fontWeight: "bold",
        textAlign: "center"
      }}>
        Hello
      </Text>

      <Text style={{
        color: "#FFFFFF",
        fontSize: 50,
        fontWeight: "bold",
        textAlign: "center"
      }}>
        World!
      </Text>

    </View>
  )
}

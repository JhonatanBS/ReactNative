import { Text, View } from "react-native";
import { styles } from "./styles";

export default function Home() {
  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Learning React-Native
      </Text>

      <Text style={styles.date}>
        November 25th, 2023
      </Text>

    </View>
  )
}
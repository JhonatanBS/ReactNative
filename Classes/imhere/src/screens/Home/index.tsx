import { Text, View, TextInput } from "react-native";
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

      <TextInput 
        style={styles.input}
        placeholder="Participant's name"
        placeholderTextColor= "#FFFFFF"
      />

    </View>
  )
}
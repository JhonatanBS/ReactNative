import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function Home() {

  function handleParticipantAdd() {
    console.log("You clicked here");
  }

  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Learning React-Native
      </Text>

      <Text style={styles.date}>
        November 25th, 2023
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Participant's name"
          placeholderTextColor= "#FFFFFF"
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
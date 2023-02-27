import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";

import { useState } from "react";

import { Participant } from "../../components/Participant";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState<string>("");

  function handleParticipantAdd() {
    if(participants.includes(participantName)) {
      return Alert.alert("Participant already exists", "Please, add another user");
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string) {

    Alert.alert("Remove User", `Do you want to remove the user ${name}?`,
    [
      {
        text: "Yes",
        onPress: () => setParticipants(prevState => prevState.filter( participant => participant !== name))
      },
      {
        text: "No",
        style: "cancel"
      }
    ]);
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
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
                 key={item} 
                 name={item} 
                 onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            There aren't users, add some user. 
          </Text>
        )}
      />
     
    </View>
  )
}
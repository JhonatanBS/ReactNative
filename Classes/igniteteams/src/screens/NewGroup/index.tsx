import { Alert } from "react-native";
import { useState } from "react";

import { groupCreate } from "@storage/group/groupCreate";

import { Container, Content, Icon } from "./styles";

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppError } from "@utils/AppError";

export function NewGroup() {
  const [ group, setGroup ] = useState("");

  const navigate = useNavigation();

  async function handleNew() {
    try {
      if(group.trim().length === 0) {
        return Alert.alert("New Group", "Name of Group is Empty!");
      }

      await groupCreate(group);
      navigate.navigate("players", { group })
      
    } catch (error) {
      if( error instanceof AppError) {
        Alert.alert("New Group", error.message);
      }else{
        Alert.alert("New Group", "You can't create a new group!");
        console.log(error);
      }
    }
  }

  return(
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight 
          title="New Team"
          subtitle="Create the team to add people"
        />

        <Input 
          placeholder="Name of the Team"
          onChangeText={setGroup}
        />

        <Button 
          title="Create"
          style={{ marginTop: 20}}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}
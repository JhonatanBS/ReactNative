import { useState } from "react";

import { groupCreate } from "@storage/group/groupCreate";

import { Container, Content, Icon } from "./styles";

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  const [ group, setGroup ] = useState("");

  const navigate = useNavigation();

  async function handleNew() {
    try {
      await groupCreate(group);
      navigate.navigate("players", { group })
      
    } catch (error) {
      console.log(error);
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
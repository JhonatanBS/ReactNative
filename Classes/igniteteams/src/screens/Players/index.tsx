import { FlatList } from "react-native";

import { ButtonIcon } from "@components/ButtonIcon";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";

import { useState } from "react";

export function Players() {
  const [team, setTeam] = useState("Team A");
  const [players , setPlayers ] = useState([]);

  return (
    <Container>

      <Header showBackButton />

      <Highlight
        title="Name of Team"
        subtitle="Add your player and separate the teams"
      />

      <Form>

        <Input
          placeholder="Name of the person"
          autoCorrect={false}
        />

        <ButtonIcon
          icon="add"
        />

      </Form>

      <HeaderList>
        <FlatList
          data={["Team A", "Team B"]}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumbersOfPlayers>
          {players.length}
        </NumbersOfPlayers>
      </HeaderList>

    </Container>
  )
}
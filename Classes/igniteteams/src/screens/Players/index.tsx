import { useState } from "react";
import { useRoute } from "@react-navigation/native";

import { FlatList } from "react-native";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { ButtonIcon } from "@components/ButtonIcon";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

type RouteParams = {
  group: string;
}

export function Players() {
  const [team, setTeam] = useState("Team A");
  const [players, setPlayers] = useState(["Diego"]);

  const route = useRoute();
  const { group } = route.params as RouteParams;


  return (
    <Container>

      <Header showBackButton />

      <Highlight
        title={group}
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

      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => { }}
          />
        )}

        ListEmptyComponent={() => (
          <ListEmpty message="There is no people on the Team" />
        )}

        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button 
        title="Remove Team"
        type="SECONDARY"
      />
    </Container>
  )
}
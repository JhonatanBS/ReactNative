import { useState, useEffect , useRef} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Alert, FlatList, TextInput } from "react-native";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayersStorageDTO } from "@storage/player/PlayersStorageDTO";

import { AppError } from "@utils/AppError";

import { Loading } from "@components/Loading";
import { ButtonIcon } from "@components/ButtonIcon";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { playerRemoveByGroups } from "@storage/player/playerRemoveByGroups";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading ] = useState(true);
  const [newNamePlayer, setNewNamePlayer] = useState("");
  const [team, setTeam] = useState("Team A");
  const [players, setPlayers] = useState<PlayersStorageDTO[]>([]);

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if(newNamePlayer.trim().length === 0) {
      return Alert.alert("New Person", "Inform the name of person for add");
    }
    const newPlayer = {
      name: newNamePlayer,
      team,
    }
  
    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      setNewNamePlayer("");
      fetchPlayersByTeam();

    } catch (error) {
      if(error instanceof AppError){
        Alert.alert("New Person", error.message);
      }else{
        console.log(error);
        Alert.alert("New Person", "We don't get to add")
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);

      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);

    } catch (error) {
      console.log(error);
      Alert.alert("People", "Unable to load people of team");
    }finally{
      setIsLoading(false);
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      
      await playerRemoveByGroups(playerName, group);
      fetchPlayersByTeam();
      
    } catch (error) {
      console.log(error);
      Alert.alert("Don't Removed", "User don't removed!");
    }
  }

async function groupRemove() {
  try {
    await groupRemoveByName(group);

    navigation.navigate("groups");

  } catch (error) {
    throw error;
  }
}  

async function handleGroupRemove() {
  Alert.alert(
    "Remove", 
    "Do you want to remove the group?",
    [{
      text: "No",
      style: "cancel"
    },
    {
      text: "Yes",
      onPress: () => groupRemove()
    }
    ]
    )
}

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>

      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="Add your player and separate the teams"
      />

      <Form>

        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewNamePlayer}
          value={newNamePlayer}
          placeholder="Name of the person"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
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

      {isLoading ? 
      <Loading /> 
      : 
      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
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
    }

      <Button 
        title="Remove Group"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}
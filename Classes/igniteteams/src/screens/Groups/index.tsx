import { useState, useCallback } from 'react';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { FlatList } from 'react-native';

import { useNavigation , useFocusEffect} from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';
import { Loading } from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading ] = useState(true);
  const [ groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new")
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
      
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  },[]));

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  return (
    <Container >
      <Header />
      <Highlight 
        title="Groups"
        subtitle="Play with your Team"
      />

      { isLoading ? 
      <Loading /> 
      : 
      <FlatList 
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <GroupCard 
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty message="Do you want to register the first Team?"/>
        )}
        showsVerticalScrollIndicator={false}
      />
    }

    <Button 
      title="Create a new Group"
      onPress={handleNewGroup}
    />
    </Container>
  );
}
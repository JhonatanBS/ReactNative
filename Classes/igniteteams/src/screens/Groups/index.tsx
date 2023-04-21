import { FlatList } from 'react-native';
import { useState } from 'react';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';

export function Groups() {
  const [ groups, setGroups] = useState<string[]>([]);

  return (
    <Container >
      <Header />
      <Highlight 
        title="Teams"
        subtitle="Play with your Team"
      />

      <FlatList 
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <GroupCard 
            title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty message="Do you want to register the first Team?"/>
        )}
        showsVerticalScrollIndicator={false}
      />

    <Button 
      title="Create a new team"
    />
    </Container>
  );
}
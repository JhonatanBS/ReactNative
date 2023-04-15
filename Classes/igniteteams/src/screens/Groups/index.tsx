import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

import { Container } from './styles';

export function Groups() {
  return (
    <Container >
      <Header />
      <Highlight 
        title="Teams"
        subtitle="Play with your Team"
      />

      <GroupCard title="Team on the ignite" />
    </Container>
  );
}
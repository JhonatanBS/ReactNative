import { Container } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

export function Players() {
  return(
    <Container>
      <Header showBackButton/>
      <Highlight 
        title="Name of Team"
        subtitle="Add your player and separate the teams"
      />
    </Container>
  )
}
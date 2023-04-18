import { ButtonIcon } from "@components/ButtonIcon";
import { Container, Form } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

export function Players() {
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

    </Container>
  )
}
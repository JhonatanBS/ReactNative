import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  const navigate = useNavigation();

  function handleNew() {
    navigate.navigate("players", { group: "Rocket"})
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
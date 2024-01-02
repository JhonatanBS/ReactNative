import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { VStack , Image, Text, Center, Heading, ScrollView, useToast} from "native-base";

import { useAuth } from "@hooks/useAuth";

import * as yup from "yup";

import { useForm , Controller } from "react-hook-form";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppError } from "@utils/AppError";

type FormData = {
  email: string;
  password: string;
}

const signUpSchema = yup.object({
  email: yup.string().required("Informe o e-mail.").email("E-mail invãlido"),
  password: yup.string().required("Informe a senha.").min(6, "Insira pelo menos 6 digitos"),
});

export function SignIn() {

  const { signIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const toast = useToast();

  const { control, handleSubmit, formState: { errors }} = useForm<FormData>({
    resolver: yupResolver(signUpSchema)
  });

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      await signIn(email, password);

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tarde!"
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500"
      });
    }
  }

  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false}>
    <VStack flex={1} px={10} pb={16}>
      <Image 
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="People training"
        resizeMode="contain"
        position="absolute"
      />

      <Center my={24}>
        <LogoSvg />

        <Text color="gray.100" fontSize="sm">
          Treine sua mente e o corpo
        </Text>
      </Center>

      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acesse sua conta
        </Heading>

        <Controller 
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
            )}
          />

        <Button 
          title="Acessar"
          onPress={handleSubmit(handleSignIn)}
        />

      </Center>

      <Center mt={24}>
        <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
          Ainda não tem acesso?
        </Text>

        <Button 
          title="Criar conta" 
          variant="outline"
          onPress={handleNewAccount}
        />
      </Center>

    </VStack>
    </ScrollView>
  )
}
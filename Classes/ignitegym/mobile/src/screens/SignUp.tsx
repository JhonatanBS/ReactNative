import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

import axios from "axios";
import { api } from "@services/api";

import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Alert } from "react-native";
import { useState } from "react";
import { SignIn } from "./SignIn";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mail.").email("E-mail invãlido"),
  password: yup.string().required("Informe a senha.").min(6, "Insira pelo menos 6 digitos"),
  password_confirm: yup.string().required("Confirme a senha.").oneOf([yup.ref("password")], "A confirmação da senha não confere.")
});

export function SignUp() {
  const [ isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigate = useNavigation();

  function handleGoBack() {
    navigate.goBack();
  }

  async function handleSignUp({name, email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await api.post("/users", { name, email, password });
      await signIn(email, password);

    } catch (error) {
      setIsLoading(false);
      
      if(axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
    }
    
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

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

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
              placeholder="Confirme a senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType="send"
              errorMessage={errors.password_confirm?.message}
            />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />

        </Center>


        <Button
          title="Voltar para o login"
          variant="outline"
          mt={12}
          onPress={handleGoBack}
        />

      </VStack>
    </ScrollView>
  )
}
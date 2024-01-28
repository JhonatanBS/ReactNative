import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Controller, useForm } from "react-hook-form";

import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password?: string | null;
  old_password?: string;
  confirm_password?: string | null;
}

const profileSchema = yup.object(
  {
    name: yup
      .string()
      .required("Informe o nome"),
    email: yup
      .string()
      .required("Informe o email")
      .email(),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 dígitos")
      .nullable()
      .transform((value) => !!value ? value : null),
    old_password: yup.string(),
    confirm_password: yup
      .string()
      .nullable()
      .transform((value) => !!value ? value : null)
      .oneOf([yup.ref("password"), null], "A confirmação de senha não confere.")
      .when("password", {
        is: (Field: any) => Field,
        then: (schema) => 
          schema
          .nullable()
          .required('Informe a confirmação da senha.')
          .transform((value) => !!value ? value : null),
      })
    }
)

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState("https://github.com/orodrigogo.png");
  const [isUpdating, setIsUpdating] = useState(false);

  const toast = useToast();
  const { user , updateUserProfile} = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri, { size: true });

        /*if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha um de até 5MB",
            placement: "top",
            bgColor: "red.500"
          })
        }*/
        setUserPhoto(photoSelected.assets[0].uri);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }

  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.name = data.name;
        
      await api.put("/users", data);

      await updateUserProfile(userUpdated);

      toast.show({
        title: "O seu perfil foi atualizado com sucesso",
        placement: "top",
        bgColor: "green.500"
      })

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tarde!"

      toast.show({
        title,
        placement: "bottom-right",
        bgColor: "red.500"
      });
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader
        title="Perfil"
      />

      <ScrollView>
        <Center mt={6} px={10}>
          {
            photoIsLoading ?
              <Skeleton
                h={PHOTO_SIZE}
                w={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
              :
              <UserPhoto
                source={{ uri: userPhoto }}
                alt="Foto do usuário"
                size={33}
              />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
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
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />

        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2} fontFamily="heading">
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.old_password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
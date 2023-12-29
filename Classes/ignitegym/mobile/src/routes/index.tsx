import { useTheme, Box } from "native-base";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useContext } from "react";

import { AuthRoutes } from "./auth.routes";

import { AppRoutes } from "./app.routes";

import { AuthContext } from "@contexts/AuthContext";

export function Routes() {
  const { colors } = useTheme();

  const contexData = useContext(AuthContext);

  console.log("Usuário logado", contexData)

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
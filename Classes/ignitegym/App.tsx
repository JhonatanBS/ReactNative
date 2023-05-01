import { NativeBaseProvider } from "native-base";
import { StatusBar, View } from 'react-native';
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';

import { Loading } from "@components/Loading";

import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      
      {fontsLoaded ? <View /> : < Loading />}
    </NativeBaseProvider>
  );
}
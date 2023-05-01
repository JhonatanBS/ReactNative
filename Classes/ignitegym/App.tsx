import { NativeBaseProvider } from "native-base";
import { StatusBar, Text, View } from 'react-native';
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold});

  return (
    <NativeBaseProvider >
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      
      {fontsLoaded ? <View /> : <View />}
    </NativeBaseProvider>
  );
}
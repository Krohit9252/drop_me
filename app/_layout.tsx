import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  
useFonts({
  'outfit-Bold':require('./../assets/fonts/Outfit-Bold.ttf'),
  'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
  'outfit-Medium':require('./../assets/fonts/Outfit-Medium.ttf'),
  // 'outfit-ExtraBold':require('./../assets/fonts/Outfit-ExtraBold.ttf'),
})

  return (    
    <Stack>
      <Stack.Screen name="index" options={{
      headerShown:false,

      }} />
    </Stack>
  );
}

import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../global.css"; // Import global styles

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

import { Stack } from "expo-router";
import "../global.css"; // Import global styles

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="movie/[id]" options={{ headerShown: false }} /> */}
    </Stack>
  );
}

import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="select" />
    </Stack>
  );
}

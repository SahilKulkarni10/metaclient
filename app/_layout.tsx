import { ClerkProvider } from "@clerk/clerk-expo";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from "react";
import { CLERK_PUBLISHABLE_KEY } from "@env";
import { AuthProvider } from "./contexts/AuthContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (error) {
      console.log("Font loading error:", error);
    }
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <AuthProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar style="dark" />
          {error && __DEV__ && (
            <View style={{ backgroundColor: '#FFFF00', padding: 5, alignItems: 'center' }}>
              <Text>Font loading issues detected - using system fonts</Text>
            </View>
          )}
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#f0f4f8" },
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen 
              name="login" 
              options={{
                title: "Login",
                headerShown: true,
                headerTitleStyle: {
                  fontWeight: "600",
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name="signup" 
              options={{
                title: "Sign Up",
                headerShown: true,
                headerTitleStyle: {
                  fontWeight: "600",
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name="(tabs)" 
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </View>
      </AuthProvider>
    </ClerkProvider>
  );
}

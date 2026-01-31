import 'react-native-reanimated';
import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { colors } from './lib/theme';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

import EventsScreen from './screens/EventsScreen';
import MapScreen from './screens/MapScreen';
import GuideScreen from './screens/GuideScreen';
import SavedScreen from './screens/SavedScreen';
import FallaDetailScreen from './screens/FallaDetailScreen';

// Auth screens
import { LoginScreen, RegisterScreen, ForgotPasswordScreen } from './screens/auth';

// Guide subscreens
import GuideFireworksScreen from './screens/guide/GuideFireworksScreen';
import GuideTransportScreen from './screens/guide/GuideTransportScreen';
import GuideExhibitionsScreen from './screens/guide/GuideExhibitionsScreen';
import GuideFairsScreen from './screens/guide/GuideFairsScreen';
import GuideNightlifeScreen from './screens/guide/GuideNightlifeScreen';
import GuideBullfightingScreen from './screens/guide/GuideBullfightingScreen';
import GuideGlossaryScreen from './screens/guide/GuideGlossaryScreen';
import GuideStreetClosuresScreen from './screens/guide/GuideStreetClosuresScreen';
import GuidePracticalInfoScreen from './screens/guide/GuidePracticalInfoScreen';

import { AnimatedTabIcon, CustomTabBar, FloatingTabBar, FloatingLanguageSwitcher } from './components';

export type RootStackParamList = {
  MainTabs: undefined;
  FallaDetail: { falla: Falla };
  GuideFireworks: undefined;
  GuideTransport: undefined;
  GuideExhibitions: undefined;
  GuideFairs: undefined;
  GuideNightlife: undefined;
  GuideBullfighting: undefined;
  GuideGlossary: undefined;
  GuideStreetClosures: undefined;
  GuidePracticalInfo: undefined;
  // Auth screens
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type Falla = {
  id: string;
  name: string;
  category: string;
  address: string;
  description: string;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type MainTabsParamList = {
  Eventos: undefined;
  Mapa: { selectedFallaId?: string } | undefined;
  Guía: undefined;
  Guardado: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

// Protected Tab Screen - shows Login if not authenticated
// For design review: always show SavedScreen
function SavedTabScreen() {
  const { user, initialized } = useAuth();

  // DESIGN REVIEW MODE: Always show SavedScreen to match design mockup
  // Remove this block for production
  return <SavedScreen />;

  /*
  if (!initialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.orange} />
      </View>
    );
  }
  
  if (!user) {
    return <LoginScreen />;
  }
  
  return <SavedScreen />;
  */
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary.orange },
        headerTintColor: colors.text.inverse,
        lazy: true,
      }}
      detachInactiveScreens={true}
    >
      <Tab.Screen
        name="Eventos"
        component={EventsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon icon="events" focused={focused} color={color} />
          ),
          headerShown: false, // Hide nav header - EventsFeed has its own
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon icon="map" focused={focused} color={color} />
          ),
          headerShown: false, // Hidden to match design
        }}
      />
      <Tab.Screen
        name="Guardado"
        component={SavedTabScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon icon="favorites" focused={focused} color={color} />
          ),
          headerShown: false, // Hidden to match design
        }}
      />
      <Tab.Screen
        name="Guía"
        component={GuideScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon icon="guide" focused={focused} color={color} />
          ),
          headerShown: false, // Hidden to match design
        }}
      />
    </Tab.Navigator>
  );
}

// Loading screen while initializing auth
function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary.orange} />
    </View>
  );
}

function AppNavigator() {
  const { initialized } = useAuth();

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* Debug language switcher */}
      <FloatingLanguageSwitcher />
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FallaDetail"
          component={FallaDetailScreen}
          options={{
            presentation: 'modal',
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
        {/* Auth Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: 'Iniciar sesión',
            headerStyle: { backgroundColor: colors.primary.orange },
            headerTintColor: colors.text.inverse,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitle: 'Crear cuenta',
            headerStyle: { backgroundColor: colors.primary.orange },
            headerTintColor: colors.text.inverse,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            headerTitle: 'Recuperar contraseña',
            headerStyle: { backgroundColor: colors.primary.orange },
            headerTintColor: colors.text.inverse,
            animation: 'slide_from_right',
          }}
        />
        {/* Guide Screens */}
        <Stack.Screen
          name="GuideFireworks"
          component={GuideFireworksScreen}
          options={{
            headerTitle: 'Pirotecnia',
            headerStyle: { backgroundColor: '#FF4444' },
            headerTintColor: '#fff',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="GuideTransport"
          component={GuideTransportScreen}
          options={{
            headerTitle: 'Transporte',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="GuideExhibitions"
          component={GuideExhibitionsScreen}
          options={{
            headerTitle: 'Exposiciones',
            headerStyle: { backgroundColor: '#9C27B0' },
            headerTintColor: '#fff',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="GuideFairs"
          component={GuideFairsScreen}
          options={{
            headerTitle: 'Ferias',
            headerStyle: { backgroundColor: '#FF9800' },
            headerTintColor: '#fff',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="GuideNightlife"
          component={GuideNightlifeScreen}
          options={{
            headerTitle: 'Vida Nocturna',
            headerStyle: { backgroundColor: '#E91E63' },
            headerTintColor: '#fff',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="GuideBullfighting"
          component={GuideBullfightingScreen}
          options={{
            headerTitle: 'Toros',
            headerStyle: { backgroundColor: '#795548' },
            headerTintColor: '#fff',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="GuideGlossary"
          component={GuideGlossaryScreen}
          options={{
            headerTitle: 'Glosario',
            headerStyle: { backgroundColor: '#2196F3' },
            headerTintColor: '#fff',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="GuideStreetClosures"
          component={GuideStreetClosuresScreen}
          options={{
            headerTitle: 'Calles Cortadas',
            headerStyle: { backgroundColor: '#E63946' },
            headerTintColor: '#fff',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="GuidePracticalInfo"
          component={GuidePracticalInfoScreen}
          options={{
            headerTitle: 'Información Práctica',
            headerStyle: { backgroundColor: '#607D8B' },
            headerTintColor: '#fff',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </>
  );
}

// Web wrapper for mobile-first appearance
function WebContainer({ children }: { children: React.ReactNode }) {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.webOuterContainer}>
      <View style={styles.webInnerContainer}>
        {children}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebContainer>
        <SafeAreaProvider>
          <LanguageProvider>
            <AuthProvider>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
              <StatusBar style="light" />
            </AuthProvider>
          </LanguageProvider>
        </SafeAreaProvider>
      </WebContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.cream,
  },
  webOuterContainer: {
    flex: 1,
    backgroundColor: colors.background.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webInnerContainer: {
    width: '100%',
    maxWidth: 430, // iPhone 14 Pro Max width
    height: '100%',
    maxHeight: 932, // iPhone 14 Pro Max height
    backgroundColor: colors.background.cream,
    overflow: 'hidden',
    borderRadius: 20,
    ...Platform.select({
      web: {
        boxShadow: '0 0 40px rgba(0,0,0,0.3)',
      },
      default: {},
    }),
  },
});

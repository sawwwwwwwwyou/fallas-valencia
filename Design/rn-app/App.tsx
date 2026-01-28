import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import EventsFeedScreen from './screens/EventsFeedScreen';
import InteractiveMapScreen from './screens/InteractiveMapScreen';
import SavedFavoritesScreen from './screens/SavedFavoritesScreen';
import GuideScreen from './screens/GuideScreen';
import { TabBar } from './components/TabBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Tab.Navigator
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tab.Screen 
              name="Events" 
              component={EventsFeedScreen}
              options={{ title: 'Events' }}
            />
            <Tab.Screen 
              name="Map" 
              component={InteractiveMapScreen}
              options={{ title: 'Map' }}
            />
            <Tab.Screen 
              name="Saved" 
              component={SavedFavoritesScreen}
              options={{ title: 'Saved' }}
            />
            <Tab.Screen 
              name="Guide" 
              component={GuideScreen}
              options={{ title: 'Guide' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

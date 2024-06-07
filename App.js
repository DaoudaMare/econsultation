import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from './components/search';
import Setting from './components/parametre';
import Home from './components/home';

const TabMenu= createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TabMenu.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Méteo') {
              iconName = focused
                ? 'partly-sunny'
                : 'partly-sunny-outline';
            } else if (route.name === 'Paramètre') {
              iconName = focused ? 'cog' :'cog-outline';
            }else if (route.name === 'Santé') {
              iconName = focused ? 'heart' :'heart-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <TabMenu.Screen name="Méteo" component={Home} />
        <TabMenu.Screen name="Santé" component={Search} />
        <TabMenu.Screen name="Paramètre" component={Setting} />
      </TabMenu.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  field:{
    height: 30,
    width:105, 
    borderColor: 'gray', 
    borderWidth: 1
  }
});

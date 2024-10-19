import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login'; 
import Watch from './components/Information';
import Popular from './components/Popular';
import TopRated from './components/TopRated';


export type RootStackParamList = {
  Popular: undefined; 
  TopRated: undefined;
  Login: undefined;
  Watch: { selectedMovie: any };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Popular" component={Popular} options={{ headerShown: false }}/>
        <Stack.Screen name="TopRated" component={TopRated} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Watch" component={Watch} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

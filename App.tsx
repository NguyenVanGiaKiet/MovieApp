import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login'; 
import Information from './components/Information';
import Popular from './components/Popular';
import TopRated from './components/TopRated';
import Watch from './components/Watch';
import Search from './components/Search';


export type RootStackParamList = {
  Popular: undefined; 
  TopRated: undefined;
  Login: undefined;
  Information: { selectedMovie: any };
  Watch: { selectedMovie: any };
  Search: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Popular" component={Popular} options={{ headerShown: false }}/>
        <Stack.Screen name="TopRated" component={TopRated} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Information" component={Information} options={{ headerShown: false }} />
        <Stack.Screen name="Watch" component={Watch} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

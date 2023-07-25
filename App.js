import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import CustomAppBar from './component/customAppBar'
import SigninScreen from './screens/SignInScreen'
import SplashScreen from './screens/SplashScreen'
import SignupScreen from './screens/SignUpScreen'
import HomeScreen from './screens/HomeScreen'
import UpdateProfileScreen from './screens/UpdateProfileScreen'
import store from './store'
import AddNewFormScreen from './screens/AddNewFormScreen'
import AddItemCheaklistScreen from './screens/AddItemCheaklistScreen'
import FormViewScreen from './screens/FormViewScreen'
import TotalItemSpoilListScreen from './screens/TotalItemSpoilListScreen'

const Stack = createStackNavigator();

const screenOptionStyle = {
  // headerShown: false,  
  ...TransitionPresets.SlideFromRightIOS,
  
};

export default function App() {

  const childRef = useRef();

  const handleLogout = () => {
    childRef.current.handleLogout2()
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
         
        screenOptions={{
          ...screenOptionStyle,
          header: (props) => <CustomAppBar {...props} logout={() => handleLogout()} />,
        }}>
           {/* <Stack.Screen name="TotalItemSpoilList" component={TotalItemSpoilListScreen} /> */}
        {/* <Stack.Screen name="AddNewForm" options={{ headerShown: false }} component={AddNewFormScreen} /> */}
        <Stack.Screen name="Splash" options={{ headerShown: false }} component={SplashScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={SigninScreen} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {props => <HomeScreen {...props} ref={childRef} />}
        </Stack.Screen>
        {/* <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} ref={childRef} /> */}
        <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
        <Stack.Screen name="AddNewForm" component={AddNewFormScreen} />
        <Stack.Screen name="AddItemChecklist" component={AddItemCheaklistScreen} />
        <Stack.Screen name="FormView" component={FormViewScreen} />
       

      </Stack.Navigator>
    </NavigationContainer>
    </Provider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

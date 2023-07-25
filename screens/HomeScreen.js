import React, { Component, useEffect, useState, useImperativeHandle,forwardRef } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import CustomAppBar from '../component/customAppBar'
import Homepage from './HomepageScreen'
import Form from './FormScreen'
import Profile from './ProfileScreen'
import { useSelector, useDispatch } from 'react-redux'
import { getProfile, logout } from '../actions/userActions'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { requireNativeViewManager } from 'expo-modules-core'
import AddNewFormScreen from './AddNewFormScreen'
import TotalItemSpoilListScreen from './TotalItemSpoilListScreen'

const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -10,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
    onPress={onPress}
  >
    <View style={{
      width: 70,
      higt: 70,
      borderRadius: 35,
      backroundColor: '#ee32f45'
    }}>
      {children}
    </View>
  </TouchableOpacity>
)


const HomeScreen = forwardRef(({ route }, ref) => {
  const { userInfo } = route.params;
  const dispatch = useDispatch();
  const userUpdate = useSelector(state => state.userUpdate);

  const { } = userUpdate;


  useEffect(() => {
    dispatch(getProfile(userInfo.id))
    return () => {
      //
    };
  }, [userUpdate.status]);

  const handleLogout = () => {
    dispatch(logout())
  }
  useImperativeHandle(ref, () => ({
    handleLogout2() {
      dispatch(logout())
    }

  }));

  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({

        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Profile') {
            return (
              <Ionicons
                name={'md-person'}
                size={size}
                color={color}
              />
            );
          }

          else if (route.name === 'Home') {
            return (
              <Ionicons
                name={'md-home'}
                size={size}
                color={color}
              />
            );

          }


        },

        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#8868f5',
        header: (props) => <CustomAppBar logout={() => handleLogout()} />

      })}
    >
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="AddNewForm" component={AddNewFormScreen} options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('../assets/images/icons8-plus-67.png')}
            resizeMode="contain"
            style={{
              width: 70,
              height: 70,

            }}
          />
        ),
        tabBarLabel: ({ }) => (
          null
        )
        // tabBarButton: (props) => (
        //   // <CustomTabBarButton {...props} />
        // )
      }} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="TotalItemSpoilList" component={TotalItemSpoilListScreen} /> */}
    </Tab.Navigator>
  );
})

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19191a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
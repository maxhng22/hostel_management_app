import React, { Component, useEffect, useState } from 'react'
import {
  StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ToastAndroid
} from 'react-native'
import {
  Dialog, Portal, Provider,
} from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from "expo-linear-gradient"

const ProfileScreen = ({ navigation }) => {


  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.userProfile);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const { loading, data, error, login } = userProfile;
  const userData = data || { fullName: '', }

  const getImage = () => {
    if (userData.image) {
      return <Image style={styles.avatar} resizeMode='cover' source={{ uri: userData.image }} />
    } else {
      return <Image style={styles.avatar} resizeMode='cover' source={require('../assets/images/default_user.png')} />
    }
  }


  return (
    <Provider>
      <View style={styles.container}
      >

        <LinearGradient
          style={styles.header}
          colors={['#8769f5', '#01133F']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          {getImage()}
          <Text style={styles.name}>{userData.fullName || "Name"}</Text>

        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.bodyHeader}>
            {/* <Text style={styles.name}>{userData.fullName || ""}</Text> */}
            {/* <Text style={styles.info}>{userInfo.email || ""}</Text> */}
            {/* <Text style={styles.description}>{userInfo ? userInfo.description || "" : ""}</Text> */}
          </View>
          <View style={styles.bodyContent}>

            <TouchableOpacity style={styles.buttonContainer} onPress={() =>
              navigation.navigate('UpdateProfile', { id: data.id })}>
              <LinearGradient
                colors={['#8769f5', '#01133F']}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Update Porfile</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </View>
      </View >
    </Provider>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  header: {
    // backgroundColor: "#ed365b",
    height: 300,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#ABFF0000",
    justifyContent: 'center',
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: 50
  },
  name: {
    width: 130,
    height: 130,
    fontSize: 22,
    color: "white",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  bodyHeader: {
    marginTop: 20,
    alignItems: 'center'
  },
  name: {
    fontSize: 38,
    color: "white",
    textAlign: 'center'
    // fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },

});

import * as React from 'react'
import { Appbar, Colors } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { logout } from '../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'

function CustomAppBar({ route, navigation, back, logout }) {

  const handleLogout = () => {
    logout()
  }

  return (
    <Appbar.Header style={styles.appBar}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Hostelz"  titleStyle={{color:'white'}}  />
      <Appbar.Action icon="logout" onPress={handleLogout} />
    </Appbar.Header>
  );

}


export default CustomAppBar

const styles = StyleSheet.create({
  appBar: {
    backgroundColor:'#01133F',
  },
});
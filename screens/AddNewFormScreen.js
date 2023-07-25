import React, { useEffect, useState } from 'react'
import {
    View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, StatusBar, Alert, Image, Dimensions, ScrollView,ToastAndroid
} from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { Provider } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const AddNewFormScreen = ({ navigation }) => {

    const userProfile = useSelector(state => state.userProfile);
    const { data, loading, error, login } = userProfile;
    const userData = data || { fullName: '', }


    const showButton=userData.type==='student'?true:false


    const getImage = () => {
        if (userData.image) {
            return <Image style={styles.avatar} resizeMode='cover' source={{ uri: userData.image }} />
        } else {
            return <Image style={styles.avatar} resizeMode='cover' source={require('../assets/images/default_user.png')} />
        }
    }

    const checkUserInfo = (type) => {
        if (userData.ic&&userData.ndp&&userData.fullName&&userData.room_no&&userData.admission_date) {
            navigation.navigate('AddItemChecklist', {
                formType: type
            })
        } else {
            ToastAndroid.show('Please update your information at profile!', ToastAndroid.SHORT);
        }
    }



    return (

        <ScrollView style={styles.container}
        >

            <LinearGradient
                style={styles.header}
                colors={['#8769f5', '#01133F']}
            // start={{ x: 0, y: 1 }}
            // end={{ x: 1, y: 0 }}
            >
                {getImage()}
                <Text style={styles.name}>{userData.fullName || "Name"}</Text>

            </LinearGradient>

            <Animatable.View
                animation="fadeInUpBig" style={styles.body}>
                <View style={styles.bodyHeader}>
                    <Text style={styles.tittle}>User info</Text>
                </View>
                { showButton &&   <Text style={styles.subTittle}>NDP</Text>}
                { showButton && <View style={styles.searchSection}>
                    <MaterialCommunityIcons style={styles.searchIcon} name="identifier" size={25} color="#8868f5" />
                    <Text
                        style={styles.input}
                    >
                        {userData.ndp}
                    </Text>
                </View>}
                 { showButton &&  <Text style={styles.subTittle}>No. K/P</Text>}
                 { showButton &&  <View style={styles.searchSection}>
                    <MaterialCommunityIcons style={styles.searchIcon} name="card-account-details" size={25} color="#8868f5" />
                    <Text
                        style={styles.input}
                    >
                        {userData.ic}
                    </Text>
                </View>}


                { showButton &&  <Text style={styles.subTittle}>Room Unit</Text>}
                  { showButton && <View style={styles.searchSection}>
                    <FontAwesome5 style={styles.searchIcon} name="house-user" size={25} color="#8868f5" />
                    <Text
                        style={styles.input}
                    >
                        {userData.room_no}
                    </Text>
                </View>}

                { !showButton &&  <View style={styles.searchSection}>
                    <MaterialCommunityIcons style={styles.searchIcon} name="phone" size={25} color="#8868f5" />
                    <Text
                        style={styles.input}
                    >
                        {userData.phone||'Not yet update!'}
                    </Text>
                </View>}


               { showButton && <View style={styles.btnParentSection}>

                    <TouchableOpacity
                        onPress={() => { checkUserInfo('Hostel Registration Form')}}>
                        <LinearGradient
                            colors={['#8769f5', '#01133F']}
                            style={styles.buttonContainer}
                        >
                            <Text style={styles.buttonText}>Hostel Registration Form</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>

                </View>}

                { showButton && <View style={styles.btnParentSection}>

                    <TouchableOpacity
                      onPress={() => { checkUserInfo('Hostel Damage Report')}}>

                        <LinearGradient
                            colors={['#8769f5', '#01133F']}
                            style={styles.buttonContainer}
                        >
                            <Text style={styles.buttonText}>Hostel Damage Report</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>}

            </Animatable.View>
        </ScrollView >

    );
};

export default AddNewFormScreen;

const styles = StyleSheet.create({
    header: {
        // backgroundColor: "#ed365b",
        height: Dimensions.get('window').height / 4,
    },
    container: {
        backgroundColor: '#ffffff',
    },
    avatar: {
        width: Dimensions.get('window').height / 8,
        height: Dimensions.get('window').height / 8,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#ABFF0000",
        justifyContent: 'center',
        marginBottom: 1,
        alignSelf: 'center',
        marginTop: 10
    },
    name: {
        fontSize: 12,
        color: "white",
        fontWeight: '600',
        textAlign: 'center',
    },
    tittle: {
        fontSize: 16,
        color: '#202020',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    body: {
        borderRadius: 12,
        padding: 20,
        elevation: 5,
        height: 500,
        marginTop: -45,
        marginHorizontal: 15,
        backgroundColor: '#f5f4f9',
        shadowColor: "#dfdfdf",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
    },
    bodyContent: {
        flex: 1,
        padding: 5,
    },
    bodyHeader: {
        marginTop: 20,
        alignItems: 'center'
    },


    searchSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#8868f5',
        borderRadius: 12,
    },
    searchIcon: {
        padding: 7,
    },
    input: {
        padding: 7,
        textAlignVertical: 'center',
        backgroundColor: 'white',
        color: '#737075',
        flex: 1,
    },
    subTittle: {
        color: '#202020',
        fontSize: 16,
        marginTop: 2,
        fontWeight: 'bold'
    },

    btnParentSection: {
        alignItems: 'center',
        marginTop: 20,
        // flex: 1,
    },
    buttonContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        borderRadius: 12,
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },


    iconContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
});

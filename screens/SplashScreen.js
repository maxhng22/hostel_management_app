import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image,ImageBackground  } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from "expo-linear-gradient"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native'

const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <ImageBackground source={require('../assets/images/background.jpg')} resizeMode="cover"style={styles.container}>
         
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
            {/* <ImageBackground source={require('../assets/logo.png')} resizeMode="cover" style={styles.logo}>
            </ImageBackground> */}
                {/* <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="cover"
                /> */}
            </View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: 'rgba(255, 255, 255, 0.8);',
                    // opacity:0.5
                    // backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                <Text style={[styles.title, {
                    color: colors.text
                }]}>Selamat Datang Ke Asrama Adtec Taiping.</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <LinearGradient
                            colors={['#8769f5', '#01133F']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        
        </ImageBackground>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.30;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'blue'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        // backgroundColor: '#fffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        opacity:0.5,
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});

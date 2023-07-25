import React, { useEffect, useState, useRef } from 'react'
import {
    View, Text, StyleSheet, SafeAreaView, Image, FlatList, TextInput, ScrollView, Dimensions, TouchableOpacity
} from 'react-native'
import colors from '../assets/colors/colors'
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../actions/userActions';
// import PhoneInput from "react-native-phone-number-input";

const UpdateProfileScreen = ({ route, navigation }) => {

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, data, error, status } = userUpdate;
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [institute, setInstitute] = useState('');
    const [ndp, setNdp] = useState('');
    const [admission, setAdmission] = useState('');
    const [room, setRoom] = useState('');
    const [ic, setIC] = useState('');
    const [phone, setPhone] = useState('');
    const [formattedValue, setFormattedValue] = useState("");
    const { id } = route.params;

    const userProfile = useSelector(state => state.userProfile);
    const { data: dataProfile } = userProfile;
    const userData = dataProfile || { fullName: '', }


    const showButton = userData.type === 'student' ? true : false

    const dispatch = useDispatch();
    const firstUpdate = useRef(true);
    const phoneInput = useRef();

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (status) {
            navigation.pop(1)
        }
        return () => {
            //
        };
    }, [status]);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled) {
            setImage({ uri: result.uri });
        }
    };


    const next = () => {
        if (!image && !name) {
            // notifyMessage('Please upload your profile image or enter your name.') 
        } else {
            dispatch(updateProfile(name, image, id, phone, formattedValue, ic, ndp, admission, institute, room));
        }

    };


    return (

        <ScrollView>
            <View style={styles.body}>
                <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }} >Pick your profile picture.</Text>
                <View style={styles.ImageSections}>
                    <View>
                        <TouchableOpacity
                            onPress={pickImage}
                        >
                            <Image source={image ? { uri: image.uri } : require(`../assets/images/default_user.png`)}
                                style={styles.images}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.InputSections}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Name'
                        value={name}
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setName(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    {showButton && <TextInput
                        style={styles.textInput}
                        placeholder='IC'
                        value={ic}
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setIC(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />}

                    {showButton && <TextInput
                        style={styles.textInput}
                        placeholder='NDP'
                        value={ndp}
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setNdp(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />}

                    {showButton && <TextInput
                        style={styles.textInput}
                        placeholder='Institute'
                        value={institute}
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setInstitute(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />}

                    {showButton && <TextInput
                        style={styles.textInput}
                        placeholder='Admission session'
                        value={admission}
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setAdmission(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />}

                    {showButton && <TextInput
                        style={styles.textInput}
                        placeholder='Room no'
                        value={room}
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setRoom(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />}

                    <TextInput
                        style={styles.textInput}
                        placeholder='Phone'
                        value={phone}
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setPhone(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    {/* 
                    <PhoneInput
                        containerStyle={styles.textInput}
                        ref={phoneInput}
                        defaultValue={phone}
                        defaultCode="MY"
                        layout="first"
                        onChangeText={(text) => {
                            setPhone(text);
                        }}
                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                        }}
                        autoFocus
                    /> */}

                </View>

                <View style={styles.btnParentSection}>
                    <TouchableOpacity onPress={next} style={styles.buttonContainer}  >
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}

export default UpdateProfileScreen

const styles = StyleSheet.create({
    scrollView: {
        // backgroundColor: 'GREEN',
    },

    body: {
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',


    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    images: {
        width: 300,
        height: 300,
        borderColor: 'blue',
        borderWidth: 1,
        marginHorizontal: 3
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop: 20
    },
    btnSection: {
        width: 300,
        height: 50,
        backgroundColor: '#788eec',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },

    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#25B4E1",
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    textInput: {
        padding: 10,
        paddingStart: 30,
        width: 350,
        height: 50,
        marginTop: 10,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    InputSections: {
        display: 'flex',
        flexDirection: 'column',
        // paddingHorizontal: 8,
        // paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
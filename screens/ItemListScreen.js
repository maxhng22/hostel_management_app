import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import colors from '../assets/colors/colors'
import CardCheckbox from '../component/CardCheckbox';
import { LinearGradient } from "expo-linear-gradient"
import { addItemApplicationForm } from '../actions/itemActions';
import { useSelector, useDispatch } from 'react-redux';

const itemData = [
    { name: 'room key', image: require('../assets/images/roomkey.jpg') },
    { name: 'bed sheets', image: require('../assets/images/bedsheet.jpg') },
    { name: 'pillow', image: require('../assets/images/pillow.jpg') },
    { name: 'table', image: require('../assets/images/table.jpg') },
    { name: 'chair', image: require('../assets/images/chair.jpg') },
    { name: 'closet', image: require('../assets/images/closet.jpg') },
    { name: 'cloth hanger', image: require('../assets/images/clothhnager.jpg') },
    { name: 'shoe rack', image: require('../assets/images/shoesrack.jpg') },
    { name: 'fan', image: require('../assets/images/fan.jpg') },
    { name: 'switch 1 gang', image: require('../assets/images/switch1gang.jpg') },
    { name: 'switch 2 gang', image: require('../assets/images/switch2gang.jpg') },
    { name: 'socket', image: require('../assets/images/socket.jpg') },
    { name: 'lamp', image: require('../assets/images/lamp.jpg') },
    { name: 'door/knob/latch', image: require('../assets/images/door.jpeg') },
    { name: 'window/window latches', image: require('../assets/images/window.jpg') },
    { name: 'curtain/curtain rails', image: require('../assets/images/curtain.jpg') },
    { name: 'others', image: require('../assets/images/others.jpg') },
]

const parameter = [
    { name: 'room key', status: false, description: '' },
    { name: 'bed sheets', status: false, description: '' },
    { name: 'pillow', status: false, description: '' },
    { name: 'table', status: false, description: '' },
    { name: 'chair', status: false, description: '' },
    { name: 'closet', status: false, description: '' },
    { name: 'cloth hanger', status: false, description: '' },
    { name: 'shoe rack', status: false, description: '' },
    { name: 'fan', status: false, description: '' },
    { name: 'switch 1 gang', status: false, description: '' },
    { name: 'switch 2 gang', status: false, description: '' },
    { name: 'socket', status: false, description: '' },
    { name: 'lamp', status: false, description: '' },
    { name: 'door/knob/latch', status: false, description: '' },
    { name: 'window/window latches', status: false, description: '' },
    { name: 'curtain/curtain rails', status: false, description: '' },
    { name: 'others', status: false, description: '' },
]

const ItemListScreen = ({ route, navigation }) => {
    const itemAdd = useSelector(state => state.itemAdd);
    const { status } = itemAdd;
    const firstUpdate = useRef(true);
    const { formType } = route.params

    const [items, setItems] = useState(JSON.parse(JSON.stringify(parameter)))
    const toDate = new Date().toLocaleString()

    const userProfile = useSelector(state => state.userProfile);
    const { data, loading, error, login } = userProfile;
    const userData = data || { fullName: '', }

    const dispatch = useDispatch();


    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!firstUpdate.current) {
            if (status) {

                navigation.pop(1)
            }

        }
    }, [status]);

    const renderButton = () => {
        return (

            <View style={styles.horizontalContainer}>
                <TouchableOpacity
                    onPress={submit}>
                    <LinearGradient
                        style={styles.buttonContainer}
                        colors={['#8769f5', '#01133F']}

                    >
                        <Text style={styles.buttonText}>Submit</Text>

                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )

    }
    const submit = () => {

        dispatch(addItemApplicationForm(userData.fullName, userData.id, userData.room_no, toDate, items,
            userData.image, userData.admission_date, userData.ic, userData.ndp, formType))
    }

    const setItemArray = (item, value, id) => {
        items[id][item] = value
        setItems([...items])
    }



    return (
        <ScrollView style={styles.container}>
            {/* {renderHeader()} */}

            {renderButton()}
            <Text style={styles.header}>{formType}</Text>
            <Text style={styles.subHeader}>Last Modified : {toDate}</Text>
            {itemData.map((item, i) => (

                <CardCheckbox key={i} item={{ ...item, id: i }} parameter={items[i]} onChange={setItemArray} />
            ))}
            {/* <View style={styles.centerContainer}> */}
            {renderButton()}
            {/* </View> */}
        </ScrollView>
    )
}

export default ItemListScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    header: {
        color: '#202020',
        fontSize: 35,
        marginLeft: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    subHeader: {
        color: '#4c4c4d',
        // alignItems: 'center',
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 10,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0
        // alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        justifyContent: 'flex-end',
        marginBottom: 0,
        // position: 'absolute',
        // bottom: 0,
        alignSelf: 'center',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '97%',
        borderRadius: 12,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },


    infoContainer: {
        margin: 5,
    },
    title: {
        marginLeft: 6,
        fontSize: 15,
        color: colors.textDark,
    },
    description: {
        marginLeft: 6,
        fontSize: 12,
        color: colors.gray,
    },

    sideContainer: {
        flexDirection: 'row',
        // marginRight: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        // flexDirection:'row',
    },
    rightTopContainer: {
        height: '100%',
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        flexDirection: "row",
        backgroundColor: "#01133F",
    },
    sideText: {
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 12
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 63,
        borderWidth: 1,
        borderColor: "#ABFF0000",
        justifyContent: 'center',
        alignSelf: 'center',

    },

    contactContainer: {
        flexDirection: 'row'
    },

    horizontalContainer: {
        marginBottom: 6,
        paddingLeft: 3,
        borderRadius: 6,
        backgroundColor: colors.white,
        overflow: 'hidden',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        flexDirection: 'row',
    },
});
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    // ToastAndroid,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import colors from '../assets/colors/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient"


const CardView = (props) => {
    const { item, navigation } = props



    const getImage = (image) => {
        if (image) {
            return <Image style={styles.avatar} resizeMode='cover' source={{ uri: image }} />
        } else {
            return <Image style={styles.avatar} resizeMode='cover' source={require('../assets/images/default_user.png')} />
        }
    }



    const onClickCardview = () => {
        if (navigation) {
            navigation.navigate('FormView', item)
        }
    }
    // user: user,
    // userId: userId,
    // room: room,
    // date: date,
    // items:items

    return (

        <View style={styles.mainContainer}>
            <TouchableOpacity
                onPress={() =>
                    onClickCardview()
                }>
                <View style={styles.verticalContainer}>
                    <LinearGradient
                        colors={['#01133F', '#8769f5']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 0.5, y: 1 }}
                    >
                        <View style={styles.horizontalContainer}>
                            <View style={styles.contactContainer}>
                                {getImage(item.image)}
                                <View style={styles.centerContainer}>
                                    <Text style={styles.bigtitle}>
                                        {item.formType}
                                    </Text>
                                    <Text style={styles.title}>
                                        {item.user}
                                    </Text>
                                    <Text style={styles.description}>
                                        {item.date}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.sideContainer}>
                                <View style={styles.columnContainer}>
                                    <View style={styles.rightTopContainer}>
                                        <Text style={styles.sideText}>
                                            Room unit: {item.room_no}
                                        </Text>
                                    </View>
                                    <View style={{
                                        // flex: 1,
                                        marginTop:6,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'

                                    }}>
                                        <FontAwesome
                                            name="circle"
                                            color={item.viewStatus === 'read' ? '#00ff00' : 'yellow'}
                                            size={20}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>



                    </LinearGradient>
                </View>
            </TouchableOpacity>
        </View>

    )
}


export default CardView


const styles = StyleSheet.create({
    mainContainer: {
        padding: 8,
        width: Dimensions.get('window').width,
    },

    verticalContainer: {
        flexDirection: 'column',
        borderRadius: 12,
        // backgroundColor: colors.white,
        overflow: 'hidden',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,

    },

    horizontalContainer: {
        padding: 4,
        paddingLeft: 4,
        flexDirection: 'row',
    },
    centerContainer: {
        justifyContent: 'center'
    },
    infoContainer: {
        margin: 5,
    },
    columnContainer: {
        flexDirection: 'column',
    },
    bigtitle: {
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ededed',
    },
    title: {
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#e4e4e4',
    },
    description: {
        paddingLeft: 10,
        fontSize: 12,
        color: "#D3D3D3",
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
        padding: 3,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        marginTop: -15,
        justifyContent: "flex-end",
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
        width: 70,
        height: 70,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#ABFF0000",
        justifyContent: 'center',
        alignSelf: 'center',

    },
    contactContainer: {
        flexDirection: 'row'
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
    },
    iconContainer: {
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 10,
    },
    iconHorizontalContainer: {
        alignItems: 'center', //Centered vertically,
        padding: 5,
        justifyContent: 'center',
        flexDirection: 'row',
    },
});




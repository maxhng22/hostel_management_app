import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import colors from '../assets/colors/colors'
import { Checkbox, List } from 'react-native-paper'
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

const ItemDisplay = ({ item }) => {

    const [expanded, setExpanded] = useState(false);
    const show = item.description ? true : false
    return (

        <View style={styles.mainContainer}>
            <View style={styles.verticalContainer}>
                <View style={styles.horizontalContainer}>
                    <View style={styles.sideContainer}>
                        <Checkbox
                            color={'#8868f5'}
                            uncheckedColor={"#8868f5"}
                            tintColors={{ true: 'red' }}
                            theme=''
                            style={{
                                tintColors: 'white',
                                backgroundColor: 'white'
                            }}
                            status={item.status === true ? 'checked' : 'unchecked'}
                        />
                    </View>
                    <View style={styles.contactContainer}>
                        <View style={styles.centerContainer}>
                            <Text style={styles.title}>
                                {item.name}
                            </Text>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                            {show && <TouchableOpacity
                                onPress={() => setExpanded(!expanded)}>
                                <Icon name="bars" size={25} color='gray' />
                            </TouchableOpacity>}
                        </View>
                    </View>


                </View>
                <Collapsible collapsed={!expanded}>
                    <Text style={styles.description}>
                        <Text style={{ fontWeight: 'bold', color: '#737075' }}> Notes:  </Text>{item.description}
                    </Text>
                </Collapsible>

            </View>
        </View>

    )
}


export default ItemDisplay


const styles = StyleSheet.create({
    mainContainer: {
        padding: 1,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        width: Dimensions.get('window').width - 20,
    },

    verticalContainer: {
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
        width: Dimensions.get('window').width - 20,
        borderRadius: 6,
        backgroundColor: '#f5f4f9',
        overflow: 'hidden',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        paddingLeft: 3,
        flexDirection: 'column',

    },
    horizontalContainer: {
        flexDirection: 'row',
    },
    centerContainer: {

        justifyContent: 'center'
    },
    infoContainer: {
        margin: 5,
    },
    title: {
        marginLeft: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#646166',
    },
    titleTextinput: {
        marginRight: 15,
        width: 280,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 1,
        borderColor: '#ededed',
        marginLeft: 5,
        backgroundColor: 'white',
        fontSize: 12,
        color: colors.textDark,
    },
    description: {
        marginLeft: 4,
        fontSize: 16,
        color: '#737075'
    },

    sideContainer: {
        flexDirection: 'row',
        // marginRight: 30,

        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection:'row',
    },
    rightTopContainer: {
        justifyContent: "center",
        width: 100,
        height: '100%',
        flexDirection: "row",

    },

    avatar: {
        width: 65,
        height: 65,
        borderWidth: 4,
        borderRadius: 12,
        borderColor: "#ABFF0000",
        justifyContent: 'center',
        alignSelf: 'center',

    },
    contactContainer: {
        flex: 1,
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




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
import { Checkbox } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
const CardCheckbox = ({ item, onChange, parameter }) => {
    const [expanded, setExpanded] = useState(false);

    const getImage = (image) => {
        if (image) {
            return <Image style={styles.avatar} resizeMode='cover' source={image} />
        } else {
            return <Image style={styles.avatar} resizeMode='cover' source={require('../assets/images/default_user.png')} />
        }
    }

    const onValueChange = (type, value) => {

        onChange(type, value, item.id)
    }


    return (

        <View style={styles.mainContainer}>
            <View style={styles.verticalContainer}>
                <View style={styles.horizontalContainer}>
                    <View style={styles.sideContainer}>
                        <Checkbox
                            status={parameter.status === true ? 'checked' : 'unchecked'}
                            onPress={() => {
                                onValueChange('status', parameter.status === true ? false : true);
                            }}
                            color={'#8868f5'}
                            uncheckedColor={"#8868f5"}
                            tintColors={{ true: 'red' }}
                            theme=''
                            style={{
                                tintColors: 'white',
                                backgroundColor: 'white'
                            }}

                        />
                    </View>
                    <View style={styles.contactContainer}>
                        <View style={styles.centerContainer}>
                            <Text style={styles.title}>
                                {item.name}
                            </Text>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                            <TouchableOpacity
                                onPress={() => setExpanded(!expanded)}>
                                <Icon name="bars" size={25} color='gray' />
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
                <Collapsible collapsed={!expanded}>
                    <View style={styles.horizontalContainer}>
                        <Text style={styles.description}>
                            <Text style={{ fontWeight: 'bold', color: '#737075' }}> Notes:  </Text>
                        </Text>

                        <TextInput
                            placeholder='Enter your message here.'
                            style={styles.titleTextinput}
                            multiline={true}
                            numberOfLines={2}
                            // value={description}
                            onEndEditing={(e) => {
                                onValueChange('description', e.nativeEvent.text)
                            }}
                        />
                    </View>
                </Collapsible>

            </View>
        </View>

        // <View style={styles.mainContainer}>

        //     <View style={styles.horizontalContainer}>
        //         <View style={styles.sideContainer}>
        //             <Checkbox

        //             color={'yellow'}
        //                 status={parameter.status === true ? 'checked' : 'unchecked'}
        //                 onPress={() => {
        //                     onValueChange('status', parameter.status === true ? false : true);
        //                 }}

        //             />
        //         </View>
        //         <View style={styles.contactContainer}>
        //             {/* {getImage(item.image)} */}
        //             <View >
        //                 <Text style={styles.title}>
        //                     {item.name}
        //                 </Text>
        //                 <TextInput
        //                     placeholder='Notes'
        //                     style={styles.titleTextinput}
        //                     multiline={true}
        //                     numberOfLines={2}
        //                     // value={description}
        //                     onBlur={(e) => {
        //                         onValueChange('description', e.target.value)
        //                     }}
        //                 />
        //             </View>
        //         </View>


        //     </View>


        // </View>

    )
}


export default CardCheckbox


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
        padding: 6,
        marginRight: 15,
        width: '87%',
        borderRadius: 12,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 1,
        borderColor: '#8a6af7',
        marginLeft: 5,
        backgroundColor: 'white',
        fontSize: 12,
        color: colors.textDark,
    },
    description: {
        textAlignVertical: 'center',
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





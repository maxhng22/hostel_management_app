import { View, StyleSheet, Button, Text } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import RBSheet from "react-native-raw-bottom-sheet"

const BookingScreen = () => {

    const refRBSheet = useRef();
    return (
        <View style={styles.mainContainer}>
            <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
            <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={500}
                    duration={250}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }
                    }}
                >
            </RBSheet>
        </View>
    )
}

export default BookingScreen


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f1f1f1',
        flex: 1,

    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})
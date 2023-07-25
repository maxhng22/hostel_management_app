import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from '../component/CardComponent'
import { getItemApplicationForm } from '../actions/itemActions';
import { useSelector, useDispatch } from 'react-redux';
import ItemDisplay from '../component/ItemDisplay';
import { LinearGradient } from "expo-linear-gradient"
import Feather from 'react-native-vector-icons/Feather'
import * as Print from 'expo-print';
import { updateReadStatus } from '../actions/itemActions';
import { useIsFocused } from "@react-navigation/native";
// const data = [{
//   fullName: 'aiman',
//   date: '13/05/2022',
//   dayago: 5,
// },
// {
//   fullName: 'aiman',
//   date: '13/05/2022',
//   dayago: 3,
// }]

// border-bottom: 1px dotted #c03;
// width: 100%;
// display: block;

const FormViewScreen = ({ navigation, route }) => {
    const item = route.params;
    const [selectedPrinter, setSelectedPrinter] = useState();
    const isFocused = useIsFocused();
    const userProfile = useSelector(state => state.userProfile);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const { loading, data, error, login } = userProfile;
    const userData = data || { fullName: '' }
    const showPrintButton = userData.type === 'warden' || userData.type === 'admin' ? true : false

    const returnHtmlItem = () => {

        let html = '  <table>'
        item['items'].forEach((a, i) => {
            html += `   <tr><td><label>${i + 1} .${a.name}       </label></td>`
            if (a.status) {
                html += '<td><input type="checkbox" checked></td>'
            } else {
                html += '<td><input type="checkbox"></td>'
            }

            if (a.description) {
                html += `<td> <span style="border-bottom: 1px solid black;width: 100%;display: block;"><label>${a.description}  .</label></span></td>`
            } else {
                html += '<td style="width:200px;"><span style="border-bottom: 1px solid black;width: 100%;display: block;">&nbsp;</span></td>'
            }

            html += `  </tr>`

        })

        html += '</table>'
        return html
    }
    const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body >  
  <form>  

  <img style="  display: block;margin-left: auto;margin-right: auto;width: 10%;" src="https://www.jtm.gov.my/2015v3/images/stories/logo_JTM2014.png" alt="Logo"> 
  <div style="text-align: center;"> ${item.formType === 'Hostel Registration Form' ? 'Borang pendaftaran Asrama' : 'Laporan Kerosakan Asrama'}</div>  </br>  
  <hr>
  <label> NDP           :   ${item.ndp}</label>  </br>            
  <label> Nama          :   ${item.user}</label>   </br>  
  <label> No K/P        :   ${item.ic}</label> </br> 
  <label> No Bilik      :   ${item.room_no}</label>    </br> 
  <label> Sesi Kemasukan:   ${item.admission_date}</label>   </br>  
    
  <br>
  ${returnHtmlItem()}
  <br>
  <label>&ensp;&#8226; Segala kemudahan asrama adalah tertahluk pada insitis tersebut.  </label> </br> 
  </br> 
  <label>a) Saya mengaku bertanggungjawab sepenuhnya di atas alat-alat yang dipinjamkan.</label> </br> 
  <label>b) Jika didapati alat-alat yang dipinjam hilang atau rosak, peminjam dikehendaki menggantikan dengan yang baru.  </label> </br> 
  </br> 


  <div style="float: right;">
  <p style="width: 200px; display: table;">
  <span style="display: table-cell; border-bottom: 1px solid black;"></span>
  </p>
  <p style="width: 200px; display: table;">
 <span style="display: table-cell;">(Tandatangan Penyelia asrama)</span> 
  </p>
</div>



<div style="float: left;">
<p style="width: 200px; display: table;">
<span style="display: table-cell; border-bottom: 1px solid black;"></span>
</p>
<p style="width: 200px; display: table;">
 <span style="display: table-cell; width: 100px;">(Tandatangan pelajar) </span> 
</p>
</div>




  </form>  
  </body>  
</html>
`;
    {/* <span style="display: table-cell; border-bottom: 1px solid black;">(Tandatangan Penyelia asrama)</span> */ }
    {/* <span style="display: table-cell; width: 100px;">(Tandatangan pelajar) </span> */ }
    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url, // iOS only
        });
    }

    const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({
            html
        });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    }



    const dispatch = useDispatch();

    useEffect(() => {
        if (userData.type === 'admin') {
            if (item.viewStatus !== 'read') {
                dispatch(updateReadStatus(item.itemId, 'read'))
            }

        }

        return () => {
            //
        };
    }, [isFocused])






    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                {showPrintButton && <View style={styles.rigthContainer}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={print}>
                        <LinearGradient
                            colors={['#8769f5', '#01133F']}
                            style={styles.buttonContainer}
                        >
                            <Text style={styles.buttonText}>Print</Text>
                            <Feather
                                name="download"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>


                </View>}


            </View>
            <CardView item={item} />

            <View style={styles.centerContainer}>
                {item['items'].map((value, i) => (
                    <ItemDisplay item={value} key={i} />
                ))}

            </View>


        </ScrollView>
    )
}

export default FormViewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    centerContainer: {

        alignItems: 'center'
    },
    buttonContainer: {
        // marginTop:10,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        borderRadius: 12,
    },
    buttonText: {
        marginRight: 5,
        color: 'white',
        fontWeight: 'bold'
    },
    rigthContainer: {
        flex: 1,
        // flexDirection: 'row',
        marginTop: 5,
        marginRight: 10,
        alignItems: 'flex-end'
    }
});
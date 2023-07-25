import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from '../component/CardComponent'
import { getItemApplicationForm } from '../actions/itemActions';
import { useSelector, useDispatch } from 'react-redux';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import Filters from '../component/FilterButton';


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

const TotalItemSpoilListScreen = ({ navigation }) => {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const itemAdd = useSelector(state => state.itemAdd);
    const { status } = itemAdd;

    const item = useSelector(state => state.item);
    const { data } = item;

    const itemUpdate = useSelector(state => state.itemUpdate);
    const { status: status2 } = itemUpdate;

    const userProfile = useSelector(state => state.userProfile);
    const { data: data2, status: status3 } = userProfile;
    const userData = data2 || { fullName: '', }
    const [filter, setFilter] = useState(null)

    const getSearchData = (rowData) => {
        if (!filter || filter === 'ALL') {
            return rowData
        } else if (filter && filter.length > 0) {
            let validItems = []
            rowData.forEach(a1 => {
                let show = JSON.stringify(a1).toLowerCase().includes(filter.toLowerCase()) ? true : false
                // let show = finalColumn.every((item, i) => {
                //     if (a1[item].toString().includes(search)) {
                //         return false
                //     }
                //     return true
                // })
                if (show) {
                    validItems.push(a1)
                }

            })

            return validItems
        }

    }

    const showData = getSearchData(data)


    const dispatch = useDispatch();

    //   useEffect(() => {
    //     if (userData.type === 'admin' || userData.type === 'warden') {
    //       dispatch(getItemApplicationForm(userInfo.id, 'all'))
    //     } else {
    //       dispatch(getItemApplicationForm(userInfo.id, ''))

    //     }


    //   }, [status, status2, status3]);


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Application Form</Text>
            <Filters data={[{ title: 'ALL' }, { title: 'Hostel Damage Report' }, { title: 'Hostel Registration Form' }]} onValueChange={(text) => setFilter(text)} />
            <BarChart
                data={{
                    labels: ['rk', 'bs', 'pi', 'tb', 'ch',
                        'cs', 'ch', 'sr', 'fan', 's1g',
                        's2g', 'sk', 'lam', 'door', 'wl', 'cr', 'others'],
                    datasets: [
                        {
                            data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99],
                        },
                    ],
                }}
                horizontalLabelRotation={5}
                // barPercentage={0.3}
                withVerticalLabels={false}
                width={Dimensions.get('window').width - 16}
                height={220}
                // yAxisLabel={'Rs'}
                // formatYLabel={() => yLabelIterator.next().value}
                chartConfig={{
                    withVerticalLabels:false,
                    barPercentage: 0.5,
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
            {/* {showData.map((item, i) => (
        <CardView key={i} item={item} navigation={navigation} />
      ))} */}
        </ScrollView>
    )
}

export default TotalItemSpoilListScreen

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
    header: {
        color: '#202020',
        fontSize: 35,
        marginLeft: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
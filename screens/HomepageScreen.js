import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from '../component/CardComponent'
import { getItemApplicationForm } from '../actions/itemActions';
import { useSelector, useDispatch } from 'react-redux';
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

const HomepageScreen = ({ navigation }) => {

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

  useEffect(() => {
    if (userData.type === 'admin' || userData.type === 'warden') {
      dispatch(getItemApplicationForm(userInfo.id, 'all'))
    } else {
      dispatch(getItemApplicationForm(userInfo.id, ''))

    }


  }, [status, status2, status3]);


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Application Form</Text>
      <Filters data={[{ title: 'ALL' }, { title: 'Hostel Damage Report' }, { title: 'Hostel Registration Form' }]} onValueChange={(text) => setFilter(text)} />

      {showData.map((item, i) => (
        <CardView key={i} item={item} navigation={navigation} />
      ))}
    </ScrollView>
  )
}

export default HomepageScreen

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
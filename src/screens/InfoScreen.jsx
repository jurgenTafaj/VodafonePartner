import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Table from '../components/Table'
import HeaderImage from '../components/HeaderImage'
import { useEffect, useState } from 'react';
import MyDatePicker from '../components/MyDatePicker'


export default function InfoScreen() {

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [chosenDate, setChosenDate] = useState(null);
  const [activeButton, setActiveButton] = useState(null); // to know which button triggered the picker

  const showPicker = (buttonName) => {
    setActiveButton(buttonName);
    setPickerVisible(true);
  };

  const hidePicker = () => setPickerVisible(false);

  const handleDateConfirm = (date) => {
    setChosenDate({ button: activeButton, date }); // store which button's date
    hidePicker();
  };

  return (
    <>
      <HeaderImage text1="PERDORUESI" text2="adrionadmin" imageURL="notHome" />
      <View style={{ flex: 1, marginTop: -420 }}>
        <ScrollView styles={styles.scrollView}>

          <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
            <Image source={require('../assets/icons/sm_agenda_search.png')} style={styles.logo} />
            <Text style={{ fontWeight: 'bold', paddingTop: 10, fontSize: 15 }}>Kërko me datë</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.buton} onPress={() => showPicker('Nga')}>
              <Text>Nga</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buton} onPress={() => showPicker('Deri')}>
              <Text>Deri</Text>
            </TouchableOpacity>

            {chosenDate && (
              <Text style={{ marginTop: 20 }}>
                {chosenDate.button}: {chosenDate.date.toDateString()}
              </Text>
            )}

            <MyDatePicker
              visible={isPickerVisible}
              onConfirm={handleDateConfirm}
              onCancel={hidePicker}
            />
          </View>

          <Table kuponi="33346391" fatura="100" zbritja="0" />
          <Table kuponi="33346391" fatura="100" zbritja="0" />
          <Table kuponi="33346391" fatura="100" zbritja="0" />
          <Table kuponi="33346391" fatura="100" zbritja="0" />
          <Table kuponi="33346391" fatura="100" zbritja="0" />
          <Table kuponi="33346391" fatura="100" zbritja="0" />
          <Table kuponi="33346391" fatura="100" zbritja="0" />
          <Table kuponi="33346391" fatura="100" zbritja="0" />
          <Table kuponi="33346391" fatura="100" zbritja="0" />
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 40,
    width: 40
  },
  buton: {
    paddingHorizontal: 70,
    paddingVertical: 10,
    backgroundColor: '#ffffffff',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10
  },
  scrollView: {
  }
})
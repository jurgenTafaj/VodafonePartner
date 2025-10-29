import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Table from '../components/Table'
import HeaderImage from '../components/HeaderImage'


export default function InfoScreen() {

  return (
    <>
      <HeaderImage text1="PERDORUESI" text2="adrionadmin" imageURL="notHome" />
      <View style={{ flex: 1, marginTop: -400 }}>
        <ScrollView styles={styles.scrollView}>

          <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
            <Image source={require('../assets/icons/sm_agenda_search.png')} style={styles.logo} />
            <Text style={{ fontWeight: 'bold', paddingTop: 10, fontSize: 15 }}>Kërko me datë</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.buton}>
              <Text>Nga</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buton}>
              <Text>Deri</Text>
            </TouchableOpacity>
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
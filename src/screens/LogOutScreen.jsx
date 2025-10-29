import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import HeaderImage from '../components/HeaderImage'

export default function LogOut() {

  return (
    <>
      <View style={{ flex: 1 }}>
        <HeaderImage text1="PERDORUESI" text2="adrionadmin" imageURL="notHome" />
      </View>

      <View style={{ flex: 1, marginTop: -300, padding: 50 }}>
        <Image source={require('../assets/icons/logout_red.png')} style={{ height: 100, width: 100, marginLeft: 100 }} />
        <Text style={{ fontSize: 18, paddingVertical: 10, paddingLeft: 35 }}>Jeni i sigurt që doni të dilni?</Text>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={[styles.butoni, { backgroundColor: '#000000ff' }]}>
            <Text style={{ color: 'rgba(255, 255, 255, 1)' }}>Jo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.butoni, { backgroundColor: '#f14040ff' }]}>
            <Text style={{ color: 'rgba(255, 255, 255, 1)' }}>Po</Text>
          </TouchableOpacity>
        </View>
      </View >
    </>
  )
}

const styles = StyleSheet.create({
  butoni: {
    backgroundColor: '#ffffffff',
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 50

  }
})

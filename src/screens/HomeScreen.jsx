import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import HeaderImage from '../components/HeaderImage'
import MeInputButton from '../components/MeInputButton'
import { useState } from 'react'

export default function HomeScreen() {
  const navigation = useNavigation();

  const [showComponent, setShowComponent] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#e5e5e5ff' }}>
      <HeaderImage text1="XHIRO DITORE" imageURL="home" text2="0" />
      <View style={{ marginTop: 50, marginHorizontal: 20, flex: 1, marginTop: -10 }}>
        <Image source={require('../assets/pictures/kuponi_1.png')} style={{ height: 150, width: 350, }} />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginLeft: 50 }}>
          <TouchableOpacity style={{ marginRight: 20, marginTop: -250 }} onPress={() => navigation.navigate('Scanner')}>
            <ImageBackground
              source={require('../assets/pictures/button_qr.png')}
              style={{ width: 140, height: 50 }} //hoqa flex 1 nga ky stilizim
              resizeMode="stretch">
              <Text style={{ marginLeft: 60, marginTop: 15, fontSize: 15, color: '#ffffffff' }}>Me QR</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={{ marginRight: 20, marginTop: -250 }} onPress={() => setShowComponent(true)}>
            <ImageBackground
              source={require('../assets/pictures/button_input.png')}
              style={{ width: 140, height: 50 }}  //hoqa flex 1 nga ky stilizim
              resizeMode="stretch">
              <Text style={{ marginLeft: 60, marginTop: 15, fontSize: 15, color: '#ffffffff' }}>Me Input</Text>
            </ImageBackground>
          </TouchableOpacity>

          <MeInputButton visible={showComponent} onClose={() => setShowComponent(false)} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: 25,
  },
  imageHeader: {
    width: 60,
    height: 60,
    marginLeft: 10
  },
  textHeader: {
    marginVertical: 12,
    color: '#ffffffff'
  },
  zero: {
    paddingTop: 30,
    color: '#ffffffff'
  },
  logo: {
    width: 100,
    height: 100,
    marginHorizontal: 150,
    marginTop: 10
  }
}
)
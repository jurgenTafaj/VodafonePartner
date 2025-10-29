import { View, Text, Image } from 'react-native'
import HeaderImage from '../components/HeaderImage'

export default function SettingsScreen() {

  return (
    <>
      <View style={{ flex: 1 }}>
        <HeaderImage text1="PERDORUESI" text2="adrionadmin" imageURL="notHome" />
      </View>

      <View style={{ backgroundColor: '#ffffffff', marginTop: -250 }}>
        <Text style={{ paddingVertical: 10, fontSize: 18, paddingLeft: 20 }}>Konsum automatik i kuponit</Text>
      </View>
      <View style={{ flex: 1, marginTop: -20, padding: 50 }}>
        <Image source={require('../assets/pictures/info_big.png')} style={{ height: 100, width: 100, marginLeft: 100 }} />
        <Text style={{ fontSize: 18 }}>Konsumo kuponin automatikisht nga ndërfaqja e skanimit me kod QR nese lloji i kuponit nuk kërkon vendosjen e informacionit(vlerë fature, produktin, etj) nga përdoruesi</Text>
      </View >
    </>


  )
}


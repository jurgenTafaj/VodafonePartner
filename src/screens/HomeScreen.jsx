import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import HeaderImage from '../components/HeaderImage'
import MeInputButton from '../components/MeInputButton'
import { useState, useEffect } from 'react'

export default function HomeScreen() {

  const navigation = useNavigation();

  const [showComponent, setShowComponent] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#e5e5e5ff' }}>

      <HeaderImage text1="XHIRO DITORE" imageURL="home" text2="0" />
      <View style={{ flex: 1, paddingHorizontal: 30 }}>
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
        </View>

      </View>
      {showComponent && <MeInputButton onClose={() => setShowComponent(false)} />}

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







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useNavigation } from '@react-navigation/native'
// import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
// import HeaderImage from '../components/HeaderImage'
// import MeInputButton from '../components/MeInputButton'
// import { useState } from 'react'

// export default function HomeScreen() {
//   const navigation = useNavigation();

//   const [showComponent, setShowComponent] = useState(false);
//   const [showDetails, setShowDetails] = useState(false); // NEW
//   const [headerProps, setHeaderProps] = useState({
//     text1: 'XHIRO DITORE',
//     imageURL: 'home',
//     text2: '0',
//   });

//   // When coupon details screen opens, change header props dynamically
//   const handleShowDetailsChange = (visible) => {
//     setShowDetails(visible);
//     if (visible) {
//       setHeaderProps({
//         text1: 'KUPONI',
//         imageURL: 'coupon',
//         text2: 'Detajet',
//       });
//     } else {
//       setHeaderProps({
//         text1: 'XHIRO DITORE',
//         imageURL: 'home',
//         text2: '0',
//       });
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#e5e5e5ff' }}>
//       <HeaderImage {...headerProps} />

//       <View style={{ marginTop: 50, marginHorizontal: 20, flex: 1, marginTop: -10 }}>
//         <Image source={require('../assets/pictures/kuponi_1.png')} style={{ height: 150, width: 350 }} />
//       </View>

//       <View style={{ flexDirection: 'row' }}>
//         <View style={{ marginLeft: 50 }}>
//           <TouchableOpacity
//             style={{ marginRight: 20, marginTop: -250 }}
//             onPress={() => navigation.navigate('Scanner')}
//           >
//             <ImageBackground
//               source={require('../assets/pictures/button_qr.png')}
//               style={{ width: 140, height: 50 }}
//               resizeMode="stretch"
//             >
//               <Text style={{ marginLeft: 60, marginTop: 15, fontSize: 15, color: '#ffffffff' }}>Me QR</Text>
//             </ImageBackground>
//           </TouchableOpacity>
//         </View>

//         <View>
//           <TouchableOpacity
//             style={{ marginRight: 20, marginTop: -250 }}
//             onPress={() => setShowComponent(true)}
//           >
//             <ImageBackground
//               source={require('../assets/pictures/button_input.png')}
//               style={{ width: 140, height: 50 }}
//               resizeMode="stretch"
//             >
//               <Text style={{ marginLeft: 60, marginTop: 15, fontSize: 15, color: '#ffffffff' }}>Me Input</Text>
//             </ImageBackground>
//           </TouchableOpacity>

//           {showComponent && (
//             <MeInputButton
//               visible={showComponent}
//               onClose={() => setShowComponent(false)}
//               onShowDetailsChange={handleShowDetailsChange} // 🔥 New prop
//             />
//           )}
//         </View>
//       </View>
//     </View>
//   );
// }

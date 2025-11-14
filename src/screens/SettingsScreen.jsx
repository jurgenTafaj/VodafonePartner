// import React, { useState } from 'react'
// import { View, Text, Image, ScrollView, Switch } from 'react-native';
// import HeaderImage from '../components/HeaderImage';

// export default function SettingsScreen() {
//   const [isAutoRedeem, setIsAutoRedeem] = useState(false);

//   return (
//     <>
//       <HeaderImage text1="PERDORUESI" text2="adrionadmin" imageURL="notHome" />

//       <ScrollView contentContainerStyle={{ paddingTop: 40 }}>
//         <View style={{ backgroundColor: '#ffffffff', flexDirection: 'row', justifyContent: 'space-between' }}>
//           <Text style={{ fontSize: 18, marginBottom: 10, paddingHorizontal: 30 }}>Konsum automatik i kuponit</Text>
//           <Switch
//             value={isAutoRedeem}
//             onValueChange={(value) => setIsAutoRedeem(value)}
//             trackColor={{ false: '#767577', true: '#f21810ff' }}
//             thumbColor={isAutoRedeem ? '#ffffff' : '#f4f3f4'}
//           />
//         </View>

//         <View style={{ alignItems: 'center', marginVertical: 20, }}>
//           <Image
//             source={require('../assets/pictures/info_big.png')}
//             style={{ height: 100, width: 100 }}
//           />
//         </View>

//         <View style={{ paddingHorizontal: 30 }}>
//           <Text style={{ fontSize: 18, lineHeight: 24, paddingHorizontal: 15 }}>
//             Konsumo kuponin automatikisht nga ndërfaqja e skanimit me kod QR nese lloji i kuponit nuk kërkon vendosjen e informacionit
//             (vlerë fature, produktin, etj) nga përdoruesi
//           </Text>
//         </View>
//       </ScrollView>
//     </>
//   );
// }



import React from 'react';
import { View, Text, Image, ScrollView, Switch } from 'react-native';
import HeaderImage from '../components/HeaderImage';
//import { useAutoRedeem } from '../context/AutoRedeemContext';
import { useAutoRedeem } from '../context/AutoRedeemProvider ';

export default function SettingsScreen() {
  const { isAutoRedeem, setIsAutoRedeem } = useAutoRedeem();

  return (
    <>
      <HeaderImage text1="PERDORUESI" text2="adrionadmin" imageURL="notHome" />

      <ScrollView contentContainerStyle={{ paddingTop: 40 }}>
        <View
          style={{
            backgroundColor: '#ffffffff',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 10, paddingHorizontal: 30 }}>
            Konsum automatik i kuponit
          </Text>
          <Switch
            value={isAutoRedeem}
            onValueChange={(value) => setIsAutoRedeem(value)}
            trackColor={{ false: '#767577', true: '#f21810ff' }}
            thumbColor={isAutoRedeem ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Image
            source={require('../assets/pictures/info_big.png')}
            style={{ height: 100, width: 100 }}
          />
        </View>

        <View style={{ paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 18, lineHeight: 24, paddingHorizontal: 15 }}>
            Konsumo kuponin automatikisht nga ndërfaqja e skanimit me kod QR nese lloji i kuponit
            nuk kërkon vendosjen e informacionit (vlerë fature, produktin, etj) nga përdoruesi
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

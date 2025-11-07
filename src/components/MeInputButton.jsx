// import React, { useState } from 'react';
// import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
// import { getCuponDetails } from '../api/authService';
// import CuponDetails from './CuponDetails'

// const MeInputButton = ({ visible, onClose }) => {

//   const [inputvalue, setInputValue] = useState('');
//   const [reedem, setReedem] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [cuponData, setCuponData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChangeText = (text) => {
//     const numericValue = text.replace(/[^0-9]/g, '');
//     if (numericValue.length <= 8) {
//       setInputValue(numericValue);
//     }
//   }

//   const handleRedeem = async () => {
//     setLoading(true);
//     if (!inputvalue) {
//       alert('Ju lutem shkruani një kod kuponi');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await getCuponDetails(inputvalue, '');
//       console.log('Coupon details:', response.data);
//       if (response.data.status_code !== 200) {
//         alert(response.data.status_message || 'Dicka shkoi keq');
//         setLoading(false);
//         return;
//       }
//       setCuponData(response.data);
//       setShowDetails(true);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       alert('Gabim gjatë verifikimit të kuponit');
//       setLoading(false);
//     }
//   };


//   return (
//     <Modal transparent={true}
//       visible={visible} onRequestClose={onClose} >
//       <View style={{ backgroundColor: '#e5e5e5ff', height: 570, paddingTop: 120, marginTop: 150 }}>
//         {showDetails ? (
//           // 👇 When coupon is redeemed, show the CuponDetails component
//           <CuponDetails
//             product={cuponData}
//             onClose={() => {
//               setShowDetails(false);
//               setInputValue('');
//               onClose();
//             }}
//           />
//         ) : (
//           <>

//             <View style={{ alignItems: 'center' }}>
//               <Image source={require('../assets/icons/input_icon.png')} style={styles.icon} />
//               <Text style={{ fontSize: 15, paddingTop: 20 }}>Shkruaj kodin e kuponit</Text>
//               <View style={{ paddingVertical: 10 }}>
//                 <TextInput
//                   value={inputvalue}
//                   maxLength={16}
//                   onChangeText={handleChangeText}
//                   style={{ backgroundColor: '#ffffffff', width: 300, borderRadius: 20, fontSize: 15, textAlign: 'center' }}
//                   keyboardType="numeric" />
//               </View>
//             </View>

//             {loading ? (
//               <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//               <TouchableOpacity
//                 onPress={handleRedeem}
//                 style={{
//                   backgroundColor: '#242739ff',
//                   marginHorizontal: 130,
//                   marginVertical: 50,
//                   paddingVertical: 15,
//                   borderRadius: 50,
//                 }}
//               >
//                 <Text style={{ color: '#fff', fontSize: 18, paddingLeft: 55 }}>Dërgo</Text>
//               </TouchableOpacity>
//             )}
//           </>
//         )}
//       </View>
//     </Modal>
//   )
// }

// const styles = StyleSheet.create({
//   icon: {
//     height: 100,
//     width: 100,
//   },
//   inputvalue: {

//   }

// })

// export default MeInputButton;


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // import React, { useState } from 'react';
// // import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
// // import { getCuponDetails } from '../api/authService';
// // import CuponDetails from './CuponDetails';

// // const MeInputButton = ({ visible, onClose, onShowDetailsChange }) => {
// //   const [inputValue, setInputValue] = useState('');
// //   const [showDetails, setShowDetails] = useState(false);
// //   const [cuponData, setCuponData] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleChangeText = (text) => {
// //     const numericValue = text.replace(/[^0-9]/g, '');
// //     if (numericValue.length <= 8) {
// //       setInputValue(numericValue);
// //     }
// //   };

// //   const handleRedeem = async () => {
// //     setLoading(true);
// //     if (!inputValue) {
// //       alert('Ju lutem shkruani një kod kuponi');
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const response = await getCuponDetails(inputValue, '');
// //       if (response.data.status_code !== 200) {
// //         alert(response.data.status_message || 'Dicka shkoi keq');
// //         setLoading(false);
// //         return;
// //       }

// //       setCuponData(response.data);
// //       setShowDetails(true);
// //       onShowDetailsChange(true); // 🔥 Notify HomeScreen
// //       setLoading(false);
// //     } catch (error) {
// //       console.error(error);
// //       alert('Gabim gjatë verifikimit të kuponit');
// //       setLoading(false);
// //     }
// //   };

// //   if (!visible) return null; // Don't render at all when closed

// //   return (
// //     <View style={styles.overlay}>
// //       <View style={styles.container}>
// //         {showDetails ? (
// //           <CuponDetails
// //             product={cuponData}
// //             onClose={() => {
// //               setShowDetails(false);
// //               setInputValue('');
// //               onShowDetailsChange(false); // 🔥 Notify HomeScreen to reset header
// //               onClose();
// //             }}
// //           />
// //         ) : (
// //           <>
// //             <View style={{ alignItems: 'center' }}>
// //               <Image source={require('../assets/icons/input_icon.png')} style={styles.icon} />
// //               <Text style={{ fontSize: 15, paddingTop: 20 }}>Shkruaj kodin e kuponit</Text>
// //               <View style={{ paddingVertical: 10 }}>
// //                 <TextInput
// //                   value={inputValue}
// //                   onChangeText={handleChangeText}
// //                   style={styles.input}
// //                   keyboardType="numeric"
// //                 />
// //               </View>
// //             </View>

// //             {loading ? (
// //               <ActivityIndicator size="large" color="#0000ff" />
// //             ) : (
// //               <TouchableOpacity onPress={handleRedeem} style={styles.button}>
// //                 <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Dërgo</Text>
// //               </TouchableOpacity>
// //             )}

// //             <TouchableOpacity onPress={onClose}>
// //               <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>Mbyll</Text>
// //             </TouchableOpacity>
// //           </>
// //         )}
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   overlay: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     backgroundColor: '#e5e5e5ff',
// //     paddingTop: 120,
// //     zIndex: 10,
// //   },
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //   },
// //   icon: {
// //     height: 100,
// //     width: 100,
// //   },
// //   input: {
// //     backgroundColor: '#fff',
// //     width: 300,
// //     borderRadius: 20,
// //     fontSize: 15,
// //     textAlign: 'center',
// //   },
// //   button: {
// //     backgroundColor: '#242739ff',
// //     marginHorizontal: 130,
// //     marginVertical: 50,
// //     paddingVertical: 15,
// //     borderRadius: 50,
// //     width: 200,
// //   },
// // });

// // export default MeInputButton;





import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ActivityIndicator, useWindowDimensions } from 'react-native';
import { getCuponDetails } from '../api/authService';
import CuponDetails from './CuponDetails'

const MeInputButton = ({ onClose, setHeaderProps }) => {

  const { width } = useWindowDimensions();

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [cuponData, setCuponData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);


  const handleChangeText = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 8) {
      setInputValue(numericValue);
    }
  };

  const handleRedeem = async () => {
    setLoading(true);
    if (!inputValue) {
      alert('Ju lutem shkruani një kod kuponi');
      setLoading(false);
      return;
    }

    try {
      const response = await getCuponDetails(inputValue, '');
      if (response.data.status_code !== 200) {
        alert(response.data.status_message || 'Dicka shkoi keq');
        setLoading(false);
        return;
      }

      setCuponData(response.data);
      setShowDetails(true);

      setHeaderProps({
        text1: 'KUPONI',
        imageURL: 'cupon',
        text2: '11233897'
      })
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('Gabim gjatë verifikimit të kuponit');
      setLoading(false);
    }
  };

  return (


    <View style={[styles.container, { width }]}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/icons/input_icon.png')} style={styles.icon} />
      </View>

      <Text style={{ fontSize: 16, paddingVertical: 30, paddingHorizontal: 120 }}>Shkruaj kodin e kuponit</Text>

      <View style={{ marginHorizontal: 50 }}>
        <TextInput value={inputValue} onChangeText={handleChangeText} style={styles.input} keyboardType="numeric" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ marginTop: 150, marginHorizontal: 100 }}>
          <TouchableOpacity style={styles.button} onPress={handleRedeem}>
            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Dërgo</Text>
          </TouchableOpacity>
        </View>
      )}

      {showDetails && <CuponDetails product={cuponData}
        onClose={() => {
          setShowDetails(false);
          setInputValue('');
          onClose();

          setHeaderProps({
            text1: 'XHIRO DITORE',
            imageURL: 'home',
            text2: '0',
          })
        }} />}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    flex: 1,
    backgroundColor: '#aba8a8ff',
    height: 550,
    marginTop: 220,
    paddingVertical: 60,
    backgroundColor: '#e5e5e5ff'
  },

  input: {
    backgroundColor: '#fff',
    width: 300,
    borderRadius: 20,
    fontSize: 15,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#242739ff',
    //marginHorizontal: 130,
    //marginVertical: 50,
    paddingVertical: 15,
    borderRadius: 50,
    width: 200,
  },
  icon: {
    height: 100,
    width: 100,
  },
  imageContainer: {
    marginHorizontal: 150
  }
})

export default MeInputButton;
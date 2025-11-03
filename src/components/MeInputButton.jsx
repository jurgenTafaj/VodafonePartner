import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { getCuponDetails } from '../api/authService';
import CuponDetails from './CuponDetails'

const MeInputButton = ({ visible, onClose }) => {

  const [inputvalue, setInputValue] = useState('');
  const [reedem, setReedem] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cuponData, setCuponData] = useState(null);

  const handleChangeText = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 8) {
      setInputValue(numericValue);
    }
  }

  const handleRedeem = async () => {
    if (!inputvalue) {
      alert('Ju lutem shkruani një kod kuponi');
      return;
    }

    try {
      const response = await getCuponDetails(inputvalue, '');
      console.log('Coupon details:', response.data);

      // You can update state to show success or coupon details
      //setReedem(true);

      setCuponData(response.data);
      setShowDetails(true);

    } catch (error) {
      console.error(error);
      alert('Gabim gjatë verifikimit të kuponit');
    }
  };


  return (
    <Modal transparent={true}
      visible={visible} onRequestClose={onClose} >
      <View style={{ marginTop: 280, backgroundColor: '#e5e5e5ff', height: 350 }}>
        {showDetails ? (
          // 👇 When coupon is redeemed, show the CuponDetails component
          <CuponDetails

            onClose={() => {
              setShowDetails(false);
              setInputValue('');
              onClose();
            }}
          />
        ) : (
          <>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../assets/icons/input_icon.png')} style={styles.icon} />
              <Text style={{ fontSize: 15, paddingTop: 20 }}>Shkruaj kodin e kuponit</Text>


              {/* <TextInput
                  style={[styles.input]}
                  keyboardType="numeric"
                  maxLength={8}
                  value={inputvalue}
                  onChangeText={handleChangeText}
                  placeholder=" _ _ _ _ _ _ _"
                /> */}
              <View style={{ paddingVertical: 10 }}>
                <TextInput value={inputvalue} maxLength={8}
                  onChangeText={handleChangeText} style={{
                    backgroundColor: '#ffffffff', width: 300, borderRadius: 20, fontSize: 15, textAlign: 'center'
                  }} keyboardType="numeric" />
              </View>
            </View>


            <TouchableOpacity
              onPress={handleRedeem}
              style={{
                backgroundColor: '#242739ff',
                marginHorizontal: 130,
                marginVertical: 50,
                paddingVertical: 15,
                borderRadius: 50,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 18, paddingLeft: 55 }}>Dërgo</Text>
            </TouchableOpacity>
          </>
        )}

        {/*
        {reedem ? (
          <>
            <TouchableOpacity onPress={() => {
              onClose()
              setReedem(false)
            }} style={{ backgroundColor: '#242739ff', marginHorizontal: 130, marginVertical: 50, paddingVertical: 15, borderRadius: 50 }}>
              <Text style={{ color: '#fff', fontSize: 18, paddingLeft: 70 }}>Mbyll</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../assets/icons/input_icon.png')} style={styles.icon} />
              <Text style={{ fontSize: 15, paddingTop: 20 }}>Shkruaj kodin e kuponit</Text>
              <View>
                <TextInput style={styles.input} keyboardType="numeric" maxLength={8} value={inputvalue} onChangeText={handleChangeText} placeholder='__ __ __ __ __ __ __ __' />
              </View>
            </View>
            <TouchableOpacity onPress={handleRedeem} style={{ backgroundColor: '#242739ff', marginHorizontal: 130, marginVertical: 50, paddingVertical: 15, borderRadius: 50 }}>
              <Text style={{ color: '#fff', fontSize: 18, paddingLeft: 55 }}>Dërgo</Text>
            </TouchableOpacity>
          </>
        )}
      */}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 100,
    width: 100,
  },
  inputvalue: {

  }

})

export default MeInputButton;
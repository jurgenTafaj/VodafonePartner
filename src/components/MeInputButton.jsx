import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { getCuponDetails } from '../api/authService';
import CuponDetails from './CuponDetails'

const MeInputButton = ({ visible, onClose, showDetails, setShowDetails }) => {

  const [inputvalue, setInputValue] = useState('');
  const [reedem, setReedem] = useState(false);
  const [cuponData, setCuponData] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChangeText = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 8) {
      setInputValue(numericValue);
    }
  }

  const handleRedeem = async () => {
    setLoading(true);
    if (!inputvalue) {
      alert('Ju lutem shkruani një kod kuponi');
      setLoading(false);
      return;
    }

    try {
      const response = await getCuponDetails(inputvalue, '');
      console.log('Coupon details:', response.data);
      if (response.data.status_code !== 200) {
        alert(response.data.status_message || 'Dicka shkoi keq');
        setLoading(false);
        return;
      }
      setCuponData(response.data);
      setShowDetails(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('Gabim gjatë verifikimit të kuponit');
      setLoading(false);
    }
  };

  return (
    <Modal transparent={true}
      visible={visible} onRequestClose={onClose} >
      <View style={{ backgroundColor: '#e5e5e5ff', height: 570, paddingTop: 100, marginTop: 150 }}>
        {showDetails ? (
          // 👇 When coupon is redeemed, show the CuponDetails component
          <CuponDetails
            product={cuponData}
            onClose={() => {
              setShowDetails(false);
              // setInputValue('');
              onClose();
            }}
            couponCode={inputvalue}
            setInputValue={setInputValue}
          />
        ) : (
          <>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../assets/icons/input_icon.png')} style={styles.icon} />
              <Text style={{ fontSize: 15, paddingTop: 20 }}>Shkruaj kodin e kuponit</Text>
              <View style={{ paddingVertical: 10 }}>
                <TextInput
                  value={inputvalue}
                  maxLength={16}
                  onChangeText={handleChangeText}
                  style={{ backgroundColor: '#ffffffff', width: 300, borderRadius: 20, fontSize: 15, textAlign: 'center' }}
                  keyboardType="numeric" />
              </View>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
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
            )}
          </>
        )}
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
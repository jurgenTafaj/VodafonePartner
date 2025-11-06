import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ActivityIndicator, useWindowDimensions } from 'react-native';
import { getCuponDetails } from '../api/authService';
import CuponDetails from './CuponDetails'
const MeInputButton = ({ visible, onClose }) => {


  const [reedem, setReedem] = useState(false);

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
      //onShowDetailsChange(true); // 🔥 Notify HomeScreen
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
            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Dërgggo</Text>
          </TouchableOpacity>
        </View>
      )}

      {showDetails && <CuponDetails
        product={cuponData}
        onClose={() => {
          setShowDetails(false);
          // setInputValue('');
          onClose();
        }}
        setInputValue={setInputValue}
        couponCode={inputValue}
      />
      }
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
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Image, StyleSheet, TextInput,
  ActivityIndicator, useWindowDimensions,
  // --- Make sure these are imported ---
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { getCuponDetails } from '../api/authService';
import CustomAlert from './CustomAlert';

// Props are from HomeScreen: onClose, setHeaderProps, onSubmit
const MeInputButton = ({ onClose, setHeaderProps, onSubmit }) => {

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ visible: false, title: '', message: '' });

  const showAlert = (title, message) => {
    setAlertConfig({ visible: true, title, message });
  };

  const handleChangeText = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 8) {
      setInputValue(numericValue);
    }
  };

  const handleRedeem = async () => {
    setLoading(true);
    if (!inputValue) {
      showAlert('Gabim', 'Ju lutem shkruani një kod kuponi');
      setLoading(false);
      return;
    }
    try {
      const response = await getCuponDetails(inputValue, '');
      console.log('Cupon Details Response:', response);
      if (response.data.status_code !== 200) {
        showAlert('Gabim', response.data.status_message || 'Dicka shkoi keq');
        setLoading(false);
        return;
      }
      setHeaderProps({
        text1: 'KUPONI',
        imageURL: 'cupon',
        text2: inputValue
      });
      setLoading(false);
      onSubmit(response.data, inputValue);
    } catch (error) {
      console.error(error);
      showAlert('Gabim', 'Gabim gjatë verifikimit të kuponit');
      setLoading(false);
    }
  };

  return (
    <>
      {/* Use KeyboardAvoidingView to handle the keyboard */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container} // This is the new flex: 1 container
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Text style={styles.backButtonText}>{"< Kthehu"}</Text>
          </TouchableOpacity>

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
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setAlertConfig({ visible: false, title: '', message: '' })}
      />
    </>
  )
}

const styles = StyleSheet.create({
  // --- THIS IS THE MAIN FIX ---
  container: {
    flex: 1, // It now fills the parent View in HomeScreen
    backgroundColor: '#e5e5e5ff'
    // REMOVED: position: 'absolute'
    // REMOVED: height: 550
    // REMOVED: marginTop: 220
  },
  scrollContent: {
    alignItems: 'center', // Center content
    paddingVertical: 60, // Add padding here instead
    paddingBottom: 100, // Extra space for scrolling
  },
  // --- All other styles are the same ---
  input: {
    backgroundColor: '#fff',
    width: 300,
    borderRadius: 20,
    fontSize: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#242739ff',
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
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#242739ff',
    fontWeight: 'bold'
  }
})

export default MeInputButton;
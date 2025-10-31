import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';

const MeInputButton = ({ visible, onClose }) => {

  const [inputvalue, setInputValue] = useState('');

  const handleChangeText = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 8) {
      setInputValue(numericValue);
    }
  }

  return (
    <Modal transparent={true}
      visible={visible} onRequestClose={onClose} >
      <View style={{ marginTop: 280, backgroundColor: '#e5e5e5ff', height: 350 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/icons/input_icon.png')} style={styles.icon} />
          <Text style={{ fontSize: 15, paddingTop: 20 }}>Shkruaj kodin e kuponit</Text>
          <View>
            <TextInput style={styles.input} keyboardtype="numeric" maxLength={8} value={inputvalue} onChangeText={handleChangeText} placeholder='__ __ __ __ __ __ __ __' />
          </View>
        </View>
        <TouchableOpacity onPress={onClose} style={{ backgroundColor: '#242739ff', marginHorizontal: 130, marginVertical: 50, paddingVertical: 15, borderRadius: 50 }}>
          <Text style={{ color: '#fff', fontSize: 18, paddingLeft: 55 }}>Dërgo</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 100,
    width: 100,
  },
  input: {
    backgroundColor: '#ffffffff',
    borderRadius: 20,
    marginTop: 30,
    marginHorizontal: 20,
    paddingHorizontal: 100,
  }
})

export default MeInputButton;
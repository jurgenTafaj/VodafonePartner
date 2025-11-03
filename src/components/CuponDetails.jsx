import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import HeaderImage from './HeaderImage';


const CuponDetails = ({ onClose }) => {

  const [product, setProduct] = useState('');
  const [value, setValue] = useState('');



  return (
    <>
      <View style={{ flex: 1, height: '100%', marginVertical: -335 }}>
        <HeaderImage text1="KUPONI" text2="11233897" imageURL="cupon" />
      </View>

      <View>
        <View style={styles.title}>
          <Image source={require('../assets/icons/sm_promocioni.png')} style={styles.icon} />
          <Text style={styles.title}>Promocioni</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.text}>Përfito 20% ulje për blerjet në Baboon</Text>
        </View>

        <View style={styles.title}>
          <Image source={require('../assets/icons/sm_produkti.png')} style={styles.icon} />
          <Text style={styles.title}>Produkti</Text>
        </View>

        <View>
          <TextInput style={styles.input} onChangeText={setProduct} />
        </View>

        <View style={styles.title}>
          <Image source={require('../assets/icons/sm_fatura.png')} style={styles.icon} />
          <Text style={styles.title}>Vlera e Faturës</Text>
        </View>

        <View>
          <TextInput style={styles.input} onChangeText={setValue} />
        </View>

        <View style={styles.title}>
          <Image source={require('../assets/icons/sm_ulja.png')} style={styles.icon} />
          <Text style={styles.title}>Vlera e uljes</Text>
        </View>


        <View>
          <Text style={[styles.input, { paddingVertical: 10 }]}></Text>
        </View>

        <View style={styles.container}>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Konsumo</Text>
          </TouchableOpacity>
        </View>
      </View >
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5
    //marginBottom: 20,
  },
  text: {
    fontSize: 15,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#242739ff',
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  icon: {
    height: 30,
    width: 30
  },
  info: {
    backgroundColor: '#ffffffff'
  },
  input: {
    backgroundColor: '#ffffffff',
    paddingLeft: 30
  },
  text: {
    paddingVertical: 10, paddingLeft: 30
  }
});

export default CuponDetails;

import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image, TextInput,
  useWindowDimensions, ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { redeemCoupon } from '../api/authService';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from './CustomAlert';

const CuponDetails = ({ onClose, product, couponCode }) => {

  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ visible: false, title: '', message: '' });
  const [discountedPrice, setDiscountedPrice] = useState('0.00');

  const showAlert = (title, message) => {
    setAlertConfig({ visible: true, title, message });
  };

  useEffect(() => {
    const productDetails = product?.data?.product;
    if (!productDetails) return;
    const invoiceAmount = parseFloat(value);
    if (isNaN(invoiceAmount) || invoiceAmount <= 0) {
      setDiscountedPrice('0.00');
      return;
    }
    const {
      discount: discountValue,
      discount_type: discountType,
      amount_min: minAmount,
      amount_max: maxAmount
    } = productDetails;
    let calculatedDiscount = 0;
    if (invoiceAmount >= minAmount && invoiceAmount <= maxAmount) {
      if (discountType === 'percentage') {
        calculatedDiscount = (invoiceAmount * discountValue) / 100;
      } else if (discountType === 'static') {
        calculatedDiscount = Math.min(discountValue, invoiceAmount);
      }
    }
    setDiscountedPrice(calculatedDiscount.toFixed(2));
  }, [value, product]);

  const handleRedeem = async () => {
    const invoiceAmount = parseFloat(value);
    if (!couponCode) {
      showAlert('Gabim', 'Kodi i kuponi mungon.');
      return;
    }
    if (isNaN(invoiceAmount) || invoiceAmount <= 0) {
      showAlert('Gabim', 'Ju lutem shkruani një vlerë të vlefshme për faturën.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await redeemCoupon(
        couponCode,
        invoiceAmount,
        notes
      );
      if (response.data.status_code === 200) {
        setIsLoading(false);
        const successMessage = response.status_message || 'Kuponi u konsumua me sukses.';
        showAlert('Sukses!', successMessage);
      } else {
        let apiErrorMessage = 'Ndodhi një gabim i panjohur.';
        setIsLoading(false);
        showAlert('Gabim', apiErrorMessage);
      }
    } catch (err) {
      setIsLoading(false);
      showAlert('Gabim', 'Ndodhi një gabim i panjohur.');
    }
  };

  const backButton = () => {
    setNotes('');
    setValue('');
    onClose();
  }

  const handleAlertClose = () => {
    const wasSuccess = alertConfig.title === 'Sukses!';
    setAlertConfig({ visible: false, title: '', message: '' });
    if (wasSuccess) {
      onClose();
    }
  };
  // ...

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.title}>
            <Image source={require('../assets/icons/sm_promocioni.png')} style={styles.icon} />
            <Text style={styles.title}>Promocioni</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.text}>{product?.data?.product?.product}</Text>
          </View>

          <View style={styles.title}>
            <Image source={require('../assets/icons/sm_produkti.png')} style={styles.icon} />
            <Text style={styles.title}>Produkti</Text>
          </View>
          <View>
            <TextInput style={styles.input}
              onChangeText={setNotes}
              value={notes}
              placeholder="Shënim (opsional)"
            />
          </View>
          <View style={styles.title}>
            <Image source={require('../assets/icons/sm_fatura.png')} style={styles.icon} />
            <Text style={styles.title}>Vlera e Faturës</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setValue}
              value={value}
              placeholder="Shkruani vlerën"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.title}>
            <Image source={require('../assets/icons/sm_ulja.png')} style={styles.icon} />
            <Text style={styles.title}>Vlera e uljes</Text>
          </View>
          <View>
            <Text style={[styles.input]}>{discountedPrice}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#44444486' }]} onPress={backButton}>
              <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRedeem} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>Konsumo</Text>
              )}
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={handleAlertClose}
      />
    </>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#e5e5e5ff'

  },
  scrollContent: {
    paddingVertical: 60,
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  title: {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5
  },
  text: {
    fontSize: 15,
    marginVertical: 5,
    paddingVertical: 10,
    paddingLeft: 30
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#242739ff',
    marginTop: 40,
    paddingVertical: 12,
    borderRadius: 30,
    width: 150,
    alignItems: 'center'
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
    paddingLeft: 30,
    height: 40,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
    fontWeight: 'bold'
  },
});

export default CuponDetails;
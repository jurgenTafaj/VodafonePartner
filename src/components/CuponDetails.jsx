import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';

// Import your service. Adjust the path as necessary.
import { redeemCoupon } from '../api/authService';
const CuponDetails = ({ onClose, product, couponCode, setInputValue }) => {

  const [value, setValue] = useState(''); // Invoice Amount
  const [discountedPrice, setDiscountedPrice] = useState('0.00');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('couponCode received product:', couponCode);
  // This useEffect for local discount calculation remains unchanged
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


  // --- MODIFIED: This function is now more robust ---
  const handleRedeem = async () => {
    const invoiceAmount = parseFloat(value);

    // 1. Validation
    if (!couponCode) {
      Alert.alert('Gabim', 'Kodi i kuponit mungon.');
      return;
    }
    if (isNaN(invoiceAmount) || invoiceAmount <= 0) {
      Alert.alert('Gabim', 'Ju lutem shkruani një vlerë të vlefshme për faturën.');
      return;
    }

    // 2. Set loading state
    setIsLoading(true);
    setError(null);

    try {
      // 3. Call the API service
      const response = await redeemCoupon(
        couponCode,
        invoiceAmount,
        notes
      );
      console.log('Redeem coupon response:', response.data);
      // 4. Handle API Response
      // Check for the *specific* success code from your API
      console.log('Response data:', response.data, " ");
      if (response.data.status_code === 200) {
        // --- SUCCESS ---
        setIsLoading(false);
        setInputValue(''); // Clear input field
        // Use the success message from the API
        const successMessage = response.status_message || 'Kuponi u konsumua me sukses.';
        Alert.alert('Sukses!', successMessage);
        
        onClose(); // Close the modal

      } else {
        // --- API-LEVEL ERROR (e.g., status_code 400, 404) ---
        // The API call worked, but the business logic failed
        let apiErrorMessage = 'Ndodhi një gabim i panjohur.'; // Default
        
        if (response && response.status_message) {
          apiErrorMessage = response.status_message;
        } else if (response && response.errors && response.errors.length > 0) {
          apiErrorMessage = response.errors[0].title || apiErrorMessage;
        }

        setIsLoading(false);
        setError(apiErrorMessage);
        Alert.alert('Gabim', apiErrorMessage);
      }

    } catch (err) {
      // --- 5. Handle NETWORK/SYSTEM Error ---
      // This catches network failures, server 500s, or JS errors
      setIsLoading(false);
      let finalErrorMessage = 'Ndodhi një gabim i panjohur.';

      // Check if this is an error from the API server (like a 404 or 500)
      if (err.response && err.response.data) {
        const apiErrorData = err.response.data;
        if (apiErrorData.status_message) {
          finalErrorMessage = apiErrorData.status_message;
        } else if (apiErrorData.errors && apiErrorData.errors.length > 0) {
          finalErrorMessage = apiErrorData.errors[0].title;
        } else {
          finalErrorMessage = err.message; // Fallback
        }
      } else {
        // This is a network error, AsyncStorage error, etc.
        finalErrorMessage = err.message || 'Ndodhi një gabim në rrjet.';
      }

      setError(finalErrorMessage);
      Alert.alert('Gabim', finalErrorMessage);
    }
  };
  // --- END OF MODIFIED FUNCTION ---


  return (
    <>
      <View style={{ paddingTop: -100 }}>
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
          <TextInput
            style={styles.input}
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
          <Text style={[styles.input, { paddingVertical: 10 }]}>{discountedPrice}</Text>
        </View>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <View style={styles.container}>
          <TouchableOpacity 
            onPress={handleRedeem} 
            style={[styles.button, isLoading && styles.buttonDisabled]}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ color: '#fff', fontSize: 16 }}>Konsumo</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

// Styles (unchanged from previous answer)
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
  },
  text: {
    fontSize: 15,
    marginVertical: 5,
    paddingVertical: 10,
    paddingLeft: 30
  },
  button: {
    backgroundColor: '#242739ff',
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    minWidth: 150,
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#999',
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
  }
});

export default CuponDetails;
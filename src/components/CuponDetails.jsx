import React, { useState, useEffect } from 'react'; // NEW: Added useEffect
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import HeaderImage from './HeaderImage';


const CuponDetails = ({ onClose, product }) => {

  const [value, setValue] = useState(''); // This is the Invoice Amount
  
  // NEW: Changed default to '0.00' for better display
  const [discountedPrice, setDiscountedPrice] = useState('0.00'); 

  console.log(JSON.stringify(product));

  // NEW: useEffect hook to calculate the discount
  useEffect(() => {
    // Get the product details safely
    const productDetails = product?.data?.product;
    if (!productDetails) {
      return; // Exit if there's no product data
    }

    const invoiceAmount = parseFloat(value);
    
    // Check if the input is a valid number
    if (isNaN(invoiceAmount) || invoiceAmount <= 0) {
      setDiscountedPrice('0.00'); // Reset if input is empty or invalid
      return;
    }

    // Get discount rules from the product prop
    const { 
      discount: discountValue, 
      discount_type: discountType,
      amount_min: minAmount,
      amount_max: maxAmount
    } = productDetails;

    let calculatedDiscount = 0;

    // Check if the invoice amount is within the valid range for the coupon
    if (invoiceAmount >= minAmount && invoiceAmount <= maxAmount) {
      
      if (discountType === 'percentage') {
        // --- Percentage Logic ---
        calculatedDiscount = (invoiceAmount * discountValue) / 100;

      } else if (discountType === 'static') {
        // --- Static Logic ---
        // The discount cannot be more than the invoice amount itself
        calculatedDiscount = Math.min(discountValue, invoiceAmount); 
      }
    }
    
    // Update the state, formatted to 2 decimal places
    setDiscountedPrice(calculatedDiscount.toFixed(2));

  }, [value, product]); // Re-run this logic whenever 'value' or 'product' changes


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
          <Text style={styles.text}>{product?.data?.product?.product}</Text>
        </View>

        <View style={styles.title}>
          <Image source={require('../assets/icons/sm_produkti.png')} style={styles.icon} />
          <Text style={styles.title}>Produkti</Text>
        </View>

        <View>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.title}>
          <Image source={require('../assets/icons/sm_fatura.png')} style={styles.icon} />
          <Text style={styles.title}>Vlera e Faturës</Text>
        </View>

        <View>
          {/* MODIFIED: Added props for better UX */}
          <TextInput 
            style={styles.input} 
            onChangeText={setValue} 
            value={value}
            placeholder="Shkruani vlerën"
            keyboardType="numeric" // Ensures user sees number pad
          />
        </View>

        <View style={styles.title}>
          <Image source={require('../assets/icons/sm_ulja.png')} style={styles.icon} />
          <Text style={styles.title}>Vlera e uljes</Text>
        </View>


        <View>
          {/* This Text now updates automatically */}
          <Text style={[styles.input, { paddingVertical: 10 }]}>{discountedPrice}</Text>
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
    paddingLeft: 30,
    // NEW: Add height for consistency
    height: 40, 
    justifyContent: 'center',
  },
  text: {
    paddingVertical: 10, paddingLeft: 30
  }
});

export default CuponDetails;
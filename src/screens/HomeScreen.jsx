import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import HeaderImage from '../components/HeaderImage'
import MeInputButton from '../components/MeInputButton'
import { useState, useEffect } from 'react'
import {getDailySalesAmounts} from '../api/authService' // Make sure this path is correct

export default function HomeScreen() {

  const navigation = useNavigation();

  const [showComponent, setShowComponent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [dailyAmount, setDailyAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // <-- Added loading state

  // This useEffect hook runs once when the component mounts
  useEffect(() => {
    console.log("Fetching daily sales amounts...");
    const fetchAmount = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await getDailySalesAmounts();
        // --- UPDATED ---
        // Based on your screenshot, the amount is in response.data.invoice_amount
        if ( response.data.data.invoice_amount) {
          setDailyAmount(response.data.data.invoice_amount);
        } else {
          // Fallback in case data is missing
          setDailyAmount(0);
          console.warn("Could not find 'invoice_amount' in API response:", response);
        }

      } catch (error) {
        console.error("Error fetching daily sales:", error);
        setDailyAmount(0); // Set to 0 if there's an error
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchAmount();
  }, []); // The empty array [] means this runs only once on mount

  return (
    <View style={{ flex: 1, backgroundColor: '#e5e5e5ff' }}>
      
      {/* Show '...' while loading, then show the amount */}
      <HeaderImage text1="XHIRO DITORE" imageURL="home" text2={isLoading ? '...' : dailyAmount} />
      
      <View style={{ flex: 1, paddingHorizontal: 30 }}>
        <Image source={require('../assets/pictures/kuponi_1.png')} style={{ height: 150, width: 350, }} />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginLeft: 50 }}>
          <TouchableOpacity style={{ marginRight: 20, marginTop: -250 }} onPress={() => navigation.navigate('Scanner')}>
            <ImageBackground
              source={require('../assets/pictures/button_qr.png')}
              style={{ width: 140, height: 50 }} //hoqa flex 1 nga ky stilizim
              resizeMode="stretch">
              <Text style={{ marginLeft: 60, marginTop: 15, fontSize: 15, color: '#ffffffff' }}>Me QR</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={{ marginRight: 20, marginTop: -250 }} onPress={() => {
            setShowComponent(true)
            setShowDetails(false);
          }}>
            <ImageBackground
              source={require('../assets/pictures/button_input.png')}
              style={{ width: 140, height: 50 }}  //hoqa flex 1 nga ky stilizim
              resizeMode="stretch">
              <Text style={{ marginLeft: 60, marginTop: 15, fontSize: 15, color: '#ffffffff' }}>Me Input</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

      </View>
      {showComponent && <MeInputButton onClose={() => setShowComponent(false)} />}

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: 25,
  },
  imageHeader: {
    width: 60,
    height: 60,
    marginLeft: 10
  },
  textHeader: {
    marginVertical: 12,
    color: '#ffffffff'
  },
  zero: {
    paddingTop: 30,
    color: '#ffffffff'
  },
  logo: {
    width: 100,
    height: 100,
    marginHorizontal: 150,
    marginTop: 10
  }
}
)
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import HeaderImage from '../components/HeaderImage'
import MeInputButton from '../components/MeInputButton'
import CuponDetails from '../components/CuponDetails'
import { useState, useEffect } from 'react'
import { getDailySalesAmounts } from '../api/authService'

const HomeContent = ({ navigation, onShowInput }) => {
  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <View style={{ paddingHorizontal: 30 }}>
        <Image
          source={require('../assets/pictures/kuponi_1.png')}
          style={{ height: 150, width: 350 }}
          resizeMode="contain"
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 40 }}>

        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => navigation.navigate('Scanner')}>
          <ImageBackground
            source={require('../assets/pictures/button_qr.png')}
            style={{ width: 140, height: 50 }}
            resizeMode="stretch">
            <Text style={{ marginLeft: 60, marginTop: 15, fontSize: 15, color: '#ffffffff' }}>Me QR</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={onShowInput}>
          <ImageBackground
            source={require('../assets/pictures/button_input.png')}
            style={{ width: 140, height: 50 }}
            resizeMode="stretch">
            <Text style={{ marginLeft: 60, marginTop: 15, fontSize: 15, color: '#ffffffff' }}>Me Input</Text>
          </ImageBackground>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default function HomeScreen() {
  const navigation = useNavigation();

  const [modalView, setModalView] = useState('none');
  const [cuponData, setCuponData] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [dailyAmount, setDailyAmount] = useState(0);

  const [headerProps, setHeaderProps] = useState({
    text1: 'XHIRO DITORE',
    imageURL: 'home',
    text2: '0'
  })

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const response = await getDailySalesAmounts();
        if (response.data.data.invoice_amount) {
          const amount = response.data.data.invoice_amount;
          setDailyAmount(amount);
          if (modalView === 'none') {
            setHeaderProps(prev => ({ ...prev, text2: amount.toString() }));
          }
        } else {
          setDailyAmount(0);
        }
      } catch (error) {
        console.error("Error fetching daily sales:", error);
        setDailyAmount(0);
      }
    };
    fetchAmount();
  }, [modalView]);


  const handleCloseModal = () => {
    setModalView('none');
    setCuponData(null);
    setCouponCode('');
    setHeaderProps({
      text1: 'XHIRO DITORE',
      imageURL: 'home',
      text2: dailyAmount.toString()
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#e5e5e5ff' }}>

      <HeaderImage text1={headerProps.text1} imageURL={headerProps.imageURL} text2={headerProps.text2} />

      <View style={{ flex: 1 }}>
        {modalView === 'none' && (
          <HomeContent
            navigation={navigation}
            onShowInput={() => setModalView('input')}
          />
        )}

        {modalView === 'input' && (
          <MeInputButton
            onClose={handleCloseModal}
            setHeaderProps={setHeaderProps}
            onSubmit={(data, code) => {
              setCuponData(data);
              setCouponCode(code);
              setModalView('details');
            }}
          />
        )}

        {modalView === 'details' && (
          <CuponDetails
            product={cuponData}
            couponCode={couponCode}
            onClose={handleCloseModal}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
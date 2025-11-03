import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react'

const HeaderImage = ({ text1, imageURL, text2 }) => {

  const image = {
    home: require('../assets/icons/portofoli.png'),
    notHome: require('../assets/icons/user_big.png'),
    cupon: require('../assets/icons/kuponi.png')

  }
    const [fullName, setFullName] = useState('')
    const [profileImg, setProfileImg] = useState('')
    
    const [xhiroDitore, setXhiroDitore] = useState('')

    useEffect(() => {
      const  getName = async()=>{
        const name = await AsyncStorage.getItem('fullName');
        const profile_img = await AsyncStorage.getItem('profile_img');
        
        setProfileImg(profile_img);
        setFullName(name);
      }
      getName();
    }, [])
  
  return (
    <>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/pictures/small_wave.png')}
          style={styles.background}
          resizeMode="stretch">

          <View style={styles.header}>
            <Image source={image[imageURL]} style={styles.imageHeader} />
            <View style={{ paddingTop: 60 }}>
              <Text style={styles.text1}>{text1}</Text>
              <Text style={styles.text2}>{text1 === "PERDORUESI" ? fullName:'0'}</Text>
              <Image source={{uri:profileImg}} style={styles.logo} />
            </View>
          </View>
        </ImageBackground >
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 25,
  },
  background: {
    flex: 1,
    height: 200
  },
  imageHeader: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginTop: 45
  },
  text1: {
    color: '#ffffffff'
  },
  text2: {
    color: '#ffffffff'
  },
  logo: {
    width: 100,
    height: 100,
    marginHorizontal: 200,
    marginTop: -30,
    //position: 'absolute',
  }
})

export default HeaderImage;
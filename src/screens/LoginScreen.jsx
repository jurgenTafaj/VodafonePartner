import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  // NEW: Import components to handle the keyboard
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useAuth } from '../context/AuthContext'; // Import the hook

const LoginScreen = () => {

  const backgroundImage = require('../assets/icons/sm_user.png')
  const [username, setUsername] = useState(__DEV__ ? 'baboontest.eraldi' : '');
  const [password, setPassword] = useState(__DEV__ ? 'baboontest.eraldi' : '');

  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { signIn } = useAuth(); // Get the signIn function

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setError('');

    try {
      await signIn(username, password);
    } catch (e) {
      setError(e.message || 'Failed to log in. Please check credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    // NEW: Wrap entire screen in KeyboardAvoidingView
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* NEW: Wrap content in a ScrollView to allow scrolling when keyboard is up */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* NEW: Allows user to tap outside inputs to dismiss keyboard */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* Use a wrapper View for the dismiss to work with ScrollView */}
          <View> 
            <View style={styles.headerContainer}>
              <ImageBackground source={require('../assets/pictures/login_wave.png')}
                style={styles.background}
                resizeMode="stretch">

                <Text style={{ color: '#ffffffff', marginTop: 100, fontSize: 25, width: 250, marginHorizontal: 100, marginTop: 150 }}>Vodafone MORE Partners</Text>
                <Image source={require('../assets/icons/logo_subjekt_default.png')} style={styles.logo1} />
                <Image source={require('../assets/icons/p.png')} style={styles.logo2} />
              </ImageBackground>
            </View>

            {/* This container holds your inputs */}
            <View style={styles.container}>

              <View style={{ flexDirection: 'row', backgroundColor: '#dfdfdfff', marginHorizontal: 100, marginBottom: 20, borderRadius: 50 }}>
                <Image source={require('../assets/icons/sm_user.png')} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>

              <View style={{ flexDirection: 'row', backgroundColor: '#dfdfdfff', marginHorizontal: 100, borderRadius: 50, marginBottom: 20 }}  >
                <Image source={require('../assets/icons/sm_lock.png')} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoggingIn}
                style={[styles.button, isLoggingIn && styles.buttonDisabled]}
              >
                {isLoggingIn ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Hyr</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // NEW: Style for the ScrollView's content
  scrollContainer: {
    flexGrow: 1, // Ensures content can grow to fill space
  },
  container: {
    flex: 1,
    marginTop: 250
  },
  headerContainer: {
    position: 'relative',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  logo1: {
    height: 150,
    width: 150,
    marginVertical: 30,
    marginHorizontal: 120
  },
  logo2: {
    height: 150,
    width: 150,
    position: 'absolute',
    marginTop: 250,
    marginHorizontal: 120
  },
  background: {
    height: 400,
    width: 600
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 10,
    // NEW: Ensure input has flexible width
    flex: 1, 
  },
  icon: {
    position: 'absolute',
    left: 10, 
    top: '50%',
    transform: [{ translateY: -12 }], 
    width: 24,
    height: 24,
    // NEW: Ensure icon stays on top
    zIndex: 1,
  },
  button: {
    backgroundColor: '#4a4a4aff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 100
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default LoginScreen;
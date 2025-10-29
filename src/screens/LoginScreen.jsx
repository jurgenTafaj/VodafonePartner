// src/screens/LoginScreen.jsx

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Import the hook

const LoginScreen = () => {
  // Use __DEV__ to set initial state only in development
  const [username, setUsername] = useState(__DEV__ ? 'adrionadmin' : '');
  const [password, setPassword] = useState(__DEV__ ? 'adrionADMIN' : '');
  
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { signIn } = useAuth(); // Get the signIn function

  const handleLogin = async () => {
    if (isLoggingIn) return; 

    setIsLoggingIn(true);
    setError(''); 

    try {
      await signIn(username, password);
      // Navigation will happen automatically from App.jsx
    } catch (e) {
      setError(e.message || 'Failed to log in. Please check credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button 
        title={isLoggingIn ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={isLoggingIn}
      />
    </View>
  );
};

// Add some basic styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default LoginScreen;
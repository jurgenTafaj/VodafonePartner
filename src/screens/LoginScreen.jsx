// src/screens/LoginScreen.js (FIXED: Added TextInput and real Button logic)

import React, { useState } from 'react';
import { 
    View, 
    Text, 
    Alert, 
    ActivityIndicator, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity 
} from 'react-native';
import { useAuth } from '../store/AuthContext';
import { RecaptchaWebView } from '../components/RecaptchaWebView'; // Import the real component

// --- Helper UI Components ---
// Replacing the text placeholders with actual functional components

const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry = false }) => (
    <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        placeholderTextColor="#999"
    />
);

const CustomButton = ({ title, onPress, disabled, loading }) => (
    <TouchableOpacity
        style={[styles.button, (disabled || loading) && styles.disabledButton]}
        onPress={onPress}
        disabled={disabled || loading}
    >
        {loading ? (
            <ActivityIndicator color="#fff" />
        ) : (
            <Text style={styles.buttonText}>{title}</Text>
        )}
    </TouchableOpacity>
);
// --- End Helper UI Components ---


export function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState(''); // Initialize with empty strings
    const [password, setPassword] = useState(''); // Initialize with empty strings
    const [captchaToken, setCaptchaToken] = useState(null);
    const [loading, setLoading] = useState(false);

    // This function receives the token from RecaptchaWebView
    const onCaptchaVerify = (token) => {
        console.log("Live Captcha Token Received:", token);
        setCaptchaToken(token);
    };

    const handleLogin = async () => {
        // Basic input validation
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }
        // if (!captchaToken) {
        //     Alert.alert("Error", "Please complete the Captcha verification.");
        //     return;
        // }

        setLoading(true);
        try {
            await login(email, password, captchaToken);
        } catch (error) {
            Alert.alert("Login Failed", error.message);
            // On failure, reset Captcha state to force re-solve
            setCaptchaToken(null); 
        } finally {
            setLoading(false);
        }
    };

    const isLoginDisabled = !email || !password // || !captchaToken;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Partner Login</Text>
            
            <CustomInput 
                placeholder="Username (Email)" 
                value={email} 
                onChangeText={setEmail} 
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry={true}
            />
            
            {/* The live RecaptchaWebView component is now active */}
            <RecaptchaWebView onVerify={onCaptchaVerify} />

            <CustomButton 
                title="Log In" 
                onPress={handleLogin} 
                loading={loading}
                disabled={isLoginDisabled} 
            />
            <Text style={styles.info}>
                {captchaToken 
                    ? `Captcha Status: Verified` 
                    : `Captcha Status: Pending...`
                }
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        paddingHorizontal: 30, 
        backgroundColor: '#fff' 
    },
    header: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        marginBottom: 40, 
        textAlign: 'center',
        color: '#333'
    },
    input: { 
        height: 50,
        paddingHorizontal: 15, 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    button: { 
        backgroundColor: '#007AFF', // A standard blue for primary actions
        padding: 15, 
        textAlign: 'center', 
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    disabledButton: { 
        backgroundColor: '#a3c3f7' // Lighter shade when disabled
    },
    info: { 
        marginTop: 20, 
        textAlign: 'center', 
        color: '#666' 
    }
});
// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../store/AuthContext';
import apiClient from '../api/apiClient';
import { PROTECTED_URL } from '../constants/config';
// Assume CustomButton is imported/defined here

const CustomButton = ({ title, onPress }) => (
    <Text style={styles.button} onPress={onPress}>
        {title}
    </Text>
);

export default function HomeScreen() {
    const { authState, logout } = useAuth();
    const [protectedData, setProtectedData] = useState('Loading...');

    // Example of calling a protected endpoint using the interceptor
    const fetchProtectedData = async () => {
        try {
            const response = await apiClient.get(PROTECTED_URL);
            setProtectedData(JSON.stringify(response.data, null, 2));
        } catch (error) {
            setProtectedData(`Error fetching data: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchProtectedData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome, User!</Text>
            <Text>Token Status: {authState.token ? 'Active' : 'Missing'}</Text>
            <Text style={styles.dataHeader}>Protected API Response (Auto-token attached):</Text>
            <Text style={styles.dataText}>{protectedData}</Text>
            
            <CustomButton title="Logout" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'space-around' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    dataHeader: { marginTop: 20, fontWeight: 'bold' },
    dataText: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5, minHeight: 100 },
    button: { backgroundColor: 'red', color: 'white', padding: 15, textAlign: 'center', borderRadius: 5, marginTop: 30 },
});
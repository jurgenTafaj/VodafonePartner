// src/components/RecaptchaWebView.js

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { RECAPTCHA_SITE_KEY } from '../constants/config';

// Get screen width to size the WebView for better display
const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 * Generates the HTML required to load and manage the reCAPTCHA v2 widget.
 * @param {string} siteKey - Your Google reCAPTCHA public site key.
 */
const getHtml = (siteKey) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=${SCREEN_WIDTH}, user-scalable=no, initial-scale=1.0, maximum-scale=1.0">
    <style>
        body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    </style>
    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
    <script type="text/javascript">
        // 1. Function called by the reCAPTCHA API upon successful verification.
        var onCaptchaVerify = function(token) {
            // Send the token back to React Native using the WebView bridge
            window.ReactNativeWebView.postMessage(token);
        };
        
        // 2. Function called when the reCAPTCHA script finishes loading.
        var onloadCallback = function() {
            grecaptcha.render('captcha-container', {
                'sitekey' : '6LeV8_orAAAAAFr3ZCTCisdL3EzqC3lnNktHbulR',
                'callback' : onCaptchaVerify,
                'theme' : 'light' 
            });
        };
    </script>
</head>
<body>
    <div id="captcha-container"></div>
</body>
</html>
`;


/**
 * React Native component that displays the reCAPTCHA v2 checkbox inside a WebView.
 * @param {object} props
 * @param {function} props.onVerify - Callback function to receive the Captcha token.
 */
export function RecaptchaWebView({ onVerify }) {
    
    const htmlContent = getHtml(RECAPTCHA_SITE_KEY);

    // Handles the message event from the WebView's JavaScript
    const handleWebViewMessage = (event) => {
        const token = event.nativeEvent.data;
        if (token && onVerify) {
            console.log("WebView received Captcha token.");
            onVerify(token);
        }
    };
    
    return (
        <View style={styles.container}>
            <WebView
                // The reCAPTCHA widget has a fixed size (around 304x78); this size ensures it fits.
                style={styles.webView}
                source={{ html: htmlContent }}
                originWhitelist={['*']} // Allows the WebView to load scripts from external domains (Google)
                onMessage={handleWebViewMessage}
                javaScriptEnabled={true}
                // Optional props to prevent navigation issues inside the WebView
                bounces={false} 
                scrollEnabled={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // Minimum height/width to ensure the checkbox is fully visible and clickable (approx 304x78)
        height: 100, 
        width: '100%', 
        marginVertical: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    webView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});
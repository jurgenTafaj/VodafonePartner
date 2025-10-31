import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Linking,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity, // For buttons
  Modal, // For the confirmation popup
  Alert, // Using native alert for success messages
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
  useCameraPermission,
} from 'react-native-vision-camera';
// Import the new API service function
import { redeemCoupon } from '../api/authService';

const { width, height } = Dimensions.get('window');

// Debounce function to prevent rapid, repetitive scans
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// --- Main App Component ---
// Assume onGoBack is a navigation function passed from the parent (e.g., navigation.goBack or setting a parent state)
export default function CameraScann({ onGoBack }) {
  const {
    hasPermission,
    requestPermission
  } = useCameraPermission();

  // New State Variables for Logic and UI
  const [scannedData, setScannedData] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [error, setError] = useState(null);
  // Controls the Camera's active state
  const [isScanActive, setIsScanActive] = useState(true);

  // 1. Get the back camera device
  const device = useCameraDevice('back');

  // 2. Request Camera Permissions on startup
  useEffect(() => {
    const checkAndRequestPermission = async () => {
      if (hasPermission === false) {
        const granted = await requestPermission();
        if (granted) {
          setTimeout(() => {
            setIsInitialized(true);
          }, 500);
        }
      } else if (hasPermission === true) {
        setIsInitialized(true);
      }
    };

    checkAndRequestPermission();
  }, [hasPermission, requestPermission]);

  // Use a ref to store the last scanned value to prevent re-scans
  const lastScannedValueRef = useRef(null);

  // Function to reset all scanning states
  const resetScan = useCallback(() => {
    setScannedData(null);
    lastScannedValueRef.current = null;
    setIsScanActive(true); // Re-enable camera scanning
    setError(null); // Clear any old errors
  }, []);

  // --- API Call Function ---
  const handleRedeemCoupon = useCallback(async (couponCode) => {
    setIsRedeeming(true);
    setError(null);

    try {
      // Use the imported service function
      const response = await redeemCoupon(couponCode);
      const data = response.data; // Axios wraps the response body in .data

      // Check for API-specific success/failure status within the response data
      if (data.status_code >= 400 || data.success === false) { 
        // Use the error message from the response body as shown in your image
        const errorMessage = data.status_message || data.errors?.[0]?.title || 'Coupon redemption failed (API response error).';
        console.error('API Redemption Error:', errorMessage);
        throw new Error(errorMessage);
      }

      // Successful redemption
      setIsModalVisible(false);
      // Use Alert for success message
      Alert.alert('Success', 'Coupon redeemed successfully!', [
        { text: 'OK', onPress: onGoBack || (() => {}) },
      ]); 
      
      // Simulate navigation to HomeComponent or back (if Alert is dismissed)
      if (onGoBack) {
        // Since we use the onGoBack in the Alert handler, we don't need to call it here
      }

    } catch (err) {
      console.error('API Redemption Error:', err);
      setIsModalVisible(false); // Close modal on error

      let message = 'Network error occurred. Please check connection.';
      
      // Handle specific Axios error structure (non-2xx response from server)
      if (err.response) {
        const errorData = err.response.data;
        // Try to extract the custom message from the error data
        message = errorData.status_message || errorData.errors?.[0]?.title || `Server Error (${err.response.status}).`;
      } else if (err.message) {
        // Handle custom errors thrown by the service layer (e.g., 'User ID not found')
        message = err.message;
      }
      
      // Show error via state and keep the user on the scanner
      setError(message);
      
      // Reset the scanned value after a delay so the user can re-scan or dismiss the error manually
      setTimeout(resetScan, 3000); 

    } finally {
      setIsRedeeming(false);
    }
  }, [onGoBack, resetScan]);


  // Use useCallback and debounce for handling the code scan event
  const handleCodeScanned = useCallback((codes) => {
    if (codes.length > 0) {
      const value = codes[0].value;
      if (value && value !== lastScannedValueRef.current) {
        lastScannedValueRef.current = value;
        setScannedData(value);
        setIsScanActive(false); // **Pause scanning immediately**
        setIsModalVisible(true); // **Show confirmation pop-up**

        // Keep the debounce logic for reference, though pausing 'isActive' is more direct
        debounce(() => {
          // This allows manual reset or re-scan logic if the modal is dismissed
        }, 5000)();
      }
    }
  }, []);

  // 3. Initialize the Code Scanner hook
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: handleCodeScanned,
  });

  // --- Confirmation Modal Component ---
  const ConfirmationModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(false);
        resetScan();
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirm Coupon Redemption</Text>
          <Text style={styles.modalBody}>
            Do you want to proceed and redeem the following code?
          </Text>
          <Text style={styles.modalCodeValue}>{scannedData}</Text>

          {isRedeeming ? (
            <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setIsModalVisible(false);
                  resetScan(); // Reset scan state if the user cancels
                }}
              >
                <Text style={styles.buttonText}>No / Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => handleRedeemCoupon(scannedData)}
              >
                <Text style={styles.buttonText}>Yes / Proceed</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );

  // --- RENDERING LOGIC ---

  // Check for camera device and initialization
  const isCameraReady = hasPermission === true && device != null && isInitialized;

  if (hasPermission === null || hasPermission === undefined || !isCameraReady) {
    // Show Loading/Permission Required/Device Not Found states
    if (hasPermission === false) {
      // Permission Required state (Unchanged)
      return (
        <SafeAreaView style={[styles.container, styles.center]}>
          <StatusBar barStyle="light-content" />
          <Text style={styles.permissionText}>Camera Access Required</Text>
          <Text style={styles.permissionSubText}>
            Please grant camera permission to use the scanner.
          </Text>
          <Text style={styles.linkText} onPress={async () => {
            await Linking.openSettings();
          }}>
            Open Settings
          </Text>
          <Text
            style={[styles.linkText, { marginTop: 15 }]}
            onPress={async () => {
              await requestPermission();
            }}>
            Try Again
          </Text>
        </SafeAreaView>
      );
    }

    // Initializing Camera/Checking Permissions state (Unchanged)
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginBottom: 20 }} />
        <Text style={styles.permissionText}>
          Initializing Camera...
        </Text>
        <Text style={styles.permissionSubText}>
          {device == null
            ? 'Looking for camera device...'
            : 'Setting up camera permissions...'}
        </Text>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 4. The Camera View. isActive is now conditional */}
      <View style={styles.cameraContainer}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          // Only active if permissions are granted and scan is not paused by a detection/modal
          isActive={isScanActive} 
          codeScanner={codeScanner}
          enableZoomGesture={false}
        />

        {/* Scanning Overlay (Visual guide for the user) */}
        <View style={styles.overlay}>
          <View style={styles.scannerWindow} />
          <View style={styles.guideTextContainer}>
            <Text style={styles.guideText}>
              {scannedData && !isScanActive
                ? 'Code Detected. Confirming...'
                : 'Align the QR Code within the frame to scan.'}
            </Text>
          </View>
        </View>
      </View>

      {/* Result Display Panel */}
      <View style={styles.resultPanel}>
        {/* Error Message Display */}
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              Error: {error}
            </Text>
          </View>
        )}

        <Text style={styles.resultLabel}>
          Scan Result ({scannedData ? 'Detected' : 'Searching...'})
        </Text>
        <Text style={styles.resultValue} numberOfLines={2}>
          {scannedData || 'Point your camera at a QR code.'}
        </Text>

        {/* Reset/Go Back Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={scannedData ? resetScan : onGoBack}
        >
          <Text style={styles.actionButtonText}>
            {scannedData ? 'Scan Another Code' : 'Go Back'}
          </Text>
        </TouchableOpacity>

      </View>

      {/* Confirmation Modal */}
      <ConfirmationModal />
    </SafeAreaView>
  );
}

// --- STYLESHEETS ---
const SCANNER_SIZE = width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 10,
  },
  permissionSubText: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scannerWindow: {
    width: SCANNER_SIZE,
    height: SCANNER_SIZE,
    borderWidth: 4,
    borderColor: '#4CAF50',
    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  guideTextContainer: {
    position: 'absolute',
    top: SCANNER_SIZE + height / 5, // Adjusted position to be closer to the scanner
    paddingHorizontal: 20,
  },
  guideText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  resultPanel: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 150,
  },
  resultLabel: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  resultValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    minHeight: 40,
    marginBottom: 10,
  },
  // New Styles for Confirmation Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#333333',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalCodeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: '#4CAF50', // Green for success
  },
  cancelButton: {
    backgroundColor: '#FF6F61', // Red/Orange for cancel
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // New Styles for Error Display
  errorBox: {
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  errorText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  // Updated Action Button
  actionButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#3A3A3A',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '700',
  }
});

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   Linking,
//   StatusBar,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
//   Modal,
//   Alert,
//   TextInput,
//   Image,
//   KeyboardAvoidingView,
//   Platform
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   Camera,
//   useCameraDevice,
//   useCodeScanner,
//   useCameraPermission,
// } from 'react-native-vision-camera';
// import { redeemCoupon, getCuponDetails } from '../api/authService';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// const debounce = (func, delay) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), delay);
//   };
// };

// export default function CameraScann({ onGoBack }) {
//   const {
//     hasPermission,
//     requestPermission
//   } = useCameraPermission();

//   const [scannedData, setScannedData] = useState(null);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [couponData, setCouponData] = useState(null);
//   const [isApiLoading, setIsApiLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isScanActive, setIsScanActive] = useState(true);

//   const [invoiceAmount, setInvoiceAmount] = useState('');
//   const [notes, setNotes] = useState('');
//   const [discountedPrice, setDiscountedPrice] = useState('0.00');
//   const [isRedeeming, setIsRedeeming] = useState(false);

//   const device = useCameraDevice('back');
//   const navigation = useNavigation();


//   useEffect(() => {
//     const checkAndRequestPermission = async () => {
//       if (hasPermission === false) {
//         const granted = await requestPermission();
//         if (granted) {
//           setTimeout(() => setIsInitialized(true), 500);
//         }
//       } else if (hasPermission === true) {
//         setIsInitialized(true);
//       }
//     };
//     checkAndRequestPermission();
//   }, [hasPermission, requestPermission]);

//   useEffect(() => {
//     const productDetails = couponData?.data?.product;
//     if (!productDetails) return;

//     const parsedInvoiceAmount = parseFloat(invoiceAmount);
//     if (isNaN(parsedInvoiceAmount) || parsedInvoiceAmount <= 0) {
//       setDiscountedPrice('0.00');
//       return;
//     }

//     const {
//       discount: discountValue,
//       discount_type: discountType,
//       amount_min: minAmount,
//       amount_max: maxAmount
//     } = productDetails;

//     let calculatedDiscount = 0;
//     if (parsedInvoiceAmount >= minAmount && parsedInvoiceAmount <= maxAmount) {
//       if (discountType === 'percentage') {
//         calculatedDiscount = (parsedInvoiceAmount * discountValue) / 100;
//       } else if (discountType === 'static') {
//         calculatedDiscount = Math.min(discountValue, parsedInvoiceAmount);
//       }
//     }
//     setDiscountedPrice(calculatedDiscount.toFixed(2));
//   }, [invoiceAmount, couponData]);


//   const lastScannedValueRef = useRef(null);

//   const resetScan = useCallback(() => {
//     setScannedData(null);
//     lastScannedValueRef.current = null;
//     setIsScanActive(true);
//     setError(null);
//     setCouponData(null);
//     setInvoiceAmount('');
//     setNotes('');
//     setDiscountedPrice('0.00');
//   }, []);

//   const handleGetCouponDetails = useCallback(async (couponCode) => {
//     setIsApiLoading(true);
//     setError(null);
//     try {
//       const response = await getCuponDetails(couponCode);
//       const data = response.data;
//       if (data.status_code >= 400 || data.success === false) {
//         throw new Error(data.status_message || data.errors?.[0]?.title || 'Coupon validation failed.');
//       }
//       setCouponData(data);
//       setIsConfirmModalVisible(false);
//       setShowDetailsModal(true);
//     } catch (err) {
//       console.error('API GetDetails Error:', err);
//       setIsConfirmModalVisible(false);
//       let message = err.message || 'Network error occurred.';
//       if (err.response) {
//         const errorData = err.response.data;
//         message = errorData.status_message || errorData.errors?.[0]?.title || `Server Error (${err.response.status}).`;
//       }
//       setError(message);
//       setTimeout(resetScan, 3000);
//     } finally {
//       setIsApiLoading(false);
//     }
//   }, [resetScan]);

//   const handleRedeemPress = async () => {
//     if (!invoiceAmount || parseFloat(invoiceAmount) <= 0) {
//       alert('Ju lutem shkruani një vlerë të vlefshme për faturën.');
//       return;
//     }

//     setIsRedeeming(true);
//     try {
//       const response = await redeemCoupon(scannedData, invoiceAmount, notes);

//       if (response.data && response.data.status_code === 200) {
//         alert('Kuponi u konsumua me sukses!');
//         setShowDetailsModal(false);
//         resetScan();
//         if (onGoBack) onGoBack();
//       } else {
//         alert(response.data.status_message || 'Gabim gjatë konsumimit të kuponit.');
//       }
//     } catch (error) {
//       console.error("Redeem Error:", error);
//       alert('Gabim i papritur: ' + error.message);
//     } finally {
//       setIsRedeeming(false);
//     }
//   };

//   const handleCodeScanned = useCallback((codes) => {
//     if (codes.length > 0) {
//       const value = codes[0].value;
//       if (value && value !== lastScannedValueRef.current) {
//         lastScannedValueRef.current = value;
//         setScannedData(value);
//         setIsScanActive(false);
//         setIsConfirmModalVisible(true);
//       }
//     }
//   }, []);

//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr'],
//     onCodeScanned: handleCodeScanned,
//   });


import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
  useCameraPermission,
} from 'react-native-vision-camera';
import { redeemCoupon, getCuponDetails } from '../api/authService';
import { useNavigation } from '@react-navigation/native';
import { useAutoRedeem } from '../context/AutoRedeemProvider ';
const { width, height } = Dimensions.get('window');

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export default function CameraScann({ onGoBack }) {
  const { isAutoRedeem } = useAutoRedeem(); // 👈 use shared toggle

  const { hasPermission, requestPermission } = useCameraPermission();
  const [scannedData, setScannedData] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isScanActive, setIsScanActive] = useState(true);
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('0.00');
  const [isRedeeming, setIsRedeeming] = useState(false);

  const device = useCameraDevice('back');
  const navigation = useNavigation();
  const lastScannedValueRef = useRef(null);

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      if (hasPermission === false) {
        const granted = await requestPermission();
        if (granted) {
          setTimeout(() => setIsInitialized(true), 500);
        }
      } else if (hasPermission === true) {
        setIsInitialized(true);
      }
    };
    checkAndRequestPermission();
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    const productDetails = couponData?.data?.product;
    if (!productDetails) return;

    const parsedInvoiceAmount = parseFloat(invoiceAmount);
    if (isNaN(parsedInvoiceAmount) || parsedInvoiceAmount <= 0) {
      setDiscountedPrice('0.00');
      return;
    }

    const {
      discount: discountValue,
      discount_type: discountType,
      amount_min: minAmount,
      amount_max: maxAmount,
    } = productDetails;

    let calculatedDiscount = 0;
    if (parsedInvoiceAmount >= minAmount && parsedInvoiceAmount <= maxAmount) {
      if (discountType === 'percentage') {
        calculatedDiscount = (parsedInvoiceAmount * discountValue) / 100;
      } else if (discountType === 'static') {
        calculatedDiscount = Math.min(discountValue, parsedInvoiceAmount);
      }
    }
    setDiscountedPrice(calculatedDiscount.toFixed(2));
  }, [invoiceAmount, couponData]);

  const resetScan = useCallback(() => {
    setScannedData(null);
    lastScannedValueRef.current = null;
    setIsScanActive(true);
    setError(null);
    setCouponData(null);
    setInvoiceAmount('');
    setNotes('');
    setDiscountedPrice('0.00');
  }, []);

  const handleGetCouponDetails = useCallback(async (couponCode) => {
    setIsApiLoading(true);
    setError(null);
    try {
      const response = await getCuponDetails(couponCode);
      const data = response.data;
      if (data.status_code >= 400 || data.success === false) {
        throw new Error(
          data.status_message || data.errors?.[0]?.title || 'Coupon validation failed.'
        );
      }
      setCouponData(data);
      setIsConfirmModalVisible(false);
      setShowDetailsModal(true);
    } catch (err) {
      console.error('API GetDetails Error:', err);
      setIsConfirmModalVisible(false);
      let message = err.message || 'Network error occurred.';
      if (err.response) {
        const errorData = err.response.data;
        message =
          errorData.status_message ||
          errorData.errors?.[0]?.title ||
          `Server Error (${err.response.status}).`;
      }
      setError(message);
      setTimeout(resetScan, 3000);
    } finally {
      setIsApiLoading(false);
    }
  }, [resetScan]);

  const handleRedeemPress = async () => {
    if (!invoiceAmount || parseFloat(invoiceAmount) <= 0) {
      alert('Ju lutem shkruani një vlerë të vlefshme për faturën.');
      return;
    }

    setIsRedeeming(true);
    try {
      const response = await redeemCoupon(scannedData, invoiceAmount, notes);
      if (response.data && response.data.status_code === 200) {
        alert('Kuponi u konsumua me sukses!');
        setShowDetailsModal(false);
        resetScan();
        if (onGoBack) onGoBack();
      } else {
        alert(response.data.status_message || 'Gabim gjatë konsumimit të kuponit.');
      }
    } catch (error) {
      console.error('Redeem Error:', error);
      alert('Gabim i papritur: ' + error.message);
    } finally {
      setIsRedeeming(false);
    }
  };

  // 👇 MODIFIED PART: handleCodeScanned
  const handleCodeScanned = useCallback(
    (codes) => {
      if (codes.length > 0) {
        const value = codes[0].value;
        if (value && value !== lastScannedValueRef.current) {
          lastScannedValueRef.current = value;
          setScannedData(value);
          setIsScanActive(false);

          if (isAutoRedeem) {
            // 🔴 Auto mode — skip confirmation and go directly to details
            handleGetCouponDetails(value);
          } else {
            // 🟢 Manual mode — show confirmation modal
            setIsConfirmModalVisible(true);
          }
        }
      }
    },
    [isAutoRedeem, handleGetCouponDetails]
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: handleCodeScanned,
  });






  const ConfirmationModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isConfirmModalVisible}
      onRequestClose={() => {
        setIsConfirmModalVisible(false);
        resetScan();
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirm Coupon</Text>
          <Text style={styles.modalBody}>
            Do you want to check the details for this coupon code?
          </Text>
          <Text style={styles.modalCodeValue}>{scannedData}</Text>
          {isApiLoading ? (
            <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setIsConfirmModalVisible(false);
                  resetScan();
                }}
              >
                <Text style={styles.buttonText}>No / Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => handleGetCouponDetails(scannedData)}
              >
                <Text style={styles.buttonText}>Yes / Proceed</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );

  const isCameraReady = hasPermission === true && device != null && isInitialized;
  if (hasPermission === null || hasPermission === undefined || !isCameraReady) {
    if (hasPermission === false) {
      return (
        <SafeAreaView style={[styles.container, styles.center]}>
          <Text style={styles.permissionText}>Camera Access Required</Text>
          <Text style={styles.linkText} onPress={async () => await Linking.openSettings()}>
            Open Settings
          </Text>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.permissionText}>Initializing Camera...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="light-content" />

      <View style={styles.cameraContainer}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isScanActive}
          codeScanner={codeScanner}
          enableZoomGesture={false}
        />
        <View style={styles.overlay}>
          <View style={styles.scannerWindow} />
          <View style={styles.guideTextContainer}>
            <Text style={styles.guideText}>
              {scannedData && !isScanActive
                ? 'Code Detected. Checking...'
                : 'Align the QR Code within the frame to scan.'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.resultPanel}>
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        )}
        <Text style={styles.resultLabel}>
          Scan Result ({scannedData ? 'Detected' : 'Searching...'})
        </Text>
        <Text style={styles.resultValue} numberOfLines={2}>
          {scannedData || 'Point your camera at a QR code. If scanning isn’t possible, enter the code.'}
        </Text>
        {/* <TouchableOpacity
          style={styles.actionButton}
          onPress={scannedData ? resetScan : () => navigation.goBack('Home')}
        >
          <Text style={styles.actionButtonText}>
            Go Back

          </Text>
        </TouchableOpacity> */}
      </View>

      <ConfirmationModal />

      <Modal
        transparent={true}
        visible={showDetailsModal}
        onRequestClose={() => {
          setShowDetailsModal(false);
          resetScan();

        }}
        style={{ margin: 0 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.detailsModalContainer}
        >
          <ScrollView style={{ width: '100%' }}>

            <View style={styles.detailsTitleView}>
              <Image source={require('../assets/icons/sm_promocioni.png')} style={styles.detailsIcon} />
              <Text style={styles.detailsTitle}>Promocioni</Text>
            </View>
            <View style={styles.detailsInfo}>
              <Text style={styles.detailsText}>{couponData?.data?.product?.product}</Text>
            </View>

            <View style={styles.detailsTitleView}>
              <Image source={require('../assets/icons/sm_produkti.png')} style={styles.detailsIcon} />
              <Text style={styles.detailsTitle}>Shënim (Opsional)</Text>
            </View>
            <View>
              <TextInput
                style={styles.detailsInput}
                onChangeText={setNotes}
                value={notes}
                placeholder="Shkruani një shënim..."
              />
            </View>

            <View style={styles.detailsTitleView}>
              <Image source={require('../assets/icons/sm_fatura.png')} style={styles.detailsIcon} />
              <Text style={styles.detailsTitle}>Vlera e Faturës</Text>
            </View>
            <View>
              <TextInput
                style={styles.detailsInput}
                onChangeText={setInvoiceAmount}
                value={invoiceAmount}
                placeholder="Shkruani vlerën"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.detailsTitleView}>
              <Image source={require('../assets/icons/sm_ulja.png')} style={styles.detailsIcon} />
              <Text style={styles.detailsTitle}>Vlera e uljes</Text>
            </View>
            <View>
              <Text style={[styles.detailsInput, { paddingVertical: 10 }]}>{discountedPrice}</Text>
            </View>

            <View style={[styles.detailsButtonContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => { setShowDetailsModal(false); navigation.goBack('Home') }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>
                  Mbyll

                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleRedeemPress}
                style={styles.detailsButton}
                disabled={isRedeeming}
              >

                {isRedeeming ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ color: '#fff', fontSize: 16 }}>Konsumo</Text>
                )}
              </TouchableOpacity>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

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
    top: SCANNER_SIZE + height / 5,
    paddingHorizontal: 20,
    marginTop: 80
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
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#FF6F61',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
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
  },

  detailsModalContainer: {
    marginTop: 200,
    marginHorizontal: 10,
    backgroundColor: '#e5e5e5ff',
    height: 'auto',
    maxHeight: '70%',
    borderRadius: 20,
    padding: 15,
  },
  detailsTitleView: {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    alignSelf: 'center',
  },
  detailsText: {
    fontSize: 15,
    marginVertical: 5,
    paddingVertical: 10,
    paddingLeft: 30
  },
  detailsButtonContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  detailsButton: {
    backgroundColor: '#242739ff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    minWidth: 120,
    alignItems: 'center',
  },
  detailsIcon: {
    height: 30,
    width: 30
  },
  detailsInfo: {
    backgroundColor: '#ffffffff'
  },
  detailsInput: {
    backgroundColor: '#ffffffff',
    paddingLeft: 30,
    height: 40,
    justifyContent: 'center',
  },

});
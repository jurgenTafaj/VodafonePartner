import React from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator, View } from "react-native";

export default function RecaptchaScreen({ onVerify }) {
  return (
    <WebView
      source={{ uri: "https://pos.vodafonecoupons.al/recaptcha/" }}
      javaScriptEnabled
      domStorageEnabled
      mixedContentMode="always"
      originWhitelist={["*"]}
      onMessage={(event) => {
        const token = event.nativeEvent.data;
        onVerify(token);
      }}
      // injectedJavaScript={`
      //   (function() {
      //     function sendToken() {
      //       var input = document.getElementById('recaptchaResponse');
      //       if(input && input.value) {
      //         window.ReactNativeWebView.postMessage(input.value);
      //       } else {
      //         setTimeout(sendToken, 500); // retry until value exists
      //       }
      //     }
      //     sendToken();
      //   })();
      //   true;
      // `}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    />
  );

}

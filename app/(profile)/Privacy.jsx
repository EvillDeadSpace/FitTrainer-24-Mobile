import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";

import { router } from "expo-router";
const Privacy = () => {
  return (
    <SafeAreaView >
      <TouchableOpacity onPress={() => router.back( )}>
      <View style={{ flexDirection: "row", alignItems: "center", margin:20}}>
        <Icon name="left" size={25} color="black" />
        <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 10 }}>
          Back
        </Text>
      </View>
      </TouchableOpacity>
      <View style={{ margin: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Privacy Policy
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Welcome to our application. We value your privacy and are committed to
        protecting your personal data. This Privacy Policy explains how we
        collect, use, and safeguard your information.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        We collect personal data such as your name, email address, and any other
        details you provide when you register or interact with our services. We
        also collect usage data to improve our services and enhance your user
        experience.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Your data is used to provide and maintain the service, notify you of
        changes, and improve the app's performance. We do not share your
        personal information with third parties without your consent, except
        where required by law.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        By using our application, you agree to the collection and use of
        information in accordance with this policy. For any questions, feel free
        to contact us.
      </Text>
      </View>
    </SafeAreaView>
  );
};

export default Privacy;

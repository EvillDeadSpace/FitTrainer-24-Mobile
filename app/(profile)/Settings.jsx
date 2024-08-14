import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import { useContext } from "react";
import { UserContext } from "../../components/Context/Context";


import { Button, Input, TextArea } from "tamagui";



const Settings = () => {

  const USER_UPDATE_SETTINGS = process.env.USER_UPDATE_SETTINGS;

  const { username } = useContext(UserContext);

  const updateSettings = async () => {

   
    try {
      const response = await fetch(USER_UPDATE_SETTINGS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, newUsername, password }),
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        console.log("Uspješno ažurirane postavke:", result.message);
      } else {
        console.error("Neuspješno ažurirane postavke:", result.message);
      }
    } catch (error) {
      console.error("Greška prilikom ažuriranja postavki:", error);
    }


  };


  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView>
      <View style={{ margin: 20,}}>
        <Text style={{ fontWeight: "bold",
    fontSize: 24,}}>Welcome,</Text>
        <Text style={{  normalText: {
    fontSize: 16,
  },}}>
          to your Profile settings {username}
        </Text>
      </View>
    
      <Text style={{margin:20}}>
        This is where you can change your settings, such as your username,
        password, and other personal information.
      </Text>
      <View style={styles.container}>
      <Input placeholder="Update username" style={{margin:10,}} onChangeText={(text) => setNewUsername(text)} />
      <Input placeholder="Update password" style={{margin:10,}} onChangeText={(text) => setPassword(text)} />
   
      
 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin:15, }}>
      <Button
                onPress={updateSettings}
                style={{
                    backgroundColor: '#9037CD',
                    width: '90%',
                    height: 55,
                    borderRadius: 22,
                    marginTop: 40,
                    
                }}
            >
                <Text style={{color:"white"}}>Update</Text>
            </Button>
            </View>
            </View>
    </SafeAreaView>
  )
}


const styles = {
  container: {
    

    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#9037CD',
    width: '90%',
    height: 55,
    borderRadius: 22,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
  },
};

export default Settings
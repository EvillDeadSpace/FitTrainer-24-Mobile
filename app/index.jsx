import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView, Image, View, Text, Alert } from "react-native";
import { Link, Navigator, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import images from "../constants/photo"

import 'react-native-gesture-handler';
import { AlertDialog, XStack, YStack } from 'tamagui'

import { TamaguiProvider } from 'tamagui'
import config from '../tamagui.config'

import { Button } from 'tamagui';


import { LightSpeedInLeft } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';


function App() {
    const [showAlert, setShowAlert] = useState(false); 


    //after open app open alert
    useEffect(() => {
      Alert.alert(
        'Dobrodošli!',
        'Vako frendovi ovo je early acceses verzija aplikacije, pa vas molimo da ne koristite prave podatke. Sto se tice slika jos nisam to napravio zato sto nemam pojma isk isk, ali ce biti uskoro. Hvala na razumevanju. Map najblizi teretana ne radi zbog razloga sto trebam API key itd itd google jede malo gvo*** al na emulatorima radi. Opet napominjem svi podatci mogu biti lako ukradeni zato molim vas nemoj te stavalja vase preave podatke poput sifre i emailova. Hvala na razumevanju.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }, []);

      


    const handleCloseAlert = () => {
        setShowAlert(true);
      };




      Alert.prompt('Vako frendovi ovo je early acceses verzija aplikacije, pa vas molimo da ne koristite prave podatke. Sto se tice slika jos nisam to napravio zato sto nemam pojma isk isk, ali ce biti uskoro. Hvala na razumevanju. Map najblizi teretana ne radi zbog razloga sto trebam API key itd itd google jede malo gvo*** al na emulatorima radi. Opet napominjem svi podatci mogu biti lako ukradeni zato molim vas nemoj te stavalja vase preave podatke poput sifre i emailova. Hvala na razumevanju.');
  return (
    <GestureHandlerRootView>
         <TamaguiProvider config={config}>
   <SafeAreaView>
            <ScrollView>
                <Animated.View entering={LightSpeedInLeft} style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '85%',
                    padding: 4,
                    marginVertical: 24,
                }}>
                    <Image source={images.photoLogo} style={{ width: 300, height: 320, borderRadius: 12 }} />
                    <Text style={{ fontSize: 24, color: 'black', fontWeight: '600', marginTop: 20 }}>
                        Welcome to FitTreiner-24
                    </Text>
                    <Text style={{ fontSize: 16, color: 'black', marginTop: 8 }}>
                        Everything you need in one place
                    </Text>

                    <Button style={{
                        backgroundColor: 'purple',
                        height: 55,
                        width: '90%',
                        borderRadius: 22,
                        marginTop: 50,
                    }}
                    onPress={()=> router.push("/sign-up")}>
                       <Text style={{color:"white"}}>Create account</Text>
                    </Button>

                    <Button style={{
                        backgroundColor: 'purple',
                        height: 55,
                        width: '90%',
                        borderRadius: 22,
                        marginTop: 25,
                    }}
                    onPress={()=> router.push("/sign-in")}>
                      
                       <Text style={{color:"white"}}>Login</Text> 
                    </Button>
                 
                    <Text style={{ textAlign: 'center', marginHorizontal: 25, marginTop: 30 }}>
                        By{' '}
                        <Text style={{ fontWeight: 'bold', color: 'blue' }}>Registering</Text>
                        {' or '}
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Login</Text>
                        {' you have agreed to these '}
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Terms and Conditions</Text>
                    </Text>
                    
                </Animated.View>
            </ScrollView>
            
        </SafeAreaView>
        {( 
        <AlertDialog native>
          <AlertDialog.Trigger asChild>
            <Button>Show Alert</Button>
          </AlertDialog.Trigger>

          <AlertDialog.Portal>
            <AlertDialog.Overlay
              key="overlay"
              animation="quick"
              opacity={0.5}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <AlertDialog.Content
              bordered
              elevate
              key="content"
              animation={[
                'superBouncy',
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              x={0}
              scale={1}
              opacity={1}
              y={0}
            >
              <YStack space>
                <AlertDialog.Title>Accept</AlertDialog.Title>
                <AlertDialog.Description>
                Vako frendovi ovo je early acceses verzija aplikacije, pa vas molimo da ne koristite prave podatke. Sto se tice slika jos nisam to napravio zato sto nemam pojma isk isk, ali ce biti uskoro. Hvala na razumevanju. Map najblizi teretana ne radi zbog razloga sto trebam API key itd itd google jede malo gvo*** al na emulatorima radi. Opet napominjem svi podatci mogu biti lako ukradeni zato molim vas nemoj te stavalja vase preave podatke poput sifre i emailova. Hvala na razumevanju.
                </AlertDialog.Description>

                <XStack space="$3" justifyContent="flex-end">
                  <AlertDialog.Cancel asChild>
                    <Button onClick={handleCloseAlert}>Cancel</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <Button theme="active">Accept</Button>
                  </AlertDialog.Action>
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
      )}
        </TamaguiProvider>
</GestureHandlerRootView>
  );
}


export default () => (
   
      <App />
   
  );

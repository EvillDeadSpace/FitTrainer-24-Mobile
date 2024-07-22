import { View, Text, Image, TextInput, } from 'react-native'
import React, {useState, useContext} from 'react'

import photo from '../../constants/photo'
import { AntDesign } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context'


import { Link, router } from 'expo-router';

import { UserContext } from '../../components/Context/Context';


import { Button } from 'tamagui';


import { BounceIn} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';


const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setUsername } = useContext(UserContext);


    const handleLogin = async () => {

        const url = "https://fittrainer-24host.netlify.app/.netlify/functions/server/api/login";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password,  }),
            });

            const result = await response.json();
            console.log(result)
            const username = result.user.username;
            const picture = result.user.image;

            if (result.success) {
               
                console.log(picture + "test test 321");
                
                const user =result.user.username;
                setUsername(result.user.username);
                console.log(user + "test test context 123 123 123 123 ");


                const receivedUser=user && user.username ? user.username : "NEMA";

                router.replace('/home', { user })
                console.log(username);
                console.log('Uspesna prijava:', result.message);
            } else {
                console.error('Neuspesna prijava:', result.message);
            }
        } catch (error) {
            console.error('Došlo je do neočekivane greške:', error);
        }
    };



  return (
    <SafeAreaView style={{ minHeight: '85%', padding: 16, marginTop: 24, alignItems: 'center', justifyContent: 'center' }}>
      
        <Animated.Image entering={BounceIn} source={photo.photoLogin} style={{ width: 300, height: 320, borderRadius: 50 }} />
       
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                    height: 55,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 28,
                    fontSize: 14,
                    paddingHorizontal: 30,
                    width: '90%',
                    marginTop: 20,
                }}
            />
         
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                    height: 55,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 28,
                    fontSize: 14,
                    paddingHorizontal: 30,
                    width: '90%',
                    marginTop: 20,
                }}
            />
            <Text style={{ alignSelf: 'flex-end', marginRight: 20, marginTop:10, }}>
                Forget Password?
            </Text>
           
            <Button
                onPress={handleLogin}
                style={{
                    backgroundColor: '#9037CD',
                    width: '90%',
                    height: 55,
                    borderRadius: 22,
                    marginTop: 20,
                }}
            >
                <Text style={{color:"white"}}>Login</Text>
            </Button>
         
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 30 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <Text style={{ width: 50, textAlign: 'center' }}>OR</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
            <Button
                style={{
                    backgroundColor: 'white',
                    width: '90%',
                    height: 55,
                    borderRadius: 22,
                    marginTop: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
            >
                <AntDesign name="google" size={24} color="purple" />
                <Text style={{ color: 'black', marginLeft: 5 }}>Login with Google</Text>
            </Button>
            <Link href="/sign-up" style={{ marginTop: 25 }}>
                <Text>
                    Don't have an account?{' '}
                    <Text style={{ fontWeight: 'bold', color: 'blue' }}>Sign up</Text>
                </Text>
            </Link>
        </SafeAreaView>

  )
}

export default SignIn
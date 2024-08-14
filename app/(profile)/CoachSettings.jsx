import React, {useState, useContext} from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

import { UserContext } from '../../components/Context/Context';

import { Button, TextArea, Input } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';


//import env

const CoachSettings = () => {

  const COACH_URL_SETTINGS = process.env.COACH_URL_SETTINGS;

  const { username } = useContext(UserContext);

  const [specialization, setSpecialization] = useState('');
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState('');
  const [day, setDay] = useState(0);


  const handleChanges = async () => {
    try {
      const response = await fetch(COACH_URL_SETTINGS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, // Zamijenite s varijablom koja sadrži trenutno prijavljenog trenera
          price: price,
          specialization: specialization,
            duration: duration,
            description: description,
            day: day
        }),
      });

      if (!response.ok) {
        throw new Error('Došlo je do greške prilikom dodavanja cijene.');
      }

      // Ovdje možete dodati dodatne korake ako je dodavanje cijene uspješno
      console.log('Cijena uspješno dodana.');
      Alert.alert('You have successfully set your Coach settings.');
    } catch (error) {
      console.error('Greška prilikom dodavanja cijene:', error);
    }
  };


  return (
    <SafeAreaView>
    <View style={{marginTop:15}}>
    <View style={{ margin: 10,}}>
        <Text style={{ fontWeight: "bold",
    fontSize: 24,}}>Welcome,</Text>
        <Text style={{  normalText: {
    fontSize: 16,
  },}}>
          to your Coach settings {username}
        </Text>
      </View>
        <Text style={styles.description}>Set up your specialization:</Text>
        <Input
            value={specialization}
            style={styles.input}
            placeholder='Add your specialization in one word'
            onChangeText={(text) => setSpecialization(text)}
        />
        <Text style={styles.description}>Set up your price:</Text>
        <Input
        style={styles.input}
            value={price}
            placeholder='Price per month'
            onChangeText={(text) => setPrice(text)}
        ></Input>
        <Text style={styles.description}>Set your duration of 
        training:
        </Text>
        <Input
        style={styles.input}
            value={duration}
            placeholder='Duration per training session in minutes'
            onChangeText={(text) => setDuration(text)}
        ></Input>
         <Text style={styles.description}>
         Training per month:
         </Text>
        <Input
        style={styles.input}
            value={day}
            placeholder='Day'
            onChangeText={(text) => setDay(text)}
        ></Input>

          <Text style={{margin:10}}>Add a brief description about yourself:</Text>
          <TextArea
          style={{margin:10}}
            value={description}
            placeholder='Description'
            onChangeText={(text) => setDescription(text)}
          ></TextArea>
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin:15, }}>
  
        <Button 
           style={{
            backgroundColor: '#9037CD',
            width: '90%',
            height: 55,
            borderRadius: 22,
            marginTop: 40,
            
        }}
        onPress={handleChanges}>Save</Button>
        </View>
    </View>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    margin: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
  },
  description: {
    margin: 10,
  },
});

export default CoachSettings
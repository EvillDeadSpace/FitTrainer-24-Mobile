import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import axios from 'axios';


const map = () => {

    const [location, setLocation] = useState(null);
    const [gyms, setGyms] = useState([]);

    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      (async () => {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          setLoading(false);
          return;
        }
  
        const userLocation = await getCurrentPositionAsync({});
        setLocation(userLocation.coords);
  
        const latitude = userLocation.coords.latitude;
        const longitude = userLocation.coords.longitude;
  
        console.log(latitude, longitude)
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node["leisure"="fitness_centre"](around:5000,${latitude},${longitude});out;`;
  
        try {
          const response = await axios.get(overpassUrl);
          setGyms(response.data.elements);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      })();
    }, []);



  return (
    <View style={styles.container}>
    {location && (
      <MapView
        style={styles.map}
        showsMyLocationButton={true}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {gyms.map((gym, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: gym.lat,
              longitude: gym.lon,
            }}
            title={gym.tags.name || "Fitness Centre"}
          />
        ))}
      </MapView>
    )}
  </View>
);
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  map: {
      width: '100%',
        height: '100%',
  },
});


export default map
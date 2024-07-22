import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import iconSet from '@expo/vector-icons/build/Fontisto';
import shop from '../../app/(tabs)/shop';


const TabBar = ({ state, descriptors, navigation}) => {

    const Icon = {
        home: (props)=> <AntDesign name='home' size={26} color={secondaryColor} {...props}/>,
        map: (props)=> <Feather name='map' size={26} color={secondaryColor} {...props}/>,
        profile: (props)=> <AntDesign name='profile' size={26} color={secondaryColor} {...props}/>,
        shop: (props)=> <AntDesign name='shoppingcart' size={26} color={secondaryColor} {...props}/>,
    }

    const primaryColor = '#673ab7'
    const secondaryColor = '#222'

  return (
    <View style={styles.tabbar}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <TouchableOpacity
        key={route.name}
        style={styles.tabbarItem}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          
        >
            {
                Icon[route.name]  ({
                    color: isFocused ? primaryColor : secondaryColor
                })
            }
         
        </TouchableOpacity>
      );
    })}
  </View>
  )
}



const styles = StyleSheet.create({
  tabbar:{
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default TabBar
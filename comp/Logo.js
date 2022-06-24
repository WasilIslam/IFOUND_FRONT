import React from 'react';
import { View, Text, StyleSheet } from "react-native"
import colors from '../static/colors';
import fonts from '../static/fonts';


const Logo = ({ title = "I.found", color = colors.purple }) => {
  return (
    <View style={logoStyles.main}>
      <Text style={[logoStyles.text, { color:color }]}>{title}</Text>
    </View>
  )
}



const logoStyles = StyleSheet.create({
  text: {
    fontFamily: fonts.heading,
    fontSize: 25
  }
})




export default Logo;

import React, { useState } from 'react';
import { Text, View } from 'react-native';


const Hr = ({ text }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
        <View>
          <Text style={{ width: 50, textAlign: 'center' }}>{text}</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
      </View>
    )
  }
export default Hr
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { } from 'react-native-gesture-handler';
import colors from '../static/colors';
import textStyles from '../styles/text';
import {createStackNavigator} from "@react-navigation/stack"
import Lost from './Add/Lost';
import Found from './Add/Found';
const Add = ({navigation}) => {
    const openLostPage=()=>{
        navigation.navigate("Lost")
    }
    const openFoundPage=()=>{
        navigation.navigate("Found")
    }
    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={openLostPage} style={[styles.view, styles.lostView]}>
                <Text style={[textStyles.heading, { color: "white", fontSize: 30 }]}>Lost</Text>
                <Text style={[textStyles.simple, { color: "white", fontSize: 15 }]}>Have you lost someone?</Text>
                <Text style={[textStyles.simple, { color: "white", fontSize: 15 }]}>Lets find them, Click here</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openFoundPage} style={[styles.view, styles.foundView]}>
                <Text style={[textStyles.heading, { color: colors.purple, fontSize: 28 }]}>Found</Text>
                <Text style={[textStyles.simple, { color: colors.purple, fontSize: 15 }]}>Have you Found someone?</Text>
                <Text style={[textStyles.simple, { color: colors.purple, fontSize: 15 }]}>Click to Post about it</Text>
            </TouchableOpacity>
        </View >
    )
}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "snow"
    },
    view: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    lostView: {
        borderBottomWidth: 1,
        backgroundColor: colors.purple,
    },
    foundView: {
    }
})



const Stack = createStackNavigator() ;

function AddStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown:false }}>
            <Stack.Screen name="Home" component={Add} />
            <Stack.Screen name="Lost" component={Lost} />
            <Stack.Screen name="Found" component={Found} />
        </Stack.Navigator>
    );
}







export default AddStack;

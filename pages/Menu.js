import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import Logo from '../comp/Logo';
import UserContext from '../contexts/user.context';
import Ionicon from "react-native-vector-icons/Ionicons"
import colors from '../static/colors';
import textStyles from '../styles/text';
import MyCases from './Menu/MyCases';
import { logOut } from '../services/user.service';
import Profile from './Menu/Profile';
import About from './Menu/About';




const Box = ({ text, onClick, iconName, bg = colors.purple }) => {
    const handlePress = () => {
        console.log("Box Pressed")
        onClick()
    }
    return (
        <TouchableOpacity onPress={handlePress} style={boxStyles.main}>
            <Ionicon name={iconName} size={35} color={bg} />
            <Text style={[textStyles.simpleBold, { fontSize: 23, color: colors.charcoal }]}>   {text}</Text>
        </TouchableOpacity>
    )
}

const boxStyles = StyleSheet.create({
    main: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginHorizontal: 4,
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    }
})






//__menu page
const Menu = ({ route, navigation }) => {
    const { setUser, user } = React.useContext(UserContext)
    const logOutClicked = () => {
        Alert.alert(
            "Logout",
            "You will be needed to sign in again.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: () => {
                        console.log("Logging Out")
                        logOut()
                        setUser(false)
                    }
                },
            ]
        );
    }
    const profileClicked = () => {
        navigation.navigate("Profile")
    }
    const MyCasesClicked = () => {
        navigation.navigate("Mycases")
    }
    const aboutClicked = () => {
        navigation.navigate("About")
    }
    return (
        <View style={styles.main}>
            <View style={styles.menuTextContainer}>
                <Text style={textStyles.heading}>MENU</Text>
            </View>
            <View style={{ flex: 0.8, paddingTop: 10 }}>
                <Box text={user.name} iconName="person-outline" bg={"darkgreen"} onClick={profileClicked} />
                <Box text="My Cases" iconName={"document-outline"} bg={colors.fushia} onClick={MyCasesClicked} />
                <Box text="About" iconName={"information-circle-outline"} bg={colors.tan} onClick={aboutClicked} />
                <Box text="Log Out" iconName={"log-out-outline"} onClick={logOutClicked} />
            </View>
            <View style={styles.logoContainer}>
                <Text style={{ color: "grey" }}>From </Text>
                <Logo />
            </View>
        </View>
    )
}





const styles = StyleSheet.create({
    main: {
        backgroundColor: "snow",
        flex: 1,
    },
    logoContainer: {
        flex: 0.2,
        alignItems: "center"
    },
    menuTextContainer: {
        alignItems: "center",
        flex: 0.16,
        justifyContent:"center",
        borderBottomWidth: 1,
        borderColor:colors.charcoal,
    }
})



const Stack = createStackNavigator();

function MenuStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Menu} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Mycases" component={MyCases} />
            <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
    );
}




export default MenuStack;

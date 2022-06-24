import React from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, Alert } from "react-native"
import Logo from '../../../comp/Logo';
import textStyles from '../../../styles/text';

import Ionicon from 'react-native-vector-icons/Ionicons';
import colors from '../../../static/colors';
import fonts from '../../../static/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';





const Select = ({ values, selected = values[0], onChange }) => {

    return (

        <View style={{ borderColor: "darkgrey", borderWidth: 1 }}>
            <Picker style={{ backgroundColor: "white" }} selectedValue={selected} onValueChange={onChange}>
                {
                    values.map(value => <Picker.Item key={value} label={value} value={value} />)
                }
            </Picker>
        </View>
    )
}







const FormInput = ({ value, onInput, status, type }) => {
    //status will be used for warning and stuff
    const style = {
        width: "100%",
        fontFamily: fonts.text,
        borderWidth: 1,
        borderColor: "darkgrey",
        fontSize: 17,
        paddingVertical: 9,
        paddingHorizontal: 16,
        backgroundColor: "white"
    }
    const focusedStyle = {
        borderColor: colors.purple
    }
    const [isFocused, setIsFocused] = React.useState(false)
    return <TextInput style={[style, isFocused && focusedStyle]} value={value} onChangeText={onInput} onFocus={() => setIsFocused(true)} onBlur={() => { setIsFocused(false) }} keyboardType={type} />

}














const FormElement = ({ text, element }) => {
    //if element is present use it else input component
    return (
        <View style={formElementStyles.main}>
            <View>
                <Text style={[textStyles.simpleBold, formElementStyles.text]}>{text}</Text>
            </View>
            <View>
                {<>
                    {element}
                </>
                }
            </View>
        </View>
    )
}

const formElementStyles = StyleSheet.create({
    main: {
        width: "90%",
        marginBottom: 20,
        flex: 1,
    },
    text: {
        color: colors.charcoal,
        marginBottom: 2
    },
})




const LostDetails = ({route,navigation}) => {
    const [name, setName] = React.useState("")
    const [age, setAge] = React.useState("")
    const [gender, setGender] = React.useState("Male")
    const [location, setLocation] = React.useState("")

    const handleGenderChange = (value) => {
        setGender(value)
    }
    const handleNext=()=>{
        //basic validation checks and sending the attributes to the next screen
        if(name=="" || age=="" || location==""){
            Alert.alert("Form is Incomplete","Kindly fill the form completely!")
        }else{
            console.log("Navigating to next page")
            navigation.navigate("LostPhotos",{data:{name,age,gender,location}})
        }
    }
    return (
        <ScrollView>
            <View style={styles.main}>
                <View style={styles.headingSection}>
                    <Logo title='Lost Form' />
                    <Text style={[textStyles.simple, { marginTop: 7 }]}>Fill details below to find your lost one
                        <Ionicon name='arrow-down' size={16} />
                    </Text>
                </View>
                <View style={styles.form}>
                    <FormElement text={"Lost Location"} element={<FormInput value={location} onInput={setLocation} />} />
                    <FormElement text={"Name"} element={<FormInput value={name} onInput={setName} />} />
                    <FormElement text={"Age"} element={<FormInput value={age} onInput={setAge} type={"numeric"} />} />
                    <FormElement text={"Gender"} element={<Select values={["Male", "Female"]} selected={gender} onChange={handleGenderChange} />} />
                </View>
                <View>
                    <TouchableOpacity onPress={handleNext} style={styles.next}>
                        <Text style={[textStyles.simple, { fontFamily: fonts.textBold, color: "white", fontSize: 30 }]}>Next</Text>
                        <Ionicon name='arrow-forward' size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white"
    },
    headingSection: {
        alignItems: "center",
        paddingVertical: 17,
        borderBottomWidth: 1,
        borderBottomColor: colors.charcoal,
    },
    form: {
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "whitesmoke"
    },
    next: {
        borderColor: colors.purple,
        flexDirection: "row",
        backgroundColor: colors.purple,
        borderWidth: 2,
        alignItems: "center",
        marginTop: 40,
        justifyContent:"center"
    }
})




export default LostDetails;

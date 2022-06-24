import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import colors from '../../../static/colors';
import textStyles from '../../../styles/text';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import Loading from '../../../comp/Loading';
import { FoundConfirm, PostFoundCase } from '../../../services/case.service';
import fonts from '../../../static/fonts';
const width = Dimensions.get("screen").width



const FoundResult = ({ navigation, route }) => {
    const [cases, setCases] = React.useState(null)//null means loading
    const [caseNo, setCaseNo] = React.useState(0)//no of cases
    const [caseId, setCaseId] = React.useState(null)
    let { images, data } = route.params
    React.useEffect(() => {
        const init = async () => {
            images = images.map(image => image.base64)
            const response = await PostFoundCase({ images, data })
            if (response.error) {
                return setCases(404)
            }
            console.log("data", response.length)
            setCaseId(response._id)
            setCases(response.cases)
        }
        init()
    }, [])
    const caseUpdate = (newValue) => {
        const ncaseNo = caseNo + newValue
        if (ncaseNo < 0) {
            setCaseNo(cases.length - 1)
        }
        if (ncaseNo < cases.length) {
            setCaseNo(ncaseNo)
        }
    }
    const foundConfirm = () => {
        console.log(cases[caseNo].casedata)
        Alert.alert("Confirm Found?", "If this is true, We will send the guardian an email. You will be contacted shortly! Thanks for reporting🙂", [
            {
                text: "No",
                onPress: () => {
                    console.log("cancel pressed")
                }
            },
            {
                text: "Found!",
                onPress: () => {
                    FoundConfirm(cases[caseNo].casedata._id)
                    navigation.goBack()
                }
            }
        ])
    }
    if (cases == 404) {
        return <View style={{ paddingHorizontal: 30, alignItems: "center", flex: 1, justifyContent: "center" }}>
            <Text style={{ color: "purple", fontFamily: fonts.textBold, fontSize: 20 }}>Sorry!</Text>

            <Text style={{ fontFamily: fonts.text, color: "black" }}>Thanks for reporting!!!
                No previous case has been registered but we have saved this case for the future!
            </Text>
        </View>
    }
    if (cases == null) {
        return <Loading />
    }
    return (
        <View style={styles.main}>
            <View style={styles.heading}>
                <Text style={[textStyles.simpleBold, { color: colors.cream }]}>
                    Matching Cases: {cases.length}
                </Text>
            </View>
            <View style={styles.result}>
                <View style={styles.caseCover}>
                    <TouchableOpacity onPress={() => caseUpdate(-1)}>
                        <Text style={styles.casetxt}>Prev</Text>
                    </TouchableOpacity>
                    <Text style={styles.caseHeading}>Case No: {caseNo + 1}</Text>
                    <TouchableOpacity onPress={() => caseUpdate(1)}>
                        <Text style={styles.casetxt}>Next</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.resultImg}>
                    <Image source={{ uri: "data:image/png;base64," + cases[caseNo].img }} style={{ width: 300, height: 300 }} />
                </View>
                <View>
                    <Text style={styles.casetxt}>Name:
                        <Text style={{ color: "black", fontFamily: fonts.text, fontSize: 20, textDecorationLine: "underline" }}>
                            {cases[caseNo].casedata.name}
                        </Text>
                    </Text>
                    <Text style={styles.casetxt}>Posted By: <Text style={{ color: "black", fontFamily: fonts.text, fontSize: 20, textDecorationLine: "underline" }}>
                        {cases[caseNo].casedata.postedBy}
                    </Text></Text>
                </View>
                <View>
                    <TouchableOpacity onPress={foundConfirm}>
                        <Text style={styles.confirmButton}>Thats Him/ Her?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "snow"
    },
    heading: {
        backgroundColor: colors.purple,
        padding: 10
    },
    txt: {
        color: colors.purple,
        fontFamily: fonts.textBold,
        fontSize: 20
    },
    casetxt: {
        color: colors.purple,
        fontFamily: fonts.textBold,
        fontSize: 20
    },
    resultImg: {
        alignItems: "center"
    },
    result: {
        paddingVertical: 5,
    },
    caseHeading: {
        color: colors.charcoal,
        fontFamily: fonts.textBold,
        fontSize: 20
    },
    caseCover: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10
    },
    confirmButton:{
        backgroundColor:"darkorange",
        fontSize:20,
        fontFamily:fonts.heading,
        color:"darkred",
        alignSelf:"center",
        borderWidth:1,
        borderColor:"black",
        padding:3,
        marginVertical:5,
    }
})

export default FoundResult;

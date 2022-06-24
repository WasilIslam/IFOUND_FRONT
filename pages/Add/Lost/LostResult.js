import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import colors from '../../../static/colors';
import textStyles from '../../../styles/text';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import Loading from '../../../comp/Loading';
import { PostLostCase, PostPremium } from '../../../services/case.service';
import fonts from '../../../static/fonts';
const width = Dimensions.get("screen").width



const FoundResult = ({ navigation, route }) => {
    const [cases, setCases] = React.useState(null)//null means loading
    const [caseId,setCaseId]=React.useState(null)
    let [caseNo, setCaseNo] = React.useState(0)//no of cases
    let { images, data } = route.params
    React.useEffect(() => {
        const init = async () => {
            images = images.map(image => image.base64)
            const response = await PostLostCase({ images, data })
            if (response.error) {
                setCaseId(response._id)
                return setCases(404)
            }
            setCases(response)
        }
        init()
    }, [])
    const postAd = () => {
        PostPremium(caseId)
        navigation.goBack()
    }
    const caseUpdate = (newValue) => {
        caseNo = caseNo + newValue
        if (caseNo < 0) {
            setCaseNo(cases.length - 1)
        }
        if (caseNo < cases.length) {
            setCaseNo(caseNo)
        }
    }
    if (cases == 404) {
        return <View style={{ paddingHorizontal: 30, alignItems: "center", flex: 1, justifyContent: "center" }}>
            <Text style={{ color: "purple", fontFamily: fonts.textBold, fontSize: 20 }}>Sorry!</Text>

            <Text style={{ fontFamily: fonts.text, color: "black" }}>No previous case has been registered but we have saved this case for the future!
            </Text>
            <TouchableOpacity style={{alignSelf:"flex-end"}} onPress={postAd}>
                <Text style={{ color: "red", fontFamily: fonts.heading,textDecorationLine:"underline" }}>Post Ad!</Text>
            </TouchableOpacity>
        </View>
    }
    if (cases == null) {
        return <Loading />
    }
    return (
        <View style={styles.main}>
            <View style={styles.heading}>
                <Text style={[textStyles.heading, { color: colors.cream }]}>
                    Results
                </Text>
            </View>
            <View style={styles.result}>
                <View style={styles.caseCover}>
                    <TouchableOpacity onPress={() => caseUpdate(-1)}>
                        <Text>Prev</Text>
                    </TouchableOpacity>
                    <Text style={styles.caseHeading}>Case No: {caseNo + 1}</Text>
                    <TouchableOpacity onPress={() => caseUpdate(1)}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.resultImg}>
                    <Image source={{ uri: "data:image/png;base64," + cases[caseNo].img }} style={{ width: 300, height: 300 }} />
                </View>
                <View>
                    <Text style={styles.txt}>{cases[caseNo].casedata.name}</Text>
                    <Text style={[styles.txt, { fontSize: 20 }]}>Posted By: <Text style={{ color: "black", fontFamily: fonts.text, fontSize: 20, textDecorationLine: "underline" }}>
                        {cases[caseNo].casedata.postedBy}
                    </Text></Text>
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
        fontSize: 30
    },
    resultImg: {
        alignItems: "center"
    },
    result: {
        paddingVertical: 30,
        paddingHorizontal: 10
    },
    caseHeading: {
        color: colors.charcoal,
        fontFamily: fonts.textBold,
        fontSize: 20
    },
    caseCover: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 10
    }
})

export default FoundResult;

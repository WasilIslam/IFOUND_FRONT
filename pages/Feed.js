import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Logo from '../comp/Logo';
import { GetPremiumCases } from '../services/case.service';
import colors from '../static/colors';
import fonts from '../static/fonts';
import Ionicon from "react-native-vector-icons/Ionicons"


const CasePost = ({ data }) => {

    return <View style={{ width: 300, borderWidth: 1, borderColor: "darkgrey", backgroundColor: "white", marginVertical: 20 }}>
        <View style={{ paddingVertical: 10, paddingLeft: 10 }}>
            <View >
                <Text style={{ color: "black", fontFamily: fonts.text, fontSize: 18 }}>{data.txt}</Text>
            </View>
        </View>
        <View style={{ alignItems: "center" }}>
            <Image source={{ uri: "data:image/png;base64," + data.img }} style={{ width: 295, height: 295 }} />
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 8 }}>
            <Text style={{ color: "black", fontFamily: fonts.text, fontSize: 17 }}>  <Ionicon name='call' size={20} color={colors.purple}/> {data.postedBy}</Text>
        </View>
    </View>
}

const Feed = () => {
    const [premiumCases, setPremiumCases] = React.useState([])
    React.useEffect(() => {
        const init = async () => {
            const response = await GetPremiumCases()//simple images
            setPremiumCases(
                response
            )
        }
        init()
    }, [])
    return (
        <View style={{ backgroundColor: "whitesmoke", flex: 1 }}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: colors.purple }}>
                <Logo color='white' />
            </View>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    {premiumCases.map((caseData, i) => <CasePost key={i + "case"} data={caseData}></CasePost>)}
                </View>
            </ScrollView>
        </View>
    )
}

export default Feed;

import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GetMyCases, ResolveCase } from '../../services/case.service';
import colors from '../../static/colors';
import fonts from '../../static/fonts';
import textStyles from '../../styles/text';

const CasePost = ({ data,type }) => {
    const [showMe,setShowMe]=React.useState(1)
    const resolveCase = () => {
        Alert.alert("Resolve Case", "Press Ok if the case has been resolved!", [
            {
                text: "Cancel",
                onPress: () => {
                },
                style: "cancel"
            },
            {
                text: "OK",
                onPress: async() => {
                    await ResolveCase(data._id,type)
                    setShowMe(0)
                },
                style: "default"
            }
        ])
    }
    if(!showMe){
        return <View></View>
    }
    return <View style={{ padding: 4, margin: 20, borderWidth: 2, borderColor: "darkblue", backgroundColor: "white" }}>
        <View >
            <Text style={{ color: colors.charcoal, fontFamily: fonts.textBold, fontSize: 20, paddingVertical: 10, alignSelf: "center" }}>{data.name} {type}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
            <Image source={{ uri: "data:image/png;base64," + data.img }} style={{ width: 270, height: 270 }} />
        </View>
        <View>
            <TouchableOpacity onPress={resolveCase}>
            <Text style={{ alignSelf: "flex-end", margin: 4, padding: 5, color: "white", backgroundColor: "darkblue", fontFamily: fonts.textBold, fontSize: 20 }}>Resolved?</Text>
            </TouchableOpacity>
        </View>
    </View>
}


const MyCases = () => {
    const [lostCases, setLostCases] = React.useState([])
    const [foundCases, setFoundCases] = React.useState([])
    React.useEffect(() => {
        const init = async () => {
            const { lost, found } = await GetMyCases()
            console.log(lost, found)
            setLostCases(lost)
            setFoundCases(found)
        }
        init()
    }, [])

    return (
        <View style={styles.main}>
            <View>
                <Text style={[textStyles.simpleBold, { color: colors.purple, alignSelf: "center", paddingVertical: 10,fontSize:25 }]}>My Cases</Text>
            </View>
            <ScrollView>
                <View>
                    {
                        lostCases.map((lost, i) => <CasePost data={lost} key={i + "lost"} type="lost"/>)
                    }
                </View>
                <View>
                    {
                        foundCases.map((lost, i) => <CasePost data={lost} key={i + "lost"} type="found"/>)
                    }
                </View>

            </ScrollView>
        </View>
    )
}




const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 10
    }
})

export default MyCases;

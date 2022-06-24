import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import colors from '../../../static/colors';
import textStyles from '../../../styles/text';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from "react-native-image-picker"
import { Dimensions } from 'react-native';
import fonts from '../../../static/fonts';
const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height




const LostPhotos = ({ navigation, route }) => {
    const [images, setImages] = React.useState([])
    const handleAdd = async () => {
        const { assets } = await launchImageLibrary({ selectionLimit: 0,includeBase64:true })
        setImages([...images, ...assets])
    }
    React.useEffect(() => {
        console.log(images)
    }, [images])
    const handleNext = () => {
        console.log("Navigating to next screen")
        navigation.navigate("LostResult",{images,data:route.params.data})
    }
    return (
        <View style={styles.main}>
            <View style={styles.heading}>
                <Text style={[textStyles.heading, { color: colors.cream }]}>
                    Photos
                </Text>
                <Text style={[textStyles.simple, { color: "white" }]}>
                    Add some pictures with face showing clearly
                </Text>
            </View>
            <ScrollView>
                <View style={styles.imagesView}>
                    {
                        images.map(({ uri }, index) => <Image key={uri + index} style={styles.imageBox} source={{ uri }}></Image>)
                    }
                    <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
                        <Ionicon name='add-outline' size={50} color={colors.purple} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View>
                {
                    images.length != 0 ?
                        <View>
                            <TouchableOpacity onPress={handleNext} style={styles.next}>
                                <Text style={[textStyles.simple, { fontFamily: fonts.textBold, color: "white", fontSize: 30 }]}>Find</Text>
                                <Ionicon name='arrow-forward' size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                        : <View></View>
                }
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
    imagesView: {
        paddingHorizontal: 20,
        paddingVertical: 50,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    imageBox: {
        height: 100,
        width: (screenWidth / 4),
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.purple,
        margin: 4,
    },
    addButton: {
        height: 100,
        width: screenWidth / 4,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.purple,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        margin: 4,

    },
    next: {
        borderColor: colors.purple,
        flexDirection: "row",
        backgroundColor: colors.purple,
        borderWidth: 2,
        alignItems: "center",
        marginTop: 40,
        justifyContent: "center"
    }
})

export default LostPhotos;

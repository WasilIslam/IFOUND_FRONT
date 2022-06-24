import { StyleSheet } from "react-native";
import colors from "../static/colors";
import fonts from "../static/fonts";

const textStyles = StyleSheet.create({
    simple: {
        fontFamily: fonts.text,
        color: colors.charcoal,
        fontSize:15
    },
    simpleBold: {
        fontFamily: fonts.textBold,
        color: colors.charcoal,
        fontSize:18
    },
    heading:{
        fontFamily:fonts.heading,
        color:colors.charcoal,
        fontSize:22
    }
})
export default textStyles
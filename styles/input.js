import { StyleSheet } from "react-native";
import colors from "../static/colors";
import fonts from "../static/fonts";

const inputStyles = StyleSheet.create({
    simple: {
        borderWidth:1,
        borderColor:colors.charcoal,
        fontFamily:fonts.text,
        fontSize:15,
        paddingVertical:3,
        marginVertical:3,
    }
})
export default inputStyles
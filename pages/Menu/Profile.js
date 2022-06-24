import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import UserContext from '../../contexts/user.context';
import textStyles from '../../styles/text';
import ProfilePicture from 'react-native-profile-picture';
import colors from '../../static/colors';
import inputStyles from '../../styles/input';


const DetailBox = ({ title, value, att = {} }) => {
    return <View style={styles.detailBox}>
        <Text style={[textStyles.simpleBold, { flex: 0.2, fontSize: 18 }]}>{title}: </Text>
        <TextInput {...att} style={[inputStyles.simple, { flex: 0.8, borderWidth: 0, borderBottomWidth: 1 }]} value={value} />
    </View>
}

const Profile = () => {
    const { user,setUser } = React.useContext(UserContext);
    React.useEffect(()=>{
        console.log(user)
    },[user])
    return (
        <View style={styles.main}>
            <View style={styles.pfView}>
                <ProfilePicture isPicture={false} user={user.name} width={50} height={50} backgroundColor={colors.charcoal} />
                <View><Text style={textStyles.heading}>{user.name}</Text></View>
            </View>
            <ScrollView style={styles.detailsView}>
                <DetailBox title={"Email"} value={user.email} />
                <DetailBox title={"Phone"} value={user.phone} />
                <DetailBox title={"Extra Info"} value={user.extra} att={{ multiline: true ,onChangeText:(v)=>{setUser({...user,extra:v})} }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "snow"
    },
    pfView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 0.4
    },
    detailsView: {
        flex: 0.6,
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    detailBox: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        paddingVertical: 8
    }
})
export default Profile;

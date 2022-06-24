import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../static/colors';
import textStyles from '../../styles/text';
const About = () => {
    return (
        <View style={styles.main}>
            <View>
                <Text style={[textStyles.heading, { color: colors.purple, alignSelf: "center", paddingVertical: 20 }]}>About</Text>
            </View>
            <ScrollView>
                <Text style={[textStyles.simple, { fontSize: 20 }]}>
                    {`
I.found is an Artificially Intelligent Person Finder App. If someone gets lost their loved ones are required to put information regarding that person plus some images which will be required for matching.
Face Recognition from Python tensor flow is used in this app which returns the results in seconds. Furthermore, more attributes like height color and place of found are used to filter out the results more.
New feature coming soon: FEED. People will help each other find their precious items and lost ones.
                    `}
                </Text>
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

export default About;

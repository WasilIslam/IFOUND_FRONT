import { createStackNavigator } from "@react-navigation/stack";
import LostDetails from "./Lost/LostDetails";
import LostPhotos from "./Lost/LostPhotos";
import React from "react";
import LostResult from "./Lost/LostResult";
const Stack = createStackNavigator();

function LostStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LostDetails" component={LostDetails} />
            <Stack.Screen name="LostPhotos" component={LostPhotos} />
            <Stack.Screen name="LostResult" component={LostResult} />
        </Stack.Navigator>
    );
}




export default LostStack;

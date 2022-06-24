import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import FoundDetails from "./Found/FoundDetails";
import FoundResult from "./Found/FoundResult";
import FoundPhotos from "./Found/FoundPhotos";
const Stack = createStackNavigator();

function FoundStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FoundDetails" component={FoundDetails} />
            <Stack.Screen name="FoundPhotos" component={FoundPhotos} />
            <Stack.Screen name="FoundResult" component={FoundResult} />
        </Stack.Navigator>
    );
}




export default FoundStack;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DropDown from "./screens/HomeScreen";
import AboutCityScreen from "./screens/AboutCityScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={DropDown} />
        <Stack.Screen name="AboutCity" component={AboutCityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

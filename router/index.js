import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScanBarcode from "../screens/ScanBarcode";
import BarcodeList from "../screens/BarcodeList";
import CustomTab from "./CustomTab";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabList = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTab {...props} />}
    >
      <Tab.Screen name="Scan Barcode" component={ScanBarcode} />
      <Tab.Screen name="Barcode List" component={BarcodeList} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabList" component={TabList} />
    </Stack.Navigator>
  );
};

export default Router;

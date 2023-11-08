import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScanBarcode from "./App";
import BarcodeList from "./BarcodeList";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Barcode" component={ScanBarcode} />
      <Tab.Screen name="Screen2" component={BarcodeList} />
    </Tab.Navigator>
  );
}

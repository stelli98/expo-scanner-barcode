import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import IconList from "../../assets/icons/IconList";
import IconListActive from "../../assets/icons/IconListActive";
import IconScan from "../../assets/icons/IconScan";
import IconScanActive from "../../assets/icons/IconScanActive";

const TabItem = ({ isFocused, onPress, onLongPress, label }) => {
  const Icon = () => {
    if (label === "Scan Barcode") {
      return isFocused ? <IconScanActive /> : <IconScan />;
    } else if (label === "Barcode List") {
      return isFocused ? <IconListActive /> : <IconList />;
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
    >
      <Icon />
      <Text
        style={{
          color: isFocused ? "#9775C5" : "#000",
          fontSize: 10,
          paddingTop: 5,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default TabItem;

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Image } from "react-native";
import axios from "axios";

const ScanBarcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const baseUrl = "https://playdays-app-be.vercel.app/api/v1";

  useEffect(() => {
    (async () => {
      const data = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(data.status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    axios({
      method: "get",
      url: `${baseUrl}/barcodes?barcodeId=${data}`,
    })
      .then((response) => {
        if (!!response.data[0].barcode) {
          alert(
            `Barcode ${data} berhasil discan. Selamat Bermain sampai dengan ${response.data[0].expired_at} !`
          );
        } else {
          alert(`Barcode ${data} tidak ditemukan!`);
        }
      })
      .catch((error) => {
        alert(`Barcode ${data} tidak ditemukan!`);
      });
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[styles.camera, styles.absoluteFillObject]}
        />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/playdays.png")} />
      {renderCamera()}
      <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
        <Text style={styles.buttonText}>Scan Barcode</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
  },
  cameraContainer: {
    width: "80%",
    aspectRatio: 0.55,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 10,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "#9775C5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  rectangle: {
    height: 200,
    width: 300,
    borderWidth: 2,
    backgroundColor: "transparent",
  },
});

export default ScanBarcode;

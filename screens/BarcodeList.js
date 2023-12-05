import React, { useState, useEffect } from "react";

export default function BarcodeList() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {`Daftar Barcode (${new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })})`}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 50,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

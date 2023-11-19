import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import axios from "axios";

const Item = ({ item, index }) => {
  return (
    <View style={styles.item}>
      <Text>{`${index + 1}. ${item.barcode} - ${
        item.created_at.split(" ")[1]
      } - ${item.expired_at.split(" ")[1]}`}</Text>
    </View>
  );
};
export default function BarcodeList() {
  const baseUrl = "https://playdays-app-be.vercel.app/api/v1";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
    axios({
      method: "get",
      url: `${baseUrl}/barcodes`,
    }).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {`Daftar Barcode (${new Date().toLocaleDateString("id-ID")})`}{" "}
      </Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        renderItem={Item}
        keyExtractor={(item) => item.barcode}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 30,
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    justifyContent: "flex-start",
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 1,
    flexDirection: "row",
  },
});

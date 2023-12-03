import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const HeaderItem = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={[styles.cols1, { backgroundColor: "#9775C5" }]}>
        <Text style={styles.headerCols}>No.</Text>
      </View>
      <View style={[styles.cols2, { backgroundColor: "#9775C5" }]}>
        <Text style={styles.headerCols}>Barcode</Text>
      </View>
      <View style={[styles.cols3, { backgroundColor: "#9775C5" }]}>
        <Text style={styles.headerCols}>Jam Masuk</Text>
      </View>
      <View style={[styles.cols4, { backgroundColor: "#9775C5" }]}>
        <Text style={styles.headerCols}>Jam Keluar</Text>
      </View>
    </View>
  );
};

const Item = ({ item, index }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={[
          styles.cols1,
          { backgroundColor: `${index % 2 ? "" : "#f8f2ff"}` },
        ]}
      >
        <Text style={styles.tableCols}>{index + 1}</Text>
      </View>
      <View
        style={[
          styles.cols2,
          { backgroundColor: `${index % 2 ? "" : "#f8f2ff"}` },
        ]}
      >
        <Text style={styles.tableCols}>{item.barcode}</Text>
      </View>
      <View
        style={[
          styles.cols3,
          { backgroundColor: `${index % 2 ? "" : "#f8f2ff"}` },
        ]}
      >
        <Text style={styles.tableCols}>{item.created_at.split(" ")[1]}</Text>
      </View>
      <View
        style={[
          styles.cols4,
          { backgroundColor: `${index % 2 ? "" : "#f8f2ff"}` },
        ]}
      >
        <Text style={styles.tableCols}>{item.expired_at.split(" ")[1]}</Text>
      </View>
    </View>
  );
};

const ListItem = () => {
  const baseUrl = "https://playdays-app-be.vercel.app/api/v1";

  const date = new Date();
  const tempStartTime = new Date(date.setHours(0, 0, 0, 0));
  const tempEndTime = new Date(date.setHours(23, 59, 59, 0));
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState(tempStartTime);
  const [selectedEndTime, setSelectedEndTime] = useState(tempEndTime);

  const [isStartTimeVisible, setIsStartTimeVisible] = useState(false);
  const [isEndTimeVisible, setIsEndTimeVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async ({ params = {} }) => {
    setLoading(true);
    axios({
      method: "get",
      url: `${baseUrl}/barcodes`,
      params: params,
    }).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData({ params: {} });
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData({ params: {} });
  }, []);

  return (
    <View
      style={{
        margin: 5,
        padding: 10,
      }}
    >
      <Text>Pencarian berdasarkan Barcode: </Text>
      <TextInput
        value={search}
        onChangeText={(search) => {
          setSearch(search);
        }}
        placeholderTextColor="#A0A0A0"
        placeholder="cth: 8992870712035"
        style={styles.input}
      />
      <Text>Filter Jam Keluar</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Pressable
          style={styles.filterButton}
          onPress={() => setIsStartTimeVisible(true)}
        >
          <Text style={styles.filterButtonText}>
            {!selectedStartTime
              ? "hh:mm"
              : selectedStartTime
                  .toLocaleString("id-ID")
                  .split(" ")[1]
                  .replace(".", ":")
                  .split(".")[0]}
          </Text>
        </Pressable>
        <Text style={styles.seperator}> Sampai </Text>
        <Pressable
          style={styles.filterButton}
          onPress={() => setIsEndTimeVisible(true)}
        >
          <Text style={styles.filterButtonText}>
            {!selectedStartTime
              ? "hh:mm"
              : selectedEndTime
                  .toLocaleString("id-ID")
                  .split(" ")[1]
                  .replace(".", ":")
                  .split(".")[0]}
          </Text>
        </Pressable>
      </View>
      {isStartTimeVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedStartTime}
          mode={"time"}
          is24Hour={true}
          onChange={(value) => {
            setSelectedStartTime(new Date(value.nativeEvent.timestamp));
            setIsStartTimeVisible(false);
          }}
        />
      )}
      {isEndTimeVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedEndTime}
          mode={"time"}
          is24Hour={true}
          onChange={(value) => {
            setSelectedEndTime(new Date(value.nativeEvent.timestamp));
            setIsEndTimeVisible(false);
          }}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          flexWrap: "wrap",
        }}
      >
        <Pressable
          style={styles.submitButton}
          onPress={() =>
            fetchData({
              params: {
                barcodeId: search,
                expiryStartTime: new Date(Number(selectedStartTime)).getTime(),
                expiryEndTime: new Date(Number(selectedEndTime)).getTime(),
              },
            })
          }
        >
          <Text style={styles.submitButtonText}>Cari</Text>
        </Pressable>

        <Pressable
          style={styles.resetButton}
          onPress={() => {
            setSelectedStartTime(tempStartTime);
            setSelectedEndTime(tempEndTime);
            setSearch("");
            fetchData({ params: {} });
          }}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </Pressable>
      </View>
      {loading && <ActivityIndicator size="large" color="#9775C5" />}
      {!loading && !data.length && (
        <Text style={styles.tableCols}>Tidak ditemukan data sesuai filter</Text>
      )}
      {!loading && data.length > 0 && (
        <View
          style={{
            marginTop: 10,
          }}
        >
          <HeaderItem />
          <FlatList
            contentContainerStyle={styles.list}
            data={data}
            renderItem={Item}
            keyExtractor={(item, index) => `${item.barcode}-${index + 1}`}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        </View>
      )}
    </View>
  );
};

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
      <ListItem />
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
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterButtonText: {
    fontSize: 16,
    color: "#333",
  },
  seperator: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  headerCols: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    padding: 5,
  },
  cols1: {
    width: "10%",
  },
  cols2: {
    width: "40%",
  },
  cols3: {
    width: "25%",
  },
  cols4: {
    width: "25%",
  },
  tableCols: { fontSize: 16, textAlign: "center", padding: 5 },
  input: {
    height: 40,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  submitButton: {
    width: "47%",
    backgroundColor: "#9775C5",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  resetButton: {
    width: "47%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  submitButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resetButtonText: {
    borderColor: "#9775C5",
    textAlign: "center",
    color: "#9775C5",
    fontSize: 16,
    fontWeight: "bold",
  },
});

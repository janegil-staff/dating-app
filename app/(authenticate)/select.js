import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "expo-router";

const select = () => {
  const router = useRouter();
  const [option, setOption] = useState("");
  const [userId, setUserId] = useState("");

  const [year, setYear] = useState("2007");
  const [month, setMonth] = useState("08");
  const [day, setDay] = useState("02");

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  const updateGenderAndBirthdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8001/api/users/${userId}/gender`,
        {
          gender: option,
          year,
          month,
          day,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        router.replace("/bio");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const formatDate = () => {
    if (year && month && day) {
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return "No date selected";
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212", padding: 12 }}>
      <Text style={styles.title}>Select Gender</Text>
      <Pressable
        onPress={() => setOption("male")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "male" ? "#D0D0D0" : "transparent",
          borderWidth: option == "male" ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>I am a Man</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/12442/12442425.png",
          }}
        />
      </Pressable>

      <Pressable
        onPress={() => setOption("female")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "female" ? "#D0D0D0" : "transparent",
          borderWidth: option == "female" ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>I am a Woman</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/9844/9844179.png",
          }}
        />
      </Pressable>

      <Pressable
        onPress={() => setOption("nonbinary")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "nonbinary" ? "#D0D0D0" : "transparent",
          borderWidth: option == "nonbinary" ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>I am Non-Binary</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/12442/12442425.png",
          }}
        />
      </Pressable>

      <Text style={styles.title}>Select a Birthdate</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="YYYY"
          placeholderTextColor="#777"
          keyboardType="numeric"
          maxLength={4}
          value={year}
          onChangeText={setYear}
        />
        <TextInput
          style={styles.input}
          placeholder="MM"
          placeholderTextColor="#777"
          keyboardType="numeric"
          maxLength={2}
          value={month}
          onChangeText={setMonth}
        />
        <TextInput
          style={styles.input}
          placeholder="DD"
          placeholderTextColor="#777"
          keyboardType="numeric"
          maxLength={2}
          value={day}
          onChangeText={setDay}
        />
      </View>
      <Text style={styles.preview}>{formatDate()}</Text>

      {option && (
        <Pressable
          onPress={updateGenderAndBirthdate}
          style={{
            marginTop: 25,
            backgroundColor: "black",
            padding: 12,
            borderRadius: 4,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "600" }}
          >
            Done
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default select;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginTop: 30,

    fontWeight: "600",
  },
  inputRow: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    width: 90,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: "#00f0ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  preview: {
    marginTop: 30,
    color: "#bbb",
    fontSize: 18,
    fontStyle: "italic",
  },
});

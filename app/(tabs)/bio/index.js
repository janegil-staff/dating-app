import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";

import axios from "axios";

import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BioHeader from "../../components/bio/bioHeader";
import BioMenu from "../../components/bio/bioMenu";
import BioDescription from "../../components/bio/bioDescription";
import BioImages from "../../components/bio/bioImages";
import BioTurnOns from "../../components/bio/bioTurnOns";
import { useRouter } from "expo-router";
import BioLoogingFor from "../../components/bio/bioLoogingFor";

const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth - 100) / 3; // 3 columns with 16px padding

const index = () => {
  const [userId, setUserId] = useState("");
  const [option, setOption] = useState("AD");
  const router = useRouter();
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("auth");

    if (typeof token === "string" && token.trim() !== "") {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId;

      if (userId) {
        setUserId(userId);
      } else {
        console.warn("⚠️ Token decoded but no userId found:", decodedToken);
      }
    } else {
      console.warn("⚠️ Invalid or missing token:", token);
    }
  };

  useEffect(() => {
    fetchUser();
    console.log(userId);
  }, []);

  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/users/${userId}`
      );
      const user = response.data.user;
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log("Error fetching user description", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("auth");
    router.replace("/login");
  };
  return (
    <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Text style={styles.logoutText}>✕</Text>
        </TouchableOpacity>
      </View>
      <BioHeader user={user} />

      <BioMenu option={option} setOption={setOption} />

      <BioDescription option={option} userId={userId} />
      {option == "Photos" && (
        <BioImages user={user} setUser={setUser} userId={userId} />
      )}

      <BioTurnOns setOption={setOption} option={option} userId={userId}/>

      <BioLoogingFor option={option} userId={userId}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 20,
    paddingRight: 20,
    backgroundColor: "#121212",
  },
  logout: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ff4d4d",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  logoutText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default index;

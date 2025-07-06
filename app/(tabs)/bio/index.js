import {
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";

import axios from "axios";

import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BioHeader from "../../components/bio/bioHeader";
import BioMenu from "../../components/bio/bioMenu";
import BioDescription from "../../components/bio/bioDescription";
import BioImages from "../../components/bio/bioImages";

const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth - 100) / 3; // 3 columns with 16px padding

const index = () => {
  const [userId, setUserId] = useState("");
  const [option, setOption] = useState("AD");

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/users/${userId}`
      );
      const user = response.data.user;
      setUser(user);
    } catch (error) {
      console.log("Error fetching user description", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);
 
  return (
    <ScrollView>
      <BioHeader user={user} />

      <BioMenu option={option} setOption={setOption} />

      <BioDescription option={option} userId={userId} />
      {option == "Photos" && (
        <BioImages user={user} setUser={setUser} userId={userId} />
      )}
    </ScrollView>
  );
};

export default index;

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Alert,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
//import Carousel from "react-native-snap-carousel";
import axios from "axios";
//import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { getAgeFromDate } from "../../utils/date.util";
import alert from "../../utils/alert.util";
import Images from "../../controllers/images";

const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth - 100) / 3; // 3 columns with 16px padding

const index = () => {
  const [userId, setUserId] = useState("");

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

  let displayImages = [];
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
      <View>
        <Image
          style={{ width: "100%", height: 200, resizeMode: "cover" }}
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/018/977/074/original/animated-backgrounds-with-liquid-motion-graphic-background-cool-moving-animation-for-your-background-free-video.jpg",
          }}
        />
        <View style={{ marginBottom: 36 }}>
          <View>
            <Pressable
              style={{
                padding: 10,
                backgroundColor: "#DDA0DD",
                width: 300,
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                position: "absolute",
                top: -60,
                left: "50%",
                transform: [{ translateX: -150 }],
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  resizeMode: "cover",
                }}
                source={{
                  uri:
                    user.profileImages?.length === 0
                      ? "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
                      : user?.profileImages?.[0],
                }}
              />
              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 6 }}>
                {user.name}
              </Text>
              <Text style={{ marginTop: 4, fontSize: 15 }}>
                {getAgeFromDate(user.birthdate)}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Images  user={user} setUser={setUser} userId={userId}  />

      <View style={{ marginHorizontal: 14 }}>
        {/*.
                 {option == "Looking For" && (
          <>
            <View>
              <FlatList
                columnWrapperStyle={{ justifyContent: "space-between" }}
                numColumns={2}
                data={data}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleOption(item?.name)}
                    style={{
                      backgroundColor: lookingOptions.includes(item?.name)
                        ? "#fd5c63"
                        : "white",
                      padding: 16,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 150,
                      margin: 10,
                      borderRadius: 5,
                      borderColor: "#fd5c63",
                      borderWidth: lookingOptions.includes(item?.name)
                        ? "transparent"
                        : 0.7,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "500",
                        fontSize: 13,
                        color: lookingOptions.includes(item?.name)
                          ? "white"
                          : "black",
                      }}
                    >
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        color: lookingOptions.includes(item?.name)
                          ? "white"
                          : "gray",
                        textAlign: "center",
                        width: 140,
                        marginTop: 10,
                        fontSize: 13,
                      }}
                    >
                      {item?.description}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          </>
        )}
         */}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  uploadButton: {
    backgroundColor: "#121212",
    borderColor: "#2a2a2a",
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  deleteButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 10,
    backgroundColor: "#1e1e1e",
  },
  imageWrapper: {
    position: "relative",
    width: imageSize,
    height: imageSize,
    margin: 4,
  },
  addButton: {
    width: imageSize,
    height: imageSize,
    borderRadius: 10,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    fontSize: 32,
    color: "#888",
  },
});

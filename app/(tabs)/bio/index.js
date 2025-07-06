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

const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth - 100) / 3; // 3 columns with 16px padding

const index = () => {
  const [userId, setUserId] = useState("");

  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
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

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  const uploadImages = async () => {
    if (images.length >= 6) {
      Alert.alert("Limit Reached", "You can only upload up to 6 images.");
      return;
    }
    const uploads = images.map(async (img) => {
      const res = await fetch(
        `http://localhost:8001/api/users/${userId}/upload`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: `data:image/jpeg;base64,${img.base64}`,
          }),
        }
      );
      return res.json();
    });

    const results = await Promise.all(uploads);
    console.log("Uploaded:", results);
    setImages([]);
  };
  const handleDelete = async (uri) => {
    const publicId = getPublicIdFromUrl(uri);

    try {
      await fetch(`http://localhost:8001/api/users/${userId}/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      // Remove from local state
      setUser((prev) => ({
        ...prev,
        profileImages: prev.profileImages.filter((img) => img !== uri),
      }));
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  const getPublicIdFromUrl = (url) => {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    return `dating-app/${filename.split(".")[0]}`; // Adjust folder name if needed
  };
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

      <View style={{ flex: 1, padding: 20, marginTop: 36 }}>
        <Button title="Pick Images" onPress={pickImages} />
        {images?.length > 0 && (
          <>
            <ScrollView horizontal>
              {images.map((img, idx) => (
                <Image
                  key={idx}
                  source={{ uri: img.uri }}
                  style={{ width: 100, height: 100, marginBottom: 150 }}
                />
              ))}
            </ScrollView>
            <Button title="Upload" onPress={uploadImages} />
          </>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          {user.profileImages?.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(uri)}
              >
                <Text style={styles.deleteText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
          {user.profileImages?.length < 6 && (
            <TouchableOpacity style={styles.addButton} onPress={pickImages}>
              <Text style={styles.plus}>＋</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

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

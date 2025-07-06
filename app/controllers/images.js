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
import { getAgeFromDate } from "../utils/date.util";
import alert from "../utils/alert.util";

const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth - 100) / 3; // 3 columns with 16px padding

const Images = ({ user, setUser, userId }) => {
  const [images, setImages] = useState([]);

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
    if (user.profileImages.length + images.length > 6) {
      alert("Limit Reached", "You can only upload up to 6 images.");
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
    setUser((prev) => ({
      ...prev,
      profileImages: [...prev.profileImages, results].slice(0, 6),
    }));
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
    <>
      <View style={{ flex: 1, padding: 20, marginTop: 36 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Pick Images, max 6 images allowed
        </Text>
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
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={uploadImages}
            >
              <Text style={styles.uploadText}>Upload Image</Text>
            </TouchableOpacity>
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
    </>
  );
};

export default Images;

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

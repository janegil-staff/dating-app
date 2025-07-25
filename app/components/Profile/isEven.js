import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProfileImageAndDescription from "./profileImageAndDescription";
import * as Animatable from "react-native-animatable";
import axios from "axios";


const IsEven = ({ item, setProfiles, userId }) => {
  const [liked, setLiked] = useState(false);
  const handleLike = async (selectedUserId) => {
    try {
      setLiked(true);
      await axios.post("http://localhost:8001/api/profiles/send-like", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile._id !== selectedUserId)
        );
        setLiked(false);
      }, 200);
    } catch (error) {
      console.log("error liking", error);
    }
  };
  return (
    <View style={{ padding: 12, backgroundColor: "#F0F8FF" }}>
      <ProfileImageAndDescription item={item} />
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <Entypo name="dots-three-vertical" size={26} color="black" />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Pressable
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="diamond" size={27} color="#DE3163" />
            </Pressable>

            {liked ? (
              <Pressable
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Animatable.View
                  animation="swing"
                  easing={"ease-in-out-circ"}
                  iterationCount={1}
                >
                  <AntDesign name="heart" size={27} color="red" />
                </Animatable.View>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => handleLike(item?._id)}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="hearto" size={27} color="#FF033E" />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <View style={{ marginVertical: 15 }} />
    </View>
  );
};

export default IsEven;

const styles = StyleSheet.create({});

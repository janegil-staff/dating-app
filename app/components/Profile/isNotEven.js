import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import ProfileImageAndDescription from "./profileImageAndDescription";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

const IsNotEven = ({ userId, setProfiles, item }) => {
  const [selected, setSelcted] = useState(false);
  const handleLikeOther = async (selectedUserId) => {
    try {
      setSelcted(true);
      await axios.post("http://localhost:8001/api/profiles/send-like", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile._id !== selectedUserId)
        );
        setSelcted(false);
      }, 200);

      // Handle success: Perform any UI updates or navigate to another screen
    } catch (error) {
      console.error("Error liking user:", error);
      // Handle error scenarios
    }
  };
  return (
    <View style={{ padding: 12, backgroundColor: "#FFFFFF" }}>
      <ProfileImageAndDescription item={item} />
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Entypo name="dots-three-vertical" size={26} color="gray" />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Pressable
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#F0F8FF",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="diamond" size={27} color="#0066b2" />
            </Pressable>

            {selected ? (
              <Pressable
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#6699CC",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Animatable.View
                  animation="swing"
                  easing={"ease-in-out-circ"}
                  iterationCount={1}
                >
                  <AntDesign name="heart" size={27} color="white" />
                </Animatable.View>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => handleLikeOther(item._id)}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#6699CC",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="hearto" size={27} color="white" />
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 15 }} />
    </View>
  );
};

export default IsNotEven;

const styles = StyleSheet.create({});

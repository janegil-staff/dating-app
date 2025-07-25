import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const ProfileImageAndDescription = ({item}) => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 50 }}>
        <View>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>{item?.name}</Text>
          <Text
            style={{
              width: 200,
              marginTop: 15,
              fontSize: 18,
              lineHeight: 24,
              fontFamily: "Optima",
              marginBottom: 8,
            }}
          >
            {item?.description && item.description.length > 160
              ? item.description.substr(0, 160)
              : item?.description || ""}
          </Text>
        </View>

        {item?.profileImages?.slice(0, 1).map((item, index) => (
          <Image
            style={{
              width: 280,
              height: 280,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{ uri: item }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileImageAndDescription;

const styles = StyleSheet.create({});

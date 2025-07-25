import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";

const data = [
  {
    id: "0",
    name: "Casual",
    description: "Let's keep it easy and see where it goes",
  },
  {
    id: "1",
    name: "Long Term",
    description: "How about a one life stand",
  },
  {
    id: "2",
    name: "Virtual",
    description: "Let's have some virtual fun",
  },
  {
    id: "3",
    name: "Open for Anything",
    description: "Let's Vibe and see where it goes",
  },
];
const BioLoogingFor = ({ option, userId }) => {
  const [lookingOptions, setLookingOptions] = useState([]);
  const handleOption = (lookingFor) => {
    if (lookingOptions.includes(lookingFor)) {
      removeLookingFor(lookingFor);
    } else {
      addLookingFor(lookingFor);
    }
  };
  const addLookingFor = async (lookingFor) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/api/users/${userId}/looking-for`,
        {
          lookingFor: lookingFor,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setLookingOptions([...lookingOptions, lookingFor]);
      }
    } catch (error) {
      console.log("Error addding looking for", error);
    }
  };
  const removeLookingFor = async (lookingFor) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/api/users/${userId}/looking-for/remove`,
        {
          lookingFor: lookingFor,
        }
      );

      console.log(response.data); // Log the response for confirmation

      // Handle success or update your app state accordingly
      if (response.status === 200) {
        setLookingOptions(lookingOptions.filter((item) => item !== lookingFor));
      }
    } catch (error) {
      console.error("Error removing looking for:", error);
      // Handle error scenarios
    }
  };
  return (
    <View style={{ marginHorizontal: 14 }}>
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
    </View>
  );
};

export default BioLoogingFor;

const styles = StyleSheet.create({});

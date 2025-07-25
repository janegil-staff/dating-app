import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { Entypo, AntDesign } from "@expo/vector-icons";
const turnons = [
  {
    id: "0",
    name: "Music",
    description: "Pop Rock-Indie pick our sound track",
  },
  {
    id: "10",
    name: "Kissing",
    description:
      " It's a feeling of closeness, where every touch of lips creates a symphony of emotions.",
  },
  {
    id: "1",
    name: "Fantasies",
    description:
      "Fantasies can be deeply personal, encompassing diverse elements such as romance",
  },
  {
    id: "2",
    name: "Nibbling",
    description:
      "playful form of biting or taking small, gentle bites, typically done with the teeth",
  },
  {
    id: "3",
    name: "Desire",
    description: "powerful emotion or attainment of a particular person.",
  },
];
const BioTurnOns = ({ setOption, option, userId }) => {
  const [selectedTurnOns, setSelectedTurnOns] = useState([]);

  const handleToggleTurnOn = (turnOn) => {
    if (selectedTurnOns.includes(turnOn)) {
      removeTurnOn(turnOn);
    } else {
      addTurnOn(turnOn);
    }
  };
  const addTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/api/users/${userId}/turn-ons/add`,
        {
          turnOn: turnOn,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setSelectedTurnOns([...selectedTurnOns, turnOn]);
      }
    } catch (error) {
      console.log("Error adding turn on", error);
    }
  };
  const removeTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/api/users/${userId}/turn-ons/remove`,
        {
          turnOn: turnOn,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setSelectedTurnOns(selectedTurnOns.filter((item) => item !== turnOn));
      }
    } catch (error) {
      console.log("error removing turn on", error);
    }
  };
  return (
    <View style={{ marginHorizontal: 14 }}>
      {option == "Turn-ons" && (
        <View>
          {turnons?.map((item, index) => (
            <Pressable
              onPress={() => handleToggleTurnOn(item?.name)}
              style={{
                backgroundColor: "#FFFDD0",
                padding: 10,
                marginVertical: 10,
              }}
              key={index}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  {item?.name}
                </Text>
                {selectedTurnOns.includes(item?.name) && (
                  <AntDesign name="checkcircle" size={18} color="#17B169" />
                )}
              </View>
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 15,
                  color: "gray",
                  textAlign: "center",
                }}
              >
                {item?.description}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default BioTurnOns;

const styles = StyleSheet.create({});

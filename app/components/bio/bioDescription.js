import axios from "axios";
import { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import alert from "../../utils/alert.util";

const BioDescription = ({ option, userId }) => {
  const [description, setDescription] = useState("");
  const updateUserDescription = async () => {
    try {
      console.log(description);
      const response = await axios.put(
        `http://localhost:8001/api/users/${userId}/description`,
        {
          description: description,
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        alert("Success", "Description updated successfully");
      }
    } catch (error) {
      console.log(error);
      console.log("Error updating the user Description");
    }
  };

  return (
    <View style={{ marginHorizontal: 14, marginVertical: 15 }}>
      {option == "AD" && (
        <View
          style={{
            borderColor: "#202020",
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            height: 300,
          }}
        >
          <TextInput
            value={description}
            multiline={true} // Enables multiline input
            numberOfLines={10}
            onChangeText={(text) => setDescription(text)}
            style={{
              fontFamily: "Helvetica",
              fontSize: description ? 17 : 17,
            }}
            placeholder={"Write your AD for people to like you"}
            //   placeholderTextColor={"black"}
          />
          <Pressable
            onPress={updateUserDescription}
            style={{
              marginTop: "auto",
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              backgroundColor: "black",
              borderRadius: 5,
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Publish in feed
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default BioDescription;

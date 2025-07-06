import { Text, View, Pressable } from "react-native";

const BioMenu = ({ option, setOption }) => {
  return (
    <View
      style={{
        marginTop: 80,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
        justifyContent: "center",
      }}
    >
      <Pressable onPress={() => setOption("AD")}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: option == "AD" ? "black" : "gray",
          }}
        >
          AD
        </Text>
      </Pressable>
      <Pressable onPress={() => setOption("Photos")}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: option == "Photos" ? "black" : "gray",
          }}
        >
          Photos
        </Text>
      </Pressable>
      <Pressable onPress={() => setOption("Turn-ons")}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: option == "Turn-ons" ? "black" : "gray",
          }}
        >
          Turn-ons
        </Text>
      </Pressable>
      <Pressable onPress={() => setOption("Looking For")}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: option == "Looking For" ? "black" : "gray",
          }}
        >
          Looking For
        </Text>
      </Pressable>
    </View>
  );
};

export default BioMenu;

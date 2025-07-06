import { Text, View, Image, Pressable } from "react-native";
import getAgeFromDate from "../../utils/date.util";

const BioHeader = ({ user }) => {
  return (
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
  );
};

export default BioHeader;

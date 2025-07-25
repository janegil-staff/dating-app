import { StyleSheet } from "react-native";

import IsEven from "./Profile/isEven";
import IsNotEven from "./Profile/isNotEven";

const Profile = ({ item, isEven, userId, setProfiles }) => {
  if (isEven) {
    return <IsEven item={item} setProfiles={setProfiles} />;
  } else {
    return <IsNotEven item={item} userId={userId} setProfiles={setProfiles} />;
  }
};

export default Profile;

const styles = StyleSheet.create({});

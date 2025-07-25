const getItem = async (key) => {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  } else {
    return await AsyncStorage.getItem(key);
  }
};

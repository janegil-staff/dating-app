import { Alert, Platform } from "react-native";

const alert = (title, message = "", buttons = [{ text: "OK" }]) => {
  if (Platform.OS === "web") {
    const result = window.confirm(
      [title, message].filter(Boolean).join("\n\n")
    );

    if (result) {
      // Simulate pressing a non-cancel button
      const nonCancel = buttons.find((b) => b.style !== "cancel");
      nonCancel?.onPress?.();
    } else {
      // Simulate pressing cancel
      const cancel = buttons.find((b) => b.style === "cancel");
      cancel?.onPress?.();
    }
  } else {
    Alert.alert(title, message, buttons);
  }
};

export default alert;

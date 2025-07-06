import { Alert, Platform } from "react-native";

const alertPolyfill = (title, message, buttons = [{ text: "OK" }]) => {
  const result = window.confirm([title, message].filter(Boolean).join("\n"));
  if (result) {
    const confirm = buttons.find((b) => b.style !== "cancel");
    confirm?.onPress?.();
  } else {
    const cancel = buttons.find((b) => b.style === "cancel");
    cancel?.onPress?.();
  }
};

const alert = Platform.OS === "web" ? alertPolyfill : Alert.alert;

export default alert;

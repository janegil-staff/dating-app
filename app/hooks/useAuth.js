import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");
        
        if (token && isMounted) {
          const decoded = jwtDecode(token);
          setUserId(decoded.userId);
            console.lof("USERID", decoded.userId);

        }
      } catch (err) {
        console.warn("Failed to decode token", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { userId, loading };
};

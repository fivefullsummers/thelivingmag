// import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SafeUser } from "../types";

interface IUseTheme {
  currentUser?: SafeUser | null;
}

const useTheme = ({ currentUser }: IUseTheme) => {

  const theme = "theme";

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const localStorageData =
      typeof window !== "undefined" ? localStorage.getItem(theme) : null;
    return localStorageData === "true";
  });

  useEffect(() => {
    const localStorageData = localStorage.getItem(theme);
    console.log(localStorageData);
    if (localStorageData !== null) {
      setIsDarkMode(localStorageData === "true");
    }
  }, [theme]);

  const toggleTheme = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      let canUpdateUserTheme = currentUser ? true : false;

      try {
        let request;
        if (isDarkMode) {
          // request = () => axios.delete(`/api/theme/${theme}`);
          localStorage.setItem(theme, currentUser?.theme || "light");
        } else {
          // request = () => axios.post(`/api/favorites/${theme}`);
          localStorage.setItem(theme, currentUser?.theme || "dark");
        }
        console.log(isDarkMode);
        setIsDarkMode(!isDarkMode);
        // await request();
        console.log(`successfully like post: ${theme}`);
      } catch (error) {
        console.error(`error liking post: ${theme}`);
      }
    },
    [theme, currentUser, isDarkMode]
  );

  return { isDarkMode, toggleTheme };
};

export default useTheme;

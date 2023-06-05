// import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SafeUser } from "../types";

interface IUseTheme {
  currentUser?: SafeUser | null;
}

const useTheme = ({ currentUser }: IUseTheme) => {

  const [isDarkMode, setIsDarkMode] = useState<boolean>();

  useEffect(() => {
    const localStorageData =
      typeof window !== "undefined"
      ? localStorage.getItem("isDarkMode")
      : "light";

    localStorageData === "dark" ? setIsDarkMode(true) : setIsDarkMode(false);
  }, [isDarkMode]);

  const toggleTheme = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      try {
        if (isDarkMode) {
          localStorage.setItem("isDarkMode", "light");
        } else {
          localStorage.setItem("isDarkMode", "dark");
        }
        setIsDarkMode((mode) => !mode);
      } catch (error) {
        console.error(`error liking post: ${isDarkMode}`);
      }
    },
    [isDarkMode, currentUser, isDarkMode]
  );

  return { isDarkMode, toggleTheme };
};

export default useTheme;

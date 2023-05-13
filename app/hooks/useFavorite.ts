import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const loginModal = useLoginModal();

  const [hasFavorited, setHasFavorited] = useState<boolean>(() => {
    const list = currentUser?.favoriteIds || [];
    const localStorageData =
      typeof window !== "undefined" ? localStorage.getItem(listingId) : null;
    return list.includes(listingId) || localStorageData === "true";
  });

  useEffect(() => {
    const localStorageData = localStorage.getItem(listingId);
    if (localStorageData !== null) {
      setHasFavorited(localStorageData === "true");
    }
  }, [listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          localStorage.removeItem(listingId);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          localStorage.setItem(listingId, "true");
        }
        setHasFavorited(!hasFavorited);
        await request();
        console.log(`successfully like post: ${listingId}`);
      } catch (error) {
        console.error(`error liking post: ${listingId}`);
      }
    },
    [listingId, currentUser, hasFavorited, loginModal]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;

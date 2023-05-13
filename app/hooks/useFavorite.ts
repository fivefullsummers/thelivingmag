import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const loginModal = useLoginModal();

  const [hasFavorited, setHasFavorited] = useState(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  });

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        const requestConfig = hasFavorited
          ? { method: "delete", url: `/api/favorites/${listingId}` }
          : { method: "post", url: `/api/favorites/${listingId}` };

        await axios(requestConfig);
        setHasFavorited(!hasFavorited);
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
      }

    },
    [listingId, currentUser, hasFavorited, loginModal]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;

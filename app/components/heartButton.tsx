"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";
import React, { useEffect, useState } from "react";

interface IHeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<IHeartButtonProps> = React.memo(
  ({ listingId, currentUser }) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
      listingId,
      currentUser,
    });

    const [localStorageAvailable, setLocalStorageAvailable] = useState(false);

    useEffect(() => {
      setLocalStorageAvailable(typeof localStorage !== "undefined");
    }, []);

    return (
      <div
        onClick={toggleFavorite}
        className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
      >
        <AiOutlineHeart
          size={28}
          className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
        />

        <AiFillHeart
          size={24}
          className={
            hasFavorited ||
            (localStorageAvailable &&
              localStorage.getItem(listingId) === "true")
              ? "fill-rose-500"
              : "fill-neutral-500/70"
          }
        />
      </div>
    );
  }
);

HeartButton.displayName = "HeartButton";

export default HeartButton;

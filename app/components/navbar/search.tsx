"use client";

import { BiSearch } from "react-icons/bi";
import useSearchModal from "../../hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import useCountries from "../../hooks/useCountries";
import { useMemo } from "react";
import { differenceInCalendarDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInCalendarDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
      border-[1px]
      sm:w-0
      lg:w-full
      md:w-full
      rounded-full
      shadow-sm
      hover:shadow-md
      transition
      cursor-pointer
      "
    >
      <div className="p-2 bg-rose-500 rounded-full text-white">
        <BiSearch size={18} />
      </div>
    </div>
  );
};

export default Search;

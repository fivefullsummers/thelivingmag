"use client";

import { Listing, Reservation } from "@prisma/client";
import { SafeListing, SafeReservation, SafeUser } from "../../types";
import { useRouter } from "next/navigation";
import useCountries from "../../hooks/useCountries";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../heartButton";
import Button from "../button";
import Avatar from "../avatar";

interface IListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<IListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
        col-span-1
        cursor-pointer
        group
      "
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-105 transition duration-500 ease-in-out"
          />
          <div className="absolute left-5 bottom-5">
            <Avatar src={currentUser?.image}/>
          </div>
          <div className="absolute bottom-5 right-5">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        {/* <div className="font-semibold text-lg">
          {data.title} {location?.label} 
        </div> */}
        
        {/* <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div> */}

        {/* <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div> */}

        {/* {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )} */}
      </div>
    </div>
  );
};

export default ListingCard;

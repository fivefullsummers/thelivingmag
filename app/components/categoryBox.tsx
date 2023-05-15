"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import Image from "next/image";

interface ICategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<ICategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
      flex
      flex-col
      items-center
      justify-between
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      min-w-[111px]
      transition
      cursor-pointer
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}

      `}
    >
      <div className="h-11 relative overflow-hidden rounded-md bg-zinc-800">
        <div className="bg-gray-800 opacity-40 w-full h-full">
        <Image
          src={`/images/${label}.jpg`}
          alt={label}
          width={111}
          height={40}
          loading="lazy"
          style={{marginTop: "-15px", filter: "grayScale(10%)"}}
        />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-sm text-white drop-shadow-sm">{label}</div>
      </div>
    </div>
  );
};

export default CategoryBox;

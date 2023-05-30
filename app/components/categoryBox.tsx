"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import qs from "query-string";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ICategoryBoxProps {
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<ICategoryBoxProps> = ({ label, selected }) => {
  const params = useSearchParams();

  const handleClick = useMemo(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      role: label,
    };

    if (params?.get("role") === label) {
      delete updatedQuery.role;
    }

    const url = {
      pathName: "/",
      query: updatedQuery,
    };

    return url;
  }, [label, params]);

  return (
    <Link href={handleClick}>
      <div
        className={`
      flex
      flex-col
      items-center
      justify-between
      gap-2
      p-3
      hover:text-neutral-800
      min-w-[111px]
      transition
      cursor-pointer
      `}
      >
        <div className="h-11 relative overflow-hidden rounded-md bg-zinc-800">
          <div className="bg-gray-800 opacity-40 w-full h-full">
            <Image
              src={`/images/${label}s.jpg`}
              alt={label}
              width={111}
              height={40}
              style={{ marginTop: "-15px", filter: "grayScale(10%)" }}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-sm text-white drop-shadow-sm">
            {label}s
          </div>
        </div>
      </div>
      {selected ? (
        <motion.div className="underline" layoutId="underline" />
      ) : null}
    </Link>
  );
};

export default CategoryBox;

"use client";

import Link from "next/link";

interface IMenuItemProps {
  onClick: () => void;
  route?: string;
  label: string;
  isLink?: boolean;
}

const MenuItem: React.FC<IMenuItemProps> = ({
  onClick,
  label,
  route,
  isLink,
}) => {
  let linkBody = (
    <div
      onClick={onClick}
      className="
        px-4
        py-3
        hover:bg-base-200
        transition
        font-semibold
      "
    >
      {label}
    </div>
  );

  if (isLink) {
    linkBody = (
      <Link href={route || "#"}>
        <div
          className="
          px-4
          py-3
          hover:bg-base-200
          transition
          font-semibold"
        >
          {label}
        </div>
      </Link>
    );
  }

  return linkBody;
};

export default MenuItem;

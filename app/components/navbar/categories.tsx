"use client";

import Container from "../container";
import CategoryBox from "../categoryBox";
import { FaCameraRetro } from "react-icons/fa";
import { usePathname, useSearchParams } from "next/navigation";
import { IoMdWoman } from "react-icons/io";

export const roles = [
  {
    label: "Photographer",
    icon: FaCameraRetro,
    description: "Check out some photographers!",
  },
  {
    label: "Model",
    icon: IoMdWoman,
    description: "Find a model!",
  }
];

const Categories = () => {
  const params = useSearchParams();
  const role = params?.get("role");
  const pathname = usePathname();

  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          flex
          flex-row
          items-center
          justify-center
          overflow-x-auto
        "
      >
        {roles.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={role === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;

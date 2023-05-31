"use client";

import { SafeUser } from "../../types";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./usermenu";
import Categories from "./categories";
import { useSelectedLayoutSegment } from "next/navigation";


interface INavBarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<INavBarProps> = ({ currentUser }) => {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="fixed w-full bg-neutral-100 z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row w-full">
            <div className="flex justify-center items-center min-w-[100px]">
              <Logo />
            </div>
            <div
              className="
            flex
            flex-flow
            items-center
            justify-end
            w-full
            gap-3
            md:gap-0
          "
            >
              <div className="hidden">
                {
                  segment !== "profile" && <Search />
                }
              </div>
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;

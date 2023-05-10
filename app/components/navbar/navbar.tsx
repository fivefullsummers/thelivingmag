"use client";

import { SafeUser } from "../../types";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./usermenu";
import Categories from "./categories";

interface INavBarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<INavBarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row w-full">
            <div className="flex justify-start min-w-[100px]">
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
              <div className="">
                <Search />
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

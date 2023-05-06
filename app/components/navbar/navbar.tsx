'use client';

import { SafeUser } from "../../types";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./usermenu";
import Categories from "./categories";

interface INavBarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<INavBarProps> = ({
  currentUser
}) => {
  return (
  <div className="fixed w-full bg-white z-10 shadow-sm">
    <div className="py-4 border-b-[1px]">
      <Container>
        <div
          className="
            flex
            flex-flow
            items-center
            justify-between
            gap-3
            md:gap-0
          ">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
        </div>
      </Container>
    </div>
    <Categories />
  </div>
  );
}

export default Navbar;

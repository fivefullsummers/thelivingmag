"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="w-full h-5 relative">
      <Link href="/">
        <Image
          className="block cursor-pointer"
          alt="logo"
          fill
          src="/images/logo.png"
        />
      </Link>
    </div>
  );
};

export default Logo;

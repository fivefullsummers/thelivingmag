"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="w-full h-5 relative">
      <Image
        onClick={() => router.push("/")}
        className="block cursor-pointer"
        alt="logo"
        fill
        src="/images/logo.png"
      />
    </div>
  );
};

export default Logo;

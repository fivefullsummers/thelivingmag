"use client";

import Link from "next/link";
import { bodoni } from "../../fonts";

const Logo = () => {
  return (
    <div className="w-full h-5 relative flex justify-center items-center">
      <Link href="/">
        <h3 className={`${bodoni.className} textarea-lg font-semibold tracking-widest italic`}>wouldaposed</h3>
      </Link>
    </div>
  );
};

export default Logo;

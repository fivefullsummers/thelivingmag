'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bodoni_Moda } from "next/font/google";

const secondaryFont = Bodoni_Moda({ 
  subsets: ["latin"] 
});

const Logo = () => {
  const router = useRouter();

  return (
      <div
      onClick={() => router.push('/')}
      className={`
        flex
        items-center
        justify-center
        cursor-pointer
        text-lg
        tracking-widest
        text-zinc-950
        ${secondaryFont.className}        
      `}>WOULDAPOSED</div>
    // <Image
    //   onClick={()=> router.push('/')}
    //   className="block cursor-pointer"
    //   alt="logo"
    //   height={100}
    //   width={100}
    //   src="/images/logo.png"
    // /> 
  )
}

export default Logo;
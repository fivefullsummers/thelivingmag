import { Nunito, Bodoni_Moda } from "next/font/google";

export const nunito = Nunito({ subsets: ["latin"] });

export const bodoni = Bodoni_Moda({ 
  subsets: ["latin"], 
  display: 'swap',
  style: ['italic', 'normal'],
  weight: ['400','500','600']
});
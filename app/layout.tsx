import "./globals.css";
import { Nunito } from "next/font/google";

import getCurrentUser from "./actions/getCurrentUser";

import Navbar from "./components/navbar/navbar";
import ToasterProvider from "./providers/toasterProvider";
import RegisterModal from "./components/modals/registermodal";
import LoginModal from "./components/modals/loginModal";
import SearchModal from "./components/modals/searchModal";
import PostModal from "./components/modals/postModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Wouldaposed",
  description: "Wouldaposed by fivefullsummers",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SearchModal />
        <LoginModal />
        <RegisterModal />
        <PostModal currentUser={currentUser}/>
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-20">{children}</div>
      </body>
    </html>
  );
}

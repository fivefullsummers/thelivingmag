import "./globals.css";
import { Nunito } from "next/font/google";

import getCurrentUser from "./actions/getCurrentUser";

import Navbar from "./components/navbar/navbar";
import ToasterProvider from "./providers/toasterProvider";
import RegisterModal from "./components/modals/registermodal";
import LoginModal from "./components/modals/loginModal";
import SearchModal from "./components/modals/searchModal";
import PostModal from "./components/modals/postModal";
import RoleModal from "./components/modals/roleModal";
import EditProfileModal from "./components/modals/editProfileModal";
import Head from "next/head";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Wouldaposed",
  description: "Wouldaposed by fivefullsummers"
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en" className="antialiased" data-theme="pastel">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <body className={font.className}>
        <ToasterProvider />
        <SearchModal />
        <LoginModal />
        <RegisterModal />
        <RoleModal />
        <EditProfileModal currentUser={currentUser}/>
        <PostModal currentUser={currentUser}/>
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-20">{children}</div>
      </body>
    </html>
  );
}

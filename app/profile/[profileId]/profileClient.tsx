"use client";

import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import Avatar from "../../components/avatar";
import Container from "../../components/container";
import EmptyState from "../../components/emptyState";
import PostCard from "../../components/posts/postCard";
import useEditProfileModal from "../../hooks/useEditProfileModal";
import { PostUserAvatar, SafeUser } from "../../types";
import { AiFillInstagram } from "react-icons/ai";
import { FaBehanceSquare } from "react-icons/fa";
import Link from "next/link";
import { useCallback } from "react";
import { IoLocationSharp } from "react-icons/io5";

interface IProfileClientProps {
  user: SafeUser | null;
  posts?: PostUserAvatar[];
  currentUser?: SafeUser | null;
}

const ProfileClient: React.FC<IProfileClientProps> = ({
  user,
  posts,
  currentUser,
}) => {
  const editProfileModal = useEditProfileModal();

  if (!user) {
    return (
      <EmptyState
        title="Welp... that's awkward!"
        subtitle="This user doesn't exist"
      />
    );
  }

  if (!posts) {
    return (
      <EmptyState title="No Posts" subtitle="Woulda Shoulda Coulda Posted!" />
    );
  }

  const isCurrentUser = currentUser?.id === user?.id ? true : false;

  const currentLocationString = () => {
    let locationStr = "";
    if (currentUser?.country !== "" || currentUser?.country !== undefined) {
      if (currentUser?.state !== "" || currentUser?.state !== undefined) {
        locationStr += `${currentUser?.state}`;
      }
      if (currentUser?.city !== "" || currentUser?.city !== undefined) {
        locationStr += `, ${currentUser?.city}`;
      }
    }
    return locationStr;
  };

  const hasLocation = currentLocationString() !== "" ? true : false;

  const replaceWithBr = () => {
    return user?.bio?.replace(/\n/g, "<br>") as TrustedHTML;
  };

  return (
    <Container>
      <div
        className="
          flex
          flex-col
          md:flex-row
          lg:flex-row
          xl:flex-row
          2xl:flex-row
          pt-2
          gap-5
        "
      >
        <div
          className="
            w-full
            md:w-[30vw]
            lg:w-[30vw]
            xl:w-[30vw]
            2xl:w-[30vw]
            "
        >
          <div className="card shadow-md p-5 rounded-md bg-neutral-100">
            <div className="flex flex-row h-full w-full">
              <div className="flex flex-col h-full min-w-[55%] justify-center pr-4">
                <Avatar src={user?.image} size="md" />
                <p className="font-semibold whitespace-nowrap pt-2">
                  {user?.name}
                </p>
                <p
                  dangerouslySetInnerHTML={{ __html: replaceWithBr() }}
                  className="font-light text-neutral-900 pt-2 w-full text-sm"
                ></p>
              </div>
              <div className="flex flex-col h-full w-full justify-start pr-2">
                <p>
                  <span className="font-semibold">{posts.length}</span> Posts
                </p>
                <div className="flex flex-row gap-1 items-center pt-1">
                  <span>
                    {user?.gender === "FEMALE" && <TbGenderFemale />}
                    {user?.gender === "MALE" && <TbGenderMale />}
                  </span>
                  <p className="text-sm">{user?.role.toLowerCase()}</p>
                </div>
                {hasLocation && (
                  <div className="flex flex-row gap-1 items-center pt-1">
                    <span>{<IoLocationSharp />}</span>
                    <p className="text-xs whitespace-nowrap">{currentLocationString()}</p>
                  </div>
                )}

                <div className="flex flex-row gap-2 pt-2">
                  {user?.instagramLink && (
                    <div>
                      <a
                        target="_blank"
                        href={`https://Instagram.com/${user?.instagramLink}`}
                        rel="noopener noreferrer"
                      >
                        <AiFillInstagram size={35} />
                      </a>
                    </div>
                  )}
                  {user?.behanceLink && (
                    <div>
                      <a
                        target="_blank"
                        href={`https://behance.com/${user?.behanceLink}`}
                        rel="noopener noreferrer"
                      >
                        <FaBehanceSquare size={35} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-actions flex justify-end">
              {isCurrentUser && (
                <button
                  className="btn-sm btn-primary rounded-md"
                  onClick={editProfileModal.onOpen}
                >
                  Edit profile
                </button>
              )}
            </div>
          </div>
        </div>
        <main
          className="
            w-full
            grid
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-3
            xl:grid-cols-6
            2xl:grid-cols-6
            gap-4 
          "
        >
          {posts?.length === 0 ? (
            <EmptyState
              title="No Posts"
              subtitle="Woulda Shoulda Coulda Posted!"
            />
          ) : (
            posts?.map((post) => {
              if (post.id) {
                return (
                  <PostCard key={post.title} data={post} showUser={true} />
                );
              }
            })
          )}
        </main>
      </div>
    </Container>
  );
};

export default ProfileClient;

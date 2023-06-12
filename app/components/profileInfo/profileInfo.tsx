"use client";

import { FaBehanceSquare } from "react-icons/fa";
import { SafePostUser, SafeUser } from "../../types";
import Avatar from "../avatar";
import { AiFillInstagram } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import useEditProfileModal from "../../hooks/useEditProfileModal";

interface IProfileInfoProps {
  user: SafeUser | null;
  posts?: SafePostUser[];
  currentUser?: SafeUser | null;
  isCurrentUser: boolean;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({
  user,
  posts,
  currentUser,
  isCurrentUser,
}) => {
  const editProfileModal = useEditProfileModal();

  const currentLocationString = () => {
    let locationStr = "";
    if (user?.country !== "" || user?.country !== null) {
      if (user?.state !== "" || user?.state !== null) {
        locationStr += `${user?.state}`;
      }
      if (user?.city !== "" || user?.city !== null) {
        locationStr += `, ${user?.city}`;
      }
    }
    return locationStr;
  };

  const hasLocation = currentLocationString() !== "null, null" ? true : false;

  const replaceWithBr = () => {
    return user?.bio?.replace(/\n/g, "<br>") as TrustedHTML;
  };

  return (
    <div className="card shadow-md p-5 rounded-md bg-base-200">
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full min-w-[55%] justify-center pr-4">
          <Avatar src={user?.image} size="md" />
          <p className="font-semibold whitespace-nowrap pt-2">{user?.name}</p>
          <p
            dangerouslySetInnerHTML={{ __html: replaceWithBr() }}
            className="font-light pt-2 w-full text-sm"
          ></p>
        </div>
        <div className="flex flex-col h-full w-full justify-start pr-2">
          <p>
            <span className="font-semibold">{posts?.length}</span> Posts
          </p>
          <div className="flex flex-row gap-1 items-center pt-1">
            {user?.gender && (
              <span>
                {user?.gender === "FEMALE" && <TbGenderFemale />}
                {user?.gender === "MALE" && <TbGenderMale />}
              </span>
            )}
            <p className="text-sm">{user?.role.toLowerCase()}</p>
          </div>
          {hasLocation && (
            <div className="flex flex-row gap-1 items-center pt-1">
              <span>{<IoLocationSharp />}</span>
              <p className="text-xs whitespace-normal">
                {currentLocationString()}
              </p>
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
            className="btn btn-sm rounded-md"
            onClick={editProfileModal.onOpen}
          >
            Edit profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;

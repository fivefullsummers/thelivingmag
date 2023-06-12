"use client";

import { SafeUser } from "../../types";

interface IExtraInfoProps {
  user: SafeUser | null;
  currentUser?: SafeUser | null;
  isCurrentUser: boolean;
}

const ExtraInfo: React.FC<IExtraInfoProps> = ({
  user,
  currentUser,
  isCurrentUser
}) => {
  return (
    <div className="card shadow-md p-5 rounded-md bg-base-200">
      Extra Info
    </div>
  )
  
};

export default ExtraInfo;

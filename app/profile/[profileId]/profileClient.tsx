"use client";

import EmptyState from "../../components/emptyState";
import { PostUserAvatar, SafeUser } from "../../types";

interface IProfileClientProps {
  user: SafeUser | null;
  posts?: PostUserAvatar[];
}

const ProfileClient: React.FC<IProfileClientProps> = ({
  user,
  posts
}) => {

  if (!user) {
    return (
      <EmptyState
        title="Welp... that's awkward!"
        subtitle="This user doesn't exist"
      />
    );
  };

  if (!posts) {
    return (
      <EmptyState
        title="No Posts"
        subtitle="Woulda Shoulda Coulda Posted!"
      />
    );
  }

  console.log("user: ", user);
  return (
    <div>
      Profile Client
    </div>
  );
}

export default ProfileClient;
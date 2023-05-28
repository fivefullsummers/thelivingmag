"use client";

import Avatar from "../../components/avatar";
import Container from "../../components/container";
import EmptyState from "../../components/emptyState";
import PostCard from "../../components/posts/postCard";
import useEditProfileModal from "../../hooks/useEditProfileModal";
import { PostUserAvatar, SafeUser } from "../../types";

interface IProfileClientProps {
  user: SafeUser | null;
  posts?: PostUserAvatar[];
}

const ProfileClient: React.FC<IProfileClientProps> = ({ user, posts }) => {
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

  console.log("user: ", user);
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
          <div className="card shadow-md p-5 rounded-md">
            <div className="flex flex-row h-full">
              <div className="flex flex-col h-full min-w-[60%] justify-center pr-4">
                <Avatar src={user?.image} size="md" />
                <p className="font-semibold whitespace-nowrap pt-2">
                  {user?.name}
                </p>
                <p className="font-light pt-2 w-full">
                  {user?.bio}
                </p>
              </div>
              <div className="flex flex-col h-full w-full justify-start pr-2">
                <p>{posts.length} Posts</p>
                <p>{user?.role}</p>
              </div>
            </div>
            <div className="card-actions flex justify-end">
              <button className="btn-sm btn-secondary rounded-md"
                onClick={editProfileModal.onOpen}
              >Edit profile</button>
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
          {
            posts?.length === 0 ? (<EmptyState title="No Posts" subtitle="Woulda Shoulda Coulda Posted!" />) :
            posts?.map((post) => {
              if (post.id) {
                return (<PostCard key={post.title} data={post} showUser={true} />);
              }
            })
          }
        </main>
      </div>
    </Container>
  );
};

export default ProfileClient;

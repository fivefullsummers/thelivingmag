import Container from "../../components/container";
import EmptyState from "../../components/emptyState";
import PostCard from "../../components/posts/postCard";
import { SafePostUser, SafeUser } from "../../types";
import ProfileInfo from "../../components/profileInfo/profileInfo";
import ExtraInfo from "../../components/profileInfo/extraInfo";

interface IProfileClientProps {
  user: SafeUser | null;
  posts?: SafePostUser[];
  currentUser?: SafeUser | null;
}

const ProfileClient: React.FC<IProfileClientProps> = ({
  user,
  posts,
  currentUser,
}) => {
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
          <div className="flex flex-col gap-4">
            <ProfileInfo
              user={user}
              posts={posts}
              currentUser={currentUser}
              isCurrentUser={isCurrentUser}
            />
            {/* <ExtraInfo
              user={user}
              currentUser={currentUser}
              isCurrentUser={isCurrentUser}
            /> */}
          </div>
        </div>
        <main
          className="
            w-full
            grid
            sm:grid-cols-1
            md:grid-cols-3
            lg:grid-cols-3
            xl:grid-cols-3
            2xl:grid-cols-3
            gap-1 
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

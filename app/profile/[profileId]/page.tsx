import getCurrentUser from "../../actions/getCurrentUser";
import getPosts from "../../actions/getPosts";
import getUserById from "../../actions/getUserById";
import { SafePostUser, SafeUser } from "../../types";
import ProfileClient from "./profileClient";

interface IParams {
  userId?: string;
  profileId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {
  const [currentUser, user, posts] = await Promise.allSettled([
    getCurrentUser(),
    getUserById(params),
    getPosts(params),
  ]).then((responses) => {
    return responses.map((resp) => {
      if (resp.status === "fulfilled") {
        return resp.value;
      }
      if (resp.status === "rejected") {
        return resp.reason;
      }
    });
  });

  return <ProfileClient user={user as SafeUser | null} posts={posts as SafePostUser[]} currentUser={currentUser}/>;
};

export default ProfilePage;

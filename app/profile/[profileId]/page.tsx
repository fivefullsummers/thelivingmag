import getPosts from "../../actions/getPosts";
import getUserById from "../../actions/getUserById";
import ProfileClient from "./profileClient";

interface IParams {
  userId?: string;
  profileId?: string;
}

const ProfilePage = async({ params } : { params: IParams}) => {
  const user = await getUserById(params);
  const posts = await getPosts(params);

  return (
    <ProfileClient 
      user={user}
      posts={posts}
    />
  );
}

export default ProfilePage;
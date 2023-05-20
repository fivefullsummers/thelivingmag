import getCurrentUser from "../../actions/getCurrentUser";
import getUserById from "../../actions/getUserById";
import EmptyState from "../../components/emptyState";
import ProfileClient from "./profileClient";

interface IParams {
  userId: string;
}

const ProfilePage = async({ params } : { params: IParams}) => {
  const user = await getUserById(params);

  if (!user) {
    return (
      <EmptyState
        title="Welp... that's awkward!"
        subtitle="This user doesn't exist"
      />
    );
  };

  return (
    <ProfileClient 
      user={user}
    />
  );
}

export default ProfilePage;
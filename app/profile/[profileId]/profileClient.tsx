import { User } from "@prisma/client";
import { SafeUser } from "../../types";

interface IProfileClientProps {
  user: any;
}

const ProfileClient: React.FC<IProfileClientProps> = ({
  user
}) => {
  return (
    <div>
      Profile Client
    </div>
  );
}

export default ProfileClient;
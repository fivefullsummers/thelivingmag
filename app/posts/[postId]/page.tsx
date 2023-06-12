import getCurrentUser from "../../actions/getCurrentUser";
import getPostById from "../../actions/getPostById";
import EmptyState from "../../components/emptyState";
import { SafePostUser } from "../../types";
import PostClient from "./postClient";

interface IParams {
  postId?: string;
}

const PostPage = async ({ params } : { params: IParams})=> {
  const [postResult, currentUserResult] = await Promise.allSettled([
    getPostById(params),
    getCurrentUser(),
  ]);

  if (postResult.status === "rejected" || currentUserResult.status === "rejected") {
    // Handle the rejection of one or both promises
    return <EmptyState />;
  }

  const post = postResult.status === "fulfilled" ? postResult.value : null;
  const currentUser = currentUserResult.status === "fulfilled" ? currentUserResult.value : null;

  if (!post) {
    return (
      <EmptyState />
    )
  }

  return (
    <PostClient
      post={post as SafePostUser}
      currentUser={currentUser}
    />
  );
}

export default PostPage;
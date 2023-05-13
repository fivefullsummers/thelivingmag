import getCurrentUser from "../../actions/getCurrentUser";
import getPostById from "../../actions/getPostById";
import EmptyState from "../../components/emptyState";
import PostClient from "./postClient";

interface IParams {
  postId?: string;
}

const PostPage = async ({ params } : { params: IParams} )=> {
  const post = await getPostById(params)
  const currentUser = await getCurrentUser();

  if (!post) {
    return (
      <EmptyState />
    )
  }
  return (
    <PostClient
      post={post}
      currentUser={currentUser}
    />
  );
}

export default PostPage;
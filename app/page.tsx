import getPosts, { IPostParams } from "./actions/getPosts";
import Container from "./components/container";
import EmptyState from "./components/emptyState";
import PostCard from "./components/posts/postCard";
import { SafePostUser } from "./types";

export const dynamic = "force-dynamic";

interface IHomeProps {
  searchParams: IPostParams;
}

const Home = async ({ searchParams }: IHomeProps) => {
  const posts = await getPosts(searchParams);

  if (posts.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div
        className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-3
        xl:grid-cols-3
        2xl:grid-cols-3
        gap-2 
      "
      >
        {posts.map((post) => {
          return <PostCard key={post.title} data={post as SafePostUser} showUser={true}/>;
        })}
      </div>
    </Container>
  );
};

export default Home;

import getCurrentUser from "./actions/getCurrentUser";
import getPosts, { IPostParams } from "./actions/getPosts";
import Container from "./components/container";
import EmptyState from "./components/emptyState";
import PostCard from "./components/posts/postCard";

export const dynamic = 'force-dynamic';

interface IHomeProps {
  searchParams: IPostParams
}

const Home = async ({ searchParams }: IHomeProps) => {
  const posts = await getPosts(searchParams);
  const currentUser = await getCurrentUser();

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
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8 
      "
      >
        {posts.map((post)=> {
          return (
            <PostCard 
              currentUser={currentUser}
              key={post.title}
              data={post}
            />
          )
        })}
      </div>
    </Container>
  );
}

export default Home;

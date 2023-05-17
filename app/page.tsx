import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import getOnlyFirstImageFromPosts from "./actions/getOnlyFirstImageFromPosts";
import getPosts from "./actions/getPosts";
import Container from "./components/container";
import EmptyState from "./components/emptyState";
import ListingCard from "./components/listings/listingCard";
import PostCard from "./components/posts/postCard";
import { SafeListing } from "./types";

export const dynamic = 'force-dynamic';

interface IHomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: IHomeProps) => {
  const listings = await getListings(searchParams);
  //const posts = await getPosts(searchParams);
  const posts = await getOnlyFirstImageFromPosts(searchParams);
  const currentUser = await getCurrentUser();

  console.log("first images:", posts);


  if (listings.length === 0) {
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

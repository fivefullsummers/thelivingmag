import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import EmptyState from "../components/emptyState";
import FavoritesClient from "./favoritesClient";

const FavouritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="Favorites"
        subtitle="Looks like you haven't any favorites yet."
      />
    );
  }

  return (
    <div>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </div>
  );
};

export default FavouritesPage;

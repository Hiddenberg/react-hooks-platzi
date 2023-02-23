import "../styles/favoritesBar.css"

export default function FavoritesBar({favorites, deleteFavorite}) {
   const handleAnimationEnd = () => {
      
   }
   return (
      <div className="favorites-bar">
         <h2>Favorites List</h2>
         <div className="favorites-bar__images-container">
            {favorites.map(favorite => 
               <img key={favorite.id}
               onAnimationEnd={({animationName}) => {
                  if (animationName == "favorite-deleted") {
                     deleteFavorite(favorite);
                  }
               }}
               className={`favorites-bar__character-image ${favorite.deleted && "favorites-bar__character-image--delete-animation"}`}
               src={favorite.image} alt="" />
            )}
         </div>
      </div>
   )
}
import "../styles/favoritesBar.css"

export default function FavoritesBar({favorites}) {
   return (
      <div className="favorites-bar">
         <h2>Favorites List</h2>
         <div className="favorites-bar__images-container">
            {favorites.map(favorite => <img aria-label={favorite.name} className="favorites-bar__character-image" src={favorite.image} alt="" />)}
         </div>
      </div>
   )
}
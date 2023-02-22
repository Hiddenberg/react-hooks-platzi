export default function FavoritesList({favorites}) {
   return (
      <div style={{width: "20rem", margin: "1rem auto"}}>
         <h2>Favorites List</h2>
         <ul>
            {favorites.map(favorite => (
               <li key={favorite.id}>{favorite.name}</li>
            ))}
         </ul>
      </div>
   )
}
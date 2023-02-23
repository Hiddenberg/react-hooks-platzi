import { useState, useEffect, useReducer } from "react";
import "../styles/characters.css"
import FavoritesBar from "./FavoritesBar";

const initialState = {
   favorites: [],
}

const favoriteReducer = (state, action) => {
   /* 
      ↓ IMPORTANT NOTE: when we use reducer objects the functions included in this object WILL ALWAYS 
      be executed so its prefferable to use a switch instead to prevent unnecesary code execution
   */
   /*const reduObject = {
      "ADD_TO_FAVORITE": {
         ...state,
         favorites: [...state.favorites, action.payload]
      },
      "TRIGGER_REMOVE_ANIMATION": {
         ...state,
         favorites: (() => {
            let deletedIndex = state.favorites.findIndex(favorite => favorite.id == action.payload.id);
            state.favorites[deletedIndex].deleted = true;

            return [...state.favortes];
         })()
      },
      "REMOVE_FROM_FAVORITES": {
         ...state,
         favorites: state.favorites.filter(favorite => favorite.id !== action.payload.id)
      }
   } */

   switch (action.type) {
      case "ADD_TO_FAVORITE": 
      return {
         ...state,
         favorites: [...state.favorites, action.payload]
      };
      case "TRIGGER_REMOVE_ANIMATION": 
      return {
         ...state,
         favorites: (() => {
            let deletedIndex = state.favorites.findIndex(favorite => favorite.id == action.payload.id);
            let newFavoritesList = JSON.parse(JSON.stringify(state.favorites));

            newFavoritesList[deletedIndex].deleted = true

            return newFavoritesList;
         })()
      };
      case "REMOVE_FROM_FAVORITES": 
      return {
         ...state,
         favorites: state.favorites.filter(favorite => favorite.id !== action.payload.id)
      };
      default:
         return state
   }

/*    if (reduObject[action.type] == undefined) {
      return state;
   }

   return reduObject[action.type]; */
}

export default function Characters () {
   const [characters, setCharacters] = useState([]);
   const [favoritesState, favsDispatch] = useReducer(favoriteReducer, initialState);

   const addToFavorites = character => {
      favsDispatch({type: "ADD_TO_FAVORITE", payload: character});
   }
   const deleteFavorite = character => {
      favsDispatch({type: "REMOVE_FROM_FAVORITES", payload: character});
   }
   const triggerRemoveAnimation = character => {
      favsDispatch({type: "TRIGGER_REMOVE_ANIMATION", payload: character});
   }

   useEffect(() => {
      console.log("trigerring use effect")
      if (characters.length === 0) {
         console.log("getting characters")
         fetch("https://rickandmortyapi.com/api/character")
            .then(res => res.json())
            .then(data => setCharacters(data.results))
      }
   }, []);

   const statusEmojis = {
      "Alive": "❤️",
      "Dead": "💀",
      "unknown": "❔"
   }
   return (
      <>
         {favoritesState.favorites.length !==0 &&
            <FavoritesBar favorites={favoritesState.favorites} deleteFavorite={deleteFavorite} />
         }
         <div className="Characters characters-container">
            {characters.map(character => (
               <div key={character.id} className="character-card">
                  <div className="character-card__info-container">
                     <h2 className="character-card__title">{character.name}</h2>
                     <img className="character-card__image" src={character.image} />
                     <p className="character-card__text character-card__status">Status: {statusEmojis[character.status]}</p>
                     <p className="character-card__text character-card__location">Location: {character.location.name}</p>
                     <p className="character-card__text character-card__gender">Gender: {character.gender}</p>
                  </div>
                  {
                     /* ↓ using "some" instead of "includes" to look ONLY if the id exists in the 
                     favorites list and not the object reference*/
                     favoritesState.favorites.some(favorite => character.id == favorite.id) ?
                        <button type="button" onClick={() => triggerRemoveAnimation(character)} style={{backgroundColor: "red", color: "white"}}>Remove from favorites</button> :
                        <button type="button" onClick={() => addToFavorites(character)} >Add to favorites</button>
                  }
               </div>
            ))}
         </div>
      </>
   )
}
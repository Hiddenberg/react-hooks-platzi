import { useState, useEffect, useReducer } from "react";
import "../styles/characters.css"
import FavoritesList from "./FavoritesList";

const initialState = {
   favorites: [],
}

const favoriteReducer = (state, action) => {
   console.log(state)
   const reduObject = {
      "ADD_TO_FAVORITE": {
         ...state,
         favorites: [...state.favorites, action.payload]
      },
   }

   if (reduObject[action.type] == undefined) {
      return state;
   }

   return reduObject[action.type];
}

export default function Characters () {
   const [characters, setCharacters] = useState([]);
   const [favoritesState, dispatch] = useReducer(favoriteReducer, initialState);

   const handleClick = favorite => {
      dispatch({type: "ADD_TO_FAVORITE", payload: favorite});
   }

   useEffect(() => {
      console.log("trigerring use effect")
      if (characters.length === 0) {
         console.log("getting characters")
         fetch("https://rickandmortyapi.com/api/character")
            .then(res => res.json())
            .then(data => setCharacters(data.results))
      }
   }, [])

   const statusEmojis = {
      "Alive": "❤️",
      "Dead": "💀",
      "unknown": "❔"
   }
   return (
      <>
         {favoritesState.favorites.length !==0 &&
            <FavoritesList favorites={favoritesState.favorites} />
         }
         <div className="Characters characters-container">
            {characters.map((character, index) => (
               <div key={character.id} className="character-card">
                  <div className="character-card__info-container">
                     <h2 className="character-card__title">{character.name}</h2>
                     <img className="character-card__image" src={character.image} />
                     <p className="character-card__text character-card__status">Status: {statusEmojis[character.status]}</p>
                     <p className="character-card__text character-card__location">Location: {character.location.name}</p>
                     <p className="character-card__text character-card__gender">Gender: {character.gender}</p>
                  </div>
                  <button type="button" onClick={() => handleClick(character)}>Add to favorites</button>
               </div>
            ))}
         </div>
      </>
   )
}
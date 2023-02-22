import { useState, useEffect } from "react";
import "../styles/characters.css"

export default function Characters () {
   const [characters, setCharacters] = useState([]);

   useEffect(() => {
      console.log("trigerring use effect")
      if (characters.length === 0) {
         console.log("getting characters")
         fetch("https://rickandmortyapi.com/api/character")
            .then(res => res.json())
            .then(data => {console.log(data);setCharacters(data.results)})
      }
   }, [])

   const statusEmojis = {
      "Alive": "❤️",
      "Dead": "💀",
      "unknown": "❔"
   }

   return (
      <div className="Characters characters-container">
         {characters.map((character, index) => (
            <div key={index} className="character-card">
               <h2 className="character-card__title">{character.name}</h2>
               <img className="character-card__image" src={character.image} />
               <p className="character-card__text character-card__status">Status: {statusEmojis[character.status]}</p>
               <p className="character-card__text character-card__location">Location: {character.location.name}</p>
               <p className="character-card__text character-card__gender">Gender: {character.gender}</p>
            </div>
         ))}
      </div>
   )
}
import { useEffect, useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function Header() {
   const [darkMode, setDarkMode] = useState(false);

   const color = useContext(ThemeContext)

   useEffect(() => {
      darkMode ?
         document.body.classList.add("body--light-mode") : 
         document.body.classList.remove("body--light-mode");

   },[darkMode])
   
   const handleClick = () => {
      setDarkMode(darkMode => !darkMode);
   }
   


   return (
      <div className="Header" style={{marginBottom: "1rem"}}>
         <h1 style={{color}}>React Hooks</h1>
         <button onClick={handleClick} type="button">{darkMode ? 'Dark Mode' : 'Light Mode'}</button>
      </div>
   )
}
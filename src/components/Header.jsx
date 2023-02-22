import { useEffect, useState } from "react";

export default function Header() {
   const [darkMode, setDarkMode] = useState(true);

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
         <h1>React Hooks</h1>
         <button onClick={handleClick} type="button">{darkMode ? 'Dark Mode' : 'Light Mode'}</button>
      </div>
   )
}
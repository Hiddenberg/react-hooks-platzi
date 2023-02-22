import { createContext } from "react";

/* 
   A context hook allow us to create a global or semi-global state and easily use it all arround our
   application
*/
const ThemeContext = createContext(null);

export default ThemeContext


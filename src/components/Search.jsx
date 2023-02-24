import { useCallback } from "react";

export default function SearchBar({search, searchInput, handleSearch}) {
   return (
      <div className="search-bar">
         <input ref={searchInput} className="search-bar__input" type="text" placeholder="Search Character" onChange={handleSearch} value={search} />
      </div>
   )
}
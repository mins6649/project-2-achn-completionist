import React, {useState} from "react";
import '../css/App.css';

function VillagerFilter({search, onSearchChange}){
    const [isSearch, setIsSearch] = useState(false)
    function handleClick(){
        setIsSearch(!isSearch)
    }

    return(
        <div className="filter">
            <button className="searchButton" onClick={handleClick}>?</button>
            {isSearch ? <input className="searchBar" type="text" name="search" value={search} placeholder="Search by Name, Species or Personalities..." onChange={onSearchChange}/> : null} 
      </div>
    )
}

export default VillagerFilter;
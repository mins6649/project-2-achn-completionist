import React, {useEffect, useState} from "react";
import CatchThemAllList from "./CatchThemAllList";
import Filter from "./Filter";
import '../css/App.css';

function FishContainer(){

    const [fish, setFish] = useState([]);
    useEffect(()=>{        
        fetch("https://acnhapi.com/v1a/fish")
        .then(res => res.json())
        .then(data => setFish(data))
    }, [])

    //Hemisphere
    const [isNorth, setIsNorth] = useState(true);
    function handleHemisphere(){
        setIsNorth(!isNorth)
    }

    //Filter:
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    function searchChange(e){
        setSearch(e.target.value)
    }
    function categoryChange(e) {
        setCategory(e.target.value);
      }
    const fishCategory = fish.filter((fi)=>{
        if(category === "All"){
            return true;
        }else if (isNorth){
                return fi.availability.isAllYear || fi.availability["month-array-northern"].includes(parseInt(category))
        }else if(!isNorth){
                return fi.availability.isAllYear || fi.availability["month-array-southern"].includes(category)
        }
    })
    const fishList = fishCategory.filter((fish)=>{
        if (search === "") return true;
        return fish.name["name-USen"].toLowerCase().includes(search.toLowerCase()) 
    })

    return(
        <div> 
            <h2 className="subtitle">Fish</h2>
            <button onClick={handleHemisphere}>{isNorth ? "Northern Hemisphere" : "Southern Hemisphere"}</button>
            <Filter search={search} searchChange={searchChange} categoryChange={categoryChange} />
            <CatchThemAllList arr={fishList} isNorth={isNorth}/>

        </div>
    )
}

export default FishContainer;
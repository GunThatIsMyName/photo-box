import React, { useState } from "react";
import { useGlobalContext } from "./context";

const Form = ()=>{
    const [query,setQuery]=useState('')
    const {handleSearch} =useGlobalContext();
    const handleSubmit = (e)=>{
        e.preventDefault();
        handleSearch(query)
        setQuery('')
    }
    return(
        <div className="search">
        <h3>Photo box</h3>
        <form className="search-form" onSubmit={handleSubmit} > 
            <input className="form-input" onChange={(e)=>setQuery(e.target.value)} value={query} ype="text" placeholder="search photos" />
            <button className="submit-btn" >Submit</button>
        </form>
    </div>
    )
}

export default Form;
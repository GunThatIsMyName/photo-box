import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const AppContext = createContext();

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
const client_id = "vnNqxLzi0tWXKxhsb28XK-jQZuCQucJ-YMt-NZWus1I";


const AppProvider = ({children})=>{
    const [isLoading,setLoading]=useState(false);
    const [search,setSearch]=useState('');
    const [page,setPage]=useState(1);
    const [photos,setPhotos] =useState([])
    const handleSearch = (data)=>{
        setSearch("");
        setPage(1);
        setSearch(data);
        fetchImages()
    }
    const fetchImages =async()=>{
        setLoading(true)
        let dataUrl;
        try{
            if(search){
                dataUrl = await fetch(`${searchUrl}?client_id=${client_id}&page=${page}&query=${search}`)
            }else{
                dataUrl = await fetch(`${mainUrl}?client_id=${client_id}&page=${page}`)
            }
            const getData = await dataUrl.json()
            setPhotos((old)=>{
                if(search && page ===1){
                    return getData.results
                }
                if(search){
                    return [...old,...getData.results]
                }else{
                    return [...old,...getData]
                }
            })
        }catch{
            console.log(`fucked up`)
        }finally{
            setLoading(false)
        }
    }
    const handleScroll = () => {
        const innerHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight;
        if (innerHeight + scrollY > totalHeight - 3) {
          setPage((old) => {
            return old + 1;
          });
        }
      };
    useEffect(()=>{
        fetchImages()
    },[page,search])
    useEffect(() => {
        const windowEvent = window.addEventListener("scroll", handleScroll);
        return () => windowEvent;
      }, []);
    return(
        <AppContext.Provider value={{handleSearch,isLoading,
            search,
            page,
            photos,}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export default AppProvider;
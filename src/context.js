import React, { createContext, useContext, useEffect, useState } from "react";
export const AppContext = createContext();

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
const client_id = "vnNqxLzi0tWXKxhsb28XK-jQZuCQucJ-YMt-NZWus1I";

const AppProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const handleSearch = (data) => {
    setSearch("");
    setPage(1);
    setSearch(data)
    getData();
  };
  const getData = async () => {
    setLoading(true);
    let urlData;
    try {
      if (search) {
        urlData = await fetch(
          `${searchUrl}?client_id=${client_id}&page=${page}&query=${search}`
        );
      } else {
        urlData = await fetch(`${mainUrl}?client_id=${client_id}&page=${page}`);
      }
      const getData = await urlData.json();
      setList((photos) => {
        if (search && page === 1) {
          return getData.results;
        } else if (search) {
          return [...photos, ...getData.results];
        } else {
          return [...photos, ...getData];
        }
      });
    } catch {
      console.log("fucked up!");
    } finally {
      setLoading(false);
    }
  };
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
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [page,search]);

  useEffect(() => {
    const windowEvent = window.addEventListener("scroll", handleScroll);
    return () => windowEvent;
  }, []);

  return (
    <AppContext.Provider value={{ isLoading, handleSearch, list }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContex = () => {
  return useContext(AppContext);
};

export default AppProvider;

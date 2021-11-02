import "./App.css";

import List from "./components/List";
import { useState, useEffect, useCallback, useMemo } from "react";
import usePersistanceState from "./hooks/useSemiPersistance";

import { useReducer } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "SET_FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case "SET_FETCH_FAILURE":
      return { ...state, data:[], isLoading: false, isError: true };

    case "REMOVE_STORY":
      
      return {
        ...state,
        data: state.data.filter((i) => action.payload.objectID !== i.objectID),
      };
    
  }
};

const getNumberOfComments=(items)=>{
  console.log("summming funstion")
 return items.reduce((sum,item)=>sum+item.num_comments,0)
}

function App() {
  console.log("App is running")
  const [search, setSearch] =  usePersistanceState("customerSearchTerm", "");

  const [url, seturl] = useState(`${API_ENDPOINT}${search}`);


  const handleSearchSubmit =(e) => {
    e.preventDefault();
    //if(!search){return} ;
    seturl(`${API_ENDPOINT}${search}`);
  };

  const handleSearchStories = useCallback(async () => {
    dispatchItems({ type: "SET_FETCH_INIT" });
    /* fetch(url)
      .then((res) => res.json())
      .then((result) => {
        dispatchItems({ type: "SET_FETCH_SUCCESS", payload: result.hits });
      })
      .catch(() => {
        dispatchItems({ type: "SET_FETCH_FAILURE" });
      }); */
    try {
      const response = await axios.get(url);
      dispatchItems({ type: "SET_FETCH_SUCCESS", payload: response.data.hits });
    } catch {
      dispatchItems({ type: "SET_FETCH_FAILURE" });
    }
  }, [url]);

  const [items, dispatchItems] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  useEffect(() => {
    handleSearchStories();
  }, [handleSearchStories]);

  const [isDarkTheme, setDarkTheme] = useState(
    localStorage.getItem("isDarkTheme")
  );



  useEffect(() => {
      
      localStorage.setItem("isDarkTheme", isDarkTheme);
      document.documentElement.setAttribute(
        "data-theme",
        isDarkTheme ? "dark" : "white"
      );
  }, [isDarkTheme]);

  const onHandlerDeleteItem =useCallback( (item) => {
    dispatchItems({ type: "REMOVE_STORY", payload: item });
  },[]);

  const searchHandler =(e) => {
    setSearch(e.target.value);
  };

  const numberOfComments= useMemo(() => getNumberOfComments(items.data), [items]) ;

  return (
    <div className="container">
      <div className="card">
        <button onClick={() => setDarkTheme((prev) => !prev)}>
          Toggle Theme
        </button>

        <h1>My stories {numberOfComments} comments</h1>

        <SearchForm
          search={search}
          onSearchInput={searchHandler}
          onSearchSubmit={handleSearchSubmit}
        />

        {items.isLoading ? (
          <p>Loading...</p>
        ) : (
          <List stories={items.data} handlerDelete={onHandlerDeleteItem} />
        )}
        {items.isError && "Error : Something Wrong"}
      </div>
    </div>
  );
}

export default App;

// take data from parent to context
// context <API> </>
// useContext Hooks
// fetch is used to get api
// consumer ka roll useContext kar raha hai
// context(warehouse)
// Provider
// consumer /(useContextyou))
import React, { useContext ,useEffect,useState } from "react";

export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
const AppContext =React.createContext();

// we need to create a providerr function

const AppProvider=({children}) =>{

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError,setIsError]= useState({ show:"false",msg: ""});
    const [query,setQuery]=useState("titanic");

    // for fetching an api
    const getMovies = async(url) =>{
        setIsLoading(true);
        try {
            const res=await fetch(url);
            const data= await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);
                setMovie(data.Search);
            }
            else{
                setIsError({
                    show: true,
                    msg: data.Error,
                })

            }
         } catch (error) {
            console.log(error);
        }

    }

    useEffect(()=>{
       let timerOut = setTimeout(()=>{
        // set query means &s
            getMovies(`${API_URL}&s=${query}`);
        },500);
        return () => clearTimeout(timerOut);
    },[query]);
    return <AppContext.Provider value= {{movie,isLoading,isError,query,setQuery}}>
        {children}
    </AppContext.Provider>;
};

// global contest hook
const useGlobalContext=() =>{
    return useContext(AppContext);

};

export {AppContext,AppProvider, useGlobalContext};
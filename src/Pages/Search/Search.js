import { Button, createTheme, Tab, Tabs, ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import "./Search.css";
import CustomPagination from "../../components/Pagination/CustomPagination";
import CardDisplay from "../../components/CardDisplay/CardDisplay";

const darkTheme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#fff"
        }
    },
});

const Search = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleTabChange = (event, newValue) => {
        setType(newValue);
        setPage(1);
    }

    const fetchSearched = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
                }&language=en-US&query=${searchText}&page=${page}`);

            setSearchResults(data.results);
            setTotalPages(data.total_pages < 500 ? data.total_pages : 500);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchSearched();
        // eslint-disable-next-line
    }, [page, type])

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: "flex", margin: "15px 0" }}>
                    <TextField style={{ flex: 1 }} className="searchBox" label="Search" variant="filled" onChange={(e) => setSearchText(e.target.value)} />
                    <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchSearched}><SearchIcon fontSize="large" /></Button>
                </div>
                <Tabs value={type} indicatorColor="primary" textColor="primary" onChange={handleTabChange} style={{ paddingBottom: 5 }}>
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
            <div className="searchResults">
                {searchResults && searchResults.map((result) => (
                    <CardDisplay key={result.id}
                        id={result.id}
                        poster={result.poster_path}
                        media_type={type ? "tv" : "movie"}
                        vote_average={result.vote_average}
                        title={result.title || result.name}
                        date={result.release_date || result.first_air_date} />
                ))}
                {searchText &&
                    searchResults.length < 1 &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {totalPages > 1 && <CustomPagination page={page} setPage={setPage} totalPages={totalPages} />}
        </div>
    );
}

export default Search;
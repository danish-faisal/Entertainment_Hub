import { Chip } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';

const Genres = ({ type, genres, setGenres, selectedGenres, setSelectedGenres, setPage }) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter(g => g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => {
        setGenres([...genres, genre]);
        setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id));
        setPage(1);
    }

    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setGenres(data.genres);
    }

    useEffect(() => {
        fetchGenres();

        return () => { setGenres([]); }; // unmounting
        // eslint-disable-next-line
    }, []);

    return (
        <div style={{ padding: "6px 0" }}>
            {selectedGenres && selectedGenres.map((genre) => (
                <Chip style={{ margin: 2 }} size="small" clickable key={genre.id} label={genre.name} onDelete={() => handleRemove(genre)} color="primary" />
            ))}
            {genres && genres.map((genre) => (
                <Chip style={{ margin: 2 }} size="small" clickable key={genre.id} label={genre.name} onClick={() => handleAdd(genre)} />
            ))}
        </div>
    );
}

export default Genres;
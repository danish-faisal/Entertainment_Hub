import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardDisplay from '../../components/CardDisplay/CardDisplay';
import Genres from '../../components/Genres/Genres';
import CustomPagination from '../../components/Pagination/CustomPagination';
import useGenre from '../../hooks/useGenre';
import "./Movies.css";

const Movies = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreforURL}`);

        setMovies(data.results);
        setTotalPages(data.total_pages < 500 ? data.total_pages : 500);
    }

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page, genreforURL]);

    return (
        <div>
            <span className="pageTitle">Movies</span>
            <Genres type="movie" genres={genres} setGenres={setGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} setPage={setPage} />
            <div className="movies">
                {movies && movies.map((movie) => (
                    <CardDisplay key={movie.id}
                        id={movie.id}
                        poster={movie.poster_path}
                        media_type={movie.media_type}
                        vote_average={movie.vote_average}
                        title={movie.title || movie.name}
                        date={movie.release_date || movie.first_air_date} />
                ))}
            </div>
            {totalPages > 1 && <CustomPagination page={page} setPage={setPage} totalPages={totalPages} />}
        </div>
    );
}

export default Movies;
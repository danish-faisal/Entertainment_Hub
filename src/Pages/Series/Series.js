import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardDisplay from '../../components/CardDisplay/CardDisplay';
import Genres from '../../components/Genres/Genres';
import CustomPagination from '../../components/Pagination/CustomPagination';
import useGenre from '../../hooks/useGenre';
import "./Series.css";

const Series = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [series, setSeries] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);

    const fetchSeries = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreforURL}`);

        setSeries(data.results);
        setTotalPages(data.total_pages < 500 ? data.total_pages : 500);
    }

    useEffect(() => {
        fetchSeries();
        // eslint-disable-next-line
    }, [page, genreforURL]);

    return (
        <div>
            <span className="pageTitle">Series</span>
            <Genres type="tv" genres={genres} setGenres={setGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} setPage={setPage} />
            <div className="series">
                {series && series.map((show) => (
                    <CardDisplay key={show.id}
                        id={show.id}
                        poster={show.poster_path}
                        media_type={show.media_type}
                        vote_average={show.vote_average}
                        title={show.title || show.name}
                        date={show.release_date || show.first_air_date} />
                ))}
            </div>
            {totalPages > 1 && <CustomPagination page={page} setPage={setPage} totalPages={totalPages} />}
        </div>
    );
}

export default Series;
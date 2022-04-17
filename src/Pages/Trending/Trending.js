import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardDisplay from '../../components/CardDisplay/CardDisplay';
import CustomPagination from '../../components/Pagination/CustomPagination';
import "./Trending.css";

const Trending = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [trending, setTrending] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

        setTrending(data.results);
        setTotalPages(data.total_pages);
    }

    useEffect(() => {
        fetchTrending();
    }, [page]);

    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
                {trending && trending.map((trend) => (
                    <CardDisplay key={trend.id}
                        id={trend.id}
                        poster={trend.poster_path}
                        media_type={trend.media_type}
                        vote_average={trend.vote_average}
                        title={trend.title || trend.name}
                        date={trend.release_date || trend.first_air_date} />
                ))}
            </div>
            <CustomPagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
}

export default Trending;
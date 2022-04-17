import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardDisplay from '../../components/CardDisplay/CardDisplay';
import "./Trending.css";

const Trending = () => {
    const [trending, setTrending] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`);

        setTrending(data.results);
    }

    useEffect(() => {
        fetchTrending();
    }, []);

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
        </div>
    );
}

export default Trending;
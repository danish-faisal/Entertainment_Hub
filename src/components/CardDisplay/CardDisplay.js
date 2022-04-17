import React from 'react';
import { img_300, unavailable } from '../../config/config';
import "./CardDisplay.css";

const CardDisplay = ({ id, date, title, poster, media_type, vote_average }) => {
    return (
        <div className="media">
            <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className="title">{title}</b>
            <span className="subTitle">
                {media_type == "tv" ? "TV Series" : "Movie"}
                <span className="subTitle">{date}</span>
            </span>
        </div>
    )
}

export default CardDisplay;
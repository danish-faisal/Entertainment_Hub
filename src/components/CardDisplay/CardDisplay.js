import { Badge } from '@material-ui/core';
import React from 'react';
import { img_300, unavailable } from '../../config/config';
import MoreInfoModal from '../MoreInfoModal/MoreInfoModal';
import "./CardDisplay.css";

const CardDisplay = ({ id, date, title, poster, media_type, vote_average }) => {
    return (
        <MoreInfoModal media_type={media_type} id={id}>
            <Badge overlap="rectangular" badgeContent={vote_average} color={vote_average > 6 ? 'primary' : 'secondary'} />
            <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className="title">{title}</b>
            <span className="subTitle">
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span className="subTitle">{date}</span>
            </span>
        </MoreInfoModal>
    )
}

export default CardDisplay;
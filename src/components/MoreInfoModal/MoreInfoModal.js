import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import "./MoreInfoModal.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from '../Carousel/Carousel';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3)
    },
}));

export default function MoreInfoModal({ media_type, id, children }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [reqData, setReqData] = useState({});
    const [video, setVideo] = useState();

    const fetchClicked = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setReqData(data);
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        let videoKey = "";
        if (data.results.length > 0) {
            for (let idx in data.results) {
                if (data.results[idx].name === "Official Trailer") {
                    videoKey = data.results[idx].key;
                    break;
                }
            }
        }
        setVideo(videoKey);
    }

    useEffect(() => {
        fetchClicked();
        fetchVideo();
        // eslint-disable-next-line
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div
                className="media"
                style={{ cursor: "pointer" }}
                color="inherit"
                onClick={handleOpen}
            >
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {reqData && (
                        <div className={classes.paper}>
                            <div className="ContentModal">
                                <img
                                    src={
                                        reqData.poster_path
                                            ? `${img_500}/${reqData.poster_path}`
                                            : unavailable
                                    }
                                    alt={reqData.name || reqData.title}
                                    className="ContentModal__portrait"
                                />
                                <img
                                    src={
                                        reqData.backdrop_path
                                            ? `${img_500}/${reqData.backdrop_path}`
                                            : unavailableLandscape
                                    }
                                    alt={reqData.name || reqData.title}
                                    className="ContentModal__landscape"
                                />
                                <div className="ContentModal__about">
                                    <span className="ContentModal__title">
                                        {reqData.name || reqData.title} (
                                        {(
                                            reqData.first_air_date ||
                                            reqData.release_date ||
                                            "-----"
                                        ).substring(0, 4)}
                                        )
                                    </span>
                                    {reqData.tagline && (
                                        <i className="tagline">{reqData.tagline}</i>
                                    )}

                                    <span className="ContentModal__description">
                                        {reqData.overview}
                                    </span>

                                    <div>
                                        <Carousel media_type={media_type} id={id} />
                                    </div>

                                    <Button
                                        variant="contained"
                                        startIcon={<YouTubeIcon />}
                                        color="secondary"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch the Trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </>
    );
}

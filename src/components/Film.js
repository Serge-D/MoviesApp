/* eslint-disable react/prop-types */
import React, { useState } from "react";
import  Button  from "@mui/material/Button";
import  Card  from "@mui/material/Card";
import  CardHeader  from "@mui/material/CardHeader"
import  CardMedia  from "@mui/material/CardMedia";
import  CardActions  from "@mui/material/CardActions";
import  CardContent  from "@mui/material/CardContent";
import  IconButton  from "@mui/material/IconButton";
import  Typography  from "@mui/material/Typography";

import LikeIcon from '@mui/icons-material/ThumbUp';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const sxLike = {
    '&.active':{
        color: 'green'
    }
}

const sxDislike = {
    "&.active": {
        color: "red"
    }
}

const getRatio = (likes, dislikes) => {
    if(likes === 0 || dislikes === 0 ) return ''
    if (likes > dislikes) return `Ratio ${Math.round(likes / dislikes)} : 1`
    return `Ratio 1:${Math.round(dislikes / likes)}`
}

const Film = ({ film }) => {
    console.log("laaaaaaaaaaaaaaaaaaaaaaaaaaa",film)
    const { title, category, likes, dislikes, img } = film;
    const [isLike, setIsLike]= useState(false);
    const [isDislike, setIsDislike] = useState(false);
    

    const handleLike = () => {
        setIsLike(!isLike)
        setIsDislike(false)
    }

    const handleDislike = () => {
        setIsDislike(!isDislike)
        setIsLike(false)

    }



    return(
        <Card sx={{width: 200}} align="center">
            <CardHeader>
                <LocalMoviesIcon />
            </CardHeader>
            <CardMedia 
                component="img"
                height="300"
                image={img}
                alt="Affiche Movie"
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">{category}</Typography>

                <CardActions sx={{ justifyContent: "center"}}>

                    <IconButton size="small">
                        <LikeIcon sx={sxLike} className={isLike ? "active" : ""} onClick={handleLike} />
                        {likes}
                    </IconButton>

                    <IconButton size="small">
                        <DislikeIcon sx={sxDislike} className={isDislike ? "active" : ""} onClick={handleDislike} />
                        {dislikes}
                    </IconButton>

                </CardActions>

                <Typography variant="body2" component="div">
                    {getRatio(likes, dislikes)}
                </Typography>

                <CardActions sx={{ justifyContent: "center" }}>
                    <Button size="small" variant="outlined">
                        Supprimer
                    </Button>
                </CardActions>

            </CardContent>
        </Card>
    )
}


export default Film

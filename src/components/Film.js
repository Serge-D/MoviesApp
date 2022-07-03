/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import LikeIcon from '@mui/icons-material/ThumbUp'
import DislikeIcon from '@mui/icons-material/ThumbDown'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'

import { deleteFilm, filmsSelector, updateFilm } from '../redux/films'
import { paginationSelector, updatePagination} from "../redux/pagination"

const sxLike = {
	'&.active': {
		color: 'green',
	},
}

const sxDislike = {
	'&.active': {
		color: 'red',
	},
}

const getRatio = (likes, dislikes) => {
	if (likes === 0 || dislikes === 0) return ''
	if (likes > dislikes) return `Ratio ${Math.ceil(likes / dislikes)} : 1`
	return `Ratio 1:${Math.ceil(dislikes / likes)}`
}

const Film = ({ film }) => {
	const dispatch = useDispatch()
    const [isLike, setIsLike] = useState(false)
	const [isDislike, setIsDislike] = useState(false)
	const [isDelete, setIsDelete] = useState(false)
	const [isUpdate, setIsUpdate] = useState(false)
	const { films, totalFilms } = useSelector(filmsSelector)
	const { currentPage, filmsPerPage } = useSelector(paginationSelector)

	const { 
        id, 
        title, 
        category, 
        likes, 
        dislikes,
        isLike: isFilmLike,
        isDislike: isFilmDislike,
        img
    } = film

    useEffect(()=>{
        if(isFilmLike !== null) setIsLike(isFilmLike)
        if(isFilmDislike !== null) setIsDislike(isFilmDislike)
    }, [])

    useEffect(()=>{
        const payload = {
            films,
            currentPage,
            filmsPerPage,
            totalFilms
        }
        if(isDelete){
            setIsDelete(false)
            dispatch(updatePagination(payload))
        }
    },[isDelete])

    useEffect(()=>{
        const payload = {
            films,
            currentPage,
            filmsPerPage,
            totalFilms
        }
        if(isUpdate){
            setIsUpdate(false)
            dispatch(updatePagination(payload))
        }
    },[isUpdate])

	const handleDelete = () => {
		dispatch(deleteFilm(id))
        setIsDelete(true)
	}

	const handleLike = () => {
		let newDislikes = dislikes
		setIsLike(true)
		if (isDislike) {
			--newDislikes
			setIsDislike(false)
		}
		const payload = { id, likes: likes + 1, dislikes: newDislikes, isLike, isDislike }
		dispatch(updateFilm(payload))
		setIsUpdate(true)
	}
    
    const handleUnlike = () => {
		setIsLike(false)
		const payload = { id, likes: likes - 1, dislikes, isLike, isDislike }
		dispatch(updateFilm(payload))
		setIsUpdate(true)
	}

	const handleDislike = () => {
		let newLikes = likes
		setIsDislike(true)
		if (isLike) {
			--newLikes
			setIsLike(false)
		}
		const payload = { id, likes: newLikes, dislikes: dislikes + 1, isLike, isDislike }
		dispatch(updateFilm(payload))
		setIsUpdate(true)
	}
    const handleUndislike = () => {
		setIsDislike(false)
		const payload = { id, likes, dislikes: dislikes - 1, isLike, isDislike }
		dispatch(updateFilm(payload))
		setIsUpdate(true)
	}

	return (
		<Card sx={{ width: 300 }} align="center">
			<CardHeader
				avatar={
					<Avatar>
						<LocalMoviesIcon />
					</Avatar>
				}
				titleTypographyProps={{ variant: 'h5' }}
				title={title}
			/>
			<CardMedia component="img" height="300" image={img} alt="Affiche Movie" />
			<CardContent>
				<Typography variant="body2">{category}</Typography>

				<CardActions sx={{ justifyContent: 'center' }}>
					<IconButton size="small">
						<LikeIcon sx={sxLike} className={isLike ? 'active' : ''} onClick={isLike ? handleUnlike : handleLike} />
						{likes}
					</IconButton>

					<IconButton size="small">
						<DislikeIcon
							sx={sxDislike}
							className={isDislike ? 'active' : ''}
							onClick={isDislike ? handleUndislike : handleDislike}
						/>
						{dislikes}
					</IconButton>
				</CardActions>

				<Typography variant="body2" component="div">
					{getRatio(likes, dislikes)}
				</Typography>

				<CardActions sx={{ justifyContent: 'center' }}>
					<Button size="small" variant="outlined" color="error" onClick={handleDelete}>
						Supprimer
					</Button>
				</CardActions>
			</CardContent>
		</Card>
	)
}

export default Film

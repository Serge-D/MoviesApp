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

import { filmsSelector, deleteFilm, updateFilm } from '../redux/films'
import { updateCurrentFilms, updateCategories, paginationSelector } from '../redux/pagination'

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
	const [isDelete, setIsDelete] = useState(false)
	const [isUpdate, setIsUpdate] = useState(false)
	const [isLikeChecked, setIsLikeChecked] = useState(false)
	const [isDislikeChecked, setIsDislikeChecked] = useState(false)
	const [isUpdateCategories, setIsUpdateCategories] = useState(false)
	const { filteredFilms } = useSelector(paginationSelector)
	const { films } = useSelector(filmsSelector)

	const { id, title, category, likes, dislikes, isLiked, isDisliked, img } = film

	useEffect(() => {
		if (isLiked) setIsLikeChecked(true)
		else setIsLikeChecked(false)
	}, [isLiked])

	useEffect(() => {
		if (isDisliked) setIsDislikeChecked(true)
		else setIsDislikeChecked(false)
	}, [isDisliked])

	useEffect(() => {
		if (isUpdateCategories) {
			const payload = {
				filteredFilms,
				totalFilteredFilms: filteredFilms.length,
			}
			setIsUpdateCategories(false)
			dispatch(updateCurrentFilms(payload))
		}
	}, [isUpdateCategories])

	useEffect(() => {
		if (isDelete) {
			const payload = { films }
			dispatch(updateCategories(payload))
			setIsUpdateCategories(true)
			setIsDelete(false)
		}
	}, [isDelete])

	useEffect(() => {
		if (isUpdate) {
			const payload = { films }
			dispatch(updateCategories(payload))
			setIsUpdateCategories(true)
			setIsUpdate(false)
		}
	}, [isUpdate])

	const handleDelete = () => {
		dispatch(deleteFilm(id))
		setIsDelete(true)
	}

	const handleLike = () => {
		let newDislikes = dislikes
		setIsLikeChecked(true)
		if (isDislikeChecked) {
			--newDislikes
			setIsDislikeChecked(false)
		}

		const payload = {
			id,
			likes: likes + 1,
			dislikes: newDislikes,
			isLiked: true,
			isDisliked: false,
		}

		dispatch(updateFilm(payload))
		setIsUpdate(true)
	}

	const handleUnlike = () => {
		setIsLikeChecked(false)
		const payload = {
			id,
			likes: likes - 1,
			dislikes,
			isLiked: false,
			isDisliked: false,
		}

		dispatch(updateFilm(payload))
		setIsUpdate(true)
	}

	const handleDislike = () => {
		let newLikes = likes
		setIsDislikeChecked(true)

		if (isLiked) {
			--newLikes
			setIsLikeChecked(false)
		}
		const payload = {
			id,
			likes: newLikes,
			dislikes: dislikes + 1,
			isLiked: false,
			isDisliked: true,
		}

		dispatch(updateFilm(payload))
		setIsUpdate(true)
	}
	const handleUndislike = () => {
		setIsDislikeChecked(false)

		const payload = { id, likes, dislikes: dislikes - 1, isLiked: false, isDisliked: false }

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
						<LikeIcon
							sx={sxLike}
							className={isLikeChecked ? 'active' : ''}
							onClick={isLikeChecked ? handleUnlike : handleLike}
						/>
						{likes}
					</IconButton>

					<IconButton size="small">
						<DislikeIcon
							sx={sxDislike}
							className={isDislikeChecked ? 'active' : ''}
							onClick={isDislikeChecked ? handleUndislike : handleDislike}
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
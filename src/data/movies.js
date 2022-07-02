/* eslint-disable no-unused-vars */
const movies = [
    {
      id: '1',
      title: 'Oceans 8',
      category: 'Comedy',
      likes: 4,
      dislikes: 1,
      img:'https://fr.web.img3.acsta.net/pictures/18/05/14/12/19/5676009.jpg'
    }, {
      id: '2',
      title: 'Midnight Sun',
      category: 'Comedy',
      likes: 2,
      dislikes: 0,
      img:'https://m.media-amazon.com/images/I/41k0MtUyhkL.jpg'
    }, {
      id: '3',
      title: 'Les indestructibles 2',
      category: 'Animation',
      likes: 3,
      dislikes: 1,
      img:'https://fr.web.img6.acsta.net/pictures/18/04/13/15/09/0323902.jpg'
    }, {
      id: '4',
      title: 'Sans un bruit',
      category: 'Thriller',
      likes: 6,
      dislikes: 6,
      img:'https://fr.web.img3.acsta.net/pictures/18/03/22/16/48/2454348.jpg'
    }, {
      id: '5',
      title: 'Creed II',
      category: 'Drame',
      likes: 16,
      dislikes: 2,
      img:'https://www.ecranlarge.com/uploads/image/001/049/creed-ii-affiche-francaise-1049850.jpg'
    }, {
      id: '6',
      title: 'Pulp Fiction',
      category: 'Thriller',
      likes: 11,
      dislikes: 3,
      img:'https://images.affiches-et-posters.com//albums/3/6327/medium/affiche-film-pulp-fiction-67842.jpg'
    }, {
      id: '7',
      title: 'Kill Bill',
      category: 'Thriller',
      likes: 12333,
      dislikes: 32,
      img:'https://m.media-amazon.com/images/I/51dcJZjHjbL._AC_.jpg'
    }, {
      id: '8',
      title: 'Seven',
      category: 'Thriller',
      likes: 2,
      dislikes: 1,
      img:'https://www.ecranlarge.com/media/cache/1600x1200/uploads/image/001/121/mohx8jgzideamlj1cqdzclyhmry-823.jpg'
    }, {
      id: '9',
      title: 'Inception',
      category: 'Thriller',
      likes: 2,
      dislikes: 1,
      img:'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_SL1500_.jpg'
    }, {
      id: '10',
      title: 'Gone Girl',
      category: 'Thriller',
      likes: 22,
      dislikes: 12,
      img:'https://www.ecranlarge.com/uploads/image/001/148/7xkj1acu40bjzlhvprilwjfvw7-555.jpg'
    },
  ]
  
  export const movies$ = new Promise((resolve, reject) => setTimeout(resolve, 100, movies))
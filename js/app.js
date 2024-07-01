let page = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');
const filter = document.getElementById('filter-opt');
const button = document.querySelector('.button');
const nav = document.querySelector('.nav');

button.addEventListener('click',()=>{
    nav.classList.toggle('activo');
})

filter.addEventListener("change", function() {
	page = 1;
	getMovies(filter.value);
});

goToTop = () => window.scroll({top: 0, behavior: 'smooth'});

btnSiguiente.addEventListener('click', () => {
	if(page < 1000){
		page += 1;
		getMovies(filter.value);		
	}
});

btnAnterior.addEventListener('click', () => {
	if(page > 1){
		page -= 1;
		getMovies(filter.value);
	}
});

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});


btnClose = () => modal_container.classList.remove('show');

const getMovie = async(id) => {  
	try {
	  	const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3fed0b6eb79f693a90195039eaca3561&language=es-MX`)
	  	
    	// Si la respuesta es correcta
		if(response.status === 200){
			const movie = await response.json();
			
			let movieDetails = '';
			movieDetails = `
			<div class="modal">
				<img class="thumb" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
				<h6 class="textos">Título original: ${movie.original_title}</h6>
				<h6 class="textos">Género: ${movie.genres[0].name}</h6>
				<h6 class="textos">Valoración media: ${movie.vote_average.toFixed(2)} / 10.00</h6>
				<h6 class="textos">Fecha estreno (Año-Mes-Día): ${movie.release_date}<br><br></h6>
				<h6 class="textos">Sinopsis: ${movie.overview}</h6>				
				<button onclick="btnClose()">Cerrar</button>
			</div>
		`;
		modal_container.classList.add('show');
		document.getElementById('modal_container').innerHTML = movieDetails;

		} else if(response.status === 401){
			console.log('Error de autenticación');
		} else if(response.status === 404){
			console.log('Recurso inexistente');
		} else {
			console.log('Ha ocurrido un error');
		}

	} catch(error){
		console.log(error);
	}
}

const getMovies = async(filter) => {
	let optSelected = filter;
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/${optSelected}?api_key=3fed0b6eb79f693a90195039eaca3561&language=es-MX&page=${page}`);
	
		// Si la respuesta es correcta
		if(response.status === 200){
			const datos = await response.json();
			
			let movies = '';
			datos.results.forEach(movie => {
				movies += `
					<article class="movie">
						<img class="card" onclick="getMovie(${movie.id})" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
						<div class="movie-info"><h3>${movie.title}</h3></div>
					</article>
				`;
			});

			document.getElementById('contenedor').innerHTML = movies;

		} else if(response.status === 401){
			console.log('Error de autenticación');
		} else if(response.status === 404){
			console.log('Recurso inexistente');
		} else {
			console.log('Ha ocurrido un error');
		}

	} catch(error){
		console.log(error);
	}
	goToTop();
}

getMovies(filter.value);


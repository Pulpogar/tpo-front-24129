const getGendres = async() => {
	
	try {

		const options = {
			method: 'GET',
			headers: {
			  accept: 'application/json',
			  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmVkMGI2ZWI3OWY2OTNhOTAxOTUwMzllYWNhMzU2MSIsInN1YiI6IjY0NjQ0YmQ5MDI4NDIwMDEzNjM4NDZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AGwsxHZb0RkPY1-zoIuUsZktNIbYm5lw-_ug9Jr0IHE'
			}
		  };
		  
		const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', options)
			
		console.log(response);

		// Si la respuesta es correcta
		if(response.status === 200){
			const datos = await response.json();
			
			let generos = `<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Descripción</th>
								</tr>
							</thead>
							<tbody>`;
			datos.genres.forEach(genero => {
				generos += `				
					<tr>
						<td>${genero.id}</td>
						<td>${genero.name}</td>
					</tr>			
				`;
			});
			generos += `</tbody> 						 			  
						</table>`;
			document.getElementById('generos').innerHTML = generos;

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
getGendres();
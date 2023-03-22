let movieSearch = document.querySelector('#search-movie');
let movieListContainer = document.querySelector('#movie-list-container');
let serachButton = document.querySelector('#search-button');

serachButton.addEventListener('click', () => {
    let inputVal = movieSearch.value;
    movieSearchHandler(inputVal);
    movieSearch.value = "";

});

async function movieSearchHandler(input) {
    let response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9e2b2c5cd26ba9278586e92a66edb1be&language=en-US');

    let getData = await response.json();
    console.log(getData.genres);
    appendSideBar(getData.genres)
    if (!input) {
        let res = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=9e2b2c5cd26ba9278586e92a66edb1be&language=en-US&page=1');
        let data = await res.json();
        appendData(data.results);
    }

    else if (input) {
        let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9e2b2c5cd26ba9278586e92a66edb1be&query=${input}&language=en-US&page=1&include_adult=false`);
        let data = await res.json();
        console.log(data.results);
        appendData(data.results);
    }
}

movieSearchHandler();

function appendData(data) {
    movieListContainer.innerHTML = "";
    data.map((movie) => {
        let div = document.createElement('div');
        let movieContent = `<div class="image-div">
            <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.backdrop_path ? movie.backdrop_path : '/3s9O5af2xWKWR5JzP2iJZpZeQQg.jpg'}"
                alt="">
        </div>
        <div class="movie-details-class">
            <h3>${movie.original_title}</h3>
            <div>
                <p>${movie.original_language}</p>
                <p>${movie.vote_average.toFixed(1)}</p>
            </div>
        </div>`;

        div.innerHTML = movieContent;

        movieListContainer.append(div);
    })
}

function appendSideBar(data) {
    let genreContent = document.querySelector('#genre-content');
    data.map((data) => {
        let p = document.createElement('p');
        p.innerHTML = data.name;
        p.className = 'genreList';
        genreContent.append(p);
    })

}
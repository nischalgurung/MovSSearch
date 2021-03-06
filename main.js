const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=45232bdb518489d70b10d7934daaab45&page=';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=45232bdb518489d70b10d7934daaab45&query="';

const logo = document.querySelector('.logo');
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const main = document.querySelector('#main');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');

// Get initial movies
getMovies(API_URL);

logo.addEventListener('click',function() {
    getMovies(API_URL);
})

function getMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => showMovies(data.results));

}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
               ${overview}
            </div>
        `
        main.appendChild(movieEl);

    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }

}

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm != '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
})

let i = 1;

prevBtn.addEventListener('click', function () {
    i = --i;
    getMovies(API_URL + i);
    window.scrollTo(0, 0);
    if (i <= 1) {
        prevBtn.classList.add('disabled');
        prevBtn.disabled = true;
    }
});
nextBtn.addEventListener('click', function () {
    i = ++i;
    getMovies(API_URL + i);
    window.scrollTo(0, 0);
    if (i > 1) {
        prevBtn.classList.remove('disabled');
        prevBtn.disabled = false;
    }
});
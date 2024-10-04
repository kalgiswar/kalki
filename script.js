const API_KEY = 'YOUR_OMDB_API_KEY'; // Replace with your OMDb API key

document.getElementById('search-button').addEventListener('click', searchMovies);

async function searchMovies() {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();

    displayMovies(data.Search);
}

function displayMovies(movies) {
    const resultsContainer = document.getElementById('movie-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (movies) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <button onclick="submitReview('${movie.Title}')">Submit Review</button>
            `;
            resultsContainer.appendChild(movieCard);
        });
    } else {
        resultsContainer.innerHTML = '<p>No movies found</p>';
    }
}
function performSearch() {
    const query = document.getElementById('movie-search').value.toLowerCase();
    const movies = document.querySelectorAll('.movie-item');

    movies.forEach(movie => {
        const title = movie.querySelector('p').textContent.toLowerCase(); // Get the movie title
        if (title.includes(query)) {
            movie.style.display = 'block'; // Show movie if it matches the search query
        } else {
            movie.style.display = 'none'; // Hide movie if it doesn't match
        }
    });
}

function submitReview(movieTitle) {
    const review = prompt(`Write your review for "${movieTitle}":`);
    if (review) {
        alert(`Thank you for your review of "${movieTitle}"!`);
        // Here you could implement functionality to save the review (e.g., local storage, server)
    }
}

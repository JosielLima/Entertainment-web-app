const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = 'http://www.omdbapi.com/'

export async function getMoviesByGenre(genre) {
    const response = await fetch(`${baseUrl}?apikey=${apiKey}&s=${genre}&type=movie`);
    return response.json();
}

export async function getMoviesByYear(year) {
    const response = await fetch(`${baseUrl}?apikey=${apiKey}&s=movie&type=movie&y=${year}`);
    const data = await response.json();
    return data.Search || [];
}
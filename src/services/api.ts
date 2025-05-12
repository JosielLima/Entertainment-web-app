const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = 'http://www.omdbapi.com/'

export async function getMoviesByGenre(genre:string) {
    const response = await fetch(`${baseUrl}?apikey=${apiKey}&s=${genre}&type=movie`);
    const data = await response.json();
    return data.Search || [];
}

export async function getMoviesByYear(year:string) {
    const response = await fetch(`${baseUrl}?apikey=${apiKey}&s=movie&type=movie&y=${year}`);
    const data = await response.json();
    return data.Search || [];
}

export async function getSeriesByYear(year:string) {
    const response = await fetch(`${baseUrl}?apikey=${apiKey}&s=series&type=series&y=${year}`);
    const data = await response.json();
    return data.Search || [];
}

export async function getAllMedias() {
    const response = await fetch(`${baseUrl}?apikey=${apiKey}&s=action`);
    const data = await response.json();
    return data.Search || [];
}


export async function getContentId(id:string) {
    const response = await fetch(`${baseUrl}?apikey=${apiKey}&i=${id}`);
    const data = await response.json();

    // Verificar se a resposta foi bem-sucedida
    if (data.Response === "True") {
        return {
            imdbID: data.imdbID,
            Title: data.Title,
            Poster: data.Poster,
            Type: data.Type,
            Year: data.Year,
            Rated: data.Rated || "Não informado", // Garante que Rated sempre tenha um valor
            // Adicione outros campos conforme necessário
        };
    } else {
        // Retorna um objeto vazio ou com valores padrão em caso de erro
        return {
            imdbID: id,
            Title: "",
            Poster: "",
            Type: "",
            Year: "",
            Rated: "N/A"
        };
    }
}
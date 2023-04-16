import axios from "axios";

export const getMovieList = async () => {
    const movie = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a1b611e841d84fc9eb33534ea1e0e7c7&language=en-US&page=1`)

    return movie.data.results.slice(0, 6)
}

export const getAllMovieList = async () => {
    const movie = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a1b611e841d84fc9eb33534ea1e0e7c7&language=en-US&page=1`)

    return movie.data.results
}

export const getTvList = async () => {
    const movie = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=a1b611e841d84fc9eb33534ea1e0e7c7&language=en-US&page=1`)

    return movie.data.results.slice(0, 6)
}

export const getAllTvList = async () => {
    const movie = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=a1b611e841d84fc9eb33534ea1e0e7c7&language=en-US&page=1`)

    return movie.data.results
}

export const getMovieDetail = async (id) => {
    const detailmovie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=a1b611e841d84fc9eb33534ea1e0e7c7&language=en-US&append_to_response=videos`)
    // console.log('ini page: ' + detailmovie)
    return detailmovie.data
}

export const getTvDetail = async (id) => {
    const detailmovie = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=a1b611e841d84fc9eb33534ea1e0e7c7&language=en-US&append_to_response=videos`)
    // console.log('ini page: ' + detailmovie)
    return detailmovie.data
}

export const searchMovie = async (q) => {
    const search = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${q}&page=1&api_key=a1b611e841d84fc9eb33534ea1e0e7c7&language=en-US&include_adult=false`)
    return search.data
}

export const searchSeries = async (q) => {
    const search = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${q}&page=1&api_key=a1b611e841d84fc9eb33534ea1e0e7c7&language=en-US&include_adult=false`)
    return search.data
}

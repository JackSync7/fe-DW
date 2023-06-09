import { useEffect } from "react"
import { useState } from "react"
import { getMovieList, getTvList, getAllMovieList, getAllTvList } from "./ApiMovie"
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";
import { useQuery } from "react-query";
import { API } from "../config/api";

const MovieList = () => {
    const [tvSeries, setTvSeries] = useState([])
    const [movie, setMovie] = useState([])
    const [allMovie, setAllMovie] = useState([])
    const [allTv, setAllTv] = useState([])

    const {
        data: films,

    } = useQuery('seriesListCache', async () => {
        const response = await API.get('/films-movie');
        return response.data.data.slice(0, 6);
    });

    const {
        data: series,

    } = useQuery('moviesListCache', async () => {
        const response = await API.get('/films-series');
        return response.data.data.slice(0, 6);
    });

    console.log("films : ", films)
    console.log("SERIES : ", series)
    useEffect(() => {
        getTvList().then((result) => {
            setTvSeries(result)

        })
        getMovieList().then((result) => {
            setMovie(result)

        })
        getAllMovieList().then((result) => {
            setAllMovie(result)

        })
        getAllTvList().then((result) => {
            setAllTv(result)

        })
    }, [])


    const DateModif = moment(tvSeries.first_air_date).format("YYYY")


    const TvSeries = () => {
        return series?.map((tv, i) => {
            return (
                <Link to={`/detailTvShow/?id=${tv.id}`}>
                    <div className="w-48" key={i}>
                        <img className="rounded-md" src={tv.thumbnail} />
                        <div className=" text-slate-100 font-normal text-md px-1 mt-2 h-12">{tv.title}</div>
                        <div className="flex justify-between mt-1 px-1">
                            <div className=" font-medium text-zinc-500">{tv.year}</div>
                        </div>
                    </div>
                </Link>
            )
        })
    }

    const Movies = () => {
        return films?.map((movie, i) => {
            return (
                <Link to={`/detailMovies/?id=${movie.id}`}>
                    <div className="w-48" key={i}>
                        <img className="rounded-md" src={movie.thumbnail} />
                        <div className=" text-slate-100 font-normal text-md px-1 mt-2 h-12">{movie.title}</div>
                        <div className="flex justify-between mt-1 px-1">
                            <div className=" font-medium text-zinc-500">{movie.year}</div>
                        </div>
                    </div>
                </Link>
            )
        })
    }
    const AllMovies = () => {
        return allMovie.map((movie, i) => {
            return (
                <Link to={`/detailMovies/?id=${movie.id}`}>
                    <div className="w-48" key={i}>
                        <img className="rounded-md" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                        <div className=" text-slate-100 font-normal text-md px-1 mt-2 h-12">{movie.title}</div>
                        <div className="flex justify-between mt-1 px-1">
                            <div className=" font-medium text-zinc-500">{DateModif}</div>
                            <div className="mb-4 mr-2 text-slate-100"> <div className="flex"> <FaStar className="mt-1 mr-1 text-orange-400" /> {movie.vote_average}</div></div>
                        </div>
                    </div>
                </Link>
            )
        })
    }

    return (
        <div className="App">
            <header className="App-header">

                {/* <div className="text-center"><input type="text" onChange={({ target }) => search(target.value)} placeholder="find your movies" className="mt-12 rounded-md px-4 py-2 mx-auto shadow-lg w-96" /></div> */}
                <div className="px-20 mx-auto mt-8">
                    <h1 className="text-slate-200 text-3xl block my-4"> TV Series</h1>
                    <div className="flex w-full flex-wrap h-96 items-center gap-6 mt-12 ">
                        <TvSeries />
                    </div>
                    <h1 className="text-slate-200 text-3xl block  my-4 mt-10"> Movies</h1>
                    <div className="flex w-full flex-wrap h-96 items-center gap-6 mt-12 ">
                        <Movies />
                    </div>
                </div>
            </header>
        </div>
    );
}




export default MovieList;
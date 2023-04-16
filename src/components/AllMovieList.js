import { useContext, useEffect, useState } from "react"
import { getAllMovieList, searchMovie } from "./ApiMovie"
import { Link } from "react-router-dom"

import { API } from "../config/api"
import moment from "moment"
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";

function AllMovieList(props) {
    const [allMovie, setAllMovie] = useState([])
    const [getUrl, setUrl] = useState("detailMovies")
    const [state] = useContext(UserContext)

    let { data: films } = useQuery('movieCache', async () => {
        const response = await API.get('/films-movie');
        return response.data.data;
    });
    console.log(films)
    useEffect(() => {
        if (state.user.roles === "admin") {
            setUrl("detailMovies-admin")
        }
    }, [])

    useEffect(() => {
        getAllMovieList().then(result => {
            setAllMovie(result)
        })
    }, [])

    const GetAllMovie = () => {
        return films?.map((movie, i) => {
            return (
                <Link to={`/${getUrl}/?id=${movie?.id}`}>
                    <div className="w-48" key={i}>
                        <img className="rounded-md" src={movie?.thumbnail} />
                        <div className=" text-slate-100 font-normal text-md px-1 mt-2 h-12">{movie?.title}</div>
                        <div className="flex justify-between mt-1 px-1">
                            <div className=" font-medium text-zinc-500">{movie?.year}</div>

                        </div>
                    </div>
                </Link>
            )
        })
    }
    const search = async (q) => {

        if (q.length > 2) {
            const resultSearch = await searchMovie(q)
            setAllMovie(resultSearch.results)
        }
    }

    return (
        <div className="App">
            <header className="App-header">


                <div className="px-24 mx-auto mt-8">
                    <div className="flex justify-between my-4">
                        <h1 className="text-slate-200 text-3xl block "> Movies</h1>
                    </div>
                    <div className="flex w-full flex-wrap h-96 items-center gap-6 mt-12 ">
                        {films?.map((movie, i) => (


                            <Link to={`/${getUrl}/?id=${movie?.id}`}>
                                <div className="w-48">
                                    <img className="rounded-md" src={movie?.thumbnail} />
                                    <div className=" text-slate-100 font-normal text-md px-1 mt-2 h-12">{movie?.title}</div>
                                    <div className="flex justify-between mt-1 px-1">
                                        <div className=" font-medium text-zinc-500">{movie?.year}</div>

                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>

                </div>
            </header>
        </div>
    );

}

export default AllMovieList

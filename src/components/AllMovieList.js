import { useContext, useEffect, useState } from "react"
import { getAllMovieList, searchMovie } from "./ApiMovie"
import { Link } from "react-router-dom"

import { API } from "../config/api"
import moment from "moment"
import { UserContext } from "../context/userContext";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2"


function AllMovieList(props) {
    const [getUrl, setUrl] = useState("detailMovies")
    const [state] = useContext(UserContext)
    const [data, setData] = useState([]);
    const {
        data: movies,
        refetch,
        isLoading,
    } = useQuery('moviesListCache', async () => {
        const response = await API.get('/films-movie');
        return response.data.data;
    });

    const deleteHandle = useMutation((id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    await API.delete(`/film/${id}`)
                    refetch()
                }
            })
        } catch (err) {
            console.error(err)
        }
    })
    useEffect(() => {
        if (state?.user.roles === "admin") {
            setUrl("detailMovies-admin")
        }
    }, [])
    useEffect(() => {
        if (!isLoading) {
            setData(movies?.filter((index) => index.category.name === 'Movies'));
        }
    }, [isLoading]);

    const GetAllMovies = () => {
        return movies?.map((tv, i) => {
            return (
                <div className="w-48" key={i}>
                    <Link to={`/${getUrl}/?id=${tv?.id}`}>
                        <img className="rounded-md" src={tv?.thumbnail} />
                    </Link>
                    <div className=" text-slate-100 font-normal text-md px-1 mt-2 h-12">{tv?.title}</div>
                    <div className="flex justify-between mt-1 px-1">
                        <div className=" font-medium text-zinc-500">{tv?.year}</div>

                    </div>
                    {state.isLogin && state.user.roles === "admin" && (
                        <div className="flex  justify-around">
                            <button onClick={() => { deleteHandle.mutate(tv?.id) }} className="bg-red-600 mt-4 text-sm  text-white px-2 py-1 rounded-md">Delete</button>
                            <Link to={`/updatefilm/${tv.id}`}><button className="bg-blue-600 mt-4 text-sm text-white px-2 py-1 rounded-md">Update</button></Link>
                        </div>
                    )}
                </div>
            )
        })
    }

    return (
        isLoading ? null : <div className="App">
            <header className="App-header">


                <div className="px-24 mx-auto mt-8">
                    <div className="flex justify-between my-4">
                        <h1 className="text-slate-200 text-3xl block "> Movies</h1>
                    </div>
                    <div className="flex w-full flex-wrap h-96 items-center gap-6 mt-12 ">
                        {/* {movies?.map((movie, i) => {
                            return (
                                <Link to={`/${getUrl}/?id=${movie?.id}`} key={i}>
                                    <div className="w-48" >
                                        <img className="rounded-md" src={movie.thumbnail} alt="Hallo" />
                                        <div className=" text-slate-100 font-normal text-md px-1 mt-2 h-12">{movie.title}</div>
                                        <div className="flex justify-between mt-1 px-1">
                                            <div className=" font-medium text-zinc-500">{movie.year}</div>

                                        </div>
                                    </div>
                                </Link>

                            )

                        })} */}
                        <GetAllMovies />
                    </div>

                </div>
            </header>
        </div>
    );

}

export default AllMovieList

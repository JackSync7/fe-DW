
import JumboTron from "../components/JumboTron";
import { getMovieDetail } from "../components/ApiMovie"
import { useState, useEffect, useContext } from "react";
import { FaStar } from "react-icons/fa";
import moment from "moment/moment";
import Trailer from "react-youtube"
import { UserContext } from "../context/userContext";
import { ComponentContext } from "../context/ComponentContext";
import AddEpisode from "../page/admin/AddEpisode"
import { API } from "../config/api"
import { useQuery } from "react-query";


const DetailTvSeries = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = urlParams.get("id");
    const [detailSeries, setDetailSeries] = useState([])
    const [getTrailer, setTrailer] = useState([])
    const [state] = useContext(UserContext)
    const [ComponentState, ComponentDispatch] = useContext(ComponentContext)

    useEffect(() => {

        getMovieDetail(params).then((result) => {
            setDetailSeries(result)
        })
    }, [])
    let { data: films } = useQuery('movieCache', async () => {
        const response = await API.get('/film/' + params);
        return response.data.data;
    });
    console.log(films)
    const genre = (detailSeries.genres)

    const AddEpisodes = () => {
        return (
            <div className="flex justify-end">
                <button onClick={() => ComponentDispatch({ type: 'ADD_EPISODE_MODAL' })} className="bg-red-600 text-white p-2 mr-96 rounded-md mt-10 ">Add Episode</button>
            </div>
        )
    }
    const Genres = () => {
        return genre?.map((tes, i) => {
            return (
                <>
                    <div className="text-white font-semibold text-zinc-400 text-sm" key={i}>
                        {tes.name}
                    </div>
                </>
            )
        })
    }
    const RenderTrailer = () => {
        // const trailer = await detailSeries.videos.results.find(vid => vid.name === "Official Trailer")
        // setTrailer(trailer.key)
        return (
            <>
                {detailSeries && detailSeries.videos?.results.slice(0, 1).map((movie, i) => <Trailer
                    videoId={movie.key} key={i}
                />)}
            </>
        )
    }

    const year = moment(detailSeries.release_date).format('YYYY')
    const Rating = (detailSeries.vote_average)
    // console.log("32" + detailSeries)
    return (
        <div className="App">
            {ComponentState.isAddEpisode && <AddEpisode />}
            <header className="App-header">
                <div className="flex w-full flex-wrap h-96 items-center gap-5 ">
                    <div className="flex flex-col" >
                        <div className="w-screen bg-zinc-900 flex justify-center" >
                            <RenderTrailer />
                            {/* <img className="w-2/3" src={`https://image.tmdb.org/t/p/w500/${detailSeries.backdrop_path}`} /> */}
                        </div>
                        {state?.user.roles === "admin" && <AddEpisodes />}

                        <div className="flex px-20 mt-10 gap-8 w-full">
                            <img className="rounded-md w-48" src={films.thumbnail} />
                            <div className="flex flex-col w-6/12">
                                <div className=" text-zinc-100 font-semibold text-4xl px-1">{films.title}</div>
                                <div className="flex justify-between mt-1 px-1">
                                    <div className=" font-normal text-lg text-zinc-400 mt-2 ">{films.year} <span className="ml-8 border px-2 rounded-sm border-zinc-400">Movies</span></div>
                                </div>
                                <div className="text-white mt-4  h-32 overflow-auto">
                                    {films.description}
                                </div>
                                <div>
                                    {films.title}
                                </div>
                                <div className="flex gap-4 ">
                                    <Genres />
                                </div>
                            </div>
                            <div className="">
                                {/* <img className="" src={`https://image.tmdb.org/t/p/w500/${detailSeries.backdrop_path}`} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default DetailTvSeries
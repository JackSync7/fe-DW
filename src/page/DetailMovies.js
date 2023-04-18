

import React from 'react'
import ReactPlayer from 'react-player'
import { useState, useEffect, useContext } from "react";
import moment from "moment/moment";
import Trailer from "react-youtube"
import { UserContext } from "../context/userContext";
import { ComponentContext } from "../context/ComponentContext";
import AddEpisode from "../page/admin/AddEpisode"
import { API } from "../config/api"



const DetailTvSeries = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = urlParams.get("id");
    const [detailSeries, setDetailSeries] = useState([])
    const [getTrailer, setTrailer] = useState([])
    const [detailMovie, setDetailMovie] = useState({});
    const [state] = useContext(UserContext)
    const [ComponentState, ComponentDispatch] = useContext(ComponentContext)


    const fetchData = async () => {
        const response = await API.get(`/film/` + params);
        setDetailMovie(response.data.data);
    }

    console.log("ini data : ", detailMovie.link)
    useEffect(() => {

        // getMovieDetail(params).then((result) => {
        //     setDetailSeries(result)
        // })
        fetchData();
    }, [])
    // const { data: movie } = useQuery("moviesListCache", async () => {
    //     const response = await API.get(`/film/` + params);
    //     return response.data.data;
    // });
    const genre = (detailSeries.genres)

    const AddEpisodes = () => {
        return (
            <div className="flex justify-end">
                <button onClick={() => ComponentDispatch({ type: 'ADD_EPISODE_MODAL' })} className="bg-red-600 text-white p-2 mr-96 rounded-md mt-10 ">Add Episode</button>
            </div>
        )
    }

    const RenderTrailer = () => {
        // const trailer = await detailSeries.videos.results.find(vid => vid.name === "Official Trailer")
        // setTrailer(trailer.key)
        return (
            <>
                <ReactPlayer url={detailMovie?.link} />

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
                            <img className="rounded-md w-48" src={detailMovie.thumbnail} />
                            <div className="flex flex-col w-6/12">
                                <div className=" text-zinc-100 font-semibold text-4xl px-1">{detailMovie.title}</div>
                                <div className="flex justify-between mt-1 px-1">
                                    <div className=" font-normal text-lg text-zinc-400 mt-2 ">{detailMovie.year} <span className="ml-8 border px-2 rounded-sm border-zinc-400">Movies</span></div>
                                </div>
                                <div className="text-white mt-4  h-32 overflow-auto">
                                    {detailMovie.description}
                                </div>
                                <div>
                                    {detailMovie.title}
                                </div>

                            </div>
                            <div className="w-">

                                {/* <img className="" src={`https://image.tmdb.org/t/p/w500/${detailSeries.backdrop_path}`} /> */}
                                <RenderTrailer
                                    width="600px"
                                    height="300px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default DetailTvSeries
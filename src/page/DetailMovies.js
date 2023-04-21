

import React from 'react'
import ReactPlayer from 'react-player'
import { useState, useEffect, useContext } from "react";
import moment from "moment/moment";
import Trailer from "react-youtube"
import { UserContext } from "../context/userContext";
import { ComponentContext } from "../context/ComponentContext";
import AddEpisode from "../page/admin/AddEpisode"
import UpdateEpisode from "../page/admin/UpdateEpisode";
import { API } from "../config/api"
import { Carousel } from 'flowbite-react';



const DetailTvSeries = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = urlParams.get("id");
    const [detailSeries, setDetailSeries] = useState([])
    const [getTrailer, setTrailer] = useState([])
    const [detailMovie, setDetailMovie] = useState({});
    const [dataEpisode, setDataEpisode] = useState([]);
    const [state] = useContext(UserContext)
    const [ComponentState, ComponentDispatch] = useContext(ComponentContext)


    const fetchData = async () => {
        const response = await API.get(`/film/` + params);
        setDetailMovie(response.data.data);
    }
    const fetchEpisode = async () => {
        const response = await API.get(`/film/${params}/episode`);
        setDataEpisode(response.data.data);
    }



    useEffect(() => {
        fetchEpisode();
        fetchData();

    }, [])

    const genre = (detailSeries.genres)

    const AddEpisodes = () => {
        return (
            <div className="flex justify-end gap-6">
                <button onClick={() => ComponentDispatch({ type: 'ADD_EPISODE_MODAL' })} className="bg-red-600 text-white p-2  rounded-md mt-10 ">Add Episode</button>
                <button onClick={() => ComponentDispatch({ type: 'UPDATE_EPISODE_MODAL' })} className="text-red-600 bg-white p-2 mr-72 rounded-md mt-10 ">Update Episode</button>
            </div>
        )
    }

    const RenderTrailer = () => {
        return (
            <div>
                <ReactPlayer url={detailMovie?.link} />
            </div>
        )
    }
    const RenderTrailer2 = () => {
        return (
            <div className='w-96 h-64' >
                <ReactPlayer url={detailMovie?.link} width={'100%'} height={'100%'} />
            </div>
        )
    }


    const year = moment(detailSeries.release_date).format('YYYY')
    const Rating = (detailSeries.vote_average)
    // console.log("32" + detailSeries)
    return (
        <div className="App">
            {/* {ComponentState.isAddEpisode && <AddEpisode />}
            {ComponentState.isUpdateEpisode && <UpdateEpisode />} */}

            <header className="App-header">
                <div className="flex w-full flex-wrap h-96 items-center gap-5 ">
                    <div className="flex flex-col" >
                        <div className="w-screen bg-zinc-900 flex justify-center" >
                            <RenderTrailer />
                            {/* <img className="w-2/3" src={`https://image.tmdb.org/t/p/w500/${detailSeries.backdrop_path}`} /> */}
                        </div>
                        {/* {state?.user.roles === "admin" && <AddEpisodes />} */}

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
                            <div className="">
                                <div className="h-full w-96 ">
                                    <RenderTrailer2 />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default DetailTvSeries
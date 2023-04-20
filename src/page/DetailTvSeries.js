
import JumboTron from "../components/JumboTron";
import { getTvDetail } from "../components/ApiMovie"
import { useState, useEffect, useContext } from "react";
import { FaStar } from "react-icons/fa";
import moment from "moment/moment";
import { API } from "../config/api";
import { ComponentContext } from "../context/ComponentContext";
import ReactPlayer from "react-player";
import { UserContext } from "../context/userContext";
import AddEpisode from "./admin/AddEpisode";
import UpdateEpisode from "./admin/UpdateEpisode";
import { Carousel } from "flowbite-react";

const DetailTvSeries = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = urlParams.get("id");
    const [state] = useContext(UserContext)
    const [dataSeries, setDataSeries] = useState([])
    const [ComponentState, ComponentDispatch] = useContext(ComponentContext)
    const [detailSeries, setDetailSeries] = useState([])


    const fetchData = async () => {
        const response = await API.get(`/film/` + params);
        setDetailSeries(response.data.data);
    }
    const fetchSeries = async () => {
        const response = await API.get(`/film/${params}/episode`);
        setDataSeries(response.data.data);
    }
    useEffect(() => {
        fetchData();
        fetchSeries()
    }, [])


    const RenderTrailer = () => {
        return (
            <>
                <ReactPlayer url={detailSeries?.link} />
            </>
        )
    }

    const genre = (detailSeries.genres)
    const AddEpisodes = () => {
        return (
            <div className="flex justify-end gap-6">
                <button onClick={() => ComponentDispatch({ type: 'ADD_EPISODE_MODAL' })} className="bg-red-600 text-white p-2  rounded-md mt-10 ">Add Episode</button>
                <button onClick={() => ComponentDispatch({ type: 'UPDATE_EPISODE_MODAL' })} className="text-red-600 bg-white p-2 mr-72 rounded-md mt-10 ">Update Episode</button>
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
    const year = moment(detailSeries.release_date).format('YYYY')
    const Rating = (detailSeries.vote_average)

    return (
        <div className="App">
            {ComponentState.isAddEpisode && <AddEpisode />}
            {ComponentState.isUpdateEpisode && <UpdateEpisode />}
            <header className="App-header">
                <div className="flex w-full flex-wrap h-96 items-center gap-5 ">
                    <div className="flex flex-col" >
                        <div className="w-screen bg-zinc-900 flex justify-center" >
                            {/* <img className="w-2/3" src={detailSeries.thumbnail} /> */}
                            <RenderTrailer />
                        </div>
                        {state?.user.roles === "admin" && <AddEpisodes />}
                        <div className="flex p-20 gap-8 w-full">
                            <a href={`${detailSeries.homepage}`}> <img className="rounded-md w-48" src={detailSeries.thumbnail} /></a>
                            <div className="flex flex-col w-6/12">
                                <div className=" text-zinc-100 font-semibold text-4xl px-1">{detailSeries.title}</div>
                                <div className="flex justify-between mt-1 px-1">
                                    <div className=" font-normal text-lg text-zinc-400 mt-2 ">{year} <span className="ml-8 border px-2 rounded-sm border-zinc-400">TV Series</span></div>
                                </div>
                                <div className="text-white mt-4  h-32 overflow-auto">
                                    {detailSeries.description}
                                </div>
                                <div>
                                    {detailSeries.original_title}
                                </div>
                                <div className="flex gap-4 ">
                                    <Genres />
                                </div>
                            </div>
                            <div className="">
                                {/* {detailSeries.last_episode_to_air.still_path ? <LastEpsTrue /> : <LastEpsFalse />} */}
                                <div className="h-full w-96 ">
                                    <Carousel>
                                        {dataSeries.map((data, index) => (
                                            <div className='' key={index}>
                                                <div className='flex flex-col' >
                                                    <img className='object-none h-52'
                                                        src={data.thumbnail}
                                                        alt="..."
                                                    />
                                                </div>
                                                <div>
                                                    <p className='text-white '>{data.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                                <span>episode</span>
                            </div>
                        </div>

                    </div>
                </div>
            </header>
        </div>
    );
}

export default DetailTvSeries
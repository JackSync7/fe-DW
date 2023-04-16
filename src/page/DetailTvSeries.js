
import JumboTron from "../components/JumboTron";
import { getTvDetail } from "../components/ApiMovie"
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import moment from "moment/moment";

const DetailTvSeries = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = urlParams.get("id");
    const [detailSeries, setDetailSeries] = useState([])

    useEffect(() => {

        getTvDetail(params).then((result) => {
            setDetailSeries(result)

        })

    }, [])

    const LastEpsTrue = () => {
        return (
            <>
                <img className="" src={`https://image.tmdb.org/t/p/w500/${detailSeries.next_episode_to_air.still_path}`} />
            </>
        )
    }
    const LastEpsFalse = () => {
        return (
            <>
                <img className="" src={`https://image.tmdb.org/t/p/w500/${detailSeries.backdrop_path}`} />
            </>
        )
    }

    const genre = (detailSeries.genres)


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
            <header className="App-header">
                <div className="flex w-full flex-wrap h-96 items-center gap-5 ">
                    <div className="flex flex-col" >
                        <div className="w-screen bg-zinc-900 flex justify-center" >
                            <img className="w-2/3" src={`https://image.tmdb.org/t/p/w500/${detailSeries.backdrop_path}`} />
                        </div>
                        <div className="flex p-20 gap-8 w-full">
                            <a href={`${detailSeries.homepage}`}> <img className="rounded-md w-48" src={`https://image.tmdb.org/t/p/w500/${detailSeries.poster_path}`} /></a>
                            <div className="flex flex-col w-6/12">
                                <div className=" text-zinc-100 font-semibold text-4xl px-1">{detailSeries.name}</div>
                                <div className="flex justify-between mt-1 px-1">
                                    <div className=" font-normal text-lg text-zinc-400 mt-2 ">{year} <span className="ml-8 border px-2 rounded-sm border-zinc-400">TV Series</span></div>
                                    <div className="mb-4 mr-2 text-slate-100"> <div className="flex"> <FaStar className="mt-1 mr-1 text-orange-400" /> {Rating}</div></div>
                                </div>
                                <div className="text-white mt-4  h-32 overflow-auto">
                                    {detailSeries.overview}
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
                                <LastEpsFalse />
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
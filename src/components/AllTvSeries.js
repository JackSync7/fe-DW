import { useContext, useEffect, useState } from "react"
import { getAllTvList, searchSeries } from "./ApiMovie"
import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import moment from "moment"
import { UserContext } from "../context/userContext";
import { API } from "../config/api"
import { useQuery } from "react-query";

function AllTvSeries(props) {
    const [allTv, setAllTv] = useState([])
    const [getUrl, setUrl] = useState("detailTvShow")
    const [state] = useContext(UserContext)
    let { data: films } = useQuery('GetSeriesCache', async () => {
        const response = await API.get('/films-series');
        return response.data.data;
    });
    useEffect(() => {
        if (state.user.roles === "admin") {
            setUrl("detailTvShow-admin")
        }
    }, [])

    useEffect(() => {
        getAllTvList().then(result => {
            setAllTv(result)
        })
    }, [])
    const DateModif = moment(allTv.first_air_date).format("YYYY")
    const GetAllTv = () => {
        return films?.map((tv, i) => {
            return (
                <Link to={`/${getUrl}/?id=${tv?.id}`}>
                    <div className="w-48" key={i}>
                        <img className="rounded-md" src={tv?.thumbnail} />
                        <div className=" text-slate-100 font-normal text-md px-1 mt-2 h-12">{tv?.title}</div>
                        <div className="flex justify-between mt-1 px-1">
                            <div className=" font-medium text-zinc-500">{tv?.year}</div>

                        </div>
                    </div>
                </Link>
            )
        })
    }
    const searchTV = async (q) => {
        if (q.length > 2) {
            const resultSearch = await searchSeries(q)
            setAllTv(resultSearch.results)
        }
    }
    return (
        <div className="App">
            <header className="App-header">

                {/* <div className="text-center"><input type="text" onChange={({ target }) => search(target.value)} placeholder="find your movies" className="mt-12 rounded-md px-4 py-2 mx-auto shadow-lg w-96" /></div> */}
                <div className="px-24 mx-auto mt-8">
                    <div className="flex justify-between my-4">
                        <h1 className="text-slate-200 text-3xl block"> TV Series</h1>
                        {/* <label for="search" className="absolute right-20 mr-52 mt-2"><BsSearch color="white" /></label>
                        <input onChange={({ target }) => searchTV(target.value)} id="search" type="text" className="bg-zinc-800 rounded-xl border-2 text-white text-right px-5 border-zinc-400" placeholder="find your movie here"></input> */}
                    </div>
                    <div className="flex w-full flex-wrap h-96 items-center gap-6 mt-12 ">
                        <GetAllTv />
                    </div>

                </div>
            </header>
        </div>
    );

}

export default AllTvSeries

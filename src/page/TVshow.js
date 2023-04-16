import Film from "../components/AllTvSeries"
import MovieList from "../components/MovieList"
import AllTvSeries from "../components/AllTvSeries"

const TVshow = () => {

    return (
        <div className="bg-black">
            <div className="absolute flex flex-col mt-40 gap-6 ml-36 ">
                <div>
                    <img className="" src={require("../images/titleTvshow.png")} alt="" />
                </div>
                <div>
                    <p className=" text-white text-lg text-sh w-6/12 drop-shadow-lg shadow-black">Money Heist is a crime drama on Netflix - originally called La Casa de Papel. Money Heist season 3 has just been released by the streaming service. The plot reads: "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan."</p>
                </div>
                <div>
                    <button className=" bg-red-600 text-white font-medium text-lg py-3 px-14">WATCH NOW! </button>
                </div>
            </div>
            <div>
                <img className="" src={require("../images/tvshowJumbotron.png")} alt="" />
            </div>
            {/* <Film film={movies} /> */}
            <AllTvSeries />
        </div>
    )
}
export default TVshow
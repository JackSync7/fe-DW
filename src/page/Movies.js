import AllMovieList from "../components/AllMovieList"



const Movies = () => {

    return (
        <div className="bg-black ">
            <div className="absolute flex flex-col mt-40 gap-6 ml-36  h-screen">
                <div>
                    <img className="" src={require("../images/titleMovies.png")} alt="" />
                </div>
                <div>
                    <p className=" text-white text-lg text-sh w-6/12 drop-shadow-lg shadow-black">In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.</p>
                </div>
                <div>
                    <button className=" bg-red-600 text-white font-medium text-lg py-3 px-14">WATCH NOW! </button>
                </div>
            </div>
            <div>
                <img className="-mt-10" src={require("../images/moviesJumbotron.png")} alt="" />
            </div>
            <AllMovieList />
        </div>
    )
}
export default Movies
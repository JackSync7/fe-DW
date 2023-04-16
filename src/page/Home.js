// import Navbar from "../components/Navbar";
import { useContext } from "react";
import JumboTron from "../components/JumboTron";
// import Film from "../components/AllTvSeries";
import MovieList from "../components/MovieList";
// import Login from "../components/Login";
import "../universal.css"
import { UserContext } from "../context/userContext";
// import Regis from "../components/Register"
// import { useState } from "react";

const Home = () => {
    const [state] = useContext(UserContext)
    console.log(state)
    return (
        <div className="bg-black flex flex-col">
            {/* <Navbar click={setIsClick} clickRegis={setIsRegis} isLogin={isLogin} /> */}
            <JumboTron />
            <MovieList />

        </div>
    )
}
export default Home
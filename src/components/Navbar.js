// import Login from './Login.js'
import { useEffect, useContext } from "react";
// import { API } from "../config/api"
import { Link } from "react-router-dom";
import { StatusLoginContext } from "../context/statusLoginContext";
import { DropdownContext } from "../context/dropdownContex";
import { UserContext } from "../context/userContext";
import { UserDropDownContext } from "../context/userDropdown";



function Navbar(props) {
    const [adminDown, setAdminDown] = useContext(DropdownContext)
    const [dropDown, setDropDown] = useContext(UserDropDownContext)
    const [isLogins] = useContext(StatusLoginContext)
    const [state] = useContext(UserContext)


    const cekAdmin = () => {

        let token = state.user.token
        let role = state.user.roles

        if (role === "admin" && token !== null) {
            setAdminDown(true)
            return
        } else if (role === "customer" && token !== null) {
            setDropDown(true)
            return
        } else {
            props.showMenu(false)
            props.adminMenu(false)
        }

    }

    const DetailProfile = () => {
        return (
            <div className="h-full w-full fixed left-0 top-0 flex justify-center items-center absolute backdrop:blur-sm ">
                <div className="h-96 w-96 z-10 bg-black rounded-lg mx-auto fixed shadow-xl ">
                    <div className="flex justify-between">
                        <h1 className="text-white font-bold text-3xl mt-12 ml-7">Login</h1>

                    </div>
                    <div className=" flex flex-col gap-5 items-center mx-auto mt-10 justify-center ">
                        <input className="py-2 px-4 w-72 bg-neutral-600 border-slate-50 text-white rounded-sm" id="email" type="email" placeholder="Email" />
                        <input className="py-2 px-4 w-72 bg-neutral-600 rounded-sm text-white" id="password" type="password" placeholder="Password" />
                        <button className="bg-red-600 text-white font-bold px-28 py-1 mt-4 ">Login</button>
                        <p className='text-slate-200 text-sm'>Dont't have an account ? Click <a className='font-bold' href="#" >Here</a> </p>
                    </div>
                </div>
                <div className="h-full w-full fixed left-0 top-0 flex justify-center items-center absolute backdrop:blur-sm bg-black bg-opacity-60"></div>
            </div>
        )
    }
    const IsLogin = () => {
        return (
            <div onMouseOver={() => cekAdmin()}>
                <button > <img className="w-8 h-8 z-50  mr-10" src={require("../images/profileHome.png")} />  </button>
            </div>
        )
    }
    const NotLogin = () => {
        return (
            <>
                <button onClick={() => props.clickRegis(true)} className=" px-4 mx-4 bg-white text-red-700 rounded-md border-red-700">Register</button>
                <button onClick={() => props.click(true)} className=" mr-4 px-4 bg-red-700 text-white rounded-md">Login</button>
            </>
        )
    }
    return (

        <div className="bg-zinc-900 h-full shadow-lg py-4 flex flex-row justify-between">
            {state.user.roles !== "admin" ? (
                <div className="w-full">
                    <ul className="text-white flex flex-row gap-10 ml-10  px-3">
                        <Link to={"/"}><button className="p-3">Home</button></Link>
                        <Link to={"/tvshow"}><button className=" p-3">TV Series</button></Link>
                        <Link to={"/movies"}><button className=" p-3">Movies</button></Link>
                    </ul>
                </div>
            ) : null}
            <div className="justify-center w-full">
                <img className="mx-auto mt-2" src={require("../images/icon.png")} alt="" />
            </div>
            <div className="gap-3 flex mr-6 w-full justify-end">

                {state.isLogin ? <IsLogin /> : <NotLogin />}

            </div>
            {/* {clickStatus && <Login get={clickStatus} set={setClickStatus} isLogin={setIsLogin} />} */}

        </div>

    )
}

export default Navbar;
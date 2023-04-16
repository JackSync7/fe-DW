import Swal from 'sweetalert2'
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
// import { ShowMenu } from '../App';

function DropDown(props) {
    const [_, userDispatch] = useContext(UserContext)
    // const showMenu = useContext(ShowMenu)
    const [toggle, setToggle] = useState(false)
    function handleDropdown() {
        setToggle(true)
    }
    function handlehide() {
        if (toggle) {
            props.showMenu(false)
        }

    }

    function logout() {

        userDispatch({
            type: 'LOGOUT'
        })
    }

    return (

        <div>
            <div className="h-full w-full  left-0 top-0 flex justify-center items-center">
                <div className="h-28 w-44 right-10 top-20 z-10 rounded-lg mx-auto fixed shadow-xl absolute" onMouseOver={() => handleDropdown()} onMouseLeave={() => handlehide()} style={{ backgroundColor: '#1F1F1F' }}>
                    <img className="absolute -top-5 right-1" src={require("../images/Polygon.png")} />
                    <div className="flex flex-col justify-between p-4 gap-3">
                        <Link to={"/film"}>
                            <div className='flex gap-3 ml-2 transition hover:scale-110'>
                                <img className=' w-5' src={require("../images/profile/film.png")} />
                                <span className='text-white font-semibold'>Film</span>
                            </div>
                        </Link>

                    </div>
                    <Link to={"/"}>
                        <div onClick={() => logout()} className=' border-t-2  py-4 border-zinc-700'>
                            <span className='transition hover:scale-110 flex  gap-3'>
                                <img className='w-5 ml-6' src={require("../images/profile/logout.png")} />
                                <span className='text-white  font-semibold'>Logout </span>
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="h-full w-full fixed left-0 top-0 flex justify-center items-center absolute"></div>
            </div>
        </div >

    )
}

export default DropDown;
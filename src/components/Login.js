import Swal from 'sweetalert2'
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext';
import { useMutation } from 'react-query';
import { API, setAuthToken } from '../config/api';
import { ModalContext } from '../context/modalContext';
import { ModalLoginContext } from '../context/modalLogin';
import { StatusLoginContext } from '../context/statusLoginContext';

function Login(getValue) {
    let navigate = useNavigate();
    const [isLogins, setIsLogins] = useContext(StatusLoginContext)
    const [isRegis, setIsRegis] = useContext(ModalContext)
    const [loginModal, setLoginModal] = useContext(ModalLoginContext)

    const [massage, setMessage] = useState(false)
    const [_, dispatch] = useContext(UserContext);
    const [getData, setData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setData({ ...getData, [e.target.name]: e.target.value })
    }
    const loginValidation = useMutation(async (e) => {
        try {
            e.preventDefault();
            const response = await API.post('/login', getData);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data,
            });
            console.log(response)
            if (response.data.data.roles === 'admin') {
                setIsLogins(true)
                setLoginModal(false)
                navigate('/film');
            } else {
                navigate('/');
            }
            setAuthToken(localStorage.token);
            const alert = (
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Welcome',
                    showConfirmButton: false,
                    timer: 1500
                })
            );

            setMessage(alert);
            setData({
                email: "",
                password: "",
            });

        } catch (err) {
            console.log("register failed : ", err)
            const alert = (
                Swal.fire({
                    icon: 'error',
                    title: 'Incorrect Email or password...',
                    text: 'Login Failed',
                })
            );
            setMessage(alert);
        }
    })

    return (

        <div>
            <div className="h-full w-full fixed left-0 top-0 flex justify-center items-center absolute backdrop:blur-sm ">
                <div className="h-96 w-96 z-10 bg-black rounded-lg mx-auto fixed shadow-xl ">
                    <div className="flex justify-between">
                        <h1 className="text-white font-bold text-3xl mt-12 ml-7">Login</h1>
                    </div>
                    <form onSubmit={(e) => loginValidation.mutate(e)} className=" flex flex-col gap-5 items-center mx-auto mt-10 justify-center " >
                        <input required onChange={handleChange} value={getData.email} name="email" className="py-2 px-4 w-72 bg-neutral-600 border-2 border-slate-50 text-white rounded-md" id="email" type="email" placeholder="Email" />
                        <input required onChange={handleChange} value={getData.password} name="password" className="py-2 px-4 w-72 bg-neutral-600 border-2 rounded-md text-white" id="password" type="password" placeholder="Password" />
                        <button className="bg-red-600 text-white font-bold px-28 py-1 mt-4 rounded-md">Login</button>
                        <p className='text-slate-200 text-sm'>Dont't have an account ? Click <a onClick={() => { setLoginModal(false); setIsRegis(true) }} className='font-bold' href="#" >Here</a> </p>
                    </form>
                </div>
                <div onClick={() => setLoginModal(false)} className="h-full w-full fixed left-0 top-0 flex justify-center items-center absolute backdrop:blur-sm bg-black bg-opacity-60"></div>
            </div>
        </div >

    )
}

export default Login;
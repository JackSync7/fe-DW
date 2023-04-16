import Swal from 'sweetalert2'
import { useState, useContext } from "react"
import { useMutation } from 'react-query';
import { API } from '../config/api';
import { ModalContext } from '../context/modalContext';
import { ModalLoginContext } from '../context/modalLogin';


function Regis(getValue) {
    const [isRegis, setIsRegis] = useContext(ModalContext)
    const [loginModal, setLoginModal] = useContext(ModalLoginContext)

    const [message, setMessage] = useState(null)


    const [form, setForm] = useState({
        email: "",
        password: "",
        fullname: "",
        gender: "",
        phone: "",
        address: "",
    });

    const { email, password, fullname, gender, phone, address, role } = form;
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const response = await API.post('/register', form);

            console.log("register success : ", response)
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
            setForm({
                email: "",
                password: "",
                fullname: "",
                gender: "",
                phone: "",
                address: "",

            });
        } catch (err) {
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
            <div className="h-full w-full fixed left-0 top-0 flex justify-center items-center absolute backdrop:blur-sm bg-">
                <div className="h-5/6 w-96 z-10 bg-black rounded-lg mx-auto mt-10 fixed">
                    <div className="flex justify-between">
                        <h1 className="text-white font-bold text-3xl mt-7 ml-7 ">Register</h1>

                    </div>
                    <div className=" flex flex-col gap-4 items-center mx-auto mt-8 justify-center ">
                        <form onSubmit={(e) => handleSubmit.mutate(e)} className='flex flex-col gap-3 items-center mx-auto  justify-center' >
                            <input required onChange={handleChange} value={email} name="email" className="py-2 px-4 w-72 bg-neutral-600 border-2 border-slate-50 text-white rounded-md" id="email" type="email" placeholder="Email" />
                            <input required onChange={handleChange} value={password} name="password" className="py-2 px-4 w-72 bg-neutral-600 border-2 border-slate-50 text-white rounded-md" id="password" type="password" placeholder="Password" />
                            <input required onChange={handleChange} value={fullname} name="fullname" className="py-2 px-4 w-72 bg-neutral-600 border-2 border-slate-50 text-white rounded-md" id="fullname" type="text" placeholder="Full Name" />
                            <select required onChange={handleChange} value={gender} name="gender" className="py-2 px-4 w-72 bg-neutral-600 border-2 border-slate-50 text-white rounded-md" id="gender">
                                <option required value="default">Gender</option>
                                <option value="male">Mele</option>
                                <option value="female">Female</option>
                            </select>
                            <select required onChange={handleChange} value={role} name="role" className="py-2 px-4 w-72 bg-neutral-600 border-2 border-slate-50 text-white rounded-md" id="role">
                                <option value="default">Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <input required onChange={handleChange} value={phone} name="phone" className="py-2 px-4 w-72 bg-neutral-600 border-2 border-slate-50 text-white rounded-md" id="phone" type="text" placeholder="Phone" />
                            <input required onChange={handleChange} value={address} name="address" className="py-2 px-4 w-72 bg-neutral-600 border-2 border-slate-50 text-white rounded-md" id="address" type="text" placeholder="Address" />
                            <button type="submit" className="bg-white text-red-600 font-bold px-28 py-2 rounded-md mt-4 ">Register</button>
                        </form>
                        <p className='text-slate-200 text-sm'>Already have an account ? Click <a onClick={() => { setIsRegis(false); setLoginModal(true) }} className='font-bold' href="#" >Here</a></p>
                    </div>
                </div>
                <div onClick={() => setIsRegis(false)} className="h-full w-full fixed left-0 top-0 flex justify-center items-center absolute backdrop:blur-sm bg-black bg-opacity-60"></div>
            </div>
        </div >

    )
}

export default Regis;
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Profile = () => {

    const [state] = useContext(UserContext);

    let { data: profile } = useQuery('profileCache', async () => {
        const response = await API.get('/user/' + state.user.id);
        return response.data.data;
    });
    // console.log(profile)
    return (
        <div className="text-white h-screen w-full">
            <div className="h-2/3 w-7/12 mx-auto mt-20 bg-zinc-900 rounded-lg p-5 flex justify-between">
                <div className="ml-5 flex flex-col gap-5">
                    <span className=" text-xl font-bold">Personal Info</span>
                    <div className="flex gap-3 mt-3 h-8">
                        <img src={require("../../images/profile/name.png")} />
                        <div className="">
                            <div className="-mt-1">{profile?.fullname}</div>
                            <div className="text-zinc-600">Fullname</div>
                        </div>
                    </div>
                    <div className="flex gap-3 ml-1 mt-3 h-8">
                        <img src={require("../../images/profile/email.png")} />
                        <div className="">
                            <div className="-mt-1">{profile?.email}</div>
                            <div className="text-zinc-600">Email</div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-3 h-8">
                        <img src={require("../../images/profile/status.png")} />
                        <div className="-mt-1">
                            <div className="">{profile?.subscribe === false ? "No Subscribtion" : "Subscribed"}</div>
                            <div className="text-zinc-600">Status</div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-3 h-8">
                        <img src={require("../../images/profile/gender.png")} />
                        <div className="-mt-1">
                            <div className="">{profile?.gender}</div>
                            <div className="text-zinc-600">Gender</div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-3 h-8">
                        <img src={require("../../images/profile/phone.png")} />
                        <div className="-mt-1">
                            <div className="">{profile?.phone}</div>
                            <div className="text-zinc-600">Phone</div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-3 h-8">
                        <img src={require("../../images/profile/map.png")} />
                        <div className="-mt-1">
                            <div className="">{profile?.address}</div>
                            <div className="text-zinc-600">Address</div>
                        </div>
                    </div>

                </div>
                <div>
                    <div>
                        <img className="mr-10" src={require("../../images/profile/foto.png")} />
                        <span className="absolute font-semibold text-lg z-10 mt-4 ml-14">Change Photo Profile</span>
                        <label className="w-72 h-10 bg-red-600 absolute mt-3 rounded lg" for="photo"></label>
                        <input type="file" id="photo" className="mt-3"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Profile
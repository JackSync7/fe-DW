const Profile = () => {
    return (
        <div className="text-white h-screen w-full">
            <div className="h-2/3 w-7/12 mx-auto mt-20  rounded-lg p-5 flex justify-center text-center">
                <div>
                    <h1 className="text-5xl font-semibold">Premium</h1>
                    <p className="mt-10 text-zinc-300">Bayar sekarang dan nikmati streaming film-film yang kekinian dari <span className="text-red-600 font-bold">DUMFLIX</span></p>
                    <div className="mt-3">
                        <span className="text-red-600 font-bold">DUMFLIX</span> <span className="font-semibold">: 0981312323</span>
                    </div>
                    <div className="mt-8">
                        <input placeholder="Input your account number" className="w-80 px-3 py-3 bg-zinc-700 border-2 text-white rounded-md border-white" />
                        <div className="mr-6 mt-5">
                            <p className="text-red-600 font-bold text-lg absolute z-10 ml-32 mt-2">Attach proof of transfer</p>
                            <img className="absolute ml-96 mt-2 z-20" src={require("../../images/profile/attch.png")} />
                            <label for="account" className="w-80 h-12 px-3 py-2 bg-white rounded-lg absolute " />
                            <input type="file" id="account" className="" />
                        </div>
                        <div className=" mt-14">
                            <button className="w-80 h-12 px-py bg-red-600 rounded-lg font-bold">
                                Kirim
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
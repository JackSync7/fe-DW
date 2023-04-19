import { useContext, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext"



const Payment = () => {
    const [state] = useContext(UserContext)
    let navigate = useNavigate();
    // let { id } = useParams();

    // let { data: product } = useQuery("productDetailCache", async () => {
    //   const response = await API.get("/product/" + id);
    //   return response.data.data;
    // });


    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);
    const handleBuy = useMutation(async (e) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const data = {
                seller_id: state.user.id,
                price: e.price,
            };

            const body = JSON.stringify(data);

            const response = await API.post("/transaction", body, config);
            console.log("transaction success :", response);

            const token = response.data.data.token;
            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log("transaction failed : ", error);
        }
    })
    return (
        <div className="text-white h-screen w-full">
            <div className="h-2/3 w-7/12 mx-auto mt-20 gap-5 rounded-lg p-5 flex items-center justify-center text-center">

                <div className="w-96 h-96 border-zinc-400 border-2 p-4 rounded-2xl hover:border-blue-600 hover:scale-110 transition">
                    <h1 className="text-4xl font-semibold">Paket Hemat</h1>
                    <p className="mt-10 text-zinc-300">Bayar sekarang dan nikmati streaming <span className="text-red-600 font-bold">DUMFLIX</span></p>
                    <div className="mt-3">
                        <span className="text-red-600 font-bold">DUMFLIX</span> <span className="font-semibold">: 0981312323</span>
                    </div>
                    <div className="mt-8">
                        <div className="text-3xl font-bold">
                            Rp.149.000
                        </div>
                        <div className=" mt-14">
                            <button onClick={() => handleBuy.mutate({ price: 149000 })} type="submit" className="w-60 h-12 px-py bg-red-600 rounded-lg font-bold">
                                Buy
                            </button>
                        </div>
                    </div>
                </div>


                <div className="w-96 h-full border-zinc-400 border-2 p-4 rounded-2xl hover:border-blue-600 hover:scale-110 transition">
                    <h1 className="text-5xl font-semibold mt-10">Premium</h1>
                    <p className="mt-10 text-zinc-300">Bayar sekarang dan nikmati streaming film-film yang kekinian dari <span className="text-red-600 font-bold">DUMFLIX</span></p>
                    <div className="mt-3">
                        <span className="text-red-600 font-bold">DUMFLIX</span> <span className="font-semibold">: 0981312323</span>
                    </div>
                    <div className="mt-8">
                        <div className="text-3xl font-bold">
                            Rp.250.000
                        </div>
                        <div className=" mt-14">
                            <button onClick={() => handleBuy.mutate({ price: 250000 })} type="submit" className="w-80 h-12 px-py bg-red-600 rounded-lg font-bold">
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-96 h-96 border-zinc-400 border-2 p-4 rounded-2xl hover:border-blue-600 hover:scale-110 transition">
                    <h1 className="text-4xl font-semibold">Paket Komplit</h1>
                    <p className="mt-10 text-zinc-300">Bayar sekarang dan nikmati streaming <span className="text-red-600 font-bold">DUMFLIX</span></p>
                    <div className="mt-3">
                        <span className="text-red-600 font-bold">DUMFLIX</span> <span className="font-semibold">: 0981312323</span>
                    </div>
                    <div className="mt-8">
                        <div className="text-3xl font-bold">
                            Rp.199.000
                        </div>
                        <div className=" mt-14">
                            <button onClick={() => handleBuy.mutate({ price: 199000 })} type="submit" className="w-60 h-12 px-py bg-red-600 rounded-lg font-bold">
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
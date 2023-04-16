

function JumboTron() {
    return (
        <div className="bg-black">
            <div className="absolute flex flex-col mt-40 gap-6 ml-36 ">
                <div>
                    <img className="" src={require("../images/title_jumbotron.png")} alt="" />
                </div>
                <div>
                    <p className=" text-white text-lg text-sh w-6/12 drop-shadow-lg shadow-black">Geralt of Rivia, a solitary monster hunter, struggles to find his place in
                        a world where people often prove more wicked than beast</p>
                </div>
                <div>
                    <button className=" bg-red-600 text-white font-medium text-lg py-3 px-14">WATCH NOW! </button>
                </div>
            </div>
            <div>
                <img className="" src={require("../images/jumbotron.png")} alt="" />
            </div>
        </div>
    )
}

export default JumboTron;
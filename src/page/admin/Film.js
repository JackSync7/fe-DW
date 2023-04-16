import { useContext, useState } from 'react'
import AllMovie from '../../components/AllMovieList'
import AllTv from '../../components/AllTvSeries'
import { Link } from 'react-router-dom'
import MovieList from '../../components/AllMovieList'
import AllTvSeries from '../../components/AllTvSeries'
import AddCategory from './AddCategory'
import AddEpisode from './AddEpisode'
import { ComponentContext } from '../../context/ComponentContext'
const Film = () => {
    const [CategoryState, CategoryDispatch] = useContext(ComponentContext)
    const [film, setFilm] = useState("movie")
    function handleChange(e) {
        setFilm(e.target.value)
    }
    return (
        <div>
            <div className="flex justify-between py-10 ">
                {CategoryState.isAddCategory && <AddCategory />}
                <div className=" flex gap-4 ml-5">
                    <h1>List Film</h1>
                    <select onChange={handleChange} className="text-red-600 px-2 py-1 rounded-lg bg-white" name="list">
                        <option value="movie">Category</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                    </select>
                    <button className='bg-red-600 text-white  px-2 py-1 rounded-lg' onClick={() => CategoryDispatch({ type: 'ADD_CATEGORY_MODAL' })}> + Add Category </button>
                </div>
                <div className=' flex gap-3 mr-24'>
                    <Link to={"/addFilm"}>
                        <button className="px-3 text-white py-1 bg-red-600 rounded-md">
                            + Add Film
                        </button>
                    </Link>
                    <Link to={"/transaction"}>
                        <button className="px-3 text-red-600 py-1 bg-white rounded-md">
                            Transaction
                        </button>
                    </Link>
                </div>
            </div>
            <div className=''>
                {/* {category = "movie" ? <AllMovie /> : <AllTv />} */}
                {film === "series" ? <AllTvSeries /> : <MovieList />}
            </div>
        </div >
    )
}

export default Film
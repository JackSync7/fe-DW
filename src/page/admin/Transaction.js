import { useState } from 'react'
import AllMovie from '../../components/AllMovieList'
import AllTv from '../../components/AllTvSeries'
import { Link } from 'react-router-dom'
import MovieList from '../../components/AllMovieList'
const AddFilm = () => {
    // const Tabel = () => {
    //     for (let i = 1; i <= 6; i++) {
    //         return (
    //             <tr>
    //                 <td className='p-2 '>{i}</td>
    //                 <td className='p-2 '>Radif Ganteng</td>
    //                 <td className='p-2 '>Bukti1.jpg</td>
    //                 <td className='p-2 '>26/hari</td>
    //                 <td className='p-2 '>Active</td>
    //                 <td className='p-2 '>Approve</td>
    //                 <td className='p-2 '><img src={require("../../images/profile/Polygon 2.png")} /></td>
    //             </tr>
    //         )
    //     }
    // }
    return (
        <div className='w-8/12 h-11/12 mx-auto' >
            <div className='flex flex-col gap-5'>
                <p className='text-lg text-white boder font-bold mt-5 mb-6 '>Incoming Transition</p>
                <div className='w-full '>
                    <table className=' text-white text-sm h-full text-left' >
                        <tr className=' bg-zinc-900'>
                            <th className='p-2 w-16 text-red-700 py-6'>No</th>
                            <th className='p-2 w-72  text-red-700'>User</th>
                            <th className='p-2 w-48  text-red-700'>Bukti Transfer</th>
                            <th className='p-2 w-48  text-red-700'>Remaining Active</th>
                            <th className='p-2 w-48  text-red-700'>Status User</th>
                            <th className='p-2 w-48  text-red-700'>Status Payment</th>
                            <th className='p-2 w-24  text-red-700'>Action</th>
                        </tr>
                        <tr className=' bg-zinc-800 border-t-2 border-zinc-400 '>
                            <td className='p-2 py-6'>1</td>
                            <td className='p-2 '>Radif Ganteng</td>
                            <td className='p-2 '>Bukti1.jpg</td>
                            <td className='p-2 '>26/hari</td>
                            <td className='p-2 font-semibold text-green-600'>Active</td>
                            <td className='p-2 font-semibold text-green-600'>Approve</td>
                            <td className='p-2 '><select className='bg-blue-600 w-5'>
                                <option value="approve">Approve</option>
                                <option value="reject">Reject</option>
                            </select></td>

                        </tr>
                        <tr className=' bg-zinc-900 border-t-2 border-zinc-400'>
                            <td className='p-2 py-6'>2</td>
                            <td className='p-2 '>Radif Ganteng</td>
                            <td className='p-2 '>Bukti1.jpg</td>
                            <td className='p-2 '>26/hari</td>
                            <td className='p-2 font-semibold text-green-600'>Active</td>
                            <td className='p-2 font-semibold text-green-600'>Approve</td>
                            <td className='p-2 '><img src={require("../../images/profile/Polygon 2.png")} /></td>
                        </tr>
                        <tr className=' bg-zinc-800 border-t-2 border-zinc-400'>
                            <td className='p-2 py-6'>3</td>
                            <td className='p-2 '>Radif Ganteng</td>
                            <td className='p-2 '>Bukti1.jpg</td>
                            <td className='p-2 '>26/hari</td>
                            <td className='p-2 font-semibold text-red-600'>Not Active</td>
                            <td className='p-2 font-semibold text-red-600'>Cenceled</td>
                            <td className='p-2 '><img src={require("../../images/profile/Polygon 2.png")} /></td>
                        </tr>
                        <tr className=' bg-zinc-900 border-t-2 border-zinc-400'>
                            <td className='p-2 py-6'>4</td>
                            <td className='p-2 '>Radif Ganteng</td>
                            <td className='p-2 '>Bukti1.jpg</td>
                            <td className='p-2 '>26/hari</td>
                            <td className='p-2 font-semibold text-red-600'>Not Active</td>
                            <td className='p-2 font-semibold text-yellow-600'>Pending</td>
                            <td className='p-2 '><img src={require("../../images/profile/Polygon 2.png")} /></td>
                        </tr>
                        <tr className=' bg-zinc-800 border-t-2 border-zinc-400'>
                            <td className='p-2 py-6'>5</td>
                            <td className='p-2 '>Radif Ganteng</td>
                            <td className='p-2 '>Bukti1.jpg</td>
                            <td className='p-2 '>26/hari</td>
                            <td className='p-2 font-semibold text-red-600'>Not Active</td>
                            <td className='p-2 font-semibold text-yellow-600'>Pending</td>
                            <td className='p-2 '><img src={require("../../images/profile/Polygon 2.png")} /></td>
                        </tr>
                        <tr className=' bg-zinc-900 border-t-2 border-zinc-400'>
                            <td className='p-2 py-6'>6</td>
                            <td className='p-2 '>Radif Ganteng</td>
                            <td className='p-2 '>Bukti1.jpg</td>
                            <td className='p-2 '>26/hari</td>
                            <td className='p-2 font-semibold text-red-600'>Not Active</td>
                            <td className='p-2 font-semibold text-yellow-600'>Pending</td>
                            <td className='p-2 '><img src={require("../../images/profile/Polygon 2.png")} /></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default AddFilm
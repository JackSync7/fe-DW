import { useState } from 'react'
import AllMovie from '../../components/AllMovieList'
import AllTv from '../../components/AllTvSeries'
import { Link } from 'react-router-dom'
import MovieList from '../../components/AllMovieList'
import { useQuery } from 'react-query'
import { API } from '../../config/api'
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
    let { data: transaction } = useQuery('transaction', async () => {
        const response = await API.get('/transactions');
        return response.data.data;
    });
    console.log(transaction)
    return (
        <div className='w-8/12 h-11/12 mx-auto' >
            <div className='flex flex-col gap-5'>
                <p className='text-lg text-white boder font-bold mt-5 mb-6 '>Incoming Transition</p>
                <div className='w-full '>
                    <table className=' text-white text-sm h-full text-left' >
                        <tr className=' bg-zinc-900'>
                            <th className='p-2 w-16 text-red-700 py-6'>No</th>
                            <th className='p-2 w-72  text-red-700'>User</th>

                            <th className='p-2 w-48  text-red-700'>Remaining Active</th>
                            <th className='p-2 w-48  text-red-700'>Status User</th>
                            <th className='p-2 w-48  text-red-700'>Status Payment</th>
                            <th className='p-2 w-24  text-red-700'>Action</th>
                        </tr>
                        {transaction?.map((data, i) => {
                            return (
                                <tr className=' bg-zinc-800 border-t-2 border-zinc-400 ' key={i}>
                                    <td className='p-2 py-6'>{data.id}</td>
                                    <td className='p-2 '>{data.user.fullname}</td>

                                    <td className='p-2 '>{data.endDate.split("T")[0]}</td>
                                    <td className='p-2 font-semibold text-green-600'>Active</td>
                                    <td className='p-2 font-semibold text-green-600'>{<Statuspayment status={data.status} />}</td>
                                    <td className='p-2 '><select className='bg-blue-600 w-5'>
                                        <option value="approve">Approve</option>
                                        <option value="reject">Reject</option>
                                    </select></td>

                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div >
    )
}
const Statuspayment = ({ status }) => {
    switch (status) {
        case "pending":
            return <p className='text-orange-500'>Pending</p>
        case "success":
            return <span className='text-green-700'>Success</span>
        case "failed":
            return <span className='text-red-500'>Failed</span>
        default: return
    }
}
export default AddFilm
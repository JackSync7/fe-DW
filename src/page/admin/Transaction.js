import { useContext, useState } from 'react'
import AllMovie from '../../components/AllMovieList'
import AllTv from '../../components/AllTvSeries'
import { Link } from 'react-router-dom'
import MovieList from '../../components/AllMovieList'
import { useQuery } from 'react-query'
import { API } from '../../config/api'
import { UserContext } from '../../context/userContext'
import { ComponentContext } from '../../context/ComponentContext'
const Transaction = () => {
    const [state] = useContext(UserContext)
    const [getDetail, setDetail] = useState({})
    const [stateModal, dispatch] = useContext(ComponentContext)
    let { data: transaction } = useQuery('transaction', async () => {
        const response = await API.get('/transactions');
        return response.data.data;
    });

    const DetailTransaction = (id) => {

        return (
            <div className="absolute w-full h-full bg-zinc-900 text-zinc-800 flex justify-center backdrop:blur-lg bg-opacity-80">
                <div className='flex justify-center flex-col px-10 fixed rounded-2xl bg-zinc-100 h-2/4 w-5/12'>
                    <div className="flex justify-evenly ">
                        <h2 className="font-semibold mb-16 text-2xl text-slate-900">Detail Transaction</h2>
                        <button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} className='text-4xl absolute top-5 right-16 text-red-700 font-bold'>x</button>
                    </div>
                    <div className='grid grid-cols-2 w-5/6 mx-auto gap-1 gap-x-4'>
                        <div className='place-self-end'>
                            Transaction ID
                        </div>
                        <div >
                            : {getDetail.id}
                        </div>
                        <div className='place-self-end'>
                            Name
                        </div>
                        <div>
                            : {getDetail.user.fullname}
                        </div>
                        <div className='place-self-end'>
                            Email
                        </div>
                        <div className='overflow-clip'>
                            : {getDetail.user.email}
                        </div>
                        <div className='place-self-end'>
                            End Date
                        </div>
                        <div>
                            : {getDetail.endDate.split("T")[0]}
                        </div>
                        <div className='place-self-end'>
                            Status User
                        </div>
                        <div>
                            : {getDetail?.user.subscribe ? "Subscribe" : "not subscribed"}
                        </div>
                        <div className='place-self-end'>
                            Status Payment
                        </div>
                        <div>
                            : {getDetail.status}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            {stateModal.detailTransaction && <DetailTransaction />}
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
                                        <td className='p-2 font-semibold text-green-600'>{data?.user.subscribe ? "Subscribe" : "not subscribed"}</td>
                                        <td className='p-2 font-semibold text-green-600'>{<Statuspayment status={data.status} />}</td>
                                        <td className='p-2 '><button onClick={() => { dispatch({ type: "DETAIL_TRANSACTION_MODAL" }); setDetail(data) }} className='border-2 border-blue-500 text-blue-500 rounded-md py-1 px-2 hover:scale-125 transition'>Detail</button></td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                </div>
            </div >
        </div>
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
export default Transaction
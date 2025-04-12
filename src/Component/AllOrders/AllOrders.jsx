import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AllOrders() {


    const [Data, setData] = useState([])
    const [Loadings, setLoading] = useState(false)
    const [Error, setError] = useState(false)

    let [user, setUser] = useState({})
    let [DateM, setDateM] = useState("")
    let [DateH, setDateH] = useState("")
    let [PayMethod, setPayMethod] = useState("")
    let [TotalPrice, setTotalPrice] = useState()









    useEffect(() => {
        console.log(Data);


        return () => {

        }
    }, [Data])


    let getOrders = async () => {

        try {
            setLoading(true)


            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
            console.log(data.data);

            let da = data.data.filter(x => {
                if (x.user.email == localStorage.getItem("email")) {
                    return x
                }
            })
            console.log(da);
            console.log("da user --------", da[0].user);

            setTotalPrice(da[0].totalOrderPrice);
            setUser(da[0].user)
            // setDate(da[0].paidAt)
            setPayMethod(da[0].paymentMethodType)
            // setData(da[0].cartItems)
            // console.log("cat ---------------------------------------------------",da[0].cartItems);
            setData(da[0].cartItems);


            console.log("----=-=----", da[0].paidAt.split("T").join(" ").split(".").slice(0, 1)[0].split(" "))
            setDateM(da[0].paidAt.split("T").join(" ").split(".").slice(0, 1)[0].split(" ")[0])
            setDateH(da[0].paidAt.split("T").join(" ").split(".").slice(0, 1)[0].split(" ")[1])

            setLoading(false)
            setError(false)
        } catch (error) {

            setError(true)
            setLoading(false)

        }
    }


    useEffect(() => {
        getOrders()
    }, [])


    if (Loadings) {
        return <Loading />
    }

    return (
        <>
            {
                console.log(user)

            }
            <div className="w-[90%] mx-auto p-5">


                <div className="flex justify-between flex-wrap p-3 my-2">

                    <div className="flex flex-col ">
                        <h2 className="dark:text-slate-400 text-slate-800 font-bold my-2 capitalize">Ordered by :  <span className="text-green-400 font-bold my-2 ms-2">{user?.name}</span> </h2>
                        <h2 className="dark:text-slate-400 text-slate-800 font-bold my-2 capitalize">email : <span className="text-green-400 font-bold my-2 normal-case ms-2"> {user?.email}</span> </h2>
                        <h2 className="dark:text-slate-400 text-slate-800 font-bold my-2 capitalize">phone : <span className="text-green-400 font-bold my-2 ms-2"> {user?.phone}</span> </h2>
                        <h2 className="dark:text-slate-400 text-slate-800 font-bold my-2 capitalize">Total Order Price : <span className="text-green-400 ms-2">{TotalPrice}</span> EGP</h2>
                        <h2 className="dark:text-slate-400 text-slate-800 font-bold my-2 capitalize">paid at : <span className="text-green-400 ms-2">{DateM} <span className="text-slate-400 mx-3 normal-case">at</span> <span className="text-green-500 ">  {DateH} <span className="text-slate-400">sec</span></span></span></h2>

                    </div>

                    <button className="p-4 bg-green-400 hover:bg-green-500 text-white dark:text-white font-bold block h-[50px] w-[150px] rounded-lg"> <Link className="text-white hover:text-white dark:text-white " to={"/"} >Back to Home </Link> </button>
                </div>


                <div className="flex flex-wrap justify-evenly p-5 my-9 w-[90%] mx-auto">
                    {
                        Data.map((x, index) => <div className="w-[25%] p-3 my-2 ">

                         <div className=" relative flex flex-col justify-between items-start p-4 rounded-lg border-green-400 border-[1px] duration-200 hover:cursor-pointer dark:hover:shadow-green-400 hover:shadow-md hover:shadow-green-300 dark:bg-slate-100/[0.06] h-[300px]">
                            <Link to={`/products/${x.product.id}`} >
                                <div className="absolute top-[-15px] start-[-15px]"> <span className="w-[20px] h-[15px] p-4 bg-red-500 text-white font-bold rounded-lg " >{x.count}</span> </div>
                                <div className="mx-auto flex justify-center"> <img className="w-[60%]" src={x.product.imageCover} alt="" /></div>
                                <h3 className="text-slate-500 mt-3 font-bold">{x.product.category.name}</h3>
                                <h2 className="text-green-500 my-2 font-semibold">{x.product.title.split(" ").slice(0, 2).join(" ")}</h2>
                                {/* <p className="dark:text-slate-400 text-slate-800 font-bold my-2 ">Count :<span className="text-green-400"> {x.count}</span> </p> */}
                                <p className="dark:text-slate-400 text-slate-800 font-bold my-2 ">Price :<span className="text-green-400"> {x.price} </span>EGP </p>
                            </Link>  </div>
                        </div> )
                    }
                </div>
            </div >
        </>
    )
}

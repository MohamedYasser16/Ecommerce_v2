import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';

export default function OnlinePayment() {

    let { cartId: Id } = useParams()
    console.log("Id param", Id);

    let { cartId, setCartId } = useContext(CartContext)
    setCartId(`${Id}`)
    localStorage.setItem("cartId", cartId);

    let [formData, setFormData] = useState({})

    let token = localStorage.getItem("token")



    useEffect(() => {

        return () => {

        }
    }, [])


    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState(false)
    const [Message, setMessage] = useState(false)

    let formik = useFormik({
        initialValues: {
            phone: "",
            city: ""
        }
        ,
        validationSchema: Yup.object({
            phone: Yup.string().matches(/^(01)[0-25][0-9]{8}$/, "unValid Number").required("required")

        })
        ,
        onSubmit: (value) => {

            arrange(Id, value)
        }
    })

    async function arrange(Id, value) {

        console.log(value);
        setFormData(value)
        await payOnline(Id)
    }

    async function payOnline(id) {
        console.log(formData);

        let { phone, city } = formData
        try {
            setLoading(true)
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://ecommerce-react-project-xe6c.vercel.app/`, {
                details: "details",
                phone,
                city
            }, {
                headers: {
                    token
                }
            })
            console.log(data);

            if (data.status == "success") {
                window.location.href = data.session.url
            }

            setLoading(false)
        } catch (error) {
            setError(true)
            console.log(error.message)
            setMessage(error.message)
            setLoading(false)

        }
    }


    let [x, setx] = useState(false)

    return (
        <>


            <div className="w-[100%] h-[70vh] m-auto relative flex justify-center items-center">

                {
                    Message ? <div className="absolute top-[5px] start-0 end-0 bg-red-400 text-white font-bold p-3 rounded-sm">{Message}</div> : ""
                }

                <div className=" py-8 w-[80%] my-11 mx-auto">
                    <form onSubmit={formik.handleSubmit} className=" mx-auto">

                        <div className="relative z-0 w-full mb-8 group">
                            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="phone" id="idPhone" className="font-bold block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder='' />
                            <label htmlFor="idPhone" className="font-semibold text-green-400 peer-focus:font-medium absolute text-sm  dark:text-green-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                            {formik.errors.phone && formik.touched.phone && <div className="bg-red-600 text-white p-4 rounded-lg mt-3">{formik.errors.phone}</div>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group mt-3">
                            <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" id="idCity" className="font-bold block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder='' />
                            <label htmlFor="idCity" className="font-semibold text-green-400 peer-focus:font-medium absolute text-sm  dark:text-green-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                        </div>


                        <button type="submit" className="text-white p-4 font-semibold bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300  rounded-lg text-sm w-[100px] h-[50px] px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{Loading ? <HashLoader className="mx-auto" size={25} color="white" /> : "Submit"}</button>
                    </form>
                </div>

            </div>

        </>
    )
}

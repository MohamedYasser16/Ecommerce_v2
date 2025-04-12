import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
import * as Yup from 'yup';
import axios from 'axios';


export default function RestPasswordPart3() {

  let navigate = useNavigate()

  let [message, setMessage] = useState("")
  let [error, setError] = useState("")
  let [loading, setLoading] = useState(false)


  let [formValue, setFormValue] = useState({})

  let { email, newPassword } = formValue

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    }
    , onSubmit: values => {
      console.log(JSON.stringify(values));
      setFormValue(values)
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Un Valid Email !!")
        .required("Required"),
      newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,}/, "must start with capital letter").required('Required'),
    })
  })

  let first = useRef(false)
  function changeFirst() {
    first.current = true
  }

  
  /////////////////////   func to change pass   call in use effect


  // let navigate = useNavigate()

  let changePass = async ()=>{

    try {

      setLoading(true)
      let {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword" , {
        email  ,
        newPassword
      })

      console.log(data);

      if (data.token) {
        setMessage("success")
        navigate("/login")
      }
      
      setError(false)
      setLoading(false)

    } catch (error) {

      setError(true)
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
      setLoading(false)
    }
  }

  useEffect(() => {

    if (first.current) {
      console.log(email);
      console.log(newPassword);
      changePass()
    }
    else {

      changeFirst()
    }

  }, [email , newPassword])






  if (loading) {
    return <Loading />
  }

  return (
    <>
      {
        error && message ? <div className="bg-red-500 text-white text-xl font-semibold p-2 text-center mt-1">{message}</div> : " "
      }
      {
        !error && message ? <div className="bg-green-400 text-white text-xl font-semibold p-2 text-center mt-1">{message}</div> : " "
      }

      <form onSubmit={formik.handleSubmit}>
        <div className=" h-[75vh] flex justify-center items-center">
          <div className="w-[80%] mx-auto flex flex-col items-start">

            <h2 className="text-green-400 text-xl font-bold mb-3 ">Rest password</h2>
            <div className="mb-2 w-full">

              <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
              <input name="email" id="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} onInput={() => {
                setMessage("")
              }} className="w-[100%] mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter Your Account Email" />
              <div className={`w-full mt-2 rounded-lg text-white font-bold ${formik.errors.email && formik.touched.email ? " bg-red-600 p-3 mb-3 " : " "} `}>
                {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
              </div>

              {/* ///////////////// */}

              <label htmlFor="RestPass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <input type='password' name="newPassword" id="RestPass" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} onInput={() => {
                setMessage("")
              }} className="w-[100%] mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter Your New password" />
              <div className={`w-full mt-2 rounded-lg text-white font-bold ${ formik.errors.newPassword && formik.touched.newPassword  ? " bg-red-600 p-3 " : " " } `}>
                { formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : "" }
              </div>

            </div>

            <button type="submit" className="w-[10%] text-white font-bold bg-green-500 hover:bg-green-600 duration-500 focus:ring-4 focus:outline-none focus:ring-green-300 mt-2 rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
          </div>
        </div>
      </form>

    </>
  )
}

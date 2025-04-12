import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { tokenContext } from '../../Context/LocalContext';

export default function Login() {

   const {token , setToken} = useContext(tokenContext)
   let navigate = useNavigate()

  // let [ email , setEmail  ] = useState("")

  async function register (value) {
    try {
      console.log(value);
      
      let x = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" ,  value )
      console.log("token in login" , x.data.token);
      localStorage.setItem("token" , `${x.data.token}`)
      setToken(x.data.token)
      navigate("/")
      
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token")
      console.log("delete token from local storage");
      
    }
  }


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
        email: Yup.string()
        .email("inValid Email")
        .required('Required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,}/, "must start with capital letter").required('Required'),
    
    }),
    onSubmit: values => {
      console.log(JSON.stringify(values))
      localStorage.setItem("email" , values.email )
      register (values)
    },
 })


  return (
    <>
   

   
<form className='w-[90%] p-9 my-11 mx-auto' onSubmit={formik.handleSubmit} >
  <div className=" gap-6 mb-6 ">

    <div className='mt-2'>
      <label htmlFor="email" className="block mb-2 text-sm  text-green-400 font-bold ">Email</label>
      <input type="email" id="email" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.email} className="bg-gray-50  dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "  required />
      {formik.touched.email && formik.errors.email ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.email}</div>) : null}
    </div>
  
  </div>
 
  <div className="mb-4">
    <label htmlFor="password" className="block mb-2 text-sm  text-green-400 font-bold ">Password</label>
    <input type="password" id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className="bg-gray-50 dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "  required />
    {formik.touched.password && formik.errors.password ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.password}</div>) : null}
  </div> 

  <div className="flex flex-col items-start mb-6">
    <div className="flex items-center">
    <Link to={"/register"} className='text-md text-green-400 hover:text-green-500 font-semibold mb-2 me-2' > Register ? </Link>
  <Link to={"/forget"} className='text-md text-green-400 hover:text-green-500 font-semibold mb-2' >forget password ? </Link>

    </div>
    <button type="submit" className="text-white mt-2 font-bold bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>

  </div>
</form>


    
    </>
  )
}


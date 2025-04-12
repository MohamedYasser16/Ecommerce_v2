import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react'
import * as Yup from 'yup';
import { tokenContext } from '../../Context/LocalContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const navigate = useNavigate()
   let  {token , setToken} = useContext(tokenContext)

  async function register (value) {
    try {
      console.log(value);
      
      let x = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" ,  value )
      console.log( "register obj" ,x.data.token);
      setToken(x.data.token);
       localStorage.setItem( "token" , x.data.token) ;
      navigate("/login")
      console.log("done");
      
      
    } catch (error) {
      console.log(error);
      
    }
  }


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
        email: Yup.string()
        .email("inValid Email")
        .required('Required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,}/, "must start with capital letter").required('Required'),
        rePassword: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        phone: Yup.string().matches(/^(01)[0-25][0-9]{8}/, "inValid number").required('Required')

    }),
    onSubmit: values => {
      console.log(JSON.stringify(values))
      register (values)
    },
 })




  return (
    <>
   

   
<form className='w-[90%] p-6 my-10 mx-auto' onSubmit={formik.handleSubmit} >
  <div className=" gap-6 mb-6 ">
    <div>
      <label htmlFor="name" className="block mb-2 text-sm  text-green-400 font-bold ">First name</label>
      <input type="text" id="name"  onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.name} className="bg-gray-50 border  dark:bg-slate-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "  required />
      {formik.touched.name && formik.errors.name ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.name}</div>) : null}
    </div>


    <div className='mt-2'>
      <label htmlFor="email" className="block mb-2 text-sm  text-green-400 font-bold">Email</label>
      <input type="email" id="email" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.email} className="bg-gray-50 border  dark:bg-slate-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "  required />
      {formik.touched.email && formik.errors.email ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.email}</div>) : null}
    </div>
  
    <div className='mt-2'>
      <label htmlFor="phone" className="block mb-2 text-sm  text-green-400 font-bold">phone number</label>
      <input type="tel" id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className="bg-gray-50  dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "  required />
      {formik.touched.phone && formik.errors.phone ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.phone}</div>) : null}
    </div>


  </div>
 
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm  text-green-400 font-bold">Password</label>
    <input type="password" id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className="bg-gray-50  dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "  required />
    {formik.touched.password && formik.errors.password ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.password}</div>) : null}
  </div> 

  <div className="mb-6">
    <label htmlFor="rePassword" className="block mb-2 text-sm  text-green-400 font-bold ">Confirm password</label>
    <input type="password" id="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className="bg-gray-50  dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "  required />
    {formik.touched.rePassword && formik.errors.rePassword ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.rePassword}</div>) : null}
  </div> 

  <button type="submit" className="text-white font-bold bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
</form>



    
    </>
  )
}


import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup';
import Loading from '../Loading/Loading';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Forget() {

    let navigate = useNavigate()

    let [formValue, setFormValue] = useState({})
    let [formValue2, setFormValue2] = useState({})

    let { email } = formValue
    let {  resetCode } = formValue2

    let [message, setMessage] = useState("")
    let [error, setError] = useState("")
    let [loading, setLoading] = useState(false)



    let [verify, setVerify] = useState(false)
    let [goToChangePass, setGoToChangePass] = useState(false)

    let [ResetCodeMessage, setResetCodeMessage] = useState("")
    let [ResetCodeError, setResetCodeError] = useState("")
    let [loading2 , setLoading2 ] = useState(false)

    let formik = useFormik({
        initialValues: {
            email: "",
         
        }
        , onSubmit: values => {
            console.log(JSON.stringify(values));
            setFormValue(values)
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Un Valid Email !!")
                .required("Required"),
            // newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,}/, "must start with capital letter").required('Required'),
        })
    })

    let formik2 = useFormik({
        initialValues: {
           
            resetCode: "",
         
        }
        , onSubmit: values => {
            console.log(JSON.stringify(values));
            setFormValue2(values)
        },
        validationSchema: Yup.object({
           resetCode: Yup.string().min(1,"min code length").required("Required")
        })
    })



    let forget = async () => {
        setLoading(true)
        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
                email: email
            })

            // console.log(data.statusMsg);
            setMessage(data.message);
            // console.log(data.statusMsg);

            if (data.statusMsg == "success") {
                setVerify(true)
            }
            setLoading(false)
            setError(false)
        } catch (error) {

            setError(true)
            console.log(error.response.data.message);
            setMessage(error.response.data.message);
            setLoading(false)

        }
    }

    let first = useRef(false)
    let first2 = useRef(false)
    // console.log(first.current);

    function changeFirst() {
        first.current = true
    }
    function changeFirst2() {
        first2.current = true
    }

    let arrange = async () => {
        console.log(email);
        await forget()
        // console.log(verify);
    }

    useEffect(() => {

        if (first.current) {
            arrange()

        }
        else {

            changeFirst()
        }
    }, [email])


///////////////////////////////////////////////////////////////////////// part 2 verify code
  
let verifyCode = async ()=>{

    console.log(resetCode);

    try {
        setLoading2(true)
          let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" , {
            resetCode
          })

          console.log(data.status);
          setResetCodeMessage(data.status);

          if ( data.status == "Success") {
            setGoToChangePass(true)

            setTimeout(() => {
                navigate("/ResetPass")
            }, 2000);
          }
          
          setResetCodeError(false)
          setLoading2(false)

    } catch (error) {

        console.log("error from part 2 ------> " , error.response.data.message);
        setResetCodeError(true)
        setResetCodeMessage( error.response.data.message);
        setLoading2(false)

    }
    
}

let [changeContent2Flag , setChangeContent2Flag ] = useState( false )
    useEffect(() => {

        if (verify) {
            // write the code after sending verify code to the email 
            //    alert("go to verify"); 
            console.log("before set time");
            setTimeout(() => {
                setError(false)
                setMessage("")
                setLoading(false)
                console.log("in set time out");
                // setVerify(false)
                setChangeContent2Flag(true)
            }, 2000);
        }
    }, [verify])


    useEffect( ()=>{
       
        if (first2.current) {
            verifyCode()

        }
        else {

            changeFirst2()
        }
    } , [resetCode]  )
   



    if (loading || loading2 ) {
        return <Loading />
    }



    return (
        <>
            {
                error && message && !changeContent2Flag ? <div className="bg-red-500 text-white text-xl font-semibold p-2 text-center mt-1">{message}</div> : " "
            }
            {
                !error && message && !changeContent2Flag ? <div className="bg-green-400 text-white text-xl font-semibold p-2 text-center mt-1">{message}</div> : " "
            }

            {
                verify && ResetCodeMessage && ResetCodeError && changeContent2Flag ? <div className="bg-red-500 text-white text-xl font-semibold p-2 text-center mt-1">{ResetCodeMessage}</div> : " "
            }
            {                                                                                                                                                
                verify && !ResetCodeError && ResetCodeMessage  && changeContent2Flag ? <div className="bg-green-400 text-white text-xl font-semibold p-2 text-center mt-1">{ResetCodeMessage}</div> : " "
            }

       
           {
            !verify || !changeContent2Flag ?      <form onSubmit={formik.handleSubmit}>
            <div className=" h-[75vh] flex justify-center items-center">
                <div className="w-[80%] mx-auto flex flex-col items-start ">
            
                            <h2 className="text-green-400 text-xl font-bold mb-3 ">forget password</h2>
                            <div className="mb-2 w-full">
                                <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                <input name="email" id="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} onInput={() => {
                                    setMessage("")
                                }} className="w-[100%] mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter Your Account Email to rest the password" />
                                <div className={`w-full mt-2 rounded-lg text-white font-bold ${formik.errors.email && formik.touched.email ? " bg-red-600 p-3 " : " "} `}>
                                    {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                                </div>
                            </div>

                    <button type="submit" className="w-[10%] text-white font-bold bg-green-500 hover:bg-green-600 duration-500 focus:ring-4 focus:outline-none focus:ring-green-300 mt-2 rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                </div>
            </div>
        </form> 
        :
        ""
       }

       { verify && changeContent2Flag ?
        <form onSubmit={formik2.handleSubmit}>
        <div className=" h-[75vh] flex justify-center items-center">
            <div className="w-[80%] mx-auto flex flex-col items-start ">
               
                            <h2 className="text-green-400 text-xl font-bold mb-3 ">Confirm code</h2>
                            <div className="mb-2 w-full">
                                <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reset Code</label>
                                <input name="resetCode" id="resetCode" value={formik2.values.resetCode} onChange={formik2.handleChange} onBlur={formik2.handleBlur} onInput={() => {
                                    setMessage("")
                                }} className="w-[100%] mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter The Verify Code" />

                            </div>
                     
                


                <button type="submit" className="w-[10%] text-white font-bold bg-green-500 hover:bg-green-600 duration-500 focus:ring-4 focus:outline-none focus:ring-green-300 mt-2 rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
            </div>
        </div>
    </form>
       :   ""    }








        </>
    )
}



















{/* <form onSubmit={formik.handleSubmit}>
    <div className=" h-[75vh] flex justify-center items-center">
        <div className="w-[80%] mx-auto flex flex-col items-start">
            {
                !verify ? <>
                    <h2 className="text-green-400 text-xl font-bold mb-3 ">forget password</h2>
                    <div className="mb-2 w-full">
                        <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input name="email" id="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} onInput={() => {
                            setMessage("")
                        }} className="w-[100%] mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter Your Account Email to rest the password" />
                        <div className={`w-full mt-2 rounded-lg text-white font-bold ${formik.errors.email ? " bg-red-600 p-3 " : " "} `}>
                            {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        </div>
                    </div>
                </> :
                    <>
                        <h2 className="text-green-400 text-xl font-bold mb-3 ">Confirm code</h2>
                        <div className="mb-2 w-full">
                            <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reset Code</label>
                            <input name="resetCode" id="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} onInput={() => {
                                setMessage("")
                            }} className="w-[100%] mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter The Verify Code" />

                        </div>
                    </>
            }


            <button type="submit" className="w-[10%] text-white font-bold bg-green-500 hover:bg-green-600 duration-500 focus:ring-4 focus:outline-none focus:ring-green-300 mt-2 rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
        </div>
    </div>
</form> */}





{/* <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="•••••••••" required />
      </div> 
      <div className="mb-6">
        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input type="text" name="resetCode" id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="•••••••••" required />
      </div> 
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800" required />
        </div> 
       </div> */}

import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../../Context/LocalContext';
import axios from 'axios';
import Loading from "../Loading/Loading";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import WarningImg from "../../assets/folder-files-and-folders-svgrepo-com.svg"
import WarningImg2 from "../../assets/alarm-clock-svgrepo-com.svg"
import empty from "../../assets/trash-svgrepo-com (1).svg"
import folder from "../../assets/folder_4076373.png"

export default function WishList() {

    let  token  = localStorage.getItem("token")
   
    

    let [ arrData , setArrData ] = useState([ ])
    let [isLoading, setIsLoading ] = useState(false)
    let [ myError , setMyError ] = useState("false")

    let [ flag , setFlag ] = useState(false)

  let displayFav = async () => {
    try {
      setIsLoading(true)
      let {data} = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
       
        {
          headers: {
            token,
          },
        }
      );
      console.log("display wished  ", data );
      setArrData( data.data )

      
      setIsLoading(false)
      setMyError(false)

    } catch (error) {

      console.log("error in wish list ", error);

      console.log("error 2 in wish ", error?.response?.statusText  );
      console.log(myError);
      setMyError(error?.response?.statusText )
      console.log(myError);

      setIsLoading(false)

      
    }
  }


  let deleteFav = async (id) => {
    try {
      setIsLoading(true)
      let {data} = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
       
        {
          headers: {
            token,
          },
        }
      );

    console.log("delete done");
    setMyError(false)
    setIsLoading(false)
    toast.success("Removed successfully")
    setFlag( !flag )
    console.log(flag);

    } catch (error) {

      setIsLoading(true)
      console.log(error);
      setIsLoading(false)
    
    }
  }

 async function arrange () {
  console.log("token in wish list ----------> " ,token);
  await  displayFav()
}

useEffect( ()=>{ displayFav() } , [ flag ]   )
useEffect( ()=>{ 
  arrange()
 } , [ token ]   )
  

   if ( isLoading ) {
   return  <Loading />
   }


   if ( myError ) {
    return <div className=' h-[80vh] flex flex-col items-center justify-center'>
      {/* <img className="w-[20%] mx-auto" src={ WarningImg} alt="" /> */}
      <img className="w-[15%] mx-auto my-3" src={ WarningImg2} alt="" />
      <h1 className='text-red-600 font-bold text-2xl '>{myError}</h1>
    </div> }
   
  
  if ( !arrData.length && !myError ) {
    return  <div className=' h-[70vh] flex flex-col items-center justify-center'>
      
      <img className="w-[220px]" src={folder} alt="" />
    <h1 className='text-red-400 font-bold text-2xl '> Empty Wish list </h1>
  </div> 
  }



  return (
    <>
    
      <div className=" w-[90%] my-6 mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3 w-[20%]">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3 w-[50%]">
                Product
              </th>
             
              <th scope="col" className="px-6 py-3 w-[15%]">
                Price
              </th>
              <th scope="col" className="px-6 py-3 w-[15%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>



          {
              arrData.map(  (wish , index)=>  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={wish?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={wish?.imageCover} />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
               <Link className="hover:text-green-400 dark:hover:text-green-400 dark:text-white" to={`/products/${wish?.id}`} > {wish?.title} </Link> 
              </td>
            
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
               <span className='text-green-500'>{wish?.price}</span> EGP
              </td>
              <td className="px-6 py-4">
                <button 
                onClick={ ()=>{
                  deleteFav(wish.id)
                  console.log(wish.id)
               
                  
                } }
                className="font-bold p-2 rounded-md text-white bg-red-600  hover:bg-red-700">Remove</button>
              </td>
          </tr>

           )}

          </tbody>
        </table>
      </div>
        
        )
   















    </>
  )
}

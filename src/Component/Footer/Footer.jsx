import React from 'react'
import paypal from "../../assets/paypal-logo.webp"
import masterCard from "../../assets/masterCard.png"
import visa from "../../assets/visa.png.png"
import DarkGoogle from "../../assets/google-download.png.png"
import DarkApple from "../../assets/app-logo.png.png"

export default function Footer() {
  return (
    <>
      <div className='bg-[#F0F3F2] dark:bg-slate-700 py-3 w-full'>
        <div className="w-[88%] mx-auto p-5 my-5">
          <h2 className="capitalize font-semibold md:text-2xl text-lg dark:text-slate-200">get the fresh app cart </h2>
          <h2 className="my-2 capitalize font-medium lg:text-xl text-base text-slate-700 dark:text-slate-500">we will wend you a link , open it on your phone to download the app  </h2>
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center p-3 w-[90%] mx-auto">
            <input className="md:w-[84%] w-full rounded-md dark:bg-slate-500 dark:text-slate-200 focus:border-green-300" type="text" placeholder="Email .." />
            <button className="w-full  md:w-[180px] mx-0 md:mx-4 md:mt-0 mt-3 capitalize p-3 text-white bg-green-400 hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700 rounded-lg ">share app link</button>
          </div>

          <div className="flex md:items-center md:flex-row  flex-col justify-center border-t-slate-600 border-b-slate-500 border-[1px] border-s-0 border-e-0 my-8 mb-9 py-3 ">

            <div className="flex items-center mt-4 md:w-[44%] ">
              <p className="capitalize text-slate-900 dark:text-slate-100 md:text-xl text-base font-medium mr-2">payment partners </p>
              <img className="lg:w-[80px] w-[60px] cursor-pointer" src={masterCard} alt="" />
              <img className="lg:w-[80px] w-[60px] mx-2 cursor-pointer" src={visa} alt="" />
              <img className="lg:w-[100px] w-[60px] cursor-pointer" src={paypal} alt="" />
            </div>

            <div className="flex items-center mt-6 md:w-[56%] md:ms-2">
              <h2 className="capitalize text-slate-900 dark:text-slate-100 md:text-xl text-base text-center font-medium mr-2">get deliveries with freshCart</h2>
              <img className="lg:w-[115px] w-[80px] h-[50px] me-2 md:me-0 cursor-pointer" src={DarkGoogle} alt="" />
              <img className="lg:w-[115px] w-[80px] h-[50px] cursor-pointer" src={DarkApple} alt="" />
            </div>

          </div>
<h4 className="text-gray-700 font-normal capitalize dark:text-slate-300 text-center">developed by Mohamed Yasser @ 2025 </h4>
        </div>
      </div>
    </>
  )
}


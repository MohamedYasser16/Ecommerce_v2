import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function Loading() {
  return (
    <>
     <div className="h-[88vh] flex justify-center items-center mx-auto">
   
   <ScaleLoader
     color="#08f32c"
     height={29}
     speedMultiplier={1}
     width={4}
   />
 </div>
    </>
  )
}

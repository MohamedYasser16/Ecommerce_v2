import React, { useState , useContext} from 'react'
import { categoryTestContext } from '../../Context/CategoryTestProvider';
import Loading from '../Loading/Loading';
import SpecificCategory from '../SpecificCategory/SpecificCategory';
import Slider from "react-slick";

export default function Categories() {

 let {categoryTestData, myError , loading:loading1 }  = useContext(categoryTestContext)

 
 let [ specificCategoryId , setSpecificCategoryId ] = useState("")
 let [ firstOne , setFirstOne ] = useState(false)
 let [ clickedCategory , setClickedCategory ] = useState('')


 const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear", 
  arrows : false
};




if ( myError  ) {

  return (
    <>
      <div className="h-[88vh] flex justify-center items-center">
        <div className="bg-white font-bold text-2xl text-red-500"> {myError } </div>
      </div>
    </>
  );
}

console.log(loading1 , "specific loading --> "  );


if ( loading1  ) {
  // return <Loading/>
  return <Loading />
}

  return (
    <>
    <div className=' py-11 my-3'>
   <div className='w-[80%] mx-auto'>
    <p className=" capitalize text-green-500 text-2xl text-center font-bold my-5 dark:text-green-400">all <span className='capitalize text-slate-400 text-2xl text-center font-bold my-5 dark:text-slate-200'>categories</span> </p>

   <div className="slider-container">
      <Slider {...settings} >


      {
      categoryTestData?.map( ( category , index) => <div 
      key={index} className='w-full md:w-[80%] lg:w-1/3 xl:w-1/5  p-3 my-2' >
      <div  onClick={()=>{
        setSpecificCategoryId(category._id)
        setFirstOne(true)
        setClickedCategory(category.name)
      }}  className='lg:w-[85%] sm:w-[150%]  border-[1px] bg-white dark:bg-slate-600/[0.06] border-solid border-gray-500 rounded-md overflow-hidden  hover:shadow-lg hover:shadow-green-300 hover:cursor-pointer '>
      <img className='w-[100%] h-[120px] object-fill mx-auto' src={category.image} alt="" />
      <h2 className='font-bold text-lg text-green-700 text-center my-3 dark:text-slate-100'> {category.name} </h2>
      </div>
      </div> )
    }


      </Slider>
    </div>
 


   </div>

    </div>

     <div className=' p-3 '>
               <SpecificCategory specificCategoryId={specificCategoryId} firstOne={firstOne} clickedCategory={clickedCategory} />
  
     </div>
    </>
  )
}


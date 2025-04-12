import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import SpecificBrand from '../SpecificBrand/SpecificBrand';
import Slider from "react-slick";




export default function Brands() {



  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear" ,
    arrows : false
  };




  let [brands, setBrands] = useState([])
  let [specificBrands, setSpecificBrands] = useState([])
  let [specificBrandsName, setSpecificBrandsName] = useState("")
  let [loading, setLoading] = useState(false)
  let [clickBrand, setClickBrand] = useState('')
  let [ clickedBrand , setClickedBrand ] = useState('')
  let [ firstOne , setFirstOne ] = useState(0)

  let getBrands = async () => {

    setLoading(true)

    try {

      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      console.log(data.data);
      setBrands(data.data);

    } catch (error) {

      console.log(error);

    }
    finally {

      setLoading(false)

    }

  }

    /////////////////////////////////////////////////////

    let getSpecificBrands = async (id) => {

      setLoading(true)
  
      try {
  
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
        console.log(data.data);
        setSpecificBrands(data.data);
  
      } catch (error) {
  
        console.log(error);
  
      }
      finally {
  
        setLoading(false)
  
      }
  
    }



  useEffect(() => { getBrands() }, [])

  if (loading == true) {
    return <Loading />
  }


  return (
    <>
   <div className="py-6">

   <p className=" capitalize text-green-500 text-2xl text-center font-bold my-5 dark:text-green-400">all <span className='capitalize text-slate-400 text-2xl text-center font-bold my-5 dark:text-slate-200'>brands</span> </p>

   <div className='  p-5 my-2  w-[85%] mx-auto'>

   <div className="slider-container">
      <Slider {...settings}>

      {
          brands?.map((brand, index) => <div onClick={() => {
                setClickBrand(brand.name)
                getSpecificBrands(brand._id)
                setSpecificBrandsName(brand.name)
                setClickedBrand(brand.name)
                setFirstOne(firstOne+1)
              }} 
              key={index} className='w-full md:w-1/2 lg:w-1/3 xl:w-[12%] p-3 cursor-pointer'>

                <div className={`flex flex-col justify-center items-center bg-white border-[1px] border-green-500 rounded-lg p-3 hover:shadow-lg hover:shadow-green-500 transition-all duration-500 min-h-[160px] ${ specificBrandsName == brand.name ? "shadow-lg shadow-teal-400 " : " " }`}>
                  <div>
                    <img className='w-full' src={brand?.image} alt={brand?.name} />
                  </div>
    
                  <div className='flex flex-col justify-between'>
                    <p className='md:text-xl text-sm text-center font-bold text-green-300 mb-2'>{brand?.name}</p>
                  </div>
                </div>
              </div>
              
        
          
        )
        }
     
      </Slider>
    </div>
</div>


     {/* <div className='  p-5 my-2  w-[85%] mx-auto'>
         {
          brands?.map((brand, index) => <div onClick={() => {
                setClickBrand(brand.name)
                getSpecificBrands(brand._id)
                setSpecificBrandsName(brand.name)
                setClickedBrand(brand.name)
                setFirstOne(firstOne+1)
              }} 
              key={index} className='w-full md:w-1/2 lg:w-1/3 xl:w-[12%] p-3 cursor-pointer'>

                <div className={`flex flex-col items-center bg-white border-[1px] border-green-500 rounded-lg p-3 hover:shadow-lg hover:shadow-green-500 transition-all duration-500 min-h-[160px] ${ specificBrandsName == brand.name ? "shadow-lg shadow-teal-400 " : " " }`}>
                  <div>
                    <img className='w-full' src={brand?.image} alt={brand?.name} />
                  </div>
    
                  <div className='flex flex-col justify-between'>
                    <p className='text-xl text-center font-bold text-green-300 mb-2'>{brand?.name}</p>
                  </div>
                </div>
              </div> 
        )
        } 
     </div> */}

<SpecificBrand  specificBrands={specificBrands} clickedBrand={clickedBrand} firstOne={firstOne} />
   

   </div>
    </>
  )
}










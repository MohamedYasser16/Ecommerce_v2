import React from "react";
import Slider from "react-slick";
import img1 from '../../assets/slider-image-1.jpeg'
import img2 from '../../assets/slider-image-2.jpeg'
import img3 from '../../assets/slider-image-3.jpeg'
import img4 from '../../assets/blog-img-1.jpeg'
import img5 from '../../assets/blog-img-2.jpeg'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Slider1() {



  var settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1 ,
    autoplay: true,
    autoplaySpeed: 1500 ,
    arrows:false 
  };

  return ( <>
  <div className="mt-3 w-[85%] mx-auto hidden md:flex ">

 
  <div className='w-2/3 container '>
     <Slider {...settings}>
    
    <div>
    <img className='w-[100%] h-[300px]' src={img1} alt="" />
    </div>
    <div>
    <img className='w-[100%] h-[300px]' src={img2} alt="" />
    </div>
    <div>
    <img className='w-[100%] h-[300px]' src={img3} alt="" />
    </div>
       
       
      </Slider>
      </div>
      <div className="w-1/3 flex flex-col">
      <img className='w-[100%] h-[150px]' src={img4} alt="" />
      <img className='w-[100%] h-[150px]' src={img5} alt="" />


      </div>
      </div>
  </>
   
  );
}

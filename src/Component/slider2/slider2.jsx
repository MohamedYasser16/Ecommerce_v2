import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import axios from "axios";

export default function Slider2({ categoryData }) {
  // let [loading, setLoadng] = useState(true);
  // let [error, setMyError] = useState(false);
  let [imges, setImegs] = useState([]);

  useEffect(() => {
    let x = [];
    categoryData.map((data) => {
      // console.log(data.image);
      x.push(data.image);
    });

    setImegs(x);
    // console.log("images slider 2", x);
    //  console.log(imges);
    imges.map((x) => console.log(x));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: -100 ,
    cssEase: "linear",
    arrows:false 
  };

  return (
    <>
      <div className="mt-3 w-[85%] container mx-auto hidden md:block">
        <div className="  ">
          <Slider {...settings}>
            {imges.length &&
              imges.map((data , index ) => 
                
                  <img className=" h-[150px] block" src={data} key={index} alt="" />
              
              )}

          </Slider>
        </div>
      </div>
    </>
  );
}

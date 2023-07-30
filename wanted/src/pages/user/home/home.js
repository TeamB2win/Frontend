import React, { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Images from "../../../../src/images";


const mainCarousel = () => {
    

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000000,
        prevArrow: null,
        nextArrow: null,
    };

    return (
        <>
            <div className="content">
                <div className="slide-container">
                    <Slider {...settings}>
                        {Images.map((item) => (
                            <div key={item.id}>
                                <div className="slide-content">
                                    <div className="img-container">
                                        <img src={item.src} alt={item.alt} className="img" />
                                    </div>
                                    <div className="text-container">
                                        <h1 className="title">{item.title}</h1>
                                        <div className="tagI-container">
                                            <h2 className="tagI">{item.tagI}</h2>
                                            <p className="name">{item.name}</p>
                                        </div>
                                        <p className="inform">{item.inform}</p>
                                        <h2 className="tagC">{item.tagC}</h2>
                                        <p className="char">{item.char}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div >
            </div >
        </>
    );
};

export default mainCarousel;

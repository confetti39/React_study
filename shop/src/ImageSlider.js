import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { customMedia } from "./GlobalStyles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "./banner1.png";
import banner2 from "./banner2.png";
import banner3 from "./banner3.png";
import banner4 from "./banner4.png";


export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (


            < Wrapper >
                <StyledSlider {...settings}>
                    <Image src={banner1}></Image>
                    <Image src={banner2}></Image>
                    <Image src={banner3}></Image>
                    <Image src={banner4}></Image>
                </StyledSlider>
            </Wrapper >

        );
    }
}

const Wrapper = styled.section`
    margin : 0 auto;
    width : 1200px;
    height : 300px;
    
    ${customMedia.lessThan("mobile")`
        display : none;
    `}
    ${customMedia.between("mobile", "largeMobile")`
        display : none;
    `}
    ${customMedia.between("largeMobiel", "tablet")`
        width : 880px;
        height : 152.5px;
    `}
    ${customMedia.between("tablet", "desktop")`
    width: 880px;
    height:220px;
    `}
    `;

const StyledSlider = styled(Slider)`
	.slick-prev:before,
	.slick-next:before {
		color: rgb(100, 149, 237);
		margin: 0 auto;
	}
	.slick-slider {
		width: 100%;
    height: 300px;
    
    ${customMedia.lessThan("mobile")`
      display: none;
    `}
    ${customMedia.between("mobile", "largeMobile")`
      display: none;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      height: 152.5px;
    `}
    ${customMedia.lessThan("desktop")`
      height: 220px;
    `}
	}
`;

const Image = styled.img`
    width:50%;
    
`;
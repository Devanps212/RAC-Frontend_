import React from "react";
import { Carousel } from "react-bootstrap";
import './banner.css';

const Banner = () => {
  return (
    <Carousel className="Banner">
      <Carousel.Item interval={3000}>
        <video className="bannerVideo" src="/assets/admin/banner/Untitled Video - Made With Clipchamp (1).mp4" autoPlay muted loop/>
        <Carousel.Caption>
          <h3>First Slide</h3>
          <p>Lorem ipsum votit le norah se denshuel sok et vatnako</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <video className="bannerVideo" src="/assets/admin/banner/Untitled Video - Made With Clipchamp (1).mp4" autoPlay muted loop />
        <Carousel.Caption>
          <h3>Second Slide</h3>
          <p>Lorem ipsum votit le norah se denshuel sok et vatnako</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;

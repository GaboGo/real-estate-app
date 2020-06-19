import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'

const ImgCarousel = (props) => {
    const [images, setImages] = useState([])

    useEffect(()=>{
      setImages(props.images && props.images.length > 0 ? props.images.map((img, i) => {  
          return(
            <Carousel.Item className="w-100" key={i}>
                <img
                className={`d-block w-100 ${props.detailed ? "detail-img" : "card-img"}`}
                src={img}
                alt={`Space ${i}`}
                />
            </Carousel.Item>
          ) 
      }): <Carousel.Item className="w-100">
            <img 
            alt="no-space" 
            className="d-block w-100 card-img" 
            src={process.env.PUBLIC_URL + "/assets/no-image3.png"}
            />
         </Carousel.Item>)
    },[props.images,props.detailed])

    return (<Carousel className="d-flex w-100" indicators="true" interval={null} fade="true">{images}</Carousel>)
}

export default ImgCarousel
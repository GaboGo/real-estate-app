import React from "react"
import ImgCarousel from '../Carousel/Carousel'
import CurrencyFormat from 'react-currency-format'
import { Row, Col } from "react-bootstrap"

const Card = (props) => {

    return (
        <Row className="col-lg-5 p-0 card-container" key={props.info.id}>
            <ImgCarousel images={props.info.images}></ImgCarousel>
            <Col className="d-flex flex-column align-items-center">
                <Row className="card-name-trend w-100">
                   <h3 className="m-0 d-flex">{props.info.title}</h3>
                </Row>
                <Row className="m-0 d-flex">
                   <p className="m-0"><strong>Area:</strong>{" " + props.info.area} m2</p>
                </Row>
                <Row className="m-0 d-flex">
                   <p className="m-0"><strong>Baños:</strong>{" " + props.info.bathrooms}</p>
                </Row>
                <Row className="m-0 d-flex">
                    <p className="m-0">Arriendo: <CurrencyFormat value={props.info.pricing.rentalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                </Row>
                <Row className="m-0 d-flex">
                     <p className="m-0">Administracion: <CurrencyFormat value={props.info.pricing.administrativeFee != null ? props.info.pricing.administrativeFee : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p> 
                </Row>
                <Row className="m-0 d-flex">
                     <p className="m-0"><strong> Total: <CurrencyFormat value={props.info.pricing.rentalPrice + props.info.pricing.administrativeFee} displayType={'text'} thousandSeparator={true} prefix={'$'} /></strong></p>
                </Row>
            </Col>
        </Row>
    );
}

export default Card

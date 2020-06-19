import React from "react"
import ImgCarousel from '../Carousel/Carousel'
import CurrencyFormat from 'react-currency-format'
import { Row, Card } from "react-bootstrap"
import { Link } from "react-router-dom";

const Box = (props) => {
    
    const cardInfo = props.info
    return (
        <Card className="col-lg-5 p-0 card-container" key={cardInfo.id}>
            <ImgCarousel images={cardInfo.images}></ImgCarousel>
            <Link className="links" to={`/properties/${cardInfo.id}`}>
                <Card.Body className="d-flex flex-column align-items-center">
                    <Row className="card-name-trend w-100">
                    <h3 className="m-0 d-flex">{cardInfo.title}</h3>
                    </Row>
                    <Row className="m-0 d-flex">
                    <p className="m-0"><strong>Area:</strong>{" " + cardInfo.area} m2</p>
                    </Row>
                    <Row className="m-0 d-flex">
                    <p className="m-0"><strong>Baños:</strong>{" " + cardInfo.bathrooms}</p>
                    </Row>
                    <Row className="m-0 d-flex">
                        <p className="m-0">Arriendo: <CurrencyFormat value={cardInfo.pricing.rentalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                    </Row>
                    <Row className="m-0 d-flex">
                        <p className="m-0">Administracion: <CurrencyFormat value={cardInfo.pricing.administrativeFee != null ? cardInfo.pricing.administrativeFee : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p> 
                    </Row>
                    <Row className="m-0 d-flex">
                        <p className="m-0"><strong> Total: <CurrencyFormat value={cardInfo.pricing.rentalPrice + cardInfo.pricing.administrativeFee} displayType={'text'} thousandSeparator={true} prefix={'$'} /></strong></p>
                    </Row>
                </Card.Body>
            </Link>
        </Card>
    );
}

export default Box

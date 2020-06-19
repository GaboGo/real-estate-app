import React from "react"
import ImgCarousel from '../components/Carousel/Carousel'
import CurrencyFormat from 'react-currency-format'
import { Row, Col, Container } from "react-bootstrap"
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Details = ({ match, data }) => {

    let property = data.find(p => p.id == match.params.propertyId);
    let propertyData;
    
    const mapStyles = {
      height: "400px",
      width: "100%"
    };

    if (property) {
      const position = [property.location.latitude, property.location.longitude]

      propertyData = (
        <div className="detail-container" key={property.id}>
            <h1>{property.title}</h1>
            <ImgCarousel images={property.images} detailed></ImgCarousel>
            <Col className="d-flex flex-column align-items-center">
                <Row className="mt-2 mb-2 card-name-trend w-100">
                   <p><strong>Published on </strong>{new Date(property.createdAt).toDateString()}</p>
                </Row>
                <Row className="card-name-trend w-100">
                   <p className="m-0 d-flex text-justify">{property.description}</p>
                </Row>
                <Row className="m-0 d-flex">
                   <p className="m-0"><strong>Area:</strong>{" " + property.area} m2</p>
                </Row>
                <Row className="m-0 d-flex">
                    <p className="m-0"><strong>Baños:</strong>{" " + property.bathrooms}</p>
                </Row>
                <Row className="m-0 d-flex">
                    <p className="m-0">Arriendo: <CurrencyFormat value={property.pricing.rentalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                </Row>
                <Row className="m-0 d-flex">
                    <p className="m-0">Administracion: <CurrencyFormat value={property.pricing.administrativeFee != null ? property.pricing.administrativeFee : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p> 
                </Row>
                <Row className="m-0 d-flex">
                    <p className="m-0"><strong> Total: <CurrencyFormat value={property.pricing.rentalPrice + property.pricing.administrativeFee} displayType={'text'} thousandSeparator={true} prefix={'$'} /></strong></p>
                </Row>
            </Col>
            <div className="mt-3 mb-3">
              <Map style={mapStyles} center={position} zoom={13}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={position}>
                  <Popup>{property.title}</Popup>
                </Marker>
              </Map>
            </div>
        </div>
      );
    } else {
      propertyData = <span></span>;
    }
  
    return (
      <Container fluid={true}>
        <div>{propertyData}</div>
      </Container>
    );
};

export default Details;
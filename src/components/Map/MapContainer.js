import React from "react"
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Maps = (props) => {

    const mapStyles = {
      height: "400px",
      width: "100%"
    };

    const position = [props.latitud, props.longitud]
    
    return (
      <Map style={mapStyles} center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
          <Popup>{props.title}</Popup>
        </Marker>
      </Map>
    );
};

export default Maps;
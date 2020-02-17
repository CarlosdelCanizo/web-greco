import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from "leaflet";

const UserMarker = props => {

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }
  return <Marker ref={initMarker} {...props} />
}

var coords = null

class MapCoords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: null,
      position: props,
      positionMobile: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mobileLat != this.props.mobileLat || prevProps.mobileLon != this.props.mobileLon) {
      this.props.setMobileLat(this.props.mobileLat);
      this.props.setMobileLon(this.props.mobileLon);
      this.setState({
        positionMobile: {
          lat: this.props.mobileLat,
          lng: this.props.mobileLon
        }
      })
    }
  }

  handleClick(event) {
    this.setState({ currentPos: event.latlng });
    coords = (this.state.currentPos)
    this.props.setLat(event.latlng.lat)
    this.props.setLon(event.latlng.lng)
    this.props.setMobileLat("")
    this.props.setMobileLon("")
  }


  render() {
    return (
      <Map
        style={{ height: "40vh" }}
        center={this.props.center}
        zoom={this.props.zoom}
        maxZoom={18}
        dragging={true}
        animate={true}
        easeLinearity={0.25}
        onClick={this.handleClick}
        tap={false}
      >
        <TileLayer
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.state.currentPos && <UserMarker position={this.state.currentPos}>
          {/* <Popup style={{ height: "100", width: "100" }} position={this.state.currentPos}>
            Your installation is here!
           <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
          </Popup> */}
        </UserMarker>
        }

        {(this.state.currentPos) ? (null) : (this.state.positionMobile != "" && <UserMarker position={this.state.positionMobile} />)}
      </Map>

    )
  }
}

export default MapCoords;
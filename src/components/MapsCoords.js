import React, { Component } from "react";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
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
      currentPos: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({ currentPos: event.latlng });
    coords = (this.state.currentPos)
    localStorage.setItem("coords", JSON.stringify(coords))
  }

  render() {
    return (
      <Map center={this.props.center}
        zoom={this.props.zoom}
        maxZoom={18}
        dragging={true}
        animate={true}
        easeLinearity={0.25}
        onClick={this.handleClick}
      >
        <TileLayer
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {/* {this.state.currentPos && <UserMarker position={this.state.currentPos}>
          <Popup position={this.state.currentPos}>
            Your solar installation is here!
            </Popup>
        </UserMarker>} */}
              { this.state.currentPos && <UserMarker position={this.state.currentPos} draggable={true}>
            <Popup position={this.state.currentPos}>
              Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
            </Popup>
          </UserMarker>}
      </Map>
    )
  }
}

export default MapCoords;
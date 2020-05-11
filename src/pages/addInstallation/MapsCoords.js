import React, { Component } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from "leaflet";

var editLat = null;
var editLon = null;

const UserMarker = props => {

  let DefaultIcon = L.icon({

    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [13, 41] // point of the icon which will correspond to marker's location
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

  componentDidMount() {
    var myPanel = JSON.parse(localStorage.getItem("myPanel"));

    if (myPanel !== null && myPanel.lat !== "" && myPanel.lat !== undefined && myPanel.lon !== "" && myPanel.lon !== undefined) {
      editLat = myPanel.lat;
      editLon = myPanel.lon;
      this.setState({
        currentPos: [editLat, editLon]
      });
    } else {
      if (myPanel === null || myPanel === undefined && this.state.position.lat === null && this.state.position.lng === null) {
        this.setState({
          currentPos: null,
        });
      }
    }
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
        </UserMarker>
        }
      </Map>

    )
  }
}

export default MapCoords;
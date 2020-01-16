import React from 'react'
import './Statistics.css';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, Row, Col } from 'antd';
import axios from 'axios';
import Header from '../../components/header/Header'
import ClimateObjective from './ClimateObjective'


var position = { lat: 39.8714243295929, lng: -0.06466403603553773 }
var addressPoints = [[50.5, 30.5, 0.2], [50.6, 30.4, 0.5]]

// var heat = L.heatLayer([
//   [50.5, 30.5, 0.2], // lat, lng, intensity
//   [50.6, 30.4, 0.5],
// ], { radius: 25 }).addTo(map);

// var map = L.map('map').setView([42.35, -71.08], 13)
// var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// var position = { lat: 39.8714243295929, lng: -0.06466403603553773 }

// // initialize the map
// var map = L.map('map').setView(position, 6);

// // load a tile layer
// L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
//   {
//     attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
//     maxZoom: 18,
//     minZoom: 6
//   }).addTo(map);

// map.setZoom(12);
// var addressPoints = this.state.addressPoints
// var heat = L.heatLayer([addressPoints], { radius: 25 }).addTo(map);

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressPoints: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    var body = {
      lat: position.lat,
      lon: position.lng,
      distance: 450
    }
    var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
    axios.get('http://10.0.10.195:8088/solarPanel', body,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      }
    )
      .then(result => this.setState({
        addressPoints: result.data.content,
        isLoading: false
      })
      )
      .catch(error => this.setState({
        error,
        isLoading: false
      }));

    console.log("Estos son los puntos", this.state.addressPoints)

    // var map = L.map('map').setView([-37.82109, 175.2193], 16);
    // var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(map);
    // addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });
    // var heat = L.heatLayer(addressPoints).addTo(map),
    //   draw = true;
    // map.on({
    //   movestart: function () { draw = false; },
    //   moveend: function () { draw = true; },
    //   mousemove: function (e) {
    //     if (draw) {
    //       heat.addLatLng(e.latlng);
    //     }
    //   }
    // })

  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Row>
          <div id="background-statistics">
            <Col span={0} xs={24} sm={12} md={12} lg={12} xl={12}>
              <div id="statistics-map-container" >
                <LeafletMap
                  style={{
                    height: '85vh'
                  }}
                  center={[50, 10]}
                  zoom={4}
                  maxZoom={18}
                  attributionControl={true}
                  zoomControl={true}
                  doubleClickZoom={true}
                  scrollWheelZoom={true}
                  dragging={true}
                  animate={true}
                  easeLinearity={0.35}
                >
                  <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  />
                </LeafletMap>
              </div>
            </Col>
            <Col span={24} xs={24} sm={12} md={12} lg={12} xl={12}>
              <div id="capacity-card-statistics-container" >
                <h2 id="tittle-installed">ROOFTOP PV INSTALLED CAPACITY</h2>
                <h1 style={{ color: "#2a4092" }} id="numbers-installed">500</h1><p id="big-letters-installed"> MW</p>
                <p style={{ color: "#bfc5d2" }} id="small-letters-installed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt est vel diam tincidunt tristique
                </p>
              </div>
              <div id="climate-objective-card-statistics-container" >
                <h2 id="tittle-installed">CLIMATE OBJECTIVE</h2>
                <div id="cipher">
                  <h1 style={{ color: "#2a4092" }} id="numbers-climate-objective" >37</h1>
                  <p id="letters-climate-objective">GW</p>
                  <p id="small-letters-climate">Target 2030</p>
                </div>
                <ClimateObjective />
              </div>
            </Col>
          </div>
        </Row>
      </React.Fragment>
    );
  }
}

export default Statistics
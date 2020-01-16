import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Row, Col, Divider, Popover } from 'antd'
import solar from '../../assets/solar.jpg'
import "leaflet/dist/leaflet.css";
import "./provaZoom.css"
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Header from '../../components/header/Header'
import axios from 'axios'

class ProvaZoom extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    };
  }

  getDistance(from, to) {
    var container = document.getElementById('distance');
    container.innerHTML = ("New Delhi to Mumbai - " + (from.distanceTo(to)).toFixed(0) / 1000) + ' km';
    // console.log("PRIMERA DISTANCIA", primeraDistancia)
  }

  getBoundPoints() {
    var corner1 = L.latLng(40.712, -74.227),
      corner2 = L.latLng(40.774, -74.125),
      bounds = L.latLngBounds(corner1, corner2);
  }

  componentDidMount() {
    console.log("REFERENCIA MAPA LEAFLET:", this.refs.map.leafletElement.getBounds())
    // var _northEast = getNorthEast();
    // var _southWest = getSouthWest()
    // console.log("NORTH_EAST AND SOUTH_WEST:", _northEast, _southWest)

    // var puntos = {
    //   _northEast: "",
    //   _southWest: ""
    // }
    // puntos = this.refs.map.leafletElement.getBounds()
    // console.log("PUNTOS:", puntos)

    let mapInst = this.refs.map.leafletElement;
    console.log("REFERENCIA MAPA LEAFLET SECOND TRY:", mapInst)

    // map.on('dragend', function onDragEnd() {
    //   var width = map.getBounds().getEast() - map.getBounds().getWest();
    //   var height = map.getBounds().getNorth() - map.getBounds().getSouth();

    //   alert(
    //     'center:' + map.getCenter() + '\n' +
    //     'width:' + width + '\n' +
    //     'height:' + height + '\n' +
    //     'size in pixels:' + map.getSize()
    //   )
    // });

    var latlngbounds = new L.latLngBounds();
    console.log("LATLNGBOUNDS:", latlngbounds)

    // const uk = new L.LatLngBounds([[49, -9.5], [62, 2.3]]);
    // this.refs.map.fitBounds(uk);
    // console.log("UK:", uk)

    // var bounds = rectangle.getBounds(),
    //   northWest = bounds.getNorthWest(),
    //   northEast = bounds.getNorthEast(),
    //   distance = northWest.distanceTo(northEast),
    //   distanceFromCenter = distance / 2;

    // console.log(distanceFromCenter)

  }





  // primeraDistancia = getDistance((40.712, -74.227), (40.774, -74.125));

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div id="leaflet-prova-container">
        <Map center={position} zoom={this.state.zoom} ref='map'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
        </Map>
      </div>
    );
  }
}

export default ProvaZoom
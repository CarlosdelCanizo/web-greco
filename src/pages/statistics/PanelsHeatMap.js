import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import axiosConfig from '../../api/axiosConfig'
import { parse } from 'qs';


class PanelsHeatMap extends React.Component {
  state = {
    mapHidden: false,
    layerHidden: false,
    radius: 8,
    blur: 8,
    max: 1.5,
    limitAddressPoints: true
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    var body = {}
    var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
    axiosConfig.get('/solarPanel/getalllatandlon', body,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then((response) => {
        console.log("HeatMap Adress points response", response.data)
        this.setState({
          addressPoints: response.data,
          isLoading: false
        })

      })

      .catch(error => this.setState({
        error,
        isLoading: false
      }));

  }

  render() {
    const gradient = {
      0.1: "blue",
      0.2: "cyan",
      0.4: "green",
      0.6: "yellow",
      0.8: "red",
      "1.0": "#DE9A96"
    };

    return (
      <div>
        <Map id="leaflet-heat-map"
          center={[0, 0]}
          zoom={1}
        >
          <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={this.state.addressPoints}
            latitudeExtractor={m => m[0]}
            longitudeExtractor={m => m[1]}
            gradient={gradient}
            intensityExtractor={m => parseFloat(m[2] / 10)}
            radius={Number(this.state.radius)}
            blur={Number(this.state.blur)}
            max={Number.parseFloat(this.state.max)}
            tap={false}
          />

          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </div>
    );
  }
}

export default PanelsHeatMap

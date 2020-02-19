import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import axiosConfig from '../../api/axiosConfig'


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

  /**
   * Toggle limiting the address points to test behavior with refocusing/zooming when data points change
   */
  // toggleLimitedAddressPoints() {
  //   if (this.state.limitAddressPoints) {
  //     this.setState({
  //       addressPoints: addressPoints.slice(500, 1000),
  //       limitAddressPoints: false
  //     });
  //   } else {
  //     this.setState({ addressPoints, limitAddressPoints: true });
  //   }
  // }

  render() {
    if (this.state.mapHidden) {
      return (
        <div>
          <input
            type="button"
            value="Toggle Map"
            onClick={() => this.setState({ mapHidden: !this.state.mapHidden })}
          />
        </div>
      );
    }

    const gradient = {
      // 0.1: "#89BDE0",
      // 0.2: "#96E3E6",
      // 0.4: "#82CEB6",
      // 0.6: "#FAF3A5",
      // 0.8: "#F5D98B",
      // "1.0": "#DE9A96"
      0.1: "blue",
      0.2: "cyan",
      0.4: "green",
      0.6: "yellow",
      0.8: "red",
      "1.0": "#DE9A96"
    };

    return (
      <div>
        <Map center={[0, 0]} zoom={1} style={{ height: "80vh" }}>
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

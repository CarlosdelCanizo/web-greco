import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import './Legend.css';
//import pushpin from '../../assets/pushpin.png'

class Legend extends MapControl {
  createLeafletElement(props) { }

  componentDidMount() {

    // const legendText = "This is a map of PV installations registered with Generation Solar." +
    //   " Explore it, meet energy colleagues, and sign up to register your facilities or view statistics." +
    //   " All this and more you can do through the options in the sidebar"

    const legendText = ""

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      div.innerHTML = '<img src="../../assets/pushpin.png" /> Photovoltaic installation';
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);

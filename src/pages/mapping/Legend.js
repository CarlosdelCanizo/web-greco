import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import './Legend.css';

const Legend = () => {
  const { map } = useLeaflet();
  // console.log(map);

  useEffect(() => {

    const legendText = "These are the photovoltaic installations registered in Generation Solar. Explore it, check the statistics, make solar friends... Use the menu options and sign up for more!"

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML = legendText;
      return div;
    };

    legend.addTo(map);
  }, []);
  return null;
};

export default Legend;


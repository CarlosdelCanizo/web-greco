// import React from 'react';
// import { Map, Marker, Popup, TileLayer,LayersControl, FeatureGroup } from 'react-leaflet';
// import HeatmapLayer from '../utils/HeatmapLayer';
// import { addressPoints } from '../utils/realworld.10000.js';

// const position = [39.8714243295929, -0.06466403603553773]
 
// class StatisticsMap extends React.Component {
   
//   render() {
//     return (
//       <div>
//       <Map center={position} zoom={13} style={{ height: '100%' }} >
//             <LayersControl>
//               <LayersControl.BaseLayer name="Base" checked>
//                 <TileLayer
//                   url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//                   attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors"
//                 />
//               </LayersControl.BaseLayer>
//               <LayersControl.Overlay name="Heatmap" checked>
//                 <FeatureGroup color="purple">
//                   <Marker position={[50.05, -0.09]} >
//                     <Popup>
//                       <span>A pretty CSS3 popup.<br /> Easily customizable. </span>
//                     </Popup>
//                   </Marker>
//                   <HeatmapLayer
//                     fitBoundsOnLoad
//                     fitBoundsOnUpdate
//                     points={addressPoints}
//                     longitudeExtractor={m => m[1]}
//                     latitudeExtractor={m => m[0]}
//                     intensityExtractor={m => parseFloat(m[2])}
//                   />
//                 </FeatureGroup>
//               </LayersControl.Overlay>
//               <LayersControl.Overlay name="Marker">
//                 <FeatureGroup color="purple">
//                   <Marker position={position} >
//                     <Popup>
//                       <span>A pretty CSS3 popup.<br /> Easily customizable. </span>
//                     </Popup>
//                   </Marker>
//                 </FeatureGroup>
//               </LayersControl.Overlay>
//             </LayersControl>
//           </Map>
//       </div>
//     );
//   }
// }

// export default StatisticsMap
// // import React, { useState, useEffect } from 'react';
// // import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
// // import { Button, Row, Col, Divider, Tooltip, Icon } from 'antd';
// // import spinner from "../../assets/spinner.svg";
// // import noImage from '../../assets/solar-panel.svg';
// // import 'leaflet/dist/leaflet.css';
// // import './Mapping.css';
// // import L from 'leaflet';
// // import icon from 'leaflet/dist/images/marker-icon.png';
// // import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// // import axiosConfig from '../../api/axiosConfig';
// // import { Link } from 'react-router-dom';
// // import Legend from './Legend';

// // const PanelImage = ({ imageUrl }) => {
// //   switch (imageUrl) {
// //     case null: {
// //       return <img src={spinner} alt="LOADING..." id="spiner-images" />;
// //     }
// //     case 'no-image': {
// //       return <img
// //         src={noImage}
// //         alt="without image"
// //         id="public-private-mapping-panel-image"
// //       />
// //     }
// //     default: {
// //       return (
// //         <img
// //           src={imageUrl}
// //           alt="panel image"
// //           id="public-private-mapping-panel-image"
// //         />
// //       );
// //     }
// //   }
// // };

// // const PrivateMapping = () => {

// //   localStorage.setItem("lastPage", localStorage.getItem("actualPage"))
// //   localStorage.setItem("actualPage", "/private-mapping-sider")

// //   document.body.classList.remove('body_forms');
// //   const access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

// //   let DefaultIcon = L.icon({
// //     iconUrl: icon,
// //     shadowUrl: iconShadow
// //   });

// //   L.Marker.prototype.options.icon = DefaultIcon;

// //   const initMarker = ref => {
// //     if (ref) {
// //       ref.leafletElement.openPopup()
// //     }
// //   }

// //   const [panels, setPanels] = useState([])
// //   const [individualPanel, setIndividualPanel] = useState({});
// //   const [imageUrl, setImageUrl] = useState();

// //   //GET ALL PANELS
// //   useEffect(() => {
// //     axiosConfig
// //       .get('/solarPanel/getAllSolarPanel')
// //       .then(response => {
// //         setPanels(response.data);
// //       });
// //   }, []);

// //   //GET ESPECIFIC SOLAR PANEL
// //   function getSpecificSolarPanel(id) {
// //     axiosConfig
// //       .get('/solarPanel/' + id,
// //         {
// //           headers: {
// //             "Authorization": access_token
// //           }
// //         })
// //       .then(response => {
// //         const data = response.data
// //         setIndividualPanel({ ...data });
// //       })
// //   }

// //   //GET PANEL IMAGE
// //   function getImage(id) {
// //     axiosConfig({
// //       url: '/multimedia/' + id + '/getImage/',
// //       method: 'GET',
// //       responseType: 'blob'
// //     }).then(response => {
// //       const url = window.URL.createObjectURL(new Blob([response.data]));
// //       setImageUrl(url);
// //     });
// //   }

// //   //GIVE LIKE
// //   const giveLike = (id) => {
// //     var body
// //     axiosConfig
// //       .post("/like/givelike/" + id, body,
// //         {
// //           headers: {
// //             "Authorization": access_token
// //           }
// //         })
// //       .then(response => {
// //         setIndividualPanel({
// //           likes: response.data.numberOfLikes,
// //           liked: response.data.liked
// //         });

// //       });
// //   }

// //   const seePanel = () => {
// //     localStorage.setItem('myPanel', JSON.stringify(individualPanel))
// //   }



// //   return (
// //     <React.Fragment>
// //       <div className="leaflet-container">
// //         <LeafletMap
// //           style={{ height: '94vh' }}
// //           center={[50, 10]}
// //           zoom={4}
// //           maxZoom={18}
// //           attributionControl={true}
// //           zoomControl={true}
// //           doubleClickZoom={true}
// //           scrollWheelZoom={true}
// //           dragging={true}
// //           animate={true}
// //           easeLinearity={0.35}
// //           tap={false}
// //         >
// //           <TileLayer
// //             url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
// //           />
// //           {panels.map((panel, id) => (
// //             <Marker key={id} position={[panel.lat, panel.lon]}
// //               onClick={() => {
// //                 getSpecificSolarPanel(panel.id)
// //                 if (panel.multimedia && panel.multimedia !== "undefined" && panel.multimedia.length > 0) {
// //                   getImage(panel.multimedia[0].id);
// //                 } else {
// //                   setImageUrl('no-image');
// //                 }
// //               }}
// //             >
// //               <Popup >
// //                 <span>
// //                   <Tooltip title="Like" id="tooltip-like">
// //                     <Icon style={{ fontSize: '16px', color: '#c3c3c3' }}
// //                       type="like"
// //                       theme={individualPanel.liked ? 'twoTone' : 'outlined'}
// //                       onClick={() => {
// //                         giveLike(panel.id)
// //                       }}
// //                       id="like-icon" />
// //                   </Tooltip>
// //                   <p id={individualPanel.liked ? "text-likes-checked" : "text-likes"}>likes:</p>
// //                   <p id={individualPanel.liked ? "number-likes-checked" : "number-likes"}>{individualPanel.likes}</p>
// //                 </span>
// //                 <div id="public-private-mapping-popup">
// //                   <Row>
// //                     <Col span={24} id="public-private-mapping-installation-name">
// //                       <p>{panel.installationName}</p>
// //                     </Col>
// //                   </Row>
// //                   <Row>
// //                     <Col span={24}>
// //                       <div id="container-img">
// //                         <PanelImage imageUrl={imageUrl} />
// //                       </div>
// //                     </Col>
// //                   </Row>
// //                   <Divider id="divider-mapping-top" />
// //                   <Row id="public-private-mapping-text-fields">
// //                     <Col span={8}>
// //                       <h5 id="public-private-mapping-data-labels">
// //                         Installed capacity
// //                       </h5>
// //                       <h3 id="public-private-mapping-data-fields">
// //                         {panel.electrical_capacity} kW
// //                       </h3>
// //                     </Col>
// //                     <Col span={8}>
// //                       <h5 id="public-private-mapping-data-labels">
// //                         Area
// //                       </h5>
// //                       <h3 id="public-private-mapping-data-fields">
// //                         {panel.surface} m²
// //                       </h3>
// //                     </Col>
// //                     <Col span={8}>
// //                       <h5 id="public-private-mapping-data-labels">
// //                         Inverter capacity
// //                       </h5>
// //                       <h3 id="public-private-mapping-data-fields">
// //                         {panel.inverterCapacity} kW
// //                       </h3>
// //                     </Col>
// //                   </Row>
// //                   <Row>
// //                     <Col span={12}>

// //                       <Link to={
// //                         {
// //                           pathname: "/show-panel-details-sider",
// //                           myPanel: { panel }
// //                         }
// //                       }>

// //                         {localStorage.setItem('pathname', "private-mapping-sider")}
// //                         <Button id="mapping-button-left" onClick={seePanel()}>
// //                           + info
// //                       </Button>
// //                       </Link>
// //                     </Col>
// //                     <Col span={12}>

// //                       <Link to={
// //                         {
// //                           pathname: "/feed-panel-sider",
// //                           myPanel: { panel }
// //                         }
// //                       }>

// //                         {localStorage.setItem('pathname', "private-mapping-sider")}
// //                         <Button id="mapping-button-right" onClick={seePanel()}>
// //                           Feed
// //                     </Button>
// //                       </Link>
// //                     </Col>
// //                   </Row>
// //                 </div>
// //               </Popup>
// //             </Marker>
// //           ))}
// //           <Legend />
// //         </LeafletMap>
// //       </div>
// //     </React.Fragment >
// //   )
// // }

// // export default PrivateMapping;

// import React, { useState, useEffect } from 'react';
// import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Button, Row, Col, Divider, Tooltip, Icon } from 'antd';
// import spinner from "../../assets/spinner.svg";
// import noImage from '../../assets/solar-panel.svg';
// import 'leaflet/dist/leaflet.css';
// import './Mapping.css';
// import L from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// import axiosConfig from '../../api/axiosConfig';
// import { Link } from 'react-router-dom';
// import Legend from './Legend';

// const PanelImage = ({ imageUrl }) => {
//   switch (imageUrl) {
//     case null: {
//       return <img src={spinner} alt="LOADING..." id="spiner-images" />;
//     }
//     case 'no-image': {
//       return <img
//         src={noImage}
//         alt="without image"
//         id="public-private-mapping-panel-image"
//       />
//     }
//     default: {
//       return (
//         <img
//           src={imageUrl}
//           alt="panel image"
//           id="public-private-mapping-panel-image"
//         />
//       );
//     }
//   }
// };

// const PrivateMapping = () => {

//   document.body.classList.remove('body_forms');
//   const access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

//   let DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow
//   });

//   L.Marker.prototype.options.icon = DefaultIcon;

//   const initMarker = ref => {
//     if (ref) {
//       ref.leafletElement.openPopup()
//     }
//   }

//   const [panels, setPanels] = useState([])
//   const [individualPanel, setIndividualPanel] = useState({});
//   const [imageUrl, setImageUrl] = useState();

//   //GET ALL PANELS
//   useEffect(() => {
//     axiosConfig
//       .get('/solarPanel/getAllSolarPanel')
//       .then(response => {
//         setPanels(response.data);
//       });
//   }, []);

//   //GET ESPECIFIC SOLAR PANEL
//   function getSpecificSolarPanel(id) {
//     axiosConfig
//       .get('/solarPanel/' + id,
//         {
//           headers: {
//             "Authorization": access_token
//           }
//         })
//       .then(response => {
//         const data = response.data
//         setIndividualPanel({ ...data });
//       })
//   }

//   //GET PANEL IMAGE
//   function getImage(id) {
//     axiosConfig({
//       url: '/multimedia/' + id + '/getImage/',
//       method: 'GET',
//       responseType: 'blob'
//     }).then(response => {
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       setImageUrl(url);
//     });
//   }

//   //GIVE LIKE
//   const giveLike = (id) => {
//     var body
//     axiosConfig
//       .post("/like/givelike/" + id, body,
//         {
//           headers: {
//             "Authorization": access_token
//           }
//         })
//       .then(response => {
//         setIndividualPanel({
//           likes: response.data.numberOfLikes,
//           liked: response.data.liked
//         });

//       });
//   }

//   const seePanel = () => {
//     localStorage.setItem('myPanel', JSON.stringify(individualPanel))
//   }



//   return (
//     <React.Fragment>
//       <div className="leaflet-container">
//         <LeafletMap
//           style={{ height: '94vh' }}
//           center={[50, 10]}
//           zoom={4}
//           maxZoom={18}
//           attributionControl={true}
//           zoomControl={true}
//           doubleClickZoom={true}
//           scrollWheelZoom={true}
//           dragging={true}
//           animate={true}
//           easeLinearity={0.35}
//           tap={false}
//         >
//           <TileLayer
//             url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//           />
//           {panels.map((panel, id) => (
//             <Marker key={id} position={[panel.lat, panel.lon]}
//               onClick={() => {
//                 getSpecificSolarPanel(panel.id)
//                 if (panel.multimedia && panel.multimedia !== "undefined" && panel.multimedia.length > 0) {
//                   getImage(panel.multimedia[0].id);
//                 } else {
//                   setImageUrl('no-image');
//                 }
//               }}
//             >
//               <Popup >
//                 <span>
//                   <Tooltip title="Like" id="tooltip-like">
//                     <Icon style={{ fontSize: '16px', color: '#c3c3c3' }}
//                       type="like"
//                       theme={individualPanel.liked ? 'twoTone' : 'outlined'}
//                       onClick={() => {
//                         giveLike(panel.id)
//                       }}
//                       id="like-icon" />
//                   </Tooltip>
//                   <p id={individualPanel.liked ? "text-likes-checked" : "text-likes"}>likes:</p>
//                   <p id={individualPanel.liked ? "number-likes-checked" : "number-likes"}>{individualPanel.likes}</p>
//                 </span>
//                 <div id="public-private-mapping-popup">
//                   <Row>
//                     <Col span={24} id="public-private-mapping-installation-name">
//                       <p>{panel.installationName}</p>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col span={24}>
//                       <div id="container-img">
//                         <PanelImage imageUrl={imageUrl} />
//                       </div>
//                     </Col>
//                   </Row>
//                   <Divider id="divider-mapping-top" />
//                   <Row id="public-private-mapping-text-fields">
//                     <Col span={8}>
//                       <h5 id="public-private-mapping-data-labels">
//                         Installed capacity
//                       </h5>
//                       <h3 id="public-private-mapping-data-fields">
//                         {panel.electrical_capacity} kW
//                       </h3>
//                     </Col>
//                     <Col span={8}>
//                       <h5 id="public-private-mapping-data-labels">
//                         Area
//                       </h5>
//                       <h3 id="public-private-mapping-data-fields">
//                         {panel.surface} m²
//                       </h3>
//                     </Col>
//                     <Col span={8}>
//                       <h5 id="public-private-mapping-data-labels">
//                         Inverter capacity
//                       </h5>
//                       <h3 id="public-private-mapping-data-fields">
//                         {panel.inverterCapacity} kW
//                       </h3>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col span={12}>

//                       <Link to={
//                         {
//                           pathname: "/show-panel-details-sider",
//                           myPanel: { panel }
//                         }
//                       }>

//                         {localStorage.setItem('pathname', "private-mapping-sider")}
//                         <Button id="mapping-button-left" onClick={seePanel()}>
//                           + info
//                       </Button>
//                       </Link>
//                     </Col>
//                     <Col span={12}>

//                       <Link to={
//                         {
//                           pathname: "/feed-panel-sider",
//                           myPanel: { panel }
//                         }
//                       }>

//                         {localStorage.setItem('pathname', "private-mapping-sider")}
//                         <Button id="mapping-button-right" onClick={seePanel()}>
//                           Feed
//                     </Button>
//                       </Link>
//                     </Col>
//                   </Row>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//           <Legend />
//         </LeafletMap>
//       </div>
//     </React.Fragment >
//   )
// }

// export default PrivateMapping;


import React, { useState, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Row, Col, Divider, Tooltip, Icon } from 'antd';
import spinner from "../../assets/spinner.svg";
import noImage from '../../assets/solar-panel.svg';
import 'leaflet/dist/leaflet.css';
import './Mapping.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import axiosConfig from '../../api/axiosConfig';
import { Link } from 'react-router-dom';
import Legend from './Legend';

const PanelImage = ({ imageUrl }) => {
  switch (imageUrl) {
    case null: {
      return <img src={spinner} alt="LOADING..." id="spiner-images" />;
    }
    case 'no-image': {
      return <img
        src={noImage}
        alt="without image"
        id="public-private-mapping-panel-image"
      />
    }
    default: {
      return (
        <img
          src={imageUrl}
          alt="panel image"
          id="public-private-mapping-panel-image"
        />
      );
    }
  }
};

const PrivateMapping = () => {

  document.body.classList.remove('body_forms');
  const access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

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

  const [panels, setPanels] = useState([])
  const [individualPanel, setIndividualPanel] = useState({});
  const [imageUrl, setImageUrl] = useState();

  //GET ALL PANELS
  useEffect(() => {
    axiosConfig
      .get('/solarPanel/getAllSolarPanel')
      .then(response => {
        setPanels(response.data);
      });
  }, []);

  //GET ESPECIFIC SOLAR PANEL
  function getSpecificSolarPanel(id) {
    axiosConfig
      .get('/solarPanel/' + id,
        {
          headers: {
            "Authorization": access_token
          }
        })
      .then(response => {
        const data = response.data
        setIndividualPanel({ ...data });
      })
  }

  //GET PANEL IMAGE
  function getImage(id) {
    axiosConfig({
      url: '/multimedia/' + id + '/getImage/',
      method: 'GET',
      responseType: 'blob'
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setImageUrl(url);
    });
  }

  //GIVE LIKE
  const giveLike = (id) => {
    var body
    axiosConfig
      .post("/like/givelike/" + id, body,
        {
          headers: {
            "Authorization": access_token
          }
        })
      .then(response => {
        setIndividualPanel({
          likes: response.data.numberOfLikes,
          liked: response.data.liked
        });

      });
  }

  const seePanel = () => {
    localStorage.setItem('myPanel', JSON.stringify(individualPanel))
  }



  return (
    <React.Fragment>
      <div className="leaflet-container">
        <LeafletMap
          style={{ height: '94vh' }}
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
          tap={false}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {panels.map((panel, id) => (
            <Marker key={id} position={[panel.lat, panel.lon]}
              onClick={() => {
                getSpecificSolarPanel(panel.id)
                if (panel.multimedia && panel.multimedia !== "undefined" && panel.multimedia.length > 0) {
                  getImage(panel.multimedia[0].id);
                } else {
                  setImageUrl('no-image');
                }
              }}
            >
              <Popup >
                <span>
                  <Tooltip title="Like" id="tooltip-like">
                    <Icon style={{ fontSize: '16px', color: '#c3c3c3' }}
                      type="like"
                      theme={individualPanel.liked ? 'twoTone' : 'outlined'}
                      onClick={() => {
                        giveLike(panel.id)
                      }}
                      id="like-icon" />
                  </Tooltip>
                  <p id={individualPanel.liked ? "text-likes-checked" : "text-likes"}>likes:</p>
                  <p id={individualPanel.liked ? "number-likes-checked" : "number-likes"}>{individualPanel.likes}</p>
                </span>
                <div id="public-private-mapping-popup">
                  <Row>
                    <Col span={24} id="public-private-mapping-installation-name">
                      <p>{panel.installationName}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div id="container-img">
                        <PanelImage imageUrl={imageUrl} />
                      </div>
                    </Col>
                  </Row>
                  <Divider id="divider-mapping-top" />
                  <Row id="public-private-mapping-text-fields">
                    <Col span={8}>
                      <h5 id="public-private-mapping-data-labels">
                        Installed capacity
                      </h5>
                      <h3 id="public-private-mapping-data-fields">
                        {panel.electrical_capacity} kW
                      </h3>
                    </Col>
                    <Col span={8}>
                      <h5 id="public-private-mapping-data-labels">
                        Area
                      </h5>
                      <h3 id="public-private-mapping-data-fields">
                        {panel.surface} m²
                      </h3>
                    </Col>
                    <Col span={8}>
                      <h5 id="public-private-mapping-data-labels">
                        Inverter capacity
                      </h5>
                      <h3 id="public-private-mapping-data-fields">
                        {panel.inverterCapacity} kW
                      </h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>

                      <Link to={
                        {
                          pathname: "/show-panel-details-sider",
                          myPanel: { panel }
                        }
                      }>

                        {localStorage.setItem('pathname', "private-mapping-sider")}
                        <Button id="mapping-button-left" onClick={seePanel()}>
                          + info
                      </Button>
                      </Link>
                    </Col>
                    <Col span={12}>

                      <Link to={
                        {
                          pathname: "/feed-panel-sider",
                          myPanel: { panel }
                        }
                      }>

                        {localStorage.setItem('pathname', "private-mapping-sider")}
                        <Button id="mapping-button-right" onClick={seePanel()}>
                          Feed
                    </Button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Popup>
            </Marker>
          ))}
          <Legend />
        </LeafletMap>
      </div>
    </React.Fragment >
  )
}

export default PrivateMapping;


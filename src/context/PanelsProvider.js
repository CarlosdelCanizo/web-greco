import React, { useState, useEffect, useContext } from 'react'
import PanelsContext from './Context'
import axios from 'axios'
import UserContext from '../utils/Auth'

const PanelsProvider = ({ children }) => {

  const user = useContext(UserContext)
  const { email } = UserContext;

  //GET MY SOLAR PANELS
  const [myPanels, setMyPanels] = useState([]);
  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  useEffect(() => {
    axios.get("http://10.0.10.195:8088/solarPanel?q=registrationSolarPanel.owner.email::" + email,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(result => setMyPanels(result.data.content));
  }, []);

  console.log("myPanels de panel provider", myPanels)


  const deletePanel = id => {
    setPanels(prevState => {
      const panels = prevState.panels.filter(panel => panel.id !== id);
      return { ...prevState, panels };
    });
  };

  const addPanel = panel => {
    setPanels(prevState => ({
      ...prevState,
      panels: [panel, ...prevState.panels],
    }));
  }

  // const editPanel = id => {
  //   const panels = prevState.panels.filter(panel => panel.id !== id);
  //   setPanels(prevState => ({
  //     ...prevState,
  //     panels: [panel, ...prevState.panels],
  //   }))
  // }

  const panelState = {
    panels: [
      {
        id: 1,
        lat: "65",
        lon: "65",
        orientation: 80,
        inclination: 80,
        surface: 80,
        electricalCapacity: 80,
        technologyUsed: "Poli",
        commissioningDate: "2019-01-01",
        inverterCapacity: 80,
        photographOfInstallation: "Txema",
        multimedia: [],
        panelTrackingOrientation: false,
        panelTrackingInclination: false,
        observation: "Ninguna",
        battery: true,
        batteryDescription: "Molt Bona",
        installationName: "Chema",
        installationProperty: "Txema",
        installationType: "Private",
        isMine: false
      },
      {
        id: 2,
        lat: "65",
        lon: "65",
        orientation: 70,
        inclination: 70,
        surface: 7,
        electricalCapacity: 70,
        technologyUsed: "Poli",
        commissioningDate: "2019-01-01",
        inverterCapacity: 70,
        photographOfInstallation: "Txema",
        multimedia: [],
        panelTrackingOrientation: false,
        panelTrackingInclination: false,
        observation: "Alguna",
        battery: true,
        batteryDescription: "Normal",
        installationName: "Txema prova",
        installationProperty: "Txema",
        installationType: "Private",
        isMine: false
      },
      {
        id: 3,
        lat: "65",
        lon: "65",
        orientation: 70,
        inclination: 70,
        surface: 7,
        electricalCapacity: 70,
        technologyUsed: "Poli",
        commissioningDate: "2019-01-01",
        inverterCapacity: 70,
        photographOfInstallation: "Txema",
        multimedia: [],
        panelTrackingOrientation: false,
        panelTrackingInclination: false,
        observation: "Alguna",
        battery: true,
        batteryDescription: "Normal",
        installationName: "Txemonazo",
        installationProperty: "Txema",
        installationType: "Private",
        isMine: false
      },
    ],
    deletePanel,
    addPanel,
    // editPanel
  }

  {
    myPanels.map(panel => (
      panelState.panels = panel
    ))
  }

  const [panels, setPanels] = useState(panelState)

  console.log("els putos panels vinguts del server", panels)
  return <PanelsContext.Provider value={panels}>{children}</PanelsContext.Provider>
}

export default PanelsProvider
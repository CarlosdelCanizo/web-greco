import React, { useState, useEffect, useContext } from 'react'
import PanelsContext from './Context'
import axiosConfig from '../api/axiosConfig'
import UserContext from '../utils/Auth'

const PanelsProvider = ({ children }) => {

  const { email } = UserContext;

  //GET MY SOLAR PANELS
  const [myPanels, setMyPanels] = useState([]);
  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  useEffect(() => {
    axiosConfig.get("/solarPanel?q=registrationSolarPanel.owner.email::" + email,
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


  const panelState = {
    panels: [],
    deletePanel,
    addPanel,

  }

  {
    myPanels.map(panel => (
      panelState.panels = panel
    ))
  }

  const [panels, setPanels] = useState(panelState)

  return <PanelsContext.Provider value={panels}>{children}</PanelsContext.Provider>
}

export default PanelsProvider
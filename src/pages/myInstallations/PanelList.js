import React, { useContext, useState, useEffect } from 'react'
import PanelCard from './PanelCard'
import axiosConfig from '../../api/axiosConfig'


const PanelList = (props) => {

  const [panelsList, setPanelsList] = useState([])

  const fetchPanels = async () => {
    var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    const result = await axiosConfig(
      '/solarPanel/getmysolarpanel',
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      }
    );
    setPanelsList(result.data);
  };


  useEffect(() => {
    fetchPanels();
  }, []);

  return (
    <div>
      {panelsList.map(panel => (
        <PanelCard key={panel.id} panel={panel} fetchPanels={fetchPanels} />
      ))}
    </div>
  )
}
export default PanelList
import React, { useContext, useState, useEffect } from 'react'
import PanelCard from './PanelCard'
import axiosConfig from '../../api/axiosConfig'


function PanelList() {

  const [panelsList, setPanelsList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  return (
    <div>
      {panelsList.map(panel => (
        <PanelCard key={panel.id} panel={panel} />
      ))}
    </div>
  )
}
export default PanelList
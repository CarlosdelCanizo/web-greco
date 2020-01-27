import React, { useContext, useState, useEffect } from 'react'
import { ProfileContext } from '../../utils/profile/ProfileContext'
import PanelCard from './PanelCard'
import axiosConfig from '../../api/axiosConfig'


function PanelList() {

  const profileContext = useContext(ProfileContext)
  const [panelsList, setPanelsList] = useState([])

  var email = profileContext.email
  useEffect(() => {
    const fetchData = async () => {
      var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
      const result = await axiosConfig(
        '/solarPanel?q=registrationSolarPanel.owner.email::' + email,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": access_token
          }
        }
      );
      setPanelsList(result.data.content);
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
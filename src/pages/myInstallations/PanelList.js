import React, { useContext, useState, useEffect } from 'react'
import { ProfileContext } from '../../utils/profile/ProfileContext'
import PanelCard from './PanelCard'
import axios from 'axios'


function PanelList() {

  const profileContext = useContext(ProfileContext)
  const [panels, setPanels] = useState([])

  var email = profileContext.email
  useEffect(() => {
    const fetchData = async () => {
      var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
      const result = await axios(
        'http://10.0.10.195:8088/solarPanel?q=registrationSolarPanel.owner.email::' + email,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": access_token
          }
        }
      );
      setPanels(result.data.content);
    };

    fetchData();
  }, []);

  return (
    <div>
      {panels.map(panel => (
        <PanelCard key={panel.id} panel={panel} />
      ))}
    </div>
  )
}
export default PanelList
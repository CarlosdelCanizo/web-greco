import React, { useContext } from 'react'
import PanelsContext from '../../context/Context'
import PanelCard from './PanelCard'

function PanelList() {

  const { panels } = useContext(PanelsContext)

  return (
    <div>
      {panels.map(panel => (
        <PanelCard key={panel.id} panel={panel} />
      ))}
    </div>
  )
}
export default PanelList
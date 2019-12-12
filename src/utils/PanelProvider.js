import React, { useState, useContext } from 'react'
// import PanelContext from "./context"
import First from '../components/First'
import Second from '../components/Second'
import Third from '../components/Third'
import Fourth from '../components/Fourth'
import Fifth from '../components/Fifth'
import Sixth from '../components/Sixth'

const PanelContext = React.createContext();

const PanelProvider = (props) => {

    const panelInitialState = {
        electrical_capacity: 0,
        surface: 0,
        // lat: 0,
        // lon: 0,
        // orientation: 0,
        // inclination: 0,
        // panelTrackingOrientation: false,
        // panelTrackingInclination: false,
        technologyUsed: "",
        inverterCapacity: 0,
        commissioningDate: "",
        // observation: "",
        // battery: false,
        // batteryDescription: "",
        // installationName: "",
        // installationProperty: "",
        // installationType: ""
    }

    const [panel, setPanel] = useState(panelInitialState)

    return (
        <PanelContext.Provider
            value={(panel, setPanel)}
        >
            <First />
            {/* <Second />
            <Third />
            <Fourth />
            <Fifth />
            <Sixth /> */}
            {props.children}

        </PanelContext.Provider>
    )

}

export default { PanelContext, PanelProvider }
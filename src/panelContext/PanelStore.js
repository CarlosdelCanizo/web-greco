// import React, { createContext, useReducer } from "react";
// import PanelReducer from './PanelReducer'

// const initialPanelState = {
//   lat: "",
//   lon: "",
//   orientation: "",
//   inclination: "",
//   surface: 0,
//   electricalCapacity: 0,
//   technologyUsed: "",
//   commissioningDate: "",
//   inverterCapacity: 0,
//   photographOfInstallation: null,
//   multimedia: [],
//   panelTrackingOrientation: false,
//   panelTrackingInclination: true,
//   observation: "",
//   battery: true,
//   batteryDescription: "",
//   installationName: "",
//   installationProperty: "",
//   installationType: "",
//   isMine: false
// }

// const PanelStore = ({ children }) => {
//   const [state, dispatch] = useReducer(Reducer, initialPanelState);
//   return (
//     <Context.Provider value={[state, dispatch]}>
//       {children}
//     </Context.Provider>
//   )
// };

// export const PanelContext = createContext(initialPanelState);
// export default PanelStore;
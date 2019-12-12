import React, { useContext } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router'
import history from './history'
// import Context from './context'
import Welcome from '../pages/Welcome'
import Login from '../pages/Login'
import Register from '../pages/Register'
import CompleteRegister from '../pages/CompleteRegister'
import AddPanel from '../pages/AddPanel'
// import UpdatePanel from './pages/UpdatePanel'
import DeletePanel from '../pages/DeletePanel'
import UploadImages from '../pages/UploadImages'
import PublicMapping from '../pages/PublicMapping'
import PrivateMapping from '../pages/PrivateMapping'
import ResetPassword from '../pages/ResetPassword'
import ConfirmPassword from '../pages/ConfirmPassword'
import FinishedPanel from '../pages/FinishedPanel'
import Header from '../components/Header'
import UserProfile from '../components/UserProfile'
// import PanelRegister from './pages/PanelContextProvider'
import First from '../components/First'
import Second from '../components/Second'
import Third from '../components/Third'
import Fourth from '../components/Fourth'
import Fifth from '../components/Fifth'
import Sixth from '../components/Sixth'
import CurrentPanel from '../components/CurrentPanel'
import ChatPanel from '../pages/ChatPanel'
import LeftMenu from '../components/LeftMenu'
import StatisticsMap from '../components/StatisticsMap'

// const PrivateRoute = ({ component: Component }) => (
//   <Route render={props => isAuthenticated === true
//     ? <Component {...props} />
//     : <Redirect to={{ pathname: '/' }} />
//   }
//   />
// )

const Routes = () => {

  // const context = useContext(Context)

  return (
    <div>
      <Router history={history} >
        <div>
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/login' component={Login} />   
            <Route path='/register' component={Register} />
            <Route path='/complete-register' component={CompleteRegister} />
            <Route path='/add-panel' component={AddPanel} />
            {/* <Route path='/update-panel' component={UpdatePanel} /> */}
            <Route path='/delete-panel' component={DeletePanel} />
            <Route path='/upload-images' component={UploadImages} />
            <Route path='/reset-password' component={ResetPassword} />
            <Route path='/confirm' component={ConfirmPassword} />
            <Route path='/finished-panel' component={FinishedPanel} />
            <Route path='/public-mapping' component={PublicMapping} />
            <Route path='/private-mapping' component={PrivateMapping} />
            {/* <Route path='/panel-register' component={PanelRegister} /> */}
            <Route path='/first' component={First} />
            <Route path='/second' component={Second} />
            <Route path='/third' component={Third} />
            <Route path='/fourth' component={Fourth} />
            <Route path='/fifth' component={Fifth} />
            <Route path='/sixth' component={Sixth} />
            <Route path='/current-panel' component={CurrentPanel} />
            <Route path='/chat-panel' component={ChatPanel} />
            <Route path='/left-Menu' component={LeftMenu} />
            <Route path='/statistics-map' component={StatisticsMap} />
            {/* <PrivateRoute path='/privateroute'
              auth={context.authState}
              component={PrivateComponent} />

            <PrivateRoute path="/profile"
              auth={context.authState}
              component={Profile} /> */}

          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default Routes
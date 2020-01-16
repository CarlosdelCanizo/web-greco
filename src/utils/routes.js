import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { AuthContext } from '../App'
import Welcome from '../pages/welcome/Welcome'
import LoginForm from '../pages/authentication/LoginForm'
import RegisterForm from '../pages/authentication/RegisterForm'
import ResetPasswordForm from '../pages/authentication/ResetPasswordForm'
import ConfirmPasswordForm from '../pages/authentication/ConfirmPasswordForm'
import CompleteRegister from '../pages/authentication/CompleteRegister'
import FirstForm from '../pages/addInstallation/FirstForm'
import SecondForm from '../pages/addInstallation/SecondForm';
import ThirdForm from '../pages/addInstallation/ThirdForm';
import FourthForm from '../pages/addInstallation/FourthForm';
import FifthForm from '../pages/addInstallation/FifthForm';
import SixthForm from '../pages/addInstallation/SixthForm';
import FinishedPanel from '../pages/addInstallation/FinishedPanel';
import PublicMapping from '../pages/mapping/PublicMapping'
import PrivateMapping from '../pages/mapping/PrivateMapping'
import MyInstallations from '../pages/myInstallations/MyInstallations'
import Statistics from '../pages/statistics/Statistics'
import About from '../components/header/mainMenu/About'
import EditUser from '../components/header/userMenu/EditUser'
// import MyChallenges from '../pages/myChallenges/MyChallengues'
import ChatPanel from '../components/panels/chatPanel/ChatPanel'
import ShowPanelDetails from '../components/panels/showPanel/ShowPanelDetails'
import InviteFriends from '../components/header/userMenu/InviteFriends'
import Profile from '../utils/Profile'
import Notification from '../components/header/notificationsMenu/Notification'
import PanelList from '../pages/myInstallations/PanelList'
import ProvaZoom from '../pages/mapping/ProvaZoom'
import Proves from '../Proves/Proves'
import Proves2 from '../Proves/Proves2'
import ChallengeCard from '../pages/myChallenges/ChallengeCard'
import ChallengeLevelCard from '../pages/myChallenges/ChallengeLevelCard'
import FeedPanel from '../components/panels/chatPanel/FeedPanel'
import MapExample from '../pages/mapping/MapExample'
// import ProvaPanelContext from '../context/ProvaPanelContext'

const Routes = () => {

  const { state } = React.useContext(AuthContext);
  const PrivateRoute = ({ component: Component, auth }) => (
    <Route render={props => state.isAuthenticated === true
      ? <Component auth={auth} {...props} />
      : <Redirect to={{ pathname: '/' }} />
    }
    />
  )
  return (

    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/reset-password' component={ResetPasswordForm} />
          <Route path='/confirm' component={ConfirmPasswordForm} />
          <Route path='/complete-register' component={CompleteRegister} />
          <Route path='/profile' component={Profile} />
          <Route path='/public-mapping' component={PublicMapping} />
          <Route path='/about' component={About} />
          <Route path='/panel' component={PanelList} />
          <Route path='/show-panel-details' component={ShowPanelDetails} />
          <Route path='/sixth' component={SixthForm} />
          <Route path='/prova-zoom' component={Proves} />
          <Route path='/prova-bubbles' component={Proves} />
          <Route path='/prova-feed' component={FeedPanel} />
          <Route path='/map-example' component={MapExample} />
          {/* <Route path='/prova-heat' component={Proves2} /> */}
          {/* <Route path='/my-challenges' component={ChallengeCard} /> */}
          <Route path='/my-challenges' component={ChallengeLevelCard} />
          {/* <Route path='/my-challenges' component={MyChallenges} /> */}
          {/* <Route path='/panel-context' component={ProvaPanelContext} /> */}
          <PrivateRoute path='/first'
            auth={state.isAuthenticated}
            component={FirstForm} />
          <PrivateRoute path='/second'
            auth={state.isAuthenticated}
            component={SecondForm} />
          <PrivateRoute path='/third'
            auth={state.isAuthenticated}
            component={ThirdForm} />
          <PrivateRoute path='/fourth'
            auth={state.isAuthenticated}
            component={FourthForm} />
          <PrivateRoute path='/fifth'
            auth={state.isAuthenticated}
            component={FifthForm} />
          <PrivateRoute path='/sixth'
            auth={state.isAuthenticated}
            component={SixthForm} />
          <PrivateRoute path='/finished-panel'
            auth={state.isAuthenticated}
            component={FinishedPanel} />
          <PrivateRoute path='/my-installations'
            auth={state.isAuthenticated}
            component={MyInstallations} />
          <PrivateRoute path='/my-statistics'
            auth={state.isAuthenticated}
            component={Statistics} />
          {/* <PrivateRoute path='/my-challenges'
            auth={state.isAuthenticated}
            component={MyChallenges} /> */}
          <PrivateRoute path='/edit-user-details'
            auth={state.isAuthenticated}
            component={EditUser} />
          <PrivateRoute path='/feed-panel'
            auth={state.isAuthenticated}
            component={ChatPanel} />
          <PrivateRoute path='/show-panel-details'
            auth={state.isAuthenticated}
            component={ShowPanelDetails} />
          <PrivateRoute path='/private-mapping'
            auth={state.isAuthenticated}
            component={PrivateMapping} />
          <PrivateRoute path='/invite-friends'
            auth={state.isAuthenticated}
            component={InviteFriends} />
          <PrivateRoute path='/notifications'
            auth={state.isAuthenticated}
            component={Notification} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Routes;
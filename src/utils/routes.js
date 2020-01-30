import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from '../App';
import Welcome from '../pages/welcome/Welcome';
import LoginForm from '../pages/authentication/LoginForm';
import RegisterForm from '../pages/authentication/RegisterForm';
import ResetPasswordForm from '../pages/authentication/ResetPasswordForm';
import ConfirmPasswordForm from '../pages/authentication/ConfirmPasswordForm';
import CompleteRegister from '../pages/authentication/CompleteRegister';
import FirstForm from '../pages/addInstallation/FirstForm';
import SecondForm from '../pages/addInstallation/SecondForm';
import ThirdForm from '../pages/addInstallation/ThirdForm';
import FourthForm from '../pages/addInstallation/FourthForm';
import FifthForm from '../pages/addInstallation/FifthForm';
import SixthForm from '../pages/addInstallation/SixthForm';
import FinishedPanel from '../pages/addInstallation/FinishedPanel';
import PublicMapping from '../pages/mapping/PublicMapping';
import PrivateMapping from '../pages/mapping/PrivateMapping';
import MyInstallations from '../pages/myInstallations/MyInstallations';
import Statistics from '../pages/statistics/Statistics';
import About from '../header/mainMenu/About';
import EditUser from '../header/userMenu/EditUser';
import ShowPanelDetails from '../components/showPanel/ShowPanelDetails';
import InviteFriends from '../header/userMenu/InviteFriends';
import Profile from '../utils/profile/Profile';
import NotificationsList from '../header/notificationsMenu/NotificationsList';
import PanelList from '../pages/myInstallations/PanelList';
import FeedPanel from '../components/feedPanel/FeedPanel';
import ChallengeLevelCard from '../pages/myChallenges/ChallengeLevelCard';

const Routes = () => {
  const { state } = React.useContext(AuthContext);
  const PrivateRoute = ({ component: Component, auth }) => (
    <Route
      render={props =>
        state.isAuthenticated === true ? (
          <Component auth={auth} {...props} />
        ) : (
            <Redirect to={{ pathname: '/' }} />
          )
      }
    />
  );
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/reset-password" component={ResetPasswordForm} />
          <Route path="/confirm" component={ConfirmPasswordForm} />
          <Route path="/complete-register" component={CompleteRegister} />
          <Route path="/profile" component={Profile} />
          <Route path="/public-mapping" component={PublicMapping} />
          <Route path="/about" component={About} />
          <Route path="/panel" component={PanelList} />
          <Route path="/show-panel-details" component={ShowPanelDetails} />
          <Route path="/sixth" component={SixthForm} />
          <Route path="/feed-panel" component={FeedPanel} />

          <Route path="/fourthl" component={FourthForm} />

          <PrivateRoute
            path="/first"
            auth={state.isAuthenticated}
            component={FirstForm}
          />
          <PrivateRoute
            path="/second"
            auth={state.isAuthenticated}
            component={SecondForm}
          />
          <PrivateRoute
            path="/third"
            auth={state.isAuthenticated}
            component={ThirdForm}
          />
          <PrivateRoute
            path="/fourth"
            auth={state.isAuthenticated}
            component={FourthForm}
          />
          <PrivateRoute
            path="/fifth"
            auth={state.isAuthenticated}
            component={FifthForm}
          />
          <PrivateRoute
            path="/sixth"
            auth={state.isAuthenticated}
            component={SixthForm}
          />
          <PrivateRoute
            path="/finished-panel"
            auth={state.isAuthenticated}
            component={FinishedPanel}
          />
          <PrivateRoute
            path="/my-installations"
            auth={state.isAuthenticated}
            component={MyInstallations}
          />
          <PrivateRoute
            path="/my-statistics"
            auth={state.isAuthenticated}
            component={Statistics}
          />
          <PrivateRoute
            path="/edit-user-details"
            auth={state.isAuthenticated}
            component={EditUser}
          />
          <PrivateRoute
            path="/feed-panel"
            auth={state.isAuthenticated}
            component={FeedPanel}
          />
          <PrivateRoute
            path="/show-panel-details"
            auth={state.isAuthenticated}
            component={ShowPanelDetails}
          />
          <PrivateRoute
            path="/private-mapping"
            auth={state.isAuthenticated}
            component={PrivateMapping}
          />
          <PrivateRoute
            path="/invite-friends"
            auth={state.isAuthenticated}
            component={InviteFriends}
          />
          <PrivateRoute
            path="/notifications"
            auth={state.isAuthenticated}
            component={NotificationsList}
          />
          <PrivateRoute
            path="/my-challenges"
            auth={state.isAuthenticated}
            component={ChallengeLevelCard}
          />

        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;

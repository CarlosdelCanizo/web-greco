import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
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
import ShowPanelDetails from '../components/showPanel/ShowPanelDetails';
import FeedPanel from '../components/feedPanel/FeedPanel';
import PublicMappingSider from '../sider-pages/PublicMappingSider';
import PrivateMappingSider from '../sider-pages/PrivateMappingSider';
import AboutSider from '../sider-pages/AboutSider';
import DownloadDatabaseSider from '../sider-pages/DownloadDatabaseSider';
import MyInstallationsSiders from '../sider-pages/MyInstallationsSider';
import StatisticsSider from '../sider-pages/StatisticsSider';
import ChallengeLevelCardSider from '../sider-pages/ChallengeLevelCardSider';
import PrivacyPolicySider from '../sider-pages/PrivacyPolicySider';
import EditUserSider from '../sider-pages/EditUserSider';
import InviteFriendsSider from '../sider-pages/InviteFriendsSider';
import ShowPanelSider from '../sider-pages/ShowPanelSider';
import NotificationsListSider from '../sider-pages/NotificationsListSider';
import FeedPanelSider from '../sider-pages/FeedPanelSider';

const Routes = () => {

  const history = createBrowserHistory();
  const { state } = React.useContext(AuthContext);

  const PrivateRoute = ({ component: Component, auth }) => (

    <Route
      render={props =>
        state.isAuthenticated === true ? (
          <Component auth={auth} {...props} />
        ) : (
            <Redirect to={{ pathname: "/" }} />
          )
      }
    />
  );

  return (
    <div>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/reset-password" component={ResetPasswordForm} />
          <Route path="/confirm" component={ConfirmPasswordForm} />
          <Route path="/complete-register" component={CompleteRegister} />
          <Route path="/public-mapping-sider" component={PublicMappingSider} />
          <Route path="/about-sider" component={AboutSider} />
          <Route path="/download-sider" component={DownloadDatabaseSider} />
          <Route path="/notifications-sider" component={NotificationsListSider} />
          <Route path="/statistics-sider" component={StatisticsSider} />
          <Route path="/privacy-policy-sider" component={PrivacyPolicySider} />

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
            path="/my-installations-sider"
            auth={state.isAuthenticated}
            component={MyInstallationsSiders}
          />
          <PrivateRoute
            path="/edit-user-details-sider"
            auth={state.isAuthenticated}
            component={EditUserSider}
          />
          <PrivateRoute
            path="/feed-panel"
            auth={state.isAuthenticated}
            component={FeedPanel}
          />
          <PrivateRoute
            path="/show-panel-details-slider"
            auth={state.isAuthenticated}
            component={ShowPanelDetails}
          />
          <PrivateRoute
            path="/private-mapping-sider"
            auth={state.isAuthenticated}
            component={PrivateMappingSider}
          />
          <PrivateRoute
            path="/invite-friends-sider"
            auth={state.isAuthenticated}
            component={InviteFriendsSider}
          />
          <PrivateRoute
            path="/my-challenges-sider"
            auth={state.isAuthenticated}
            component={ChallengeLevelCardSider}
          />
          <PrivateRoute
            path="/show-panel-details-sider"
            auth={state.isAuthenticated}
            component={ShowPanelSider}
          />
          <PrivateRoute
            path="/feed-panel-sider"
            auth={state.isAuthenticated}
            component={FeedPanelSider}
          />

        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes
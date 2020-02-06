import React from 'react';
import Routes from './utils/routes';
import ProfileProvider from './utils/profile/ProfileContext';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  access_token: null,
  refresh_token: null,
  expires_in: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem(
        'access_token',
        JSON.stringify(action.payload.access_token)
      );
      localStorage.setItem(
        'refresh_token',
        JSON.stringify(action.payload.refresh_token)
      );
      let expiresAt = action.payload.expires_in * 1000 + new Date().getTime();
      localStorage.setItem('expires_in', JSON.stringify(expiresAt));
      return {
        ...state,
        isAuthenticated: true,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        expires_in: action.payload.expires_in
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        access_token: null,
        refresh_token: null,
        expires_in: null
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const access_token = JSON.parse(localStorage.getItem('access_token'));
  const refresh_token = JSON.parse(localStorage.getItem('refresh_token'));
  const expires_in = JSON.parse(localStorage.getItem('expires_in'));

  React.useEffect(() => {
    if (access_token && refresh_token && expires_in) {
      dispatch({
        type: 'LOGIN',
        payload: {
          access_token,
          refresh_token,
          expires_in
        }
      });
    }
  }, []);

  // window.parent.postMessage('getCoordinates', '*');
  // window.parent.postMessage('getGyroscope', '*');

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <ProfileProvider>
        <Routes />
      </ProfileProvider>
    </AuthContext.Provider>
  );
};

export default App;

import React, { useContext, useState } from 'react';
import history from '../utils/history';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import recLogo from "../assets/rect-logo.png";
// import Context from '../utils/context';

const Header = () => {

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expiresAt')
    setTimeout(() => { history.replace('/authcheck') }, 200);
}

  const [active, setActive] = useState(false)
  const { activeItem } = setActive

  function handleItemClick() {

  }
  // const { state, dispatch } = useContext(Context);
  return (

    <Menu attached='top' pointing secondary>
    <Dropdown item icon='bars' name='bar' size='small'>
      <Dropdown.Menu>
        <Dropdown.Item>Map</Dropdown.Item>
        <Dropdown.Item>My activity</Dropdown.Item>
        <Dropdown.Item>Gamification</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>About</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Menu.Item>
      <Image src={recLogo} name='logo' size='small' />
      GRECO
        </Menu.Item>
  
    <Menu.Menu position='right'>
    <Dropdown item icon='bell outline' size='big'>
      <Dropdown.Menu>
        <Dropdown.Item>My notification</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown item icon='user circle outline' size='big'>
      <Dropdown.Menu>
        <Dropdown.Item>My profile</Dropdown.Item>
        <Dropdown.Item>
        {/* <Button onClick={() => dispatch({type: 'LOGOUT'})}>
        Logout  {state.isAuthenticated && (<h1>Hi {state.user.username} Logout</h1>)}
      </Button> */}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </Menu.Menu>
  </Menu>
  )
};

export default Header
import React, { useState} from 'react'
import recLogo from '../assets/rect-logo.png'
import solarHouse from '../assets/solar-house.png'
import { Image, Grid, Segment, Container, Divider } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

const CompleteRegister = () => {

  const userName = (localStorage.getItem('user')).toUpperCase();


  //Redirect
  const [toLocation, setLocation] = useState(false);
  function activateRedirection() {
    setLocation(true)
  }

  return (
    <Segment placeholder>
      <Grid id="grid-register" stackable columns={2} align='center'>

        <Grid.Column >
          <Container id="container-register-complete" fluid>
            <h1 id="title-register-complete" >
              {"WELL DONE! " + userName + " , YOU´RE ALREADY REGISTERED!"}
            </h1>
            <div id="text-register-complete">
              <Image id="logo" src={solarHouse} />
              <Divider hidden />
              <h4>You are already part of this great community. You only have one last step left to finish the process</h4>
            </div>

            <div id="button-container-register-complete">
              <button id="button-register-complete" onClick={activateRedirection}>
                NEXT {toLocation ? <Redirect from="/complete-register" to="/login" /> : null}
              </button>
            </div>

          </Container>
        </Grid.Column>

        <Grid.Column id="background" only='computer'>
          <div id="logo">
            <Image id="logo" src={recLogo} />
          </div>
        </Grid.Column>

      </Grid>
    </Segment>
  )
}

export default CompleteRegister


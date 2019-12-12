import React from 'react'
import recLogo from '../assets/rect-logo.png'
import { Button, Divider, Container,Image, Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Welcome = () => (
  
  <Segment placeholder>
        <Grid id="grid-welcome" stackable columns={2} align='center'>

            <Grid.Column>
                <Container id="container-welcome" fluid>
                    <h1 id="title-welcome" >WELCOME TO THE GRECO PROJECT</h1>
                    <Divider hidden />
                    <p id="text" >Fostering a Next Generation of <b>European Photovoltaic Society</b> through Open Science.</p>
                    
                    <h6 id="mini-text">Do you want to <a id="link" href="https://www.greco-project.eu/">know more?</a></h6>
                    <Divider hidden />
                    <Divider hidden />
                    <div id="button-container-welcome">
                        <Button  id="button-welcome-left" as={Link} from="/welcome" to="/public-mapping">PUBLIC ACCESS</Button>
                        <Button  id="button-welcome-right" as={Link} from="/welcome"  to="/login">LOGIN</Button>
                    </div>
                    <h6 id="mini-text">Don not you have an account yet? <Link id="link" from="/welcome" to="/register">Sign up</Link></h6>
                    <Divider id="separator" hidden />

                    <h5 id="footer-text">Coordinated by the Solar Energy Institute of the Polytechnic University of Madrid.</h5>
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

export default Welcome;
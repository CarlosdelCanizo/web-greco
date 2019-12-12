import React, { useState } from "react"
import { Container, Image, Segment, Grid, Button, Icon } from 'semantic-ui-react'
import noImage from '../assets/no-image.svg'
import Solar from '../assets/solar.jpg'
import axios from 'axios'

const LeftMenu = (props) => {

    return (
        <div>
            <Container id="left-menu-container">
                <div id="chat-panel-data">
                    <Grid columns={3}>
                        <Grid.Column>
                            <h5 id="chat-panel-data-labels">
                                Electrical capacity
                            </h5>
                            <h4 id="chat-panel-data-fields">
                                330w
                            </h4>
                        </Grid.Column>
                        <Grid.Column>
                            <h5 id="chat-panel-data-labels">
                                Surface
                            </h5>
                            <h4 id="chat-panel-data-fields">
                                12m²
                            </h4>
                        </Grid.Column>
                        <Grid.Column>
                            <h5 id="chat-panel-data-labels">
                                Power capacity
                            </h5>
                            <h4 id="chat-panel-data-fields">
                                1300w
                            </h4>
                        </Grid.Column>
                    </Grid>
                </div>
                <Segment id="chat-panel-user-name">
                    <h3>Oliver Smith</h3>
                </Segment>

                <div id="chat-panel-messages">

                </div>

                <div id="chat-panel-input-message">
                    <input placeholder='Message' type="text" name="textComment" id="send-message"
                        // value={data.textComment || ""} onChange={handleInputChange}
                    />
                    {/* <Button id="chat-panel-send-button" onClick={postComment}>
                        <Icon name="send" />
                    </Button> */}
                </div>
            </Container>
        </div >
    )
}

export default LeftMenu
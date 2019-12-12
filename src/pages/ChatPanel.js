import React, { useState, useEffect } from "react"
import { Container, Image, Segment, Grid, Button, Icon } from 'semantic-ui-react'
import noImage from '../assets/no-image.svg'
import Solar from '../assets/solar.jpg'
import axios from 'axios'

const ChatPanel = (props) => {

    var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
    var panelId = 69
    var page = 0
    var size = 20
    var params = {
        page: 'page=' + page,
        size: '&size=' + size
    }

    // INITIAL COMMENTS COMMIT ASYNC
    const [data, setData] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            const result = await axios(
                'http://10.0.10.195:8088/solarPanel/' + panelId + '/comments?', (params),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": access_token
                    }
                }
            );

            setData([{hola:'hola'}]);
            console.log("El result.data:", result.data.content)
            console.log("El data:", data)
        };
        fetchData();
    }, []);

    //GET ALL COMMENTS FROM PANEL
    // function getAllComments() {
    //     var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
    //     axios.get('http://10.0.10.195:8088/solarPanel/' + panelId + '/comments?', (params),
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": access_token
    //             }
    //         })
    //         .then(response => {
    //             if (response.status === 200) {
    //                 setData(response.data.content)
    //                 console.log("Raw response:",response.data.content);
    //                 console.log("Contingut:", data)
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    // useEffect(() => {
    //     getAllComments();
    // }, []);

    //GET COMMENT
    // function getComment() {
    //     var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
    //     axios.post("http://10.0.10.195:8088/comment/" + (Response.id),
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": access_token
    //             }
    //         })
    //         .then(response => {
    //             if (response.status === 200) {
    //                 setMessage([response.data])
    //                 console.log(response);
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    // POST COMMENT
    // function postComment() {
    //     var body = {
    //         text: data.textComment,
    //         solarPanel:
    //         {
    //             id: "69"
    //         }
    //     }
    //     axios.post("http://10.0.10.195:8088/comment/", (body),
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": access_token
    //             }
    //         })
    //         .then(response => {
    //             const dataResponse = response.data;
    //             // setMessage({
    //             //     id: response.data.id,
    //             //     text: response.data.text,
    //             //     creationDate: response.data.creationDate         
    //             // });

    //             // setMessagesList(message)
    //             console.log("Nou DATA:", dataResponse)
    //             // console.log("Missatge", message)
    //             console.log("Response a seques", response)
    //             console.log("Response data", response.data)

    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }


    //INPUT MESSAGE
    function Message({ message, index }) {
        return (
            <div >
                {message.text}
            </div>
        );
    }

    function MessageForm({ addMessage }) {
        const [value, setValue] = useState("");

        const handleSubmit = event => {
            event.preventDefault();
            if (!value) return;
            addMessage(value);
            setValue("");
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input"
                    placeholder="Message"
                    name="textComment"
                    id="send-message"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
            </form>
        );
    }

    //ARRAY MESSAGES
    const [messages, setMessages] = useState([]);

    const addMessage = text => {
        const newMessage = [...messages, { text }];
        setMessages(newMessage);
    };

    return (
        <div>
            <Container id="chat-panel-container">
                <div id="chat-panel-name">
                    <h2>Nombre de placa</h2>
                </div>
                <Button id="close-button">X</Button>
                <div id="chat-panel-image">
                    <Image src={Solar} height="266" width="423" />
                </div>
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
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            index={index}
                            message={message}
                        />
                    ))}

                </div>

                <div id="chat-panel-input-message">
                    {/* <input placeholder='Message' type="text" name="textComment" id="send-message"
                        value={data.textComment || ""} onChange={handleInputChange}
                    /> */}
                    <MessageForm addMessage={addMessage} />
                    <Button id="chat-panel-send-button"
                    //  onClick={postComment}
                    >
                        <Icon name="send" />
                    </Button>
                </div>
            </Container>
        </div >
    )
}

export default ChatPanel
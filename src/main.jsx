
import React from 'react';
import ReactDOM from 'react-dom';
import { Chat } from '@progress/kendo-react-conversational-ui';
import axios from 'axios';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.user = {
            id: 1,
            avatarUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1158477782,1888062275&fm=26&gp=0.jpg"
        };
        this.bot = { id: 0,
        avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571086751514&di=de79771acc5b2698674dd10c8e5521e5&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F10%2F20181210172115_RmaiR.thumb.700_0.jpeg'};
        this.state = {
            messages: [
                {
                    author: this.bot,
                    timestamp: new Date(),
                    text: "Hello, I'm Vera !"
                }
            ]
        };
    }

    addNewMessage = (event) => {
        let botResponse = Object.assign({}, event.message);
        this.sendMessage(event.message.text).then(
            res =>{
                console.log(res.data['response message']);
                botResponse.text = res.data['response message'];
                setTimeout(() => {
                    this.setState(prevState => ({
                        messages: [
                            ...prevState.messages,
                            botResponse
                        ]
                    }));
                }, 100);
            }).catch(error =>{
                botResponse.text = 'something went wrong :(';
                console.log(error)
        });
        botResponse.author = this.bot;
        this.setState((prevState) => ({
            messages: [
                ...prevState.messages,
                event.message
            ]
        }));

    };

    sendMessage = (messageString) => {
        const base_url = process.env.REACT_APP_HTTP_ENDPOINT;
        console.log(base_url);
        return axios({
            baseURL:base_url,
            url: `/api/v1/message/send_message/`,
            data:{"input":messageString},
            method:'post'
        });

    };

    render() {
        return (
            <div>
                <Chat user={this.user}
                      messages={this.state.messages}
                      onMessageSend={this.addNewMessage}
                      placeholder={"Type a message..."}
                      width={400}>
                </Chat>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);


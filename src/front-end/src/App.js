// import logo from './logo.svg';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import openSocket from 'socket.io-client';
import styled from 'styled-components'
import { addMessage } from './actions/appActions';
import { connectUser } from './actions/userActions';
import SideBar from './views/sidebar/SideBar';
import ChatMessages from './views/chatMessages/ChatMessages';

const Page = styled.div`
  display: flex;
  flex-direction: row;
  height: ${window.innerHeight}px;
  width: ${window.innerWidth}px;
`;

const Container = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
`;

const Form = styled.form`
  border-top: 2px #e3e3e3 solid;
  box-sizing: border-box;
  height: 40px;
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  border: 0;
  padding: 10px;
  width: 90%;
`;

const Button = styled.button`
  width: 10%;
  background:
  rgb(130, 224, 255);
  border: none;
  padding: 10px;
`;

const Li = styled.li`
  padding: 5px 10px;

  :nth-child(odd) {
    background: #d6d6d6;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    let url = 'http://localhost:3000';
    if (props.id) {
      url = `${url}?id=${props.id}`;
    }
    const socket = openSocket(url);
    this.state = {
      socket,
      inputValue: "",
      messages: [],
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    socket.on('chat message', props.addMessage);
    socket.on('connected', (payload) => {
      props.connectUser(payload.id, payload.name);
    });
  }

  formSubmit(e) {
    const { socket, inputValue } = this.state;
    const { name } = this.props;
    e.preventDefault();
    socket.emit('chat message', `${name}: ${inputValue}`);
    this.setState({ inputValue: "" })
  }

  onInputChange(e) {
    this.setState({ inputValue: e.target.value })
  }

  render() {
    const { inputValue } = this.state;
    const { messages } = this.props;
    return (
      <Page>
        <SideBar />
        <Container>
          <ChatMessages>
            {messages.map(message => (<Li>{message}</Li>))}
          </ChatMessages>
          <Form onSubmit={this.formSubmit}>
            <Input
              id="chat-text"
              autoComplete="off"
              value={inputValue}
              onChange={this.onInputChange}
            />
            <Button>Send</Button>
          </Form>
        </Container>
      </Page>
    );
  }
}

const reselector = createSelector(
    state => state.app.messages,
    state => state.user,
    (messages, user) => ({
        messages,
        name: user.name,
        id: user.id,
    }),
);

export default connect(reselector, {
    addMessage,
    connectUser,
})(App);

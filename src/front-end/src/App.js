// import logo from './logo.svg';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import openSocket from 'socket.io-client';
import styled from 'styled-components'
import SocketContext from './SocketContext';
import { addMessage } from './actions/appActions';
import { setUserValues } from './actions/userActions';
import { setUsers, removeUsers } from './actions/usersActions';
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
  background: ${({ lvl }) => (lvl === 'admin' ? '#e5e69e' : 'inherit')}

  :nth-child(odd) {
    background: ${({ lvl }) => (lvl === 'admin' ? '#e5e69e' : '#d6d6d6')};
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
    socket.on('global:chat message', ({msg, room}) => {
      props.addMessage(msg, room);
    });
    socket.on(`${props.id}:chat message`, ({msg, room}) => {
      props.addMessage(msg, room);
    });
    socket.on('global:connected msg', (msg) => {
      props.addMessage(msg, 'lobby', 'admin')
    });
    socket.on('global:new users', activeUsers => {
      props.setUsers(activeUsers);
    });
    socket.on('connected', user => {
      props.setUserValues(user.id, user.name);
    });
    socket.on('global:user disconnected', userId => {
      console.log(userId)
      props.removeUsers(userId);
    });
  }

  formSubmit(e) {
    const { socket, inputValue } = this.state;
    const { name, room } = this.props;
    e.preventDefault();
    socket.emit('chat message', { room, msg: `${name}: ${inputValue}` });
    this.setState({ inputValue: "" })
  }

  onInputChange(e) {
    this.setState({ inputValue: e.target.value })
  }

  render() {
    const { inputValue, socket } = this.state;
    const { messages, room } = this.props;
    return (
      <SocketContext.Provider value={{ socket }}>
        <Page>
          <SideBar />
          <Container>
            <ChatMessages>
              {messages[room].map(msgObject => (<Li lvl={msgObject.lvl} >{msgObject.message}</Li>))}
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
      </SocketContext.Provider>
    );
  }
}

const reselector = createSelector(
    state => state.app,
    state => state.user,
    (app, user) => ({
        messages: app.messages,
        room: app.room,
        name: user.name,
        id: user.id,
    }),
);

export default connect(reselector, {
    addMessage,
    setUserValues,
    setUsers,
    removeUsers
})(App);

// import logo from './logo.svg';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import openSocket from 'socket.io-client';
import styled from 'styled-components'
import './App.css';
import { addMessage } from './actions/appActions';

const Form = styled.form`
  background: #000;
  padding: 3px;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Input = styled.input`
  border: 0;
  padding: 10px;
  width: 90%;
  margin-right: .5%;
`;

const Button = styled.button`
  width: 9%;
  background:
  rgb(130, 224, 255);
  border: none;
  padding: 10px;
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  padding: 5px 10px;

  :nth-child(odd) {
    background: #eee;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    const socket = openSocket('http://localhost:3000');
    console.log(socket)
    this.state = {
      socket,
      inputValue: "",
      messages: [],
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    socket.on('chat message', props.addMessage);
  }

  formSubmit(e) {
    const { socket, inputValue } = this.state;
    e.preventDefault();
    socket.emit('chat message', inputValue);
    this.setState({ inputValue: "" })
  }

  onInputChange(e) {
    this.setState({ inputValue: e.target.value })
  }

  render() {
    const { inputValue } = this.state;
    const { messages } = this.props;
    return (
      <div>
        <Ul id="messages">
         {messages.map(message => (<Li>{message}</Li>))}
        </Ul>
        <Form onSubmit={this.formSubmit}>
          <Input
            id="chat-text"
            autoComplete="off"
            value={inputValue}
            onChange={this.onInputChange}
          />
          <Button>Send</Button>
        </Form>
      </div>
    );
  }
}

const reselector = createSelector(
    state => state.app.messages,
    (messages) => ({
        messages,
    }),
);

export default connect(reselector, {
    addMessage,
})(App);
 
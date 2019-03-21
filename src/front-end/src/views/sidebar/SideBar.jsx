import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import styled from 'styled-components'
import SocketContext from '../../SocketContext';
import { setUserValues } from '../../actions/userActions';
import { setUsers } from '../../actions/usersActions';
import { addMessage, changeRoom } from '../../actions/appActions';
import EditableField from './EditableField'
import SideBarLabel from './SideBarLabel'

const Container = styled.ul`
    width: 600px;
    border-right: 2px #e3e3e3 solid;
    height: ${window.innerHeight}px;
    box-sizing: border-box;
    padding: 5px;
`;

const UserConnectedList = styled.div`
    display:block;
    width: 100%;
    border: 1px solid #e3e3e3;
`;

const ListOption = styled.option`
    font-size: 18px;
    cursor:pointer;
    padding: 5px;
    background-color: ${({ select }) => select ? '#efefef' : 'inherit'}

    &:hover {
        background-color: #e3e3e3;
    }
`;

const Button = styled.button`
    margin-top: 15px;
    width: 10%;
    background: ${({isReady}) => isReady ? '#67e276' : ' #e3e3e3'};
    border: none;
    padding: 10px;
    cursor: pointer;
`;

class SideBar extends Component {
    constructor(props, context) {
        super(props);
        context.socket.on('global:update name', ({id, name}) => {
            if (props.id === id) {
                props.setUserValues(id, name);
            } else {
                props.setUsers({[id]: {id, name}});
            }
        });
        this.changeName = this.changeName.bind(this);
        this.changeRoom = this.changeRoom.bind(this);
        this.ready = this.ready.bind(this);
        this.state = {
            isReady: false
        }
    }

    changeName(value) {
        const { id } = this.props;
        this.context.socket.emit('update name', { id, name: value });
    }

    changeRoom(newRoom) {
        const { room } = this.props;
        if (room !== 'lobby') {
            this.context.socket.emit('player ready', { room, state: false });
            this.setState({ isReady: false });
        }
        this.props.changeRoom(newRoom);
    }

    ready() {
        const { id, room } = this.props;
        const { isReady } = this.state;
        this.context.socket.emit('player ready', { id, room, state: !isReady });
        this.setState({ isReady: !isReady })
    }

    render() {
        const { id, name, users, room } = this.props;
        const { isReady } = this.state;
        return (
            <Container>
                <SideBarLabel>Id:</SideBarLabel>
                <p style={{ display: 'inline-block', fontSize: '24px' }}>{id}</p>
                <EditableField value={name} name="Name" onChange={this.changeName} />
                <SideBarLabel style={{ marginTop: '15px' }}>Connected users</SideBarLabel>
                <UserConnectedList>
                    <ListOption key={"lobby"} select={room === 'lobby'} onClick={() => { this.changeRoom('lobby'); }}>Lobby</ListOption>
                    {Object.keys(users).filter(user => user !== id).map((userId) => (
                        <ListOption key={userId} select={room === userId} onClick={() => { this.changeRoom(userId); }}>{users[userId].name}</ListOption>
                    ))}
                </UserConnectedList>
                {room !== 'lobby' ? (
                    <Button onClick={this.ready} isReady={isReady} >Ready</Button>
                ) : null}
            </Container>
        );
    }
}

const reselector = createSelector(
    state => state.app,
    state => state.user,
    state => state.users,
    (app, user, users) => ({
        messages: app.messages,
        room: app.room,
        name: user.name,
        id: user.id,
        users,
    }),
);

SideBar.contextType = SocketContext;
SideBar.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default connect(reselector, {
    setUserValues,
    setUsers,
    addMessage, 
    changeRoom
})(SideBar);
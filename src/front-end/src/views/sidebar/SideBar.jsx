import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import styled from 'styled-components'
import SocketContext from '../../SocketContext';
import { setUserValues } from '../../actions/userActions';
import { setUsers } from '../../actions/usersActions';
import { addMessage } from '../../actions/appActions';
import EditableField from './EditableField'
import SideBarLabel from './SideBarLabel'

const Container = styled.ul`
    width: 600px;
    border-right: 2px #e3e3e3 solid;
    height: ${window.innerHeight}px;
    box-sizing: border-box;
    padding: 5px;
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
    }

    changeName(value) {
        const { id } = this.props;
        this.context.socket.emit('update name', { id, name: value });
    }

    render() {
        const { id, name, users } = this.props;

        return (
            <Container>
                <SideBarLabel>Id:</SideBarLabel>
                <p style={{ display: 'inline-block', fontSize: '24px' }}>{id}</p>
                <EditableField value={name} name="Name" onChange={this.changeName} />
                <SideBarLabel style={{ marginTop: '15px' }}>Connected users</SideBarLabel>
                {Object.keys(users).filter(user => user !== id).map((userId) => (
                    <p key={userId}>{users[userId].name}</p>
                ))}
            </Container>
        );
    }
}

const reselector = createSelector(
    state => state.app.messages,
    state => state.user,
    state => state.users,
    (messages, user, users) => ({
        messages,
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
    addMessage
})(SideBar);
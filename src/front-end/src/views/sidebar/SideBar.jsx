import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import styled from 'styled-components'
import SocketContext from '../../SocketContext';
import { setUserValues } from '../../actions/userActions';
import EditableField from './EditableField'

const Container = styled.ul`
    width: 600px;
    border-right: 2px #e3e3e3 solid;
    height: ${window.innerHeight}px;
    box-sizing: border-box;
    padding: 5px;
`;

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.changeName = this.changeName.bind(this);
    }

    changeName(value) {
        const { id } = this.props;
        this.props.setUserValues(id, value);
        this.context.socket.emit('update name', { id, name: value });
    }

    render() {
        const { name } = this.props;
        return (
            <Container>
                <EditableField value={name} name="Name" onChange={this.changeName} />
            </Container>
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

SideBar.contextType = SocketContext;
SideBar.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default connect(reselector, {
    setUserValues,
})(SideBar);
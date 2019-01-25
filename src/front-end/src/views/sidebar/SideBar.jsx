import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import styled from 'styled-components'

const Container = styled.ul`
    flex-grow: 1;
    border-right: 2px #e3e3e3 solid;
    height: ${window.innerHeight}px;
`;

class SideBar extends Component {

    render() {
        return (
            <Container>
                <div>Name</div>
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

export default connect(reselector)(SideBar);
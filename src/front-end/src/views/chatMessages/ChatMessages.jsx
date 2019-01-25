import React, { Component } from 'react';
import styled from 'styled-components'

const Container = styled.ul`
    flex-grow: 1;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: scroll;
    overflow-x: hidden;
`;

class ChatMessages extends Component {

    constructor(props) {
        super(props);
        this.messagesContainer = React.createRef();
    }

    componentDidUpdate(){
        const { scrollHeight, clientHeight } = this.messagesContainer.current;
        if (scrollHeight > clientHeight) {
            this.messagesContainer.current.scrollTop = scrollHeight;
        }
    }

    render() {
        return (
            <Container ref={this.messagesContainer}>
                {this.props.children}
            </Container>
        );
    }
}

export default ChatMessages;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import IconButton from '../../components/IconButton';
import SideBarLabel from './SideBarLabel';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 24px; 
`;

const Value = styled.p`
    display: inline-block;
`;

const Field = styled.div`
    flex-grow: 3;
`;

const ButtonSection = styled.div`
    text-align: right;
    flex-grow: 1;
`;

class EditableField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            value: props.value,
            isEdited: false,
        }
        this.renderButtonSection = this.renderButtonSection.bind(this);
        this.renderValue = this.renderValue.bind(this);
        this.acceptChanges = this.acceptChanges.bind(this);
        this.negateChanges = this.negateChanges.bind(this);
    }

    acceptChanges() {
        this.props.onChange(this.state.value);
        this.setState({ isEdited: false });
    }

    negateChanges() {
        this.setState({ isEdited: false, value: this.props.value });
    }

    renderValue() {
        const { isEdited, value } = this.state;
        let section = <Value>{value}</Value>;
        if (isEdited) {
            section = (
                <input value={value} onChange={(e) => { this.setState({ value: e.target.value }); }} />
            );
        }
        return section;
    }

    renderButtonSection() {
        let section = (
            <ButtonSection>
                <IconButton onClick={() => {this.setState({ isEdited: true })}}>create</IconButton>
            </ButtonSection>
        );
        if (this.state.isEdited) {
            section = (
                <ButtonSection>
                    <IconButton onClick={this.acceptChanges}>done</IconButton>
                    <IconButton onClick={this.negateChanges}>cancel</IconButton>
                </ButtonSection>
            );
        }
        return section;
    }

    render() {
        const { name } = this.state;
        return (
            <Container>
                <Field>
                    <SideBarLabel>{name}:</SideBarLabel>
                    {this.renderValue()}
                </Field>
                {this.renderButtonSection()}
            </Container>
        );
    }
}

EditableField.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default EditableField;
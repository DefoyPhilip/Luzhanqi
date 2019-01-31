import React from 'react';
import styled from 'styled-components'

const Button = styled.div`
	cursor: pointer;
	box-sizing: border-box;
	height: 32px;
	width: 32px;
	padding: 4px;
	display: inline-block;
	border-radius: 4px;
	transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

	&:hover {
		background-color: #c5c5c5;
	}
`;

const IconButton = ({ children, ...props }) => (
	<Button {...props} >
		<span className="material-icons">{children}</span>
	</Button>
);

export default IconButton;

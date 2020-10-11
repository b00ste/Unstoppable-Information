import React from 'react'
import { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
	html {
		background: rgb(166,192,240);
		background: -moz-linear-gradient(45deg, rgba(166,192,240,1) 0%, rgba(208,159,184,0.9108018207282913) 50%, rgba(246,128,132,1) 100%);
		background: -webkit-linear-gradient(45deg, rgba(166,192,240,1) 0%, rgba(208,159,184,0.9108018207282913) 50%, rgba(246,128,132,1) 100%);
		background: linear-gradient(45deg, rgba(166,192,240,1) 0%, rgba(208,159,184,0.9108018207282913) 50%, rgba(246,128,132,1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#a6c0f0",endColorstr="#f68084",GradientType=1);
		background-attachment:fixed;
		height:100%;
	}
	body {
		background: transparent;
	}
	nav {
		box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.5), 0 0 6px 0 rgba(0, 0, 0, 0.4);
	}
	.header {
		box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5), 0 0 4px 0 rgba(0, 0, 0, 0.4);
		position: fixed !important;
		top: 0;
		left: 0;
		right: 0;
	}
	footer {
		box-shadow: 6px 6px 6px 6px rgba(0, 0, 0, 0.5), 4px 4px 4px 4px rgba(0, 0, 0, 0.4);
	}
	footer, .header {
		opacity: 0.95;
	}
	footer:hover, .header:hover {
		opacity: 1;
	}
	.card-default {
		background-color: #87004c;
		background-image: linear-gradient(225deg, #87004c 0%, #784BA0 50%, #2B86C5 100%);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
		border: 0;
		margin: 1em 1em;
		border-radius: 25px;

		width: 25em;
		height: 14em;
		text-align: center;
		overflow-y: auto;
		button {
			width: 18em;
		}
		input {
			width: 20em;
			margin: em !important;
		}
		h4 {
			color: #fff;
			margin-top: 2em;
		}
		h6 {
			color: #fff;
			margin-top: 2em;
		}
		button, input {
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
			display: inline-block;
			margin 0.5em;
		}
	}
	.change-color-on-hover:hover {
		color: #B3315F !important;
		cursor: pointer;
	}
	.dropdown-menu {
		background-color: #eec0c6;
		background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
		border-radius: 5px;
		a {
			background: transparent !important;
		}
	}
	svg {
		color: #fdfcfa;
	}
`;

function Background() {
	return (
		<>
			<Global />
		</>
	);
}

export default Background;
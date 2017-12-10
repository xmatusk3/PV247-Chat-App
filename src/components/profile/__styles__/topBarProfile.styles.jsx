import styled from 'styled-components';
import {
    LIGHT_BLUE_HEADER_BACKGROUND,
    DARK_BLUE_CHANNEL_FONT
} from '../../../constants/cssColours';

export const TopBarDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${LIGHT_BLUE_HEADER_BACKGROUND}
`;

export const TopBarHeader = styled.h1`
    font-size: 1em;
	text-align: center;
	color: ${DARK_BLUE_CHANNEL_FONT};;
	text-shadow: 1px 1px #c1c0aa;
	font-weight: bold;
	font-family: "Open Sans";
	padding: 0px 10px;
`;
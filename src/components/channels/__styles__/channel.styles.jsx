import styled from 'styled-components';
import {
    DARK_BLUE_CHANNEL_FONT,
    DARK_BLUE_CHANNEL_ITEM_BACKGROUND
} from '../../../constants/cssColours';

export const ChannelDiv = styled.div`
    background-color: ${DARK_BLUE_CHANNEL_ITEM_BACKGROUND};
    height: 35px;
    width: 100%;
    color: ${DARK_BLUE_CHANNEL_FONT};
    display: flex;
    justify-content: center;
    align-items: center;
`;
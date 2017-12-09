import styled from 'styled-components';
import {
    DARK_BLUE_CHANNEL_LIST_BACKGROUND,
    DARK_BLUE_CHANNEL_FONT
} from '../../../constants/cssColours';

export const ChannelListDiv = styled.div`
    background-color: ${DARK_BLUE_CHANNEL_LIST_BACKGROUND};
    width: 20vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: ${DARK_BLUE_CHANNEL_FONT};
`;
import styled from 'styled-components';

export const AvatarImage = styled.div`
    background-image: url(${props => props.src || 'assets/no-profile.png'}); 
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center; 
    height: 197px;
    width: 120px;
    overflow: hidden;
    margin: 10px 5px;
    border-radius: 6px;
`;
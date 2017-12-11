import styled from 'styled-components';

export const AvatarLoaderPane = styled.div`
    position: relative;
    height: 100%;
    min-height: 100%;
    cursor: ${(props) => props.isUploading ? 'progress' : 'pointer'};
    
    & > .dropzone {
        width: 100%;
        height: 100%;
    }
     
    & > .dropzone > i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5em;
        color: #ccc; 
    }
`;
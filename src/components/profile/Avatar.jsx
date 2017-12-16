import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AvatarImage } from './__styles__/Avatar.styles';

import { AvatarLoader } from './AvatarLoader.jsx';
import { withOverlay } from './withOverlay.jsx';
import { uploadUserAvatar } from '../../actions/profile/actionCreators';

const Avatar = ({ uri, toggleOverlay }) => (
    <div
        className="panel panel-default"
        onMouseEnter={toggleOverlay}
        onDragOver={toggleOverlay}
    >
        <AvatarImage
            className="img-rounded"
            alt="Profile picture"
            src={uri}
        />
    </div>
);

Avatar.propTypes = {
    uri: PropTypes.string,
    toggleOverlay: PropTypes.func.isRequired,
};

const AvatarWithOverlay = withOverlay(Avatar, AvatarLoader);

export default connect(
    (state) => {
        return {
            uri: state.users.user.avatarUri,
            isUploading: state.profile.isUploadingAvatar,
        };
    },
    (dispatch) => ({
        onUpload: (files) => dispatch(uploadUserAvatar(files[0]))
    })
)(AvatarWithOverlay);
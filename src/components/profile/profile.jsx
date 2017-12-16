import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from './avatar.jsx';
import Details from './details.jsx';
import Loader  from '../login/loader.jsx';
import { fetchUserDetails } from '../../actions/profile/actionCreators';
import { ProfileDetailsDiv, AvatarLoeaderDiv } from './__styles__/profile.styles';


class Profile extends React.PureComponent {
    static propTypes = {
        fetchDetails: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.fetchDetails();
    }

    render() {
        return [
            <AvatarLoeaderDiv key="picture">
                <Loader stateLoadingSelector={state => state.profile.isFetchingAvatar}>
                    <Avatar />
                </Loader>
            </AvatarLoeaderDiv>,
            <ProfileDetailsDiv key="details">
                <Loader stateLoadingSelector={state => state.profile.isFetchingDetails}>
                    <Details />
                </Loader>
            </ProfileDetailsDiv>
        ];
    }
}

export default connect(
    null,
    (dispatch) => ({
        fetchDetails: () => dispatch(fetchUserDetails())
    })
)(Profile);
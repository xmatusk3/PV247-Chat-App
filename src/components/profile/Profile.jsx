import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from './Avatar.jsx';
import Details from './Details.jsx';
import Loader  from '../../components/shared/Loader.jsx';
import { fetchUserDetails } from '../../actions/profile/actionCreators';


class Profile extends React.PureComponent {
    static propTypes = {
        fetchDetails: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.fetchDetails();
    }

    render() {
        return [
            <div className="col-xs-12 col-md-4" key="picture">
                <Loader stateLoadingSelector={state => state.profile.isFetchingAvatar}>
                    <Avatar />
                </Loader>
            </div>,
            <div className="col-xs-12 col-md-8" key="details">
                <Loader stateLoadingSelector={state => state.profile.isFetchingDetails}>
                    <Details />
                </Loader>
            </div>
        ];
    }
}

export default connect(
    null,
    (dispatch) => ({
        fetchDetails: () => dispatch(fetchUserDetails())
    })
)(Profile);
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from '../../components/shared/Loader.jsx';

const mapStateToProps = (state, ownProps) => ({
    isLoading: ownProps.stateLoadingSelector(state),
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Loader);

connectedComponent.propTypes = {
    stateLoadingSelector: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export { connectedComponent as Loader };

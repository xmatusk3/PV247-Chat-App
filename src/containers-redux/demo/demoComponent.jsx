import { connect } from 'react-redux';
import { DemoComponent } from '../../components/demoComponent.jsx';
import {
    increaseCount
} from '../../actions/demoActionCreators';
import { uuid } from './../../utils/uuidGenerator';

const mapStateToProps = (state) => ({
    count: state.incresdNumbah, // || 0
    id: uuid()
});

const mapDispatchToProps = (dispatch) => ({
    cunt: () => dispatch(increaseCount())
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(DemoComponent);

export { connectedComponent as DemoComponent };
import React from 'react';
import PropTypes from 'prop-types';
import { Cunter, Writer } from './demoComponent.styles.jsx';

export class DemoComponent extends React.Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        cunt: PropTypes.func.isRequired,
    };

    render() {
        return (
            <Cunter onClick={this.props.cunt}>
                <Writer>
                    Number of cunts: {this.props.count}.
                </Writer>
            </Cunter>
        );
    }
}
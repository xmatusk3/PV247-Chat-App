import * as React from 'react';
import Loader from 'react-loader-advanced';

export const withOverlay = (PreviewComponent, OverlayComponent) =>
    class FileLoader extends React.PureComponent {
        constructor(props) {
            super(props);

            this.state = { showOverlay: false };
        }

        _toggleOverlay = () =>
            this.setState(prevState => ({ showOverlay: !prevState.showOverlay }));

        render() {
            return (
                <Loader
                    show={this.state.showOverlay}
                    backgroundStyle={{ borderRadius: '6px' }}
                    message={(
                        <OverlayComponent
                            toggleOverlay={this._toggleOverlay}
                            {...this.props}
                        />
                    )}
                >
                    <PreviewComponent
                        toggleOverlay={this._toggleOverlay}
                        {...this.props}
                    />
                </Loader>
            );
        }
    };
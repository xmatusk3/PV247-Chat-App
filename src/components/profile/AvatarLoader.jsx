import * as React from 'react';
import * as PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { AvatarLoaderPane } from './__styles__/AvatarLoader.styles';
import { SavingSpinner } from '../shared/SavingSpinner.jsx';

const FontAwesome = require('react-fontawesome');

class AvatarLoader extends React.PureComponent {
    static propTypes = {
        isUploading: PropTypes.bool.isRequired,
        toggleOverlay: PropTypes.func.isRequired,
        onUpload: PropTypes.func.isRequired,
    };

    componentWillUpdate(nextProps) {
        if (this.props.isUploading && !nextProps.isUploading) {
            this.props.toggleOverlay();
        }
    }

    _hideLoader = () => {
        if (!this.props.isUploading) {
            this.props.toggleOverlay();
        }
    };

    render() {
        const { isUploading, onUpload } = this.props;

        const message = isUploading
            ? <SavingSpinner />
            : <FontAwesome
                className='fa fa-upload'
                name='fa-upload'
                size='3x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                    transform: 'translate(-50%, -50%)', top: '50%', left: '50%', position: 'absolute' }}
            />;

        return (
            <AvatarLoaderPane
                isUploading={isUploading}
                onMouseLeave={this._hideLoader}
                onDragLeave={this._hideLoader}
            >
                <Dropzone
                    accept="image/gif, image/png, image/jpeg, image/bmp"
                    className="dropzone"
                    multiple={false}
                    onDrop={onUpload}
                    disabled={isUploading}
                >
                    {message}
                </Dropzone>
            </AvatarLoaderPane>
        );
    }
}

export { AvatarLoader };

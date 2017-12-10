import * as React from 'react';
import * as PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { AvatarLoaderPane } from './AvatarLoader.styles';
import { SavingSpinner } from '../shared/SavingSpinner.jsx';

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
            : <i className='glyphicon glyphicon-open' />;

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

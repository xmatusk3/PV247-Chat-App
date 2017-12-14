import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

export default class FileField extends React.Component {
    static propTypes = {
        input: PropTypes.object,
        meta: PropTypes.object,
        accept: PropTypes.object,
        multiple: PropTypes.bool,
    };

    handleDropOrClick = (acceptedFiles, rejectedFiles, e) => {
        let eventOrValue = e;
        const {input: {onChange, onBlur}} = this.props;
        if (e.type === 'drop') {
            if (acceptedFiles.length) {
                // FileList or [File]
                eventOrValue = (e.dataTransfer && e.dataTransfer.files) || acceptedFiles;
            } else {
                eventOrValue = null;
            }
        }
        onBlur(eventOrValue); // update touched
        onChange(eventOrValue); // update value
    };

    isImageFile = (file) => {
        const name = file.name.toLowerCase();
        return (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.gif'));
    };

    render() {
        const {input} = this.props;
        const {accept, multiple} = this.props;
        const selectedFile = (input && input.value && input.value[0]) || null;
        const dropzoneProps = {
            accept,
            multiple,
            onDrop: this.handleDropOrClick,
        };
        return (
            <div>
                <input type='hidden' disabled {...input} />
                <Dropzone {...dropzoneProps} style={{maxWidth:'120px', maxHeight:'20px'}} ><button>Add Attachment</button></Dropzone>
                {selectedFile &&
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {this.isImageFile(selectedFile) && <img style={{maxWidth: '100px', maxHeight: '75px'}} src={selectedFile.preview}/>}
                    <span>{selectedFile.name}</span>
                </div>}
            </div>
        );
    }
}

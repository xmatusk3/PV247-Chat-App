import React, {Component} from 'react';
import TextEditor from './textEditor';
import MessageWindow from './messageWindow';

class ChannelLayout extends Component {
    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <MessageWindow />
                <TextEditor />
            </div>
        );
    }
}

export default ChannelLayout;
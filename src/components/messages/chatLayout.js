import React, {Component} from 'react';
import TextEditor from './textEditor';
import MessageWindow from './messageWindow';

class ChannelLayout extends Component {
    render() {
        return (
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:'flex-end'}}>
                <MessageWindow />
                <TextEditor />
            </div>
        );
    }
}

export default ChannelLayout;
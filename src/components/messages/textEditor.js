import React from 'react';
import { convertToRaw, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import Raw from 'draft-js-raw-content-state';
import createStyles from 'draft-js-custom-styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextEditorDiv } from './__styles__/textEditor.styles';

import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();

const plugins = [
    hashtagPlugin,
    linkifyPlugin,
];

import {sendChatMessage} from '../../actions/messages/actionCreators';


const customStyleMap = {
    MARK: {
        backgroundColor: 'Yellow',
        fontStyle: 'italic',
    },
};

const { styles, customStyleFn, exporter } = createStyles(['font-size', 'color', 'text-transform'], 'CUSTOM_', customStyleMap);

class TextEditor extends React.Component {
    static propTypes = {
        sendChatMessage: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            editorState: new Raw().addBlock('').toEditorState(),
            readOnly: false,
        };
        this.updateEditorState = editorState => this.setState({ editorState });
    }

    onSubmit = () => {
        const inlineStyles = exporter(this.state.editorState);
        const parsedContent = {message: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())), inlineStyles: inlineStyles};
        this.props.sendChatMessage(parsedContent);
    };

    toggleFontSize = fontSize => {
        const newEditorState = styles.fontSize.toggle(this.state.editorState, fontSize);

        return this.updateEditorState(newEditorState);
    };

    toggleColor = color => {
        const newEditorState = styles.color.toggle(this.state.editorState, color);

        return this.updateEditorState(newEditorState);
    };

    toggleTextTransform = color => {
        const newEditorState = styles.textTransform.toggle(this.state.editorState, color);

        return this.updateEditorState(newEditorState);
    };

    toggleCommonStyle = (style) => {
        const newEditorState = RichUtils.toggleInlineStyle(this.state.editorState, style);

        return this.updateEditorState(newEditorState);
    };

    render() {
        const { editorState } = this.state;
        const options = x => x.map(fontSize => {
            return <option key={fontSize} value={fontSize}>{fontSize}</option>;
        });
        return (
            <TextEditorDiv style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
                <div style={{ flex: '1 0 25%' }}>


                    <select onChange={e => this.toggleFontSize(e.target.value)}>
                        {options(['12px', '24px', '36px', '50px', '72px'])}
                    </select>
                    <select onChange={e => this.toggleColor(e.target.value)}>
                        {options(['black', 'green', 'blue', 'red', 'purple', 'orange'])}
                    </select>
                    <select onChange={e => this.toggleTextTransform(e.target.value)}>
                        {options(['uppercase', 'capitalize', 'lowercase'])}
                    </select>
                </div>
                <div style={{ flex: '1 0 25%' }}>
                    <button onClick={() => this.toggleCommonStyle('BOLD')}>Bold</button>
                    <button onClick={() => this.toggleCommonStyle('ITALIC')}>Italic</button>
                    <button onClick={() => this.toggleCommonStyle('MARK')}>Mark</button>
                    <Editor
                        customStyleFn={customStyleFn}
                        customStyleMap={customStyleMap}
                        editorState={editorState}
                        onChange={this.updateEditorState}
                        onTab={this.onTab}
                        readOnly={this.state.readOnly}
                        spellCheck
                        plugins={plugins}
                    />
                </div>
                <button type="submit" onClick={this.onSubmit}>Send!</button>
            </TextEditorDiv>
        );
    }
}

export default connect(
    null,
    { sendChatMessage }
)(TextEditor);

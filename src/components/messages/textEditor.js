import React from 'react';
import { convertToRaw, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import Raw from 'draft-js-raw-content-state';
import createStyles from 'draft-js-custom-styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import {sendChatMessage} from '../../actions/messages/actionCreators';
// import mentionsStyles from './__styles__/mentionStyles.css';
import editorStyles from './__styles__/textEditor.css';
import 'draft-js-mention-plugin/lib/plugin.css';

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();

const customStyleMap = {
    MARK: {
        backgroundColor: 'Yellow',
        fontStyle: 'italic',
    },
};

const { styles, customStyleFn, exporter } = createStyles(['font-size', 'color', 'text-transform'], 'CUSTOM_', customStyleMap);

class TextEditor extends React.Component {
    static propTypes = {
        sendChatMessage: PropTypes.func.isRequired,
        userList: PropTypes.instanceOf(Immutable.Set),
        ownerList: PropTypes.instanceOf(Immutable.Set),
        allUsers: PropTypes.instanceOf(Immutable.List)
    };

    constructor(props) {
        super(props);

        const userIdList = this.props.userList.union(this.props.ownerList);

        this.mentions = this.props.allUsers
            .reduce((reduceList, user) => {
                if (userIdList.includes(user.email)) {
                    reduceList = reduceList.push({
                        name: user.nickname || user.email,
                        avatar: user.avatarUri
                    });
                }
                return reduceList;
            }, Immutable.List()).toArray();

        this.mentionPlugin = createMentionPlugin({
            mentions: this.mentions,
            entityMutability: 'IMMUTABLE',
            mentionPrefix: '@'
        });
        this.plugins = [
            hashtagPlugin,
            linkifyPlugin,
            this.mentionPlugin
        ];
        this.state = {
            editorState: new Raw().addBlock('').toEditorState(),
            suggestions: this.mentions,
            readOnly: false,
        };
        this.updateEditorState = editorState => this.setState({ editorState });
    }

    onSubmit = () => {
        const inlineStyles = exporter(this.state.editorState);
        const parsedContent = {message: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())), inlineStyles: inlineStyles};
        this.props.sendChatMessage(parsedContent);
    };

    onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, this.mentions),
        });
    };

    onAddMention = () => {
        // get the mention object selected
    };

    focus = () => {
        this.editor.focus();
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
        const { MentionSuggestions } = this.mentionPlugin;
        const { editorState } = this.state;
        const options = x => x.map(fontSize => {
            return <option key={fontSize} value={fontSize}>{fontSize}</option>;
        });
        return (
            <div  style={{ border: 'solid 1px', display: 'flex', flexDirection: 'column', padding: '15px' }}>
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
                <div >
                    <button onClick={() => this.toggleCommonStyle('BOLD')}>Bold</button>
                    <button onClick={() => this.toggleCommonStyle('ITALIC')}>Italic</button>
                    <button onClick={() => this.toggleCommonStyle('MARK')}>Mark</button>
                </div>
                <div className={editorStyles.editor} style={{ flex: '1 0 25%' }} onClick={this.focus}>
                    <Editor
                        customStyleFn={customStyleFn}
                        customStyleMap={customStyleMap}
                        editorState={editorState}
                        onChange={this.updateEditorState}
                        onTab={this.onTab}
                        readOnly={this.state.readOnly}
                        spellCheck
                        plugins={this.plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                    <MentionSuggestions
                        onSearchChange={this.onSearchChange}
                        suggestions={this.state.suggestions}
                        onAddMention={this.onAddMention}
                    />
                </div>
                <button type="submit" onClick={this.onSubmit}>Send!</button>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        userList: state.channels.openedChannel.channel.userIds,
        ownerList: state.channels.openedChannel.channel.ownerIds,
        allUsers: state.users.all
    }),
    { sendChatMessage }
)(TextEditor);

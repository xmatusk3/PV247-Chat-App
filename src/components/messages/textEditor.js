import React from 'react';
import { convertToRaw, RichUtils, EditorState, ContentState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import Raw from 'draft-js-raw-content-state';
import createStyles from 'draft-js-custom-styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import { sendChatMessage, editChatMessage, attachFileToMessage } from '../../actions/messages/actionCreators';
import FileField from './fileField';
import { reduxForm, Field } from 'redux-form';
import editorStyles from './__styles__/textEditor.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import { uuid } from '../../utils/uuidGenerator';
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
        editChatMessage: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        attachFileToMessage: PropTypes.func.isRequired,
        userList: PropTypes.instanceOf(Immutable.Set),
        ownerList: PropTypes.instanceOf(Immutable.Set),
        allUsers: PropTypes.instanceOf(Immutable.List),
        messageId: PropTypes.string,
        messageAttachment: PropTypes.object,
        editorState: PropTypes.object,
        closeMessageCallback: PropTypes.func,
        reset: PropTypes.func
    };

    constructor(props) {
        super(props);

        const userIdList = this.props.userList.union(this.props.ownerList);

        this.mentions = this.props.allUsers
            .reduce((reduceList, user) => {
                if (userIdList.includes(user.email)) {
                    reduceList = reduceList.push({
                        name: user.nickname || user.email,
                        avatar: user.avatarUri || 'assets/no-profile.png'
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
            editorState: this.props.editorState || new Raw().addBlock('').toEditorState(),
            suggestions: this.mentions,
            readOnly: false,
        };
        this.updateEditorState = editorState => this.setState({ editorState });
    }

    onSubmit = (state) => {
        const inlineStyles = exporter(this.state.editorState);
        const parsedContent = {message: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())), inlineStyles: inlineStyles};

        if (this.props.messageId) {
            this.props.editChatMessage(parsedContent, this.props.messageId, this.props.messageAttachment);
            this.props.closeMessageCallback();
        } else {
            this.sendMessage(state.uploadFile, parsedContent);
            this.clearEditor();
        }
    };

    clearEditor = () => {
        const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
        this.setState({ editorState });
        this.props.reset();

    };

    sendMessage = (file, content) => {
        if (file) {
            this.props.attachFileToMessage(file[0], content);
        } else {
            this.props.sendChatMessage(content);
        }
    };

    onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, this.mentions),
        });
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
        const {handleSubmit} = this.props;
        return (
            <div style={{width:'30%', border: 'solid 1px', display:'flex', justifyContent:'space-between', minHeight: '80px', maxHeight: '150px'}}>
                <div  style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <div>
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
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <button onClick={() => this.toggleCommonStyle('BOLD')}>Bold</button>
                        <button onClick={() => this.toggleCommonStyle('ITALIC')}>Italic</button>
                        <button onClick={() => this.toggleCommonStyle('UNDERLINE')}>Underline</button>
                        <button onClick={() => this.toggleCommonStyle('CODE')}>Code</button>
                        <button onClick={() => this.toggleCommonStyle('MARK')}>Mark</button>
                    </div>
                    <div className={editorStyles.editor} style={{width:'250px', wordWrap:'wrap', overflowY: 'auto', overflowX:'hidden', flex: '1 0 25%' }} onClick={this.focus}>
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
                            onAddMention={() => {}}
                        />
                        {!this.props.messageId && <Field withRef={true} ref = {(input) => {this.fileInput = input; }} component={ FileField } name='uploadFile' multiple={true}/>}
                    </div>

                </div>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <button style={{maxHeight: '50px', marginTop:'30px'}} type="submit">Send!</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: uuid()
})(connect(
    (state) => ({
        userList: state.channels.openedChannel.channel.userIds,
        ownerList: state.channels.openedChannel.channel.ownerIds,
        allUsers: state.users.all
    }),
    { sendChatMessage, editChatMessage, attachFileToMessage }
)(TextEditor));

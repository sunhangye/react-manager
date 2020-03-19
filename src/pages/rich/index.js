import React, { Component } from 'react';
import {Button,Card,Modal, Input} from 'antd'
import { EditorState, convertToRaw, convertFromRaw, convertFromHTML, ContentState  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
const { TextArea } = Input

const content = '<p>第一天</p><p>第四天</p><p></p><img src="https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_10086078898982190262%22%7D&n_type=0&p_from=1" alt=""/>';

class RichText extends Component {
  constructor(props) {
    super(props);
    const blocksFromHTML = convertFromHTML(content);
    const stateHtml = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )
    console.log(blocksFromHTML.contentBlocks);
    
    this.state = {
      contentState: '',
      editorState: EditorState.createWithContent(stateHtml),
      editorContent: ''
    }
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
  }
  onEditorChange = (editorContent) => {
    this.setState({
        editorContent,
    });
  };
  onEditorStateChange = (editorState) => {
    this.setState({
        editorState
    });
  };
  handleGetText = () => {
    this.setState({ showRichText: true });
  }
  render() {
    const { editorState } = this.state
    return (
      <div>
        <Card style={{marginTop:10}}>
            {/* <Button type="primary" onClick={this.handleClearContent}>清空内容</Button> */}
            <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
        </Card>
        <Card title="富文本编辑器">
          <Editor
            editorState={editorState}
            onContentStateChange={this.onEditorChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <TextArea
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          disabled
          style={{marginTop: 30}} />
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {this.setState({ showRichText: false });}}
          footer={null}
        >
          {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        </Modal>
      </div>
    );
  }
}

export default RichText;
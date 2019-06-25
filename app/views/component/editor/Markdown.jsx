import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import autobind from 'autobind-decorator';
import { pushStateToStorage, mergeStateFromStorage } from 'Utils/utils';
import Editor from './Editor';
// import Preview from './Preview';

// let appToolWidth = null;

export default class Markdown extends Component {
  static displayName = 'Markdown';
  static propTypes = {
    markdown: PropTypes.shape({
      parentsId: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
      createDate: PropTypes.string.isRequired,
      latestDate: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      status: PropTypes.number.isRequired,
      start: PropTypes.number.isRequired,
    }).isRequired,
    markdownSettings: PropTypes.shape({
      editorWidth: PropTypes.number.isRequired,
    }).isRequired,
    note: PropTypes.shape({
      projectUuid: PropTypes.string.isRequired,
      projectName: PropTypes.string.isRequired,
      fileUuid: PropTypes.string.isRequired,
      fileName: PropTypes.string.isRequired,
    }).isRequired,
    imageHostingConfig: PropTypes.shape({
      default: PropTypes.oneOf(['github', 'weibo', 'SM.MS']).isRequired,
      github: PropTypes.shape({
        repo: PropTypes.string.isRequired,
        branch: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        domain: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    editor: PropTypes.shape({
      fontSize: PropTypes.number.isRequired,
      previewFontSize: PropTypes.number.isRequired,
      cursorPosition: PropTypes.bool.isRequired,
    }).isRequired,
    editorMode: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const { markdownSettings } = props;
    // this.setDragWidth = throttle((e) => {
    //   if (!appToolWidth) {
    //     appToolWidth = document.getElementById('app_tool_bar').offsetWidth;
    //   }
    //   const width = this.root.offsetWidth;
    //   const rootLeft = this.root.offsetLeft + appToolWidth;
    //   const x = e.clientX;
    //   const editorWidthValue = (x - rootLeft) / width;
    //   if (editorWidthValue <= 0.2 || editorWidthValue >= 0.8) {
    //     return false;
    //   }
    //   const editorWidth = `${editorWidthValue * 100}%`;
    //   this.setState({
    //     editorWidth,
    //     editorWidthValue,
    //   });
    // }, 60);
    this.state = mergeStateFromStorage('markdownState', {
      drag: false,
      editorWidth: `${markdownSettings.editorWidth * 100}%`,
      editorWidthValue: markdownSettings.editorWidth,
    });
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.markdownSettings.editorWidth !== prevProps.markdownSettings.editorWidth) {
  //     this.setWidth(`${this.props.markdownSettings.editorWidth * 100}%`, this.props.markdownSettings.editorWidth);
  //   }
  // }

  componentWillUnmount() {
    pushStateToStorage('markdownState', this.state);
  }

  setWidth(editorWidth, editorWidthValue) {
    this.setState({
      editorWidth,
      editorWidthValue,
    });
  }

  // @autobind
  // setDrag(drag) {
  //   this.setState({
  //     drag,
  //   });
  // }

  // setPreiewScrollRatio = (ratio) => {
  //   this.preview.setScrollRatio(ratio);
  // }

  // @autobind
  // handleMouseMove(e) {
  //   e.stopPropagation();
  //   e.persist();
  //   if (!this.state.drag) {
  //     return false;
  //   }
  //   e.preventDefault();
  //   this.setDragWidth(e);
  // }

  // @autobind
  // handleMouseUp(e) {
  //   // e.preventDefault();
  //   e.stopPropagation();
  //   if (this.state.drag) {
  //     this.setState({
  //       drag: false,
  //     });
  //   }
  // }

  // @autobind
  // handMouseLeave(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (this.state.drag) {
  //     this.setState({
  //       drag: false,
  //     });
  //   }
  // }

  render() {
    const { markdown: { content, status, start, uuid }, editorMode, note, imageHostingConfig, editor: { fontSize, cursorPosition } } = this.props;
    const { editorWidth, drag, editorWidthValue } = this.state;
    if (status === 0) {
      return null;
    }
    return (
      <div className="markdown select-none">
        <div
          className="markdown-content"
          // onMouseDown={this.handleMouseDown}
          // onMouseMove={this.handleMouseMove}
          // onMouseUp={this.handleMouseUp}
          // onMouseLeave={this.handMouseLeave}
          ref={node => (this.root = node)}
        >
          <Editor
            fontSize={fontSize}
            cursorPosition={cursorPosition}
            uuid={uuid}
            note={note}
            imageHostingConfig={imageHostingConfig}
            setDrag={this.setDrag}
            defaultContent={content}
            start={start}
            editorWidth={editorWidth}
            editorMode={editorMode}
            editorWidthValue={editorWidthValue}
            setPreiewScrollRatio={this.setPreiewScrollRatio}
            drag={drag}
          />
          {/* <Preview
            html={html}
            drag={drag}
            editorMode={editorMode}
            editorWidth={editorWidth}
            editorWidthValue={editorWidthValue}
            fontSize={previewFontSize}
            ref={node => (this.preview = node)}
          /> */}
        </div>
      </div>
    );
  }
}

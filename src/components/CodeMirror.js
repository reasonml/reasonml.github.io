import React, {Component} from 'react';
const codemirror = require('codemirror');

export default class CodeMirror extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.editor = codemirror(this.div, this.props.options);
    this.editor.setValue(this.props.value)

    this.editor.on('change', (cm, metadata) => {
        const value = this.editor.getValue();
        if (value !== this.props.value && this.props.onChange) {
            this.props.onChange(value)
        }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value && nextProps.value !== this.editor.getValue()) {
        this.editor.setValue(nextProps.value);
    }
  }

  render() {

    return (
      <div className={this.props.className} ref={div => this.div = div}/>
    )
  }
}

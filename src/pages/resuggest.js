import React, { Component } from "react"
import Header from '../components/Header'
import debounce from "../utils/debounce"
import suggest from "../utils/suggest"
import Helmet from 'react-helmet'
import { accent, gray } from '../utils/colors'
import { headerFontFamily } from '../utils/typography'

class InputsForm extends Component {
  render() {
    return (
      <div>
        <h4 css={styles.h4}>Inputs</h4>
        {this.props.inputs.map((input, index) => (
          <ReasonExpressionInput
            value={input}
            key={"input" + index}
            code={input.code}
            error={input.error}
            onChange={newCode => {
              const newInputs = this.props.inputs.map(
                (input, i) =>
                  index === i ? { ...input, code: newCode } : input
              );
              this.props.onChange(newInputs);
            }}
          />
        ))}
      </div>
    );
  }
}

class ReasonExpressionInput extends Component {
  onChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <input css={styles.input} value={this.props.code} onChange={this.onChange} />
        <span
          style={{
            color: "red",
            fontSize: "14px",
            fontStyle: "italic",
            marginLeft: "10px"
          }}
        >
          {this.props.error}
        </span>
      </div>
    );
  }
}

const waitUntilScriptsLoaded = done => {
  const tout = setInterval(() => {
    if (window.refmt && window.ocaml) {
      clearInterval(tout);
      done();
    }
  }, 10);
};

const functionNameToDocumentionLink = name => {
  var words = name.split(".");
  if (words.length === 1) {
    return "Pervasives.html#VAL" + words[0];
  } else {
    return words[0] + ".html#VAL" + words[1];
  }
};

const renderSuggestion = suggestion => {
  return (
    <span>
      <a
        href={
          "https://reasonml.github.io/api/" +
          functionNameToDocumentionLink(suggestion.functionName)
        }
      >
        {suggestion.functionName}
      </a>
      {" " +
        suggestion.inputs
          .map(i => i.code)
          .concat("=>")
          .concat(suggestion.output.code)
          .join(" ")}
    </span>
  );
};

class Resuggest extends Component {
  componentDidMount() {
    waitUntilScriptsLoaded(() => {
      this.setState(
        {
          inputs: [
            { code: '"Hello World"', error: null },
            { code: "", error: null },
            { code: "", error: null }
          ],
          output: { code: '"HELLO WORLD"', error: null },
          suggestions: null,
          duration: null
        },
        () => this.suggest(this.state.inputs, this.state.output)
      );
    });
  }

  onInputsChange = inputs => {
    this.setState(
      {
        inputs,
        suggestions: null
      },
      () => this.suggest(this.state.inputs, this.state.output)
    );
  };

  onOutputChange = output => {
    this.setState(
      {
        output: { ...this.state.output, code: output },
        suggestions: null
      },
      () => this.suggest(this.state.inputs, this.state.output)
    );
  };

  suggest = debounce((newInputs, newOutput) => {
    const t0 = performance.now();
    
    try {
      this.setState({
        ...suggest(newInputs.map(n => n.code), newOutput.code),
        duration: performance.now() - t0
      });
    } catch (er) {
      this.setState({
        inputs: newInputs,
        output: newOutput,
        suggestions: [],
        duration: performance.now() - t0
      });
    }
    
  }, 100);

  render() {
    return (
      <div css={styles.container}>
        <Helmet>
          <script async src={__PATH_PREFIX__ + '/bs.js'} />
          <script async src={__PATH_PREFIX__ + '/refmt.js'} />
          <title>Resuggest</title>
        </Helmet>
        <div css={{ backgroundColor: accent, color: 'white' }}>
          <Header inverted />
        </div>
        <p css={{ margin: "15px" }}>
          Discover ReasonML functions based on examples. You supply an example
          input and output, and it makes suggestions.
        </p>
        {
          this.state && (
            <div css={{ margin: "15px" }}>
              <InputsForm
                inputs={this.state.inputs}
                onChange={this.onInputsChange}
              />
              <h4 css={styles.h4}>Desired Output</h4>
              <ReasonExpressionInput
                code={this.state.output.code}
                error={this.state.output.error}
                onChange={this.onOutputChange}
              />
              <h4 css={styles.h4}>
                Suggestions{" "}
                {this.state.duration && (
                  <small css={{ fontSize: "13px", fontWeight: "100" }}>
                    (computed in {this.state.duration.toFixed(2)}ms)
                  </small>
                )}
              </h4>
              <pre>
                <code>{this.renderSuggestions(this.state.suggestions)}</code>
              </pre>
            </div>
          )
        }
      </div>
    );
  }

  renderSuggestions(suggestions) {
    if (suggestions === null) {
      return "Loading...";
    }

    if (suggestions.length === 0) {
      return "Nothing to suggest...";
    }

    return suggestions.map(suggestion => (
      <div>{renderSuggestion(suggestion)}</div>
    ));
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    '@media(max-width: 500px)': {
      position: 'static',
      display: 'block',
    },
  },
  input: {
    background: 'white',
    border: '1px solid #eee',
    display: 'block',
    padding: '10px',
    borderRadius: '1px',
    fontSize: '13px',
    color: 'hsla(0, 0%, 0%, 0.8)',
    fontFamily: 'monospace',
    lineHeight: 'normal',
    marginBottom: '5px'
  },
  h4: {
    marginBottom: '.5em',
    '-webkit-margin-before': '1.33em'
  }
}

export default Resuggest;

import React from "react"
import Helmet from "react-helmet"

import Section from '../components/Section'
import GuideSidebar, {constructTree, fixPath} from '../components/GuideSidebar'
import {accent, gray, dividerLine} from '../utils/colors'
import editIcon from '../../static/edit-icon.svg'

import Link from "../components/Link"
import Header from '../components/Header'

import { compressToEncodedURIComponent as compress } from 'lz-string'

const codemirror = require('codemirror');

require('../../syntax-highlighting/xcode.css')
require('./guide.css')

const editUrl = path =>
  `https://github.com/reasonml/reasonml.github.io/edit/source/src/pages/${path}`

function flattenTreeToPaths(node) {
  return [node.relativePath].concat(
    ...node.children.map(child => flattenTreeToPaths(child))
  )
}

const runCode = reasonCode => {
  const [_, ocamlCode] = window.refmt(reasonCode, 'RE', 'implementation', 'ML');
  const {js_code} = JSON.parse(window.ocaml.compile(ocamlCode));
  const _console = console;
  const output = [];
  console = {
    log: (...items) => output.push(items)
  };
  eval(js_code);
  console = _console;
  return output;
}

class MarkdownContainer extends React.Component {
  initPlaygrounds = () => {
    console.log('update');
    document.querySelectorAll('.embedded-playground')
      .forEach(container => {
        const editorContainer = container.querySelectorAll('.editor-container')[0];
        const runButton = container.querySelectorAll('.run-button')[0];
        const tryButton = container.querySelectorAll('.try-button')[0];
        const outputContainer = container.querySelectorAll('.output')[0];

        const code = editorContainer.innerText;
        editorContainer.innerHTML = '';

        const editor = codemirror(editorContainer);
        editor.setValue(code)

        runButton.onclick = () => {
          outputContainer.classList.remove('active');
          outputContainer.classList.add('active');
          outputContainer.innerText = 'Working...';
          const code = editor.getValue();
          const output = runCode(code);
          outputContainer.innerText = '';
          output.forEach(item => {
            const el = document.createElement('div');
            el.innerText = item.map(JSON.stringify).join (' ');
            outputContainer.appendChild(el);
          });
        };

        tryButton.onclick = () => {
          const code = editor.getValue();
          location.href = `/try?reason=${compress(code)}`;
        }
      });
  }

  componentDidUpdate() {
    this.initPlaygrounds();
  }

  componentDidMount() {
    this.initPlaygrounds();
  }

  render() {
    return <div className="markdown-content" dangerouslySetInnerHTML={{__html: this.props.html}} />
  }
}

export default class Guide extends React.Component {
  renderSequenceLinks() {
    const {
      allFile,
      file: {relativePath},
    } = this.props.data;

    // only show in guide section
    if (!relativePath.startsWith('guide')) return null

    const current = fixPath(relativePath)
    const {section} = this.props.pathContext

    const root = constructTree(section, allFile.edges.map(edge => edge.node))
    let flattened = flattenTreeToPaths(root)

    let prev = null;
    let next = null;
    for (var i = 0; i < flattened.length; i++) {
      if (flattened[i] === current) {
        prev = flattened[i - 1]
        next = flattened[i + 1]
        break;
      }
    }

    return (
      <div css={styles.sequenceLinks}>
        <div>
          {prev &&<Link to={prev}><span>&larr; Previous</span></Link>}
        </div>
        <div>
          {next &&<Link to={next}><span>Next &rarr;</span></Link>}
        </div>
      </div>
    );
  }
  renderMain() {
    const {relativePath, childMarkdownRemark: {frontmatter: {title}, html}} = this.props.data.file
    let edit
    let contents
    if (relativePath === 'community/examples.md') {
      const Examples = require('../pages/community/examples.js')
      contents = <Examples />
      edit = editUrl('community/examples.js')
    } else if (relativePath === 'community/companies.md') {
      const Companies = require('../pages/community/companies.js')
      contents = <Companies />
      edit = editUrl('community/companies.js')
    } else {
      contents = <MarkdownContainer html={html} />
      edit = editUrl(relativePath)
    }
    return <div css={styles.main}>
      <h2 css={styles.title}>
        {title}
        <Link css={styles.editLink} to={edit}>
          <img css={styles.editIcon} src={editIcon} />
          <span css={styles.editText}>
            Suggest an edit
          </span>
        </Link>
      </h2>
      {contents}
      {this.renderSequenceLinks()}
    </div>
  }

  render() {
    const {section, sectionTitle} = this.props.pathContext
    const {allFile, file: {relativePath, childMarkdownRemark: {frontmatter: {title}, html}}} = this.props.data
    return <div>
      <Helmet title={title}>
        <script async src={__PATH_PREFIX__ + '/stdlibBundle.js'} />
        <script async src={__PATH_PREFIX__ + '/bs.js'} />
        <script async src={__PATH_PREFIX__ + '/refmt.js'} />
      </Helmet>
      <Section backgroundColor={accent} css={{color: 'white'}}>
        <Header inverted />
        <div css={{alignItems: 'center'}}>
          <h1>
            <Link css={styles.topLink} to={`/${section}`}>
              {sectionTitle}
            </Link>
          </h1>
        </div>
      </Section>
      <Section css={styles.contentSection}>
        <div css={styles.sidebar}>
          <GuideSidebar
            current={fixPath(relativePath)}
            search={`/${section}/search`}
            root={constructTree(section, allFile.edges.map(edge => edge.node))}
          />
        </div>
        {this.renderMain()}
      </Section>
    </div>
  }
}

const styles = {
  editLink: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '25px',
  },
  title: {
    borderBottom: '1px solid ' + dividerLine,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: '4px'
  },
  contentSection: {
    flexDirection: 'row',
    '@media(max-width: 800px)': {
      flexDirection: 'column-reverse',
    },
  },
  sidebar: {
    // padding: '2em',
  },
  main: {
    position: 'relative',
    flex: 1,
    padding: '2em',
    minWidth: 0,
  },
  editIcon: {
    marginBottom: 0,
    '@media(min-width: 800px)': {
      display: 'none'
    }
  },
  editText: {
    '@media(max-width: 800px)': {
      display: 'none'
    }
  },
  sequenceLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 32
  }
}

export const pageQuery = graphql`
  query PageByPath($relativePath: String!, $relatedFiles: String!) {
    ...guideSidebar

    file(relativePath: {eq:$relativePath}) {
      relativePath
      childMarkdownRemark {
        html
        frontmatter {
          title
        }
      }
    }
  }
`

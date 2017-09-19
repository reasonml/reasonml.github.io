
const fs = require('fs')
const path = require('path')
const Remark = require('remark')

const sectionTitles = {
  guide: 'Guide',
  community: "Community",
};

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  Object.keys(sectionTitles).forEach(section => {
    createPage({
      path: `${section}/search`,
      component: path.resolve('src/templates/Search.js'),
      context: {
        section: section,
        sectionTitle: sectionTitles[section],
        relatedFiles: `/^${section}\\/.*\\.md$/`,
      }
    })
  })

  graphql(`{
    allFile(filter:{relativePath:{regex:"/^([a-z]{2}\\\\/)?(guide|community)\\\\/.*\\\\.md$/"}}) {
      edges {
        node {
          relativePath
          childMarkdownRemark {id}
        }
      }
    }
  }`).then(({errors, data}) => {
    if (errors) return Promise.reject(errors)
    if (!data.allFile) {
        throw new Error('No files found')
    }
    data.allFile.edges.forEach(({node: {relativePath, childMarkdownRemark}}) => {
      if (!childMarkdownRemark) return
      let targetPath = relativePath.slice(0, -'.md'.length)
      if (relativePath.match(/index\.md$/)) {
        targetPath = relativePath.slice(0, -'/index.md'.length)
      }
      const section = relativePath.split('/')[0]
      createPage({
        path: targetPath,
        component: path.resolve('src/templates/Guide.js'),
        context: {
          section: section,
          sectionTitle: sectionTitles[section],
          relativePath,
          relatedFiles: `/^${section}\\/.*\\.md$/`,
        }
      })
    })
  }).then(() => {
    return graphql(`{
      allFile(filter:{relativePath:{regex:"/api.*html$/"}}) {
        edges {
          node {
            relativePath
          }
        }
      }
    }`).then(({errors, data}) => {
      if (errors) return Promise.reject(errors)
      if (!data.allFile) {
          throw new Error('No files found')
      }
      data.allFile.edges.forEach(({node: {relativePath}}) => {
        createPage({
          path: relativePath,
          component: path.resolve('src/templates/API.js'),
          context: {
            relativePath,
          }
        })
      })
    })
  })
}

exports.onCreateNode = ({node, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  if (!node.relativePath || !node.childMarkdownRemark) return

  const {relativePath} = node;
  if (!relativePath.match(/^(guide|community)\//)) return
  let targetPath = relativePath.slice(0, -'.md'.length)
  if (relativePath.match(/index\.md$/)) {
    targetPath = relativePath.slice(0, -'/index.md'.length)
  }
  createPage({
    path: targetPath,
    component: path.resolve('src/templates/Guide.js'),
    context: {
      relativePath,
    }
  })
}


const fs = require('fs')
const path = require('path')
const Remark = require('remark')

const sectionTitles = {
  guide: 'Guide',
  community: "Community",
};

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  return graphql(`{
    allFile(filter:{relativePath:{regex:"/^(guide|community)\\\\/.*\\\\.md/"}}) {
      edges {
        node {
          relativePath
        }
      }
    }
  }`).then(({errors, data}) => {
    if (errors) return Promise.reject(errors)
    data.allFile.edges.forEach(({node: {relativePath}}) => {
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
          relatedFiles: `/^${section}\\\\/.*\\\\.md/`,
        }
      })
    })
  })
}

// // TODO remove once gatsby auto-reruns createPages
// exports.onCreateNode = ({node, boundActionCreators}) => {
//   const {createPage} = boundActionCreators;
//
//   if (!node.relativePath || !node.childMarkdownRemark) return
//
//   const {relativePath} = node;
//   let targetPath = relativePath.slice(0, -'.md'.length)
//   if (relativePath.match(/index\.md$/)) {
//     targetPath = relativePath.slice(0, -'/index.md'.length)
//   }
//   createPage({
//     path: targetPath,
//     component: path.resolve('src/templates/Guide.js'),
//     context: {
//       relativePath,
//     }
//   })
// }

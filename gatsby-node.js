
const fs = require('fs')
const path = require('path')
const Remark = require('remark')

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  return graphql(`{
    allFile(filter:{relativePath:{regex:"/^guide\\\\/.*\\\\.md/"}}) {
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
      createPage({
        path: targetPath,
        component: path.resolve('src/templates/Guide.js'),
        context: {
          relativePath,
        }
      })
    })
  })

  // return graphql(`{
  //   allMarkdownRemark {
  //     edges {
  //       node {
  //         id
  //         parent {
  //           ... on File {
  //             relativePath
  //           }
  //         }
  //       }
  //     }
  //   }
  // }`).then(({errors, data}) => {
  //   if (errors) return Promise.reject(errors)
  //   data.allMarkdownRemark.edges.forEach(({node: {parent: {relativePath}}}) => {
  //     if (relativePath.match(/^guide\//)) {
  //       createPage({
  //         path: relativePath.slice(0, -'.md'.length),
  //         component: guideTemplate,
  //         context: {
  //           relativePath,
  //         }
  //       })
  //     }
  //   })
  // })
          // frontmatter {
          //   layout
          // }
}

// exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
//   const { createNodeField } = boundActionCreators
//
//   if (node.internal.type === 'MarkdownRemark') {
//     const fileNode = getNode(node.parent)
//     const relativePath = fileNode.relativePath
//
//     createNodeField({node, fieldName: 'relativePath', fieldValue: relativePath})
//
//   //   if (slug) {
//   //     createNodeField({ node, fieldName: 'slug', fieldValue: ensureSlashes(slug) })
//   //   }
//   // } else if (node.internal.type === 'File') {
//   //   const relativePath = node.relativePath
//   //   createNodeField({ node, fieldName: 'slug', fieldValue: ensureSlashes(relativePath) })
//   }
// }

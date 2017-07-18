module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-rawhtml`,
    `gatsby-plugin-glamor`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 690,
            },
          },
          'gatsby-remark-autolink-headers',
          // {
          //   resolve: 'gatsby-remark-responsive-iframe',
          // },
          // 'gatsby-remark-prismjs',
          `${__dirname}/syntax-highlighting/index.js`,
          'gatsby-remark-copy-linked-files',
          // 'gatsby-remark-smartypants',
          'gatsby-plugin-catch-links',
        ],
      },
    },
  ],
}

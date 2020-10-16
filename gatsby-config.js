/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

//required to make dev environment variables work
//see gatsbyjs.com/docs/environment-variables/
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `${process.env.GATSBY_CONTENTFUL_SPACE_ID}`,
        accessToken: `${process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN}`,
      },
    },

    `gatsby-plugin-sass`,

    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Staatliches`,
          `Cabin Sketch`,
          `Freckle Face`,
          `Sanchez`,
          `Overpass`,
          `Cabin`,
          `Kanit\:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900`,
          `Literata`,
          `Nunito Sans`,
          //`source sans pro\:300,400,400i,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    }
  ],
}

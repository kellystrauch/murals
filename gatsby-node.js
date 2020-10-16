const path = require("path")

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions
  
    const muralTemplate = path.resolve(`src/templates/muralTemplate.js`)
  
    return graphql(`
        {
            allContentfulMural {
                nodes {
                    name
                    artists
                    building
                    streetAddress
                    photos {
                        file {
                            url
                        }
                        description
                    }
                    year
                    slug
                }
            }
        }
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors)
      }
      //add sort to above query
 //      const startSlug = result.data.allContentfulMural.nodes[0].slug
 //      const endSlug = result.data.allContentfulMural.nodes[-1].slug
      result.data.allContentfulMural.nodes.forEach((node) => {
        createPage({
            path: node.slug,
            component: muralTemplate,
            context: {
                slug: node.slug//,
                //startSlug: startSlug,
                //endSlug: endSlug
            }, // additional data can be passed via context
        })
      })
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
}
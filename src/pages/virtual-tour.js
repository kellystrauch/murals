import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import "../components/style.scss"
import { graphql } from "gatsby"

export default function VirtualTour({data}) {
  return(
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Virtual Tour | Fayetteville Street Art</title>
        <meta name="description" content="Browse photos of the street art of Fayetteville, AR."></meta>
      </Helmet>

      <Layout>
        <div className="mobile-instructions">
          <span className="color3"><em>Click any thumbnail for more photos of that mural.</em></span>
        </div>
        <div className="thumbnail-grid-wrapper">
          <div className="row thumbnail-row">
            {data.allContentfulMural.nodes.map((node, index) => (
              <div className="col thumbnail-col" key={node.slug}>
                <a href={`/${node.slug}`}><img className="thumbnail" src={node.thumbnail.file.url} alt={"thumbnail of " + node.name}/></a>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export const query = graphql`
query MyQuery {
  allContentfulMural(
	sort: {
		fields: [slug]
		order: ASC
  }
) {
    nodes {
      name
      id
      thumbnail {
        file {
          url
        }
      }
      slug
    }
  }
}
`
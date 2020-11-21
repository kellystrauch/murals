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
        <meta property="og:url" content="https://www.fayettevillestreetart.com/virtual-tour" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Virtual Tour | Fayetteville Street Art" />
        <meta property="og:description" content="Browse photos of the street art of Fayetteville, AR." />
        <meta property="og:image" content="/img/gnome.jpg" />
      </Helmet>

      <Layout>
        <div className="instructions">
          <span className="color3"><em>Click any mural's image below for full-size photos of it.</em></span>
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
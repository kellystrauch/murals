import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Carousel from "react-bootstrap/Carousel"

const maxSlug = '161';
const minSlug = '100';

function prepMuralData(currentMural){
    if(currentMural.artists == null && currentMural.year == null){
        currentMural.artistAndYear = '';
    }else if(currentMural.artists == null){
        currentMural.artistAndYear = currentMural.year;
    }else if(currentMural.year == null){
        currentMural.artistAndYear = currentMural.artists;
    }else{
        currentMural.artistAndYear = currentMural.artists + ' • ' + currentMural.year;
    }

    currentMural.previousSlug = parseInt(currentMural.slug) - 1;
    currentMural.nextSlug = parseInt(currentMural.slug) + 1;

    return currentMural;
}

export default function muralTemplate({data}) {

    const originalMural = data.contentfulMural
    const mural = prepMuralData(originalMural)

    return (
        <>
            <Helmet htmlAttributes={{ lang: 'en' }}>
                <title>{mural.name} | Fayetteville Street Art</title>
                <meta name="description" content={`Browse photos of the ${mural.name} mural in Fayetteville, AR.`}></meta>
            </Helmet>

            <Layout>
                <div className="template-wrapper">
                    <div className="template-container">
                        <div className="row mobile-prev-next-button-row">
                            {mural.slug === minSlug && <div className="col-xs-12 mobile-prev-next-button-col flex-end">
                                <a className="btn-sm btn-warning" href={`/${mural.nextSlug}`} role="button">Next Mural</a>
                            </div>}
                        </div>
                        <div className="row mobile-prev-next-button-row">
                            {mural.slug !== minSlug && <div className="col-xs-12 mobile-prev-next-button-col">
                                <a className="btn-sm btn-warning" href={`/${mural.previousSlug}`} role="button">Previous Mural</a>
                                {mural.slug !== maxSlug && <a className="btn-sm btn-warning" href={`/${mural.nextSlug}`} role="button">Next Mural</a>}
                            </div>}
                        </div>
                        <div className="row full-width">
                            <div className="col desktop-prev-next-button-col desktop-prev-button-col">
                                {mural.slug !== minSlug && <div>
                                    <a className="btn-sm btn-warning" href={`/${mural.previousSlug}`} role="button">Previous Mural</a>
                                </div>}
                            </div>
                            <div className="col">
                                <div className="template-header">
                                    <h3>
                                        {mural.name}
                                    </h3>
                                    {mural.artistAndYear}
                                </div>
                            </div>
                            <div className="col desktop-prev-next-button-col flex-end">
                                {mural.slug !== maxSlug && <div>
                                    <a className="btn-sm btn-warning" href={`/${mural.nextSlug}`} role="button">Next Mural</a>
                                </div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col no-left-right-padding">
                                <Carousel>
                                    {mural.photos.map((photo, index) => (
                                        <Carousel.Item key={index}>
                                            <img src={photo.file.url} alt={"image of " + mural.name} className="img-fluid"/>
                                            {photo.description && <Carousel.Caption>
                                                <small>{photo.description}</small>
                                            </Carousel.Caption>}
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export const query = graphql`
query muralQuery($slug: String!) {
    contentfulMural(slug: {eq: $slug}) {
        artists
        streetAddress
        year
        photos {
            file {
                url
            }
            description
        }
        building
        name
        slug
        latLong {
            lat
            lon
        }
    }
  }
`
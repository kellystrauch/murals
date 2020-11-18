import React from "react"
import Helmet from "react-helmet"
import { Link } from "gatsby"
import "../components/style.scss"

export default function Home() {
  return(
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Fayetteville Street Art</title>
        <meta name="description" content="Tour the street art of Fayetteville, AR.  You get to choose if you want a virtual tour or an in-person one!"></meta>
        <meta property="og:url" content="https://www.fayettevillestreetart.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fayetteville Street Art" />
        <meta property="og:description" content="Tour the street art of Fayetteville, AR.  You get to choose if you want a virtual tour or an in-person one!" />
        <meta property="og:image" content="/img/gnome.jpg" />
      </Helmet>

      <div className="index-wrapper">
        <div className="index-content">
          <div className="row">
            <div className="col-lg-6 no-left-right-padding">
              <h1 className="index-headline fayetteville">Fayetteville</h1>
            </div>
            <div className="col-lg-6 no-left-right-padding">
              <h1 className="index-headline street-art transparent-brick">Street Art</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-xs-12 index-column index-left-column">
              <div className="row">
                <div className="col-12 cta-button-column no-left-right-padding">
                  <Link to="/in-person-tour/" className="btn btn-lg btn-warning" role="button">Tour In Person</Link>
                </div>
                <div className="col-12 tagline-top no-left-right-padding">
                  Create an itinerary of murals to visit in real life,
                </div>
                <div className="col-12 tagline-bottom no-left-right-padding">
                  with no photos to ruin the surprise.
                </div>
                <div className="col-12 spoilers no-left-right-padding">
                  (No spoilers!)
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xs-12 index-column index-right-column">
              <div className="row">
                <div className="col-12 cta-button-column no-left-right-padding">
                  <Link to="/virtual-tour/" className="btn btn-lg btn-warning" role="button">Tour Virtually</Link>
                </div>
                <div className="col-12 tagline-top no-left-right-padding">
                  <span className="transparent-brick">If you can't make it to Fayetteville in person,</span>
                </div>
                <div className="col-12 tagline-bottom no-left-right-padding">
                  <span className="transparent-brick">browse photos of the murals instead.</span>
                </div>
                <div className="col-12 spoilers no-left-right-padding">
                  <span className="transparent-brick">(Spoilers ahead!)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

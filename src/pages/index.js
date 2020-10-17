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
      </Helmet>

      <div className="index-wrapper">
        <div className="index-content">
          <div className="row">
            <div className="col-lg-6 heading-col">
              <h1 className="index-headline fayetteville">Fayetteville</h1>
            </div>
            <div className="col-lg-6 heading-col">
              <h1 className="index-headline street-art transparent-brick">Street Art</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-xs-12 left-column">
              <div className="row">
                <div className="col-12 cta-button-column">
                  <Link to="/nospoilers/" className="btn btn-lg btn-warning" role="button">Tour In Person</Link>
                </div>
                <div className="col-12 tagline-top">
                  Get a map to see the murals in real life,
                </div>
                <div className="col-12 tagline-bottom">
                  with no photos to ruin the surprise.
                </div>
                <div className="col-12 spoilers">
                  (No spoilers!)
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xs-12 right-column">
              <div className="row">
                <div className="col-12 cta-button-column">
                  <Link to="/spoilers/" className="btn btn-lg btn-warning" role="button">Tour Virtually</Link>
                </div>
                <div className="col-12 tagline-top">
                  <span className="transparent-brick">If you can't make it to Fayetteville in person,</span>
                </div>
                <div className="col-12 tagline-bottom">
                  <span className="transparent-brick">browse photos of the murals instead.</span>
                </div>
                <div className="col-12 spoilers">
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

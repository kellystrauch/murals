import React, { useState, useEffect } from "react"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import "../components/style.scss"
import { graphql } from "gatsby"
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'
import { Modal, Button, Image } from "react-bootstrap"

export default function InPersonTour({data}) {

  const [ spots, setSpots ] = useState([]);
  const [ locations, setLocations ] = useState([]);
  const [ selected, setSelected ] = useState(null);
  const [ show, setShow ] = useState(false);
  const [ center ] = useState({lat: 36.08653, lng: -94.17015});
  const [ zoom ] = useState(13); //the bigger the zoom, the more zoomed in
  const [ preview, setPreview ] = useState(false);

  const mapOptions = {
    fullscreenControl: false,
    // zoomControl: boolean,
    // mapTypeControl: boolean,
    // scaleControl: boolean,
    // streetViewControl: boolean,
    // rotateControl: boolean,
  }
  
  const clustererOptions = {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  }

  function prepData(){
    const locs = data.allContentfulMural.nodes.map((loc) => {
      return {
        slug: loc.slug,
        name: loc.name,
        year: loc.year,
        artists: loc.artists,
        lat: loc.latLong.lat,
        lng: loc.latLong.lon,
        building: loc.building,
        streetAddress: loc.streetAddress,
        thumbnail: loc.thumbnail.file.url,
      }
    })
    setLocations(locs);
  }

  useEffect( () => {prepData()}, []);

  function clickMarker(slug){
    const location = locations.find(obj => {
      return obj.slug === slug
    })
    setSelected(location);
    setShow(true);
  }

  function addSpot(location){
    setSpots( spots.concat(location) );
    //TODO change the marker icon
    setShow(false);
  }

  function hideModal(){
    setShow(false);
    setPreview(false);
  }

  function toggleSneakPeek(){
    if(preview){
      setPreview(false);
    }else{
      setPreview(true);
    }
  }

  return(
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>In-Person Tour | Fayetteville Street Art</title>
        <meta name="description" content="Get all the information you need for an in-person tour of the street art of Fayetteville, AR."></meta>
      </Helmet>

      <Layout>
        <div className="row">

          <div className="col-sm-8">
            <LoadScript googleMapsApiKey={process.env.GATSBY_GOOGLE_MAPS_API_KEY}>
              <GoogleMap options={mapOptions} mapContainerStyle={{width: '100%', height: '620px'}} center={center} zoom={zoom}>
                <MarkerClusterer options={clustererOptions}>
                  {(clusterer) =>
                    locations.map((location, idx) => (
                      <div key={idx}>
                        <Marker  position={location} clusterer={clusterer} title={location.name} onClick={ () => { clickMarker(location.slug)}} />
                      </div>
                    ))
                  }
                </MarkerClusterer>
              </GoogleMap>
            </LoadScript>

            { selected &&
            <Modal show={show} onHide={hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {selected.name}
                  { selected.year && <> ({selected.year})</> }
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col modal-col modal-col-left">
                    { selected.artists && <>
                      <span className="modal-label">Artist:</span><br/>
                      {selected.artists}<br/><br/>
                    </> }
                    <span className="modal-label">Location:</span><br/>
                    { selected.building && <>{selected.building}<br/></> }
                    {selected.streetAddress}
                  </div>
                  {preview &&
                  <div className="col modal-col modal-col-right">
                    <Image src={selected.thumbnail} className="sneak-peek" alt={"thumbnail of " + selected.name} rounded />
                  </div>}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="row modal-button-row">
                  <div className="col-3 modal-button-col close-button-col">
                    <Button className="btn-sm btn-secondary" onClick={hideModal}>Close</Button>
                  </div>
                  <div className="col-9 modal-button-col other-buttons-col">
                    <Button className="btn-sm btn-warning sneak-peek-button" onClick={toggleSneakPeek}>Sneak Peek</Button>
                    <Button className="btn-sm btn-warning" onClick={() => { addSpot(selected)} }>Add to Itinerary</Button>
                  </div>
                </div>
              </Modal.Footer>
            </Modal>
            }

          </div>

          <div className="col-sm-4">
            <h3>Itinerary</h3>
            {spots.length === 0 && 
              <em>Click a pin on the map to get started.</em>
            }
            {spots.length > 0 && 
              <>
                <ol>
                  {spots.map( (spot, idx) => {
                    return (
                      <li key={idx}>
                        {spot.name}
                        <br/>
                        { spot.building && <><small>{spot.building}</small><br/></> }
                        <small>{spot.streetAddress}</small>
                      </li>
                    )
                  })}
                </ol>
              </>
            }
          </div>

        </div>
      </Layout>
    </>
  )
}

export const query = graphql`
query MyQuery2 {
  allContentfulMural(sort: {fields: [slug], order: ASC}) {
    nodes {
      name
      id
      thumbnail {
        file {
          url
        }
      }
      slug
      latLong {
        lat
        lon
      }
      building
      artists
      year
      streetAddress
    }
  }
}
`
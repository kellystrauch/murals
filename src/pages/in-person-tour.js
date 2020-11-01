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
  const [ center, setCenter ] = useState({lat: 36.08653, lng: -94.17015});
  const [ zoom, setZoom ] = useState(13); //the bigger the zoom, the more zoomed in
  const [ preview, setPreview ] = useState(false);
  const [ markers, setMarkers ] = useState([]);

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

  function loadMarkers(clusterer, index, slug){
    let newMarker = clusterer.markers[index];
    newMarker.setIcon("/img/red_marker.png");
    newMarker.slug = slug;
    let newMarkers = markers;
    newMarkers.push(newMarker);
    setMarkers(newMarkers);
  }

  function openModal(slug){
    const location = locations.find(obj => {
      return obj.slug === slug
    })
    setSelected(location);
    setShow(true);
  }

  function seeOnMap(location){
    setCenter({lat: location.lat, lng: location.lng});

    //https://github.com/JustFly1984/react-google-maps-api/issues/1069
    setZoom(19);
    setTimeout(() => {
      setZoom(20);
    }, 1);

    //for mobile, scroll to the top so they actually see the map
    window.scrollTo(0, 0);
  }

  function addSpot(location){
    setSpots( spots.concat(location) );
    setShow(false);
    setPreview(false);
    
    //change marker icon
    const marker = markers.find(obj => {
      return obj.slug === location.slug
    })
    marker.setIcon("/img/purple_marker.png");
  }

  function isInSpots(location){
    if( spots.includes(location) ){
      return true;
    }else{
      return false;
    }
  }

  function removeSpot(slug){
    let updatedSpots = spots.filter(function(obj){
      return obj.slug !== slug;
    })
    setSpots(updatedSpots);

    //change marker icon
    const marker = markers.find(obj => {
      return obj.slug === slug
    })
    marker.setIcon("/img/red_marker.png");
  }

  function addAllSpots(){
    let newSpots = [];
    for(let i=0; i<spots.length; i++){
      newSpots.push(spots[i]);
    }
    for(let i=0; i<locations.length; i++){
      if( !spots.includes(locations[i]) ){
        newSpots.push(locations[i]);
      }
    }
    setSpots(newSpots);
    
    //change all marker icons
    for(let i=0; i<markers.length; i++){
      markers[i].setIcon("/img/purple_marker.png");
    }
  }

  function clearAllSpots(){
    setSpots([]);

    //change all marker icons
    for(let i=0; i<markers.length; i++){
      markers[i].setIcon("/img/red_marker.png");
    }
  }

  function print(){
    window.print();
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

          <div className="col-lg-8 no-print">
            <div className="map-wrapper">
              <LoadScript googleMapsApiKey={process.env.GATSBY_GOOGLE_MAPS_API_KEY}>
                <GoogleMap options={mapOptions} mapContainerStyle={{width: '100%', height: '620px'}} center={center} zoom={zoom}>
                  <MarkerClusterer options={clustererOptions}>
                    {(clusterer) =>
                      locations.map((location, idx) => (
                        <div key={idx}>
                          <Marker position={location} clusterer={clusterer} title={location.name} onClick={ () => { openModal(location.slug)}} onLoad={ () => { loadMarkers(clusterer, idx, location.slug)}} />
                        </div>
                      ))
                    }
                  </MarkerClusterer>
                </GoogleMap>
              </LoadScript>
            </div>

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
                    <a href={`/${selected.slug}`} target="_blank" rel="noreferrer">
                      <Image src={selected.thumbnail} className="sneak-peek" alt={"thumbnail of " + selected.name} rounded/>
                    </a>
                  </div>}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="row modal-button-row">
                  <div className="col-3 modal-button-col close-button-col">
                    <Button className="btn-sm btn-secondary" onClick={hideModal}>Close</Button>
                  </div>
                  <div className="col-9 modal-button-col other-buttons-col">
                    <Button className="btn-sm btn-warning right-margin-10" onClick={toggleSneakPeek}>Sneak Peek</Button>
                    {!isInSpots(selected) && <span>
                      <Button className="btn-sm btn-warning" onClick={() => { addSpot(selected)} }>Add to Itinerary</Button>
                    </span>}
                  </div>
                </div>
              </Modal.Footer>
            </Modal>
            }

          </div>

          <div className="col-lg-4">
            <div className="scrollable-section">
              <div className="itinerary-button-container no-print">
                <div>
                  <Button className="btn-sm btn-warning right-margin-10" onClick={addAllSpots}>Add All</Button>
                  <Button className="btn-sm btn-warning right-margin-10" onClick={clearAllSpots}>Clear All</Button>
                </div>
                <Button className="btn-sm btn-warning" onClick={print}>Print Itinerary</Button>
              </div>
              <h3 className="itinerary-heading">Itinerary</h3>
              {spots.length === 0 && 
                <div>
                  <em><span className="color3">
                    <span className="empty-itinerary">Your itinerary is empty!</span>
                    <ul>
                      <li>
                        If you want to visit all the street art in town, click the Add All button above.
                      </li>
                      <li>
                        If you'd rather only visit the street art in a certain part of town, click on any pin on the map,
                        add that mural to your itinerary, and repeat. (Consider zooming in first, though.)
                      </li>
                    </ul>
                  </span></em>
                </div>
              }

              {spots.length > 0 && 
                <>
                  {spots.map( (spot, idx) => {
                    return (
                      <div className="spot" key={idx}>
                        <div className="spot-row">
                          <div className="spot-left">
                            {idx+1})
                          </div>
                          <div className="spot-middle">
                            <span className="spot-title" onClick={ () => { openModal(spot.slug)}} role="button" tabIndex="0">
                              {spot.name}
                            </span>
                            <span className="map-marker-wrapper">
                              <span onClick={ () => { seeOnMap(spot)}} role="button" tabIndex="0">
                                <i className="fa fa-map-marker no-print"></i>
                              </span>
                            </span>
                          </div>
                          <div className="spot-right">
                            <span className="fa-times-wrapper">
                              <span onClick={ () => { removeSpot(spot.slug)}} role="button" tabIndex="0">
                                <i className="fa fa-times no-print"></i>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="spot-row">
                          <div className="spot-left">
                          </div>
                          <div>
                            { spot.building && <>{spot.building}<br/></> }
                            {spot.streetAddress}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </>
              }
            </div>
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
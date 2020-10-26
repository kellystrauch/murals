import React from "react"
import Helmet from "react-helmet"
import "./style.scss"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

export default function Layout({children}) {
  return(
    <>
      <Helmet>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Helmet>
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand href="/">Fayetteville<span className="street-art">Street Art</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/in-person-tour">In-Person Tour</Nav.Link>
            <Nav.Link href="/virtual-tour">Virtual Tour</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="layout">
        {children}
      </div>
    </>
  )
}

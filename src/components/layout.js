import React from "react"
import "./style.scss"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

export default function Layout({children}) {
  return(
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand href="/">Fayetteville<span className="street-art">Street Art</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/nospoilers">In-Person Tour</Nav.Link>
            <Nav.Link href="/spoilers">Virtual Tour</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="layout">
        {children}
      </div>
    </>
  )
}

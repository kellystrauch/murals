import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import "../components/style.scss"
// import Accordion from "react-bootstrap/Accordion"
// import Card from "react-bootstrap/Card"
// import Button from "react-bootstrap/Button"

export default function VirtualTour({data}) {
  return(
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>About | Fayetteville Street Art</title>
        <meta name="description" content="Obligatory about page for the Fayetteville Street Art site."></meta>
      </Helmet>

      <Layout>
        <div className="about-wrapper">
          <div className="about-container">
            <h4>
              What's this all about?
            </h4>
            <p>
              <b>Fayetteville Street Art</b> was inspired by a road trip to Kansas City, during which I wanted to take a driving tour of 
              the street art there.  I searched the internet to figure out where I should go 
              to find some murals, and after the search &mdash; well, I felt like I had pretty much 
              already seen all of KC's street art from my laptop screen.
            </p>
            <p>
              I found myself wishing there was a way to find out where the street art in a town
              is located without actually <em>seeing</em> the street art, since half the fun is
              getting to see it for the first time in person.
            </p>
            <p>
              This site is my attempt to provide exactly that &mdash; a "no spoilers" experience 
              &mdash; for anyone interested in touring the street art of Fayetteville, AR.
            </p>
            <p>
              That said, for anyone who really wants to look at photos, there are a whole bunch of
              photos here, too.
            </p>
            <hr></hr>
            <h4 className="question-heading">
              Who took the photos on this site?
            </h4>
            <p>
              I did, and forgive me.  I'm a person who owns a camera... not a photographer.
            </p>
            <h4 className="question-heading">
              What are you counting as "street art"?
            </h4>
            <p>
              So glad you asked!  Here's the criteria I'm using for any Fayetteville mural to be included 
              on this site:
            </p>
            <ul>
              <li>
                It must be at least partially visible from the street.
              </li>
              <li>
                It must be painted directly onto a permanent, standing structure. (No signs.)
              </li>
              <li>
                It can't <em>only</em> be the name, logo, or tagline of a business.  Having 
                the name or logo of a business somewhere in the mural doesn't necessarily
                disqualify it, but there has to be more to the mural than <em>just</em> that.
              </li>
              <li>
                It can't be on a residential home.  (I only know of one of these in town
                anyway, but I don't want to annoy anyone by posting photos of their house online
                without permission.)
              </li>
            </ul>
            <h4 className="question-heading">
              What about the painted electrical boxes in town?
            </h4>
            <p>
              Fair question!  There are some ridiculously cool ones.  (Look for the
              Banksy-inspired one on the corner of Gregg Ave and Sycamore St; it might be my favorite.)
            </p>
            <p>
              For now, I'm not adding them to this site simply because there are <em>so many</em> that I 
              fear they would drown out the other murals.  That said, if you tour all of the 
              murals I've included on this site so far, you'll inevitably see a bunch (dare I say, most?) of the 
              painted electrical boxes in town anyway over the course of your journey.
            </p>
            <h4 className="question-heading">
              Why no West Fayetteville murals?
            </h4>
            <p>
              Sorry, sorry, sorry!  I spend almost no time in West Fayetteville, so I have no idea 
              where the murals over there are.  If you know of any West Fayetteville murals, please
              feel free to reach out, and I'll get them added.  (See next question.)
            </p>
            <h4 className="question-heading">
              You missed a mural!  How do I contact you?
            </h4>
            <p>
              I'm sure there are some I've missed, and I'm happy to add more!
            </p>
            <p>
              Just to save us both some time, please review the answer to the 
              <span className="color3"> What are you counting as "street art"? </span> 
              question above to make sure that the mural you'd like to see added meets 
              the criteria for this site.  If it does, feel free to 
              <a href="mailto:kellystrauchblog@gmail.com"> email me</a> with the address of the 
              mural, and I'll get it added as soon as I can.
            </p>
            {/* <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion> */}
          </div>
        </div>
      </Layout>
    </>
  )
}

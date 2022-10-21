// import React from 'react'
import { Card, Button } from "react-bootstrap";

const Banner = ({
    imageUrl,
    purpose,
    title1,
    title2,
    desc1,
    desc2,
    linkName,
    buttonText,
  }) => {
  return (
    <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={imageUrl} />
    <Card.Body>
      <Card.Title>{purpose}</Card.Title>
      {/* <Card.Text> */}
        <p className="fs-3">{title1}</p>
        <p className="fs-4">{title2}</p>
        <p className="fs-3">{desc1}</p>
        <p className="fs-3">{desc2}</p>
      {/* </Card.Text> */}
    </Card.Body>
    <Card.Body>
      <Card.Link href={linkName} className="btn btn-primary">
        {buttonText}
      </Card.Link>
    </Card.Body>
  </Card>
  )
}

export default Banner


import Link from "next/link";
import Image from "next/image";
import { Card, Row, Col } from "react-bootstrap";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import DefaultImage from "../assets/images/placeholder.png";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => (
  <Col className="mb-3">
    <Link href={`/property/${externalID}`} passHref>
      <Card style={{ width: "18rem" }}>
        <Image
          src={coverPhoto ? coverPhoto.url : DefaultImage}
          alt="house"
          width="400"
          height="260"
        />
        <Card.Body>
          <Card.Title>{title.length >30 ? `${title.substring(0, 30)}...` : title}</Card.Title>
          <Card.Text>
          <span className="text-success text-opacity-75">{isVerified && <GoVerified />}</span>
          <span className="text-end"> AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</span>
          </Card.Text>
          <Image
          src={agency?.logo?.url}
          alt="house"
          width="30"
          height="30"
        />
        <Card.Text className="d-flex flex-row justify-content-between text-primary text-opacity-75 fs-6">
            <span>{rooms} <FaBed /></span> | <span>{baths} <FaBath/></span> | <span>{millify(area)} sqft <BsGridFill/></span>
        </Card.Text>

        </Card.Body>
      </Card>
    </Link>
  </Col>
);

export default Property;

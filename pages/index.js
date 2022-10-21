import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

export const Banner = ({
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
    <>
      <Card
        className="m-3 border border-0 shadow-sm"
        style={{ width: "20rem" }}
      >
        <Image variant="top" src={imageUrl} width="500" height="350" />
        <Card.Body>
          <Card.Title className="fw-light fs-6">{purpose}</Card.Title>
          <Card.Text className="fs-4 fw-bold">{title1}</Card.Text>
          <Card.Text className="fs-6">{desc1}</Card.Text>
        </Card.Body>
        <Card.Body>

          <Card.Link href={linkName} className="btn btn-light">
            {buttonText}
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

const Home = ({propertiesForSale, propertiesForRent}) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column m-5">
        <Banner
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
          purpose="RENT A HOME"
          title1="Rental Homes For Everyone"
          desc1="Explore Appartments, Villas and Homes"
          desc2="and more"
          linkName="/search?purpose=for-rent"
          buttonText="Explore Renting"
        />

        <div className="d-flex flex-wrap">
          {/* Fetch the properties and map over them... */}
          {propertiesForRent.map((property)=><Property property={property} key={property.id} />)}

        </div>

        <Banner
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
          purpose="BUY A HOME"
          title1="Find, Buy and Own Your Own Home"
          desc1="Explore Appartments, Villas, Homes"
          desc2="and more"
          linkName="/search?purpose=for-sell"
          buttonText="Explore Buying"
        />
      
      <div className="d-flex flex-wrap">
        {/* Fetch the properties and map over them... */}
        {propertiesForSale.map((property)=><Property property={property} key={property.id} />)}

      </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=8`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=8`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home;



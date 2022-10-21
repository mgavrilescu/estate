import { Container } from "react-bootstrap";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import ImageScrollbar from "../../components/ImageScrollbar";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    furnishingStatus,
    amenities,
    photos,
    purpose,
  },
}) => (
  <Container className="p-3">
    {photos && <ImageScrollbar data={photos} />}
    <Container className="w-100 p-5">
      <div className="d-flex p-2 align-items-center">
        <div className="pr-3 success">
          {isVerified && <GoVerified className="text-success opacity-50" />}
          <span className="fw-bold fs-6 text-end">
            {" "}
            AED {millify(price)}
            {rentFrequency && `/${rentFrequency}`}
          </span>
          <div className="text-primary text-opacity-75 fs-6">
            <span>
              {" "}
              {rooms} <FaBed />
            </span>{" "}
            |{" "}
            <span>
              {baths} <FaBath />
            </span>{" "}
            |{" "}
            <span>
              {millify(area)} sqft <BsGridFill />
            </span>
          </div>
          <div className="py-3">
            <p>{title.toUpperCase()}</p>
            <p className="fw-light lh-lg">{description}</p>
          </div>
          <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex justify-content-between w-50 bt-1 p-3">
              <p>TYPE</p>
              <p className="fw-bold">{type.toUpperCase()}</p>
            </div>
            <div className="d-flex justify-content-between w-50 bt-1 p-3">
              <p>PURPOSE</p>
              <p className="fw-bold">{purpose.toUpperCase()}</p>
            </div>
            {furnishingStatus && (
              <div className="d-flex justify-content-between w-50 bt-1 p-3">
                <p>FURNISHING STATUS</p>
                <p className="fw-bold">{furnishingStatus.toUpperCase()}</p>
              </div>
            )}
          </div>
          <div>
            {amenities.length && <p className="fs-5 fw-bold mt-3">AMENITIES</p>}
            <div className="d-flex flex-wrap">
                {amenities.map((item)=>(
                    item.amenities.map((amenity)=>(
                        <p key={amenity.text} className="fw-bold text-primary text-opacity-75 rounded fs-6 bg-light p-2 m-1">
                            {amenity.text}
                        </p>
                    ))
                ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Container>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}

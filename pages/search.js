import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Container } from "react-bootstrap";
import {BsFilter} from 'react-icons/bs';
import SearchFilters from "../components/SearchFilters";
import Property from '../components/Property'
import placeholder from '../assets/images/placeholder.png'
import { fetchApi, baseUrl } from "../utils/fetchApi";


const Search = ({properties}) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();


  return (
    <>
        <Container fluid className="d-flex p-3" role="button" onClick={() => setSearchFilters(!searchFilters)}>
            <h5>Search Properties by Filters <BsFilter/></h5> 
        </Container>
        {searchFilters && <SearchFilters/>}

        <p className="fs-4 fw-bold">
            Properties {router.query.purpose}
        </p>
        <Container className=" d-flex flex-wrap">
            {properties.map((property) => <Property property={property} key={property.id}/>)}
        </Container>
        {properties.length===0 && (
            <Container fluid className="d-flex  align-items-center mt-5 mb-5">
                <Image alt="no result" src={placeholder} width="200" height="100"/>
                <p className="fs-3 mt-3">No results Found</p>
            </Container>
        )}

    </>
  );
};

export default Search;

export async function getServerSideProps({query}) {

    const purpose = query.purpose || 'for-rent'
    const rentFrequency = query.rentFrequency || 'yearly'
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';

    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);


    return {
      props: {
        properties: data?.hits,
      },
    };
  }

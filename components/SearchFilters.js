import { useEffect, useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import placeholder from "../assets/images/placeholder.png";

export default function SearchFilters() {
  const [filters, setFilters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;
    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query: query });
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <>
      <Container className="d-flex flex-wrap p-3 justify-content-center">
        {filters?.map((filter) => (
          <div key={filter.queryName} className="p-2 m-1">
            <Form.Select
              onChange={(e) =>
                searchProperties({ [filter.queryName]: e.target.value })
              }
              defaultValue={filter.placeholder}
            >
              {filter?.items?.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </div>
        ))}
      </Container>
      <Container>
        <Button
          className="btn-light m-3"
          onClick={() => setShowLocations(!showLocations)}
        >
          Search Location
        </Button>
        {showLocations && (
          <Container>
            <Form.Control
              type="text"
              placeholder="Search by location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="my-3"
            ></Form.Control>
          </Container>
        )}
      </Container>

      {searchTerm !== "" && (
        <MdCancel
          onClick={() => {
            setSearchTerm("");
            setLocationData();
          }}
        />
      )}
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {showLocations && (
        <Container>
          {locationData?.map((location) => (
            <Container
              key={location.id}
              onClick={() => {
                searchProperties({ locationExternalIDs: location.externalID });
                setShowLocations(false);
                setSearchTerm(location.name);
              }}
            >
              <h5 className="fw-light">{location.name}</h5>
            </Container>
          ))}
          {!loading && !locationData?.length && (
            <Container>
              <p className="fs-3 fw-bold">Waiting to search!</p>
            </Container>
          )}
        </Container>
      )}
    </>
  );
}

// export default SearchFilters;

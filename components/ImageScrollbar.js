import { useContext } from "react";
import Image from "next/image";
import { Container } from "react-bootstrap";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <Container className="d-flex justify-content-center align-items-center mx-1">
      <FaArrowAltCircleLeft
        onClick={() => scrollPrev()}
        cursor="pointer"
      ></FaArrowAltCircleLeft>
    </Container>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <Container className="d-flex justify-content-center align-items-center mx-1">
      <FaArrowAltCircleRight
        onClick={() => scrollNext()}
        cursor="pointer"
      ></FaArrowAltCircleRight>
    </Container>
  );
};

const ImageScrollbar = ({ data }) => (
  <ScrollMenu
    LeftArrow={LeftArrow}
    RightArrow={RightArrow}
    style={{ overflow: "hidden" }}
  >
    {data.map((image) => (
      <Container itemID={image.id} key={image.id} style={{width:"910px"}}>
        <Image
          placeholder="blur"
          blurDataURL={image.url}
          src={image.url}
          width="1000"
          height="500"
          alt="property"
        //   sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
        ></Image>
      </Container>
    ))}
  </ScrollMenu>
);

export default ImageScrollbar;

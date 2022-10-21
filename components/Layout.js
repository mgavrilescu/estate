import Head from "next/head";
import { Container } from "react-bootstrap";
import TopBar from "./Navbar";
import Footer from "./Footer";

const Layout = ({children}) => {
  return <>
  <Head>
    <title>Real Estate</title>
  </Head>
  <header>
    <TopBar/>
  </header>
  <Container>
      {children}
  </Container>
  <footer>
    <Footer/>
  </footer>
</>
};

export default Layout;

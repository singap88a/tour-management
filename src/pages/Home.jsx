import React, { useEffect } from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import Subtitle from "../shared/Subtitle";
import worldImg from "../assets/images/world.png";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import Gallery from "../components/Gallery/Gallery.jsx";
import Explore from "../components/Explore/Explore.jsx";
import Experience from "../components/Experience/Experience.jsx";
import Fans_Love from "../components/Fans_Love/Fans_Love.jsx";
import Subscribe from "../components/Subscribe/Subscribe.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 900,  
      once: true,  
    });
  }, []);
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col
              data-aos="fade-right"
              data-aos-offset="0"
              data-aos-easing="ease-in-sine"
              lg="6"
            >
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle Subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Traveling opens the door to creating{" "}
                  <span className="highlight">memories</span>{" "}
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus quisquam autem consequuntur incidunt quod
                  voluptatibus blanditiis deleniti aspernatur animi, dolorem
                  quas. Eaque voluptatibus labore tempora vel a earum commodi
                  velit.
                </p>
              </div>
            </Col>
            <Col
              data-aos="fade-left"
              data-aos-offset="0"
              data-aos-easing="ease-in-sine"
              lg="2"
            >
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col
              data-aos="fade-left"
              data-aos-offset="0"
              data-aos-easing="ease-in-sine"
              lg="2"
            >
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col
              data-aos="fade-left"
              data-aos-offset="0"
              data-aos-easing="ease-in-sine"
              lg="2"
            >
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* /////////////////// /////////////////////////// */}

      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <Col lg="9">
              <ServiceList />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ////////////////////// */}
      <section>
        <Explore />
      </section>
      {/* //////////////////////// */}
      <section>
        <Experience />
      </section>
      <section>
        <Gallery />
      </section>

      {/* ////////////////////// */}
      <section>
        <Fans_Love />
      </section>
      <section>
        <Subscribe />
      </section>
    </>
  );
}

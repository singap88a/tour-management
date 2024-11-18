import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import Subtitle from "../../shared/Subtitle.jsx";
import Galleryy from "./Gallery.js";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Gallery() {

  useEffect(() => {
    AOS.init({
      duration: 900,   
      once: true        
    });
  }, []);

  return (
    <section  >  
      <Container>
        <Row>
          <Col lg="12">
            <Subtitle Subtitle={"Gallery"} />
            <h2 className="featured__tour-title">Visit our customers tour gallery</h2>
            <ResponsiveMasonry  
              columnsCountBreakPoints={{ 500: 1, 768: 5, 992: 4 }}
            >
              <Masonry gutter="1rem">
                {Galleryy.map((item, index) => (
                  <img src={item} key={index} alt="" 
                  style={{width: '100%', display:"block", borderRadius:"10px"}}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

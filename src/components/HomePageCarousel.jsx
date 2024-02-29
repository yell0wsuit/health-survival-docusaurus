import React, { useState } from "react";
import { Carousel, Row, Col, Card, Button, Ratio } from "react-bootstrap";

function HomePageCarousel() {
    const [index, setIndex] = useState(0);
    const totalSlides = 2;

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const goToPrev = () => {
        setIndex(index === 0 ? totalSlides - 1 : index - 1);
    };

    const goToNext = () => {
        setIndex(index === totalSlides - 1 ? 0 : index + 1);
    };

    return (
        <div className="mb-3">
            <div className="text-center">
                <button className="btn btn-primary mb-3 me-1" onClick={goToPrev}>
                    <i className="bi bi-arrow-left"></i>
                </button>
                <button className="btn btn-primary mb-3" onClick={goToNext}>
                    <i className="bi bi-arrow-right"></i>
                </button>
            </div>
            <Carousel fade indicators={false} id="cardCarousel" controls={false} activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <Row>
                        <Col md={4} className="d-flex mb-3">
                            <Card>
                                <Ratio aspectRatio="16x9">
                                    <Card.Img variant="top" src="/images/apple-health/Eucalyptus-Sleep_Article_illustration.jpg" />
                                </Ratio>
                                <Card.Body>
                                    <Card.Title className="fw-semibold">I have trouble sleeping</Card.Title>
                                    <Card.Text>If you can't sleep well, consider these tips.</Card.Text>
                                    <Button variant="primary" href="/apple-health/getting-a-good-nights-sleep">
                                        Read...
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="d-flex mb-3">
                            <Card>
                                <Ratio aspectRatio="16x9">
                                    <Card.Img variant="top" src="/images/apple-health/MoodsEmotion_Article_Illustration.jpg" />
                                </Ratio>
                                <Card.Body>
                                    <Card.Title className="fw-semibold">What's the difference between emotions and moods?</Card.Title>
                                    <Card.Text>While it’s easy to use these terms interchangeably, there are key differences.</Card.Text>
                                    <Button variant="primary" href="/apple-health/the-difference-between-emotion-and-mood">
                                        Read...
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="d-flex mb-3">
                            <Card>
                                <Ratio aspectRatio="16x9">
                                    <Card.Img variant="top" src="/images/sas-urban/wildfire1.jpg" />
                                </Ratio>
                                <Card.Body>
                                    <Card.Title className="fw-semibold">Give me some fire facts</Card.Title>
                                    <Card.Text>Remembering the "fire triangle" idea will help you one day.</Card.Text>
                                    <Button variant="primary" href="/sas-urban/urban-fire#fire-facts">
                                        Read...
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
                <Carousel.Item>
                    <Row>
                        <Col md={4} className="d-flex mb-3">
                            <Card>
                                <Ratio aspectRatio="16x9">
                                    <Card.Img variant="top" src="/images/sas-urban/1537827855952.webp" />
                                </Ratio>
                                <Card.Body>
                                    <Card.Title className="fw-semibold">Terrorism</Card.Title>
                                    <Card.Text>What you should do to survive when being held hostage.</Card.Text>
                                    <Button variant="primary" href="/sas-urban/urban-terrorism">
                                        Read...
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="d-flex mb-3">
                            <Card>
                                <Ratio aspectRatio="16x9">
                                    <Card.Img variant="top" src="/images/sas-urban/Community_Transit_15814_Double_Tall_in_Seattle-scaled.jpg" />
                                </Ratio>
                                <Card.Body>
                                    <Card.Title className="fw-semibold">Travelling abroad</Card.Title>
                                    <Card.Text>
                                        As soon as you enter a foreign country, you face many differences—language, climate, customs and laws which
                                        may vary widely from those you take for granted.
                                    </Card.Text>
                                    <Button variant="primary" href="/sas-urban/urban-in-transit#travelling-abroad">
                                        Read...
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="d-flex mb-3">
                            <Card>
                                <Ratio aspectRatio="16x9">
                                    <Card.Img variant="top" src="/images/sas-survival/essentials_hero.webp" />
                                </Ratio>
                                <Card.Body>
                                    <Card.Title className="fw-semibold">Making plans for surviving in the wild</Card.Title>
                                    <Card.Text>
                                        Preparing yourself to be a survivor. And did you know a knife is one of the most important essential tools?
                                    </Card.Text>
                                    <Button variant="primary" href="/sas-survival-guide/ssg-essentials">
                                        Read...
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default HomePageCarousel;

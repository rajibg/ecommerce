import React from 'react';
import person1Img from '../../images/person-1.png'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

function TestimonialSection() {
    return (
        <div className="testimonial-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 mx-auto text-center">
                        <h2 className="section-title">Testimonials</h2>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="testimonial-slider-wrap text-center">
                            <div className="testimonial-slider">
                                <AwesomeSlider animation="cubeAnimation">
                                    <div className="item">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-8 mx-auto">
                                                <div className="testimonial-block text-center">
                                                    <blockquote className="mb-5">
                                                        <p>
                                                            &ldquo;Donec facilisis quam ut purus rutrum
                                                            lobortis. Donec vitae odio quis nisl dapibus
                                                            malesuada. Nullam ac aliquet velit. Aliquam
                                                            vulputate velit imperdiet dolor tempor tristique.
                                                            Pellentesque habitant morbi tristique senectus et
                                                            netus et malesuada fames ac turpis egestas. Integer
                                                            convallis volutpat dui quis scelerisque.&rdquo;
                                                        </p>
                                                    </blockquote>

                                                    <div className="author-info">
                                                        <div className="author-pic">
                                                            <img
                                                                src={person1Img}
                                                                alt="Maria Jones"
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                        <h3 className="font-weight-bold">Maria Jones</h3>
                                                        <span className="position d-block mb-3"
                                                        >CEO, Co-Founder, XYZ Inc.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-8 mx-auto">
                                                <div className="testimonial-block text-center">
                                                    <blockquote className="mb-5">
                                                        <p>
                                                            &ldquo;Donec facilisis quam ut purus rutrum
                                                            lobortis. Donec vitae odio quis nisl dapibus
                                                            malesuada. Nullam ac aliquet velit. Aliquam
                                                            vulputate velit imperdiet dolor tempor tristique.
                                                            Pellentesque habitant morbi tristique senectus et
                                                            netus et malesuada fames ac turpis egestas. Integer
                                                            convallis volutpat dui quis scelerisque.&rdquo;
                                                        </p>
                                                    </blockquote>

                                                    <div className="author-info">
                                                        <div className="author-pic">
                                                            <img
                                                                src={person1Img}
                                                                alt="Maria Jones"
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                        <h3 className="font-weight-bold">Maria Jones</h3>
                                                        <span className="position d-block mb-3"
                                                        >CEO, Co-Founder, XYZ Inc.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-8 mx-auto">
                                                <div className="testimonial-block text-center">
                                                    <blockquote className="mb-5">
                                                        <p>
                                                            &ldquo;Donec facilisis quam ut purus rutrum
                                                            lobortis. Donec vitae odio quis nisl dapibus
                                                            malesuada. Nullam ac aliquet velit. Aliquam
                                                            vulputate velit imperdiet dolor tempor tristique.
                                                            Pellentesque habitant morbi tristique senectus et
                                                            netus et malesuada fames ac turpis egestas. Integer
                                                            convallis volutpat dui quis scelerisque.&rdquo;
                                                        </p>
                                                    </blockquote>

                                                    <div className="author-info">
                                                        <div className="author-pic">
                                                            <img
                                                                src={person1Img}
                                                                alt="Maria Jones"
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                        <h3 className="font-weight-bold">Maria Jones</h3>
                                                        <span className="position d-block mb-3"
                                                        >CEO, Co-Founder, XYZ Inc.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AwesomeSlider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestimonialSection;
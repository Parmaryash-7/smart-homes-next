"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";

// import ReadMore from "../components/ReadMore";
// import Seo from "../components/Seo"; 
// import { CountryList } from "../services/CountryList";
import InquiryForm from "components/InquiryForm";

let Swiper = null;
let SwiperSlide = null;

export default function AboutUs({ aboutDetails, pageList, propertyList }) {
  const [aboutUsData, setAboutUs] = useState(aboutDetails || null);
  const [isMobilescreen, setMobilescreen] = useState(false);
  const [SwiperComponents, setSwiperComponents] = useState({
    Swiper: null,
    SwiperSlide: null,
  });
  const [countryFlag, setCountryFlag] = useState(false);
  const [propertylist, setPropertylist] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const result = await api.Propertylist();
        const filtered = result.filter((item) => item.project_id !== 744 && item.project_id !== 814);
        setPropertylist(result);
        setProjectOptions(filtered);
        // console.log("object");
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const loadSwiper = async () => {
      const swiper = await import("swiper/react");
      const SwiperCore = await import("swiper");

      const { Navigation, Pagination, Autoplay, Keyboard, Scrollbar } =
        await import("swiper/modules");

      SwiperCore.default.use([
        Navigation,
        Pagination,
        Autoplay,
        Keyboard,
        Scrollbar,
      ]);

      setSwiperComponents({
        Swiper: swiper.Swiper,
        SwiperSlide: swiper.SwiperSlide,
      });
    };

    loadSwiper();

    if (!aboutUsData && Array.isArray(pageList)) {
      const aboutData = pageList.find((page) => page.slug === "about-us");
      setAboutUs(aboutData);
    }

    if (typeof window !== "undefined" && window.innerWidth < 767) {
      setMobilescreen(true);
    }
  }, []);

  if (!aboutUsData) {
    return <div>Error loading About Us data.</div>;
  }

  const ourvalueswiperData = [
    {
      title: "Honesty & Integrity",
      description:
        "We hold ourselves to the highest ethical standards in all that we do. At Smart Homes, our foundation is built on unwavering honesty and integrity.",
    },
    {
      title: "Transparency",
      description:
        "Transparency is not just a promise; it's our way of doing business. We believe in openness and clarity in every transaction and decision.",
    },
    {
      title: "Customer-Centric Approach",
      description:
        "Our clients are our most valuable assets. We are deeply committed to their satisfaction, tailoring our services to meet their unique desires and expectations.",
    },
    {
      title: "Quality & Innovation",
      description:
        "Smart Homes leads with quality and innovation. We constantly embrace the latest technology to redefine our approach, setting new industry standards.",
    },
  ];

  return (
    <>
      <div
        className="about_wrapper"
        onClick={() => {
          setCountryFlag(false);
        }}
      >
        {aboutUsData && aboutUsData.page_name && (
          <div
            className="reecosys-main-wrapper"
            id="reecosys-main-wrapper"
          // onClick="country_code_click_false();"
          >
            <div
              id="reecosys-aboutus-wrapper"
              className="relative  section-padding pt0"
            >
              <section
                className="reecosys-template-section section-padding relative"
                id="reecosys-aboutus-section-2"
              >
                <div className="main-container">
                  <div className="inner-flex inner-flex-medium">
                    <div
                      className="link-font-size  "
                      data-aos="fade-in"
                      data-aos-delay="300"
                      data-aos-duration="600"
                    >
                      <p className="secondary-color uppercase bold-fonts">
                        About
                      </p>
                    </div>
                    <div className="section-information inner-flex inner-flex-small ">
                      <div className="section-title ">
                        <h2
                          className="secondary-color "
                          data-aos="fade-in"
                          data-aos-delay="400"
                          data-aos-duration="600"
                        >
                          Founded in 2015, Smart Homes Infrastructure Pvt. Ltd.
                          has established itself as a leading real estate
                          conglomerate in Dholera Smart City India's first
                          planned, futuristic smart city and one of the world's
                          most dynamic markets.
                        </h2>
                      </div>

                      <div className="section-content about_para_width">
                        <p
                          className=""
                          data-aos="fade-up"
                          data-aos-delay="500"
                          data-aos-duration="600"
                        >
                          A vision to redefine the real estate industry, we take
                          pride in being your trusted partner in creating a
                          legacy in Dholera. Recognised as a pioneer in
                          Commercial, Industrial, and Residential land
                          development, we operate with a unique blend of
                          expertise, education, & international experience. Our
                          efforts align with the vision of Honourable Prime
                          Minister Shri Narendra Modi to transform Dholera into
                          a global hub of innovation, sustainability, and
                          economic growth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section
                className="reecosys-template-section section-padding relative highlight-bg "
                id="reecosys-template-home-section-experience"
              >
                <div className="main-container-fluid">
                  <div className="inner-flex inner-flex-medium">
                    <div
                      className="link-font-size  "
                      data-aos="fade-in"
                      data-aos-delay="300"
                      data-aos-duration="600"
                    >
                      <p className=" uppercase bold-fonts white-color">
                        Discover the Future with Smart Homes
                      </p>
                    </div>
                    <div className="inner-flex">
                      <div
                        className="section-title  experienceText  "
                        data-aos="fade-in"
                        data-aos-delay="400"
                        data-aos-duration="600"
                      >
                        <h2 className="white-color ">
                          At Smart Homes, our story is one of innovation,
                          ambition, and dedication to shaping the future of
                          urban living. As a pioneer in Dholera Smart City, we
                          are at the forefront of India's first planned and
                          futuristic smart city, creating spaces that combine
                          modern living with sustainability, technology, and
                          unmatched quality.
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section-padding">
                <div className="main-container">
                  <div className="inner-flex inner-flex-medium">
                    <div className="inner-flex inner-flex-smallest section-title section-content">
                      <h2 className="highlight-color">
                        Why Choose SmartHomes Infrastructure Pvt Ltd?
                      </h2>
                      <p className="regular-fonts">
                        Innovation is our dna, making our uniqueness the
                        cornerstone of excellence.
                      </p>
                    </div>
                    <div className="education-grid inner-flex-mob">
                      <div className="inner-flex inner-flex-common education-box">
                        <div>
                          <img src="/images/about/education.jpg" alt="" />
                        </div>
                        <div className="inner-flex inner-flex-smallest">
                          <div className="section-paragraph">
                            <p className="medium-fonts highlight-color">
                              Education & Exposure
                            </p>
                          </div>
                          <div className="section-content">
                            <p className="regular-fonts">
                              Our international experiences blended with robust
                              educational backgrounds make us think beyond the
                              ordinary.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="inner-flex inner-flex-common education-box">
                        <div>
                          <img src="/images/about/tech-savviness.jpg" alt="" />
                        </div>
                        <div className="inner-flex inner-flex-smallest">
                          <div className="section-paragraph">
                            <p className="medium-fonts highlight-color">
                              Tech-Savviness
                            </p>
                          </div>
                          <div className="section-content">
                            <p className="regular-fonts">
                              More than just a real estate company, we are a
                              tech-driven enterprise ensuring precision,
                              transparency, and efficiency.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="inner-flex inner-flex-common education-box">
                        <div>
                          <img
                            src="/images/about/transparent-processes.jpg"
                            alt=""
                          />
                        </div>
                        <div className="inner-flex inner-flex-smallest">
                          <div className="section-paragraph">
                            <p className="medium-fonts highlight-color">
                              Transparent Processes
                            </p>
                          </div>
                          <div className="section-content">
                            <p className="regular-fonts">
                              Our documentation and processes stand out for
                              their meticulousness, instilling confidence in
                              investors globally.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="about_bg section-padding relative">
                <div className="main-container-fluid">
                  <div className="inner-flex inner-flex-medium">
                    <div className="about_flex">
                      <div className="box_grid box_grid_bg">
                        <div className="inner-flex inner-flex-small">
                          <div className="inner-flex ">
                            <div
                              className="link-font-size  "
                              data-aos="fade-in"
                              data-aos-delay="300"
                              data-aos-duration="600"
                            >
                              <p className="highlight-color uppercase bold-fonts">
                                Vision
                              </p>
                            </div>
                            <div className="section-title ">
                              <h2
                                className="highlight-color "
                                data-aos="fade-in"
                                data-aos-delay="400"
                                data-aos-duration="600"
                              >
                                Building the Future, Today
                              </h2>
                            </div>
                          </div>
                          <div className="section-content">
                            <p
                              className="highlight-color"
                              data-aos="fade-up"
                              data-aos-delay="500"
                              data-aos-duration="600"
                            >
                              Our vision at Smart Homes begins with embracing
                              transparency, a fundamental element of our
                              commitment to excellence. We are creating wealth
                              and prosperity for generations.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="box_grid box_grid_bg">
                        <div className="inner-flex inner-flex-small">
                          <div className="inner-flex ">
                            <div
                              className="link-font-size  "
                              data-aos="fade-in"
                              data-aos-delay="300"
                              data-aos-duration="600"
                            >
                              <p className="highlight-color uppercase bold-fonts">
                                Mission
                              </p>
                            </div>
                            <div className="section-title ">
                              <h2
                                className="highlight-color "
                                data-aos="fade-in"
                                data-aos-delay="400"
                                data-aos-duration="600"
                              >
                                Revolutionising Real Estate
                              </h2>
                            </div>
                          </div>
                          <div className="section-content">
                            <p
                              className="highlight-color"
                              data-aos="fade-up"
                              data-aos-delay="500"
                              data-aos-duration="600"
                            >
                              SmartHomes is not just a company; its a promise to
                              redefine real estate by harmonising cutting-edge
                              technology, environmentally friendly practices,
                              architectural excellence, and unwavering
                              commitment to legal compliance and fair real
                              estate practices. Our projects are designed to
                              enhance the quality of life, ensuring that every
                              investment grows into a lifetime of value and
                              pride.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
              </section>

              {ourvalueswiperData.length > 0 && (
                <section
                  className="reecosys-template-about-section-6 reecosys-template-section section-padding relative"
                  id="reecosys-template-about-section-6"
                >
                  <div className="inner-flex inner-flex-medium">
                    <div className="main-container inner-flex inner-flex-medium">
                      <div
                        className="link-font-size "
                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-duration="600"
                      >
                        <p className="highlight-color uppercase bold-fonts">
                          OUR VALUES
                        </p>
                      </div>
                      <div className="flex-row alend j-c-sb w100">
                        <div className="section-information inner-flex ">
                          <div className="section-title ">
                            <h2
                              className="highlight-color"
                              data-aos="fade-up"
                              data-aos-delay="400"
                              data-aos-duration="600"
                            >
                              We blend excellence with creativity, pushing
                              boundaries.
                            </h2>
                          </div>
                        </div>
                        <div className="timeline-navigation flex-row alc hidden-xs">
                          <div className="swiper-button-prev timeline-button about_button">
                            <img
                              src="/images/icon/left-arrow.svg"
                              alt=""
                              style={{ filter: "invert(1) brightness(5.5)" }}
                            />
                          </div>
                          <div className="swiper-button-next timeline-button about_button">
                            <img
                              src="/images/icon/right-arrow.svg"
                              alt=""
                              style={{ filter: "invert(1) brightness(5.5)" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="timelineSwiper about_swiper">
                      {SwiperComponents.Swiper &&
                        SwiperComponents.SwiperSlide ? (
                        <SwiperComponents.Swiper
                          className="swiper-container"
                          observer={true}
                          observeParents={true}
                          slidesPerView={3.2}
                          spaceBetween={16}
                          freeMode={true}
                          navigation={{
                            prevEl: ".swiper-button-prev.timeline-button",
                            nextEl: ".swiper-button-next.timeline-button",
                          }}
                          pagination={{
                            el: ".swiper-pagination.ourvalueswiper-pagination",
                            clickable: true,
                          }}
                          breakpoints={{
                            1152: {
                              slidesPerView: 3.2,
                            },
                            767: {
                              slidesPerView: 2.3,
                            },
                            0: {
                              slidesPerView: 1.2,
                            },
                          }}
                        >
                          {ourvalueswiperData.map((timeline, index) => (
                            <SwiperComponents.SwiperSlide key={index}>
                              <div
                                className="timelineCard about_timelinecard inner-flex inner-flex-medium "
                                data-aos="fade-in"
                                data-aos-delay={`0.${index + 3}s`}
                                data-aos-duration="600"
                              >
                                <div className="flex-row alc w100">
                                  <div className="section-title section-title-new">
                                    <h2
                                      className="highlight-colorx"
                                      style={{ color: "#2e2e2e" }}
                                    >
                                      {timeline.title}
                                    </h2>
                                  </div>
                                </div>
                                <div className="link-font-size">
                                  <p
                                    className="highlight-colorx"
                                    style={{ color: "#2e2e2e" }}
                                    dangerouslySetInnerHTML={{
                                      __html: timeline.description,
                                    }}
                                  />
                                </div>
                              </div>
                            </SwiperComponents.SwiperSlide>
                          ))}
                        </SwiperComponents.Swiper>
                      ) : (
                        <div className="section-title">
                          <h1>Loading Swiper...</h1>
                        </div>
                      )}
                      <div className="swiper-pagination ourvalueswiper-pagination visible-xs"></div>
                    </div>
                  </div>
                </section>
              )}
              {aboutUsData.profiles.length > 0 && (
                <section
                  className="reecosys-section relative section-padding highlight-bg"
                  id="reecosys-aboutus-section-3"
                >
                  <div className="main-container">
                    <div className="inner-flex inner-flex-big">
                      <div className="inner-flex">
                        <div
                          className="section-paragraph relative"
                          data-aos="fade-up"
                          data-aos-duration="600"
                          data-aos-delay="300"
                        >
                          <p className="white-color text-center">
                            Our Leadership
                          </p>
                        </div>
                        <div className="section-title">
                          <h2
                            className="text-center white-color"
                            data-aos="fade-up"
                            data-aos-delay="600"
                            data-aos-duration="600"
                          >
                            The dynamic minds powering #SmartHomesDholera
                          </h2>
                        </div>
                      </div>

                      <div className="leaders-grid-wrapper">
                        {aboutUsData.profiles &&
                          aboutUsData.profiles.map((data, i) => (
                            <div
                              key={i}
                              className="inner-flex inner-flex-small"
                              data-aos="fade-up"
                              data-aos-delay="500"
                              data-aos-duration="500"
                            >
                              {/* <div className="" style={{ height: "50vh" }}> */}
                              <div className="">
                                <img
                                  src={`${data.profile_image_main}&h=800&w=700&q=75`}
                                  alt={aboutUsData.profile_name}
                                  style={{
                                    objectPosition: "top",
                                    objectFit: "contain",
                                    height: "100%",
                                  }}
                                />
                              </div>
                              <div className="">
                                <div className="inner-flex">
                                  <div className="inner-flex inner-flex-smallest">
                                    {data.profile_name && (
                                      <div className="section-paragraph">
                                        <p className="semibold-fonts text-center white-color">
                                          {data.profile_name}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  {data.profile_description_short && (
                                    <div
                                      className="readmore-span-color"
                                      ng-if=""
                                    >
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            data.profile_description_short,
                                        }}
                                        className="white-color text-center"
                                        style={{ opacity: "0.8" }}
                                      ></p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              <section
                className="section-padding "
                style={{ backgroundColor: "white !important" }}
              >
                <div className="main-container">
                  <div
                    className="contactFormWrapper  relative"
                    style={{ zIndex: 2 }}
                  >
                    <div
                      className="section-title aos fadeInUp"
                      data-aos-duration="400"
                      data-aos-delay="600"
                    >
                      <h2>Inquire Now</h2>
                    </div>
                    <div
                      className="contactForm detailForm w100 aos fadeIn"
                      data-aos-duration="500"
                      data-aos-delay="600"
                    >
                      <InquiryForm
                        // pageDetail={projectDetail}
                        countryFlag={countryFlag}
                        fetchedPropertyList={propertyList}
                        setCountryFlag={setCountryFlag}
                        isAbout={true}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section
                className="reecosys-template-section relative"
                id="reecosys-template-home-section-10"
              >
                <div className="">
                  <div className="homeContactForm relative j-c-sb">
                    <div
                      className="inner-flex j-c-sb  relative"
                      style={{ zIndex: 2 }}
                    >
                      <div
                        className="section-title"
                        data-aos="fade-up"
                        data-aos-delay="300"
                        data-aos-duration="600"
                      >
                        <h2 className="white-color">
                          Prefer connecting directly? Get in touch with us via
                          phone, email, or visit us at our office—we're here to
                          help!
                        </h2>
                      </div>
                    </div>
                    <div
                      className="flex-row alc contactBtnFlex relative"
                      style={{ zIndex: 2 }}
                    >
                      <a href="tel:+917096961250">
                        <button
                          className=" reecosys-template-button button-style-white white-text"
                          data-aos="fade-up"
                          data-aos-delay="300"
                          data-aos-duration="600"
                        >
                          <span className="material-symbols-outlined">
                            phone_in_talk
                          </span>
                          <p>Call Us</p>
                        </button>
                      </a>
                      <a href="mailto:info@smarthomesinfra.com">
                        <button
                          className="reecosys-template-button button-style-white white-text"
                          data-aos="fade-up"
                          data-aos-delay="400"
                          data-aos-duration="600"
                        >
                          <span className="material-symbols-outlined">
                            drafts
                          </span>
                          <p>Send an email</p>
                        </button>
                      </a>
                      <a
                        href="https://maps.app.goo.gl/4CYF8dhjXH65BjNK7"
                        target="_blank"
                      >
                        <button
                          className="reecosys-template-button button-style-white white-text"
                          data-aos="fade-up"
                          data-aos-delay="500"
                          data-aos-duration="600"
                        >
                          <span className="material-symbols-outlined">
                            distance
                          </span>
                          <p>Visit Our Office</p>
                        </button>
                      </a>
                    </div>
                    <div className="homeContactFormOverlay"></div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

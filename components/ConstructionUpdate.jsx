"use client";

import React, { useEffect, useState } from "react";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Pagination,
  Keyboard,
  Mousewheel,
  Autoplay,
  Navigation,
  FreeMode
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function ConstructionUpdate({ pageList }) {
  const [isMobilescreen, setMobilescreen] = useState(false);
  // const [SwiperComponents, setSwiperComponents] = useState({ Swiper: null, SwiperSlide: null });

  // useEffect(() => {
  //   const loadSwiper = async () => {
  //     const swiper = await import("swiper/react");
  //     const SwiperCore = await import("swiper");
  //     const { Navigation, Pagination, Autoplay, Keyboard, Scrollbar } = await import("swiper/modules");
  //     SwiperCore.default.use([Navigation, Pagination, Autoplay, Keyboard, Scrollbar]);

  //     setSwiperComponents({
  //       Swiper: swiper.Swiper,
  //       SwiperSlide: swiper.SwiperSlide,
  //     });
  //   };

  //   loadSwiper();
  //   if (window.innerWidth < 767) setMobilescreen(true);

  //   Fancybox.bind("[data-fancybox]", {
  //     Thumbs: true,
  //     Toolbar: true,
  //   });
  // }, []);

  useEffect(() => {
    Fancybox.bind("[data-fancybox]"), {
      Thumbs: true,
      Toolbar: true,
    }
  }, [])


  const dholeraData = [
    { img: "/images/contruction-update/dholera-forest/dholera-forest-new.jpeg" },
    { img: "/images/contruction-update/dholera-forest/dholera-forest-new-02.jpeg" },
    { img: "/images/contruction-update/dholera-forest/dholera-forest-new-03.jpeg" },
    { img: "/images/contruction-update/dholera-forest/dholera-forest-new-04.jpeg" },
    { img: "/images/contruction-update/dholera-forest/dholera-forest-new-05.jpeg" },
    { img: "/images/contruction-update/dholera-forest/dholera-forest-new-06.jpeg" },
    { img: "/images/contruction-update/dholera-forest/dholera-forest-new-07.jpeg" },
    { img: "/images/contruction-update/dholera-forest/dholera-forest-new-08.jpeg" },
    { img: "/images/contruction-update/dholera-forest/dholera-forest-new-09.jpeg" },
    { img: "/images/contruction-update/dholera-forest/dholera-forest-new-10.jpeg" },
    { img: "/images/contruction-update/dholera-forest/dholera-forest-new-11.jpeg" },
    { img: "/images/contruction-update/dholera-forest/def-1.jpg" },
    { img: "/images/contruction-update/dholera-forest/def-2.jpg" },
    { img: "/images/contruction-update/dholera-forest/def-3.jpg" },
    { img: "/images/contruction-update/dholera-forest/def-4.jpg" },
    { img: "/images/contruction-update/dholera-forest/def-5.jpg" },
    { img: "/images/contruction-update/dholera-forest/def-6.jpg" },
    { img: "/images/contruction-update/dholera-forest/def-7.jpg" },
    { img: "/images/contruction-update/dholera-forest/def-8.jpg" },
    { img: "/images/contruction-update/dholera-forest/def-9.jpg" },
    { img: "/images/contruction-update/dholera-forest/def-10.jpg" },
    { img: "/images/contruction-update/dholera-forest/def-11.jpg" },
    { img: "/images/contruction-update/dholera-forest/Dholera-forest-estate-image-1.jpeg" },
    { img: "/images/contruction-update/dholera-forest/Dholera-forest-estate-image-2.jpeg" },
    { img: "/images/contruction-update/dholera-forest/Dholera-forest-estate-image-3.jpeg" },
    { img: "/images/contruction-update/dholera-forest/Dholera-forest-estate-image-4.jpg" },
    { img: "/images/contruction-update/dholera-forest/Dholera-forest-estate-image-5.jpeg" },
    { img: "/images/contruction-update/dholera-forest/Dholera-forest-estate-image-6.jpeg" },
  ];

  const constructionData = [
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY/dec1.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY/dec2.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY/dec3.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY/dec4.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY/dec5.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY/dec6.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY/dec7.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY/dec8.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY/dec9.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY/dec10.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY/dec11.jpg" },
  ];

  const oliveGardenData = [
    { img: "/images/contruction-update/Orange-County-Olive-Garden-Mulberry-Park-CU/Orange-County-Olive-Garden-Mulberry-Park.jpg" },
    { img: "/images/contruction-update/Orange-County-Olive-Garden-Mulberry-Park-CU/Orange-County-Olive-Garden-Mulberry-Park2.jpg" },
    { img: "/images/contruction-update/Orange-County-Olive-Garden-Mulberry-Park-CU/Orange-County-Olive-Garden-Mulberry-Park3.jpg" },
    { img: "/images/contruction-update/Orange-County-Olive-Garden-Mulberry-Park-CU/Orange-County-Olive-Garden-Mulberry-Park4.jpg" },
    { img: "/images/contruction-update/Orange-County-Olive-Garden-Mulberry-Park-CU/Orange-County-Olive-Garden-Mulberry-Park5.jpg" },
    { img: "/images/contruction-update/Orange-County-Olive-Garden-Mulberry-Park-CU/Orange-County-Olive-Garden-Mulberry-Park6.jpg" },
    { img: "/images/contruction-update/Orange-County-Olive-Garden-Mulberry-Park-CU/Orange-County-Olive-Garden-Mulberry-Park7.jpg" },
    { img: "/images/contruction-update/Orange-County-Olive-Garden-Mulberry-Park-CU/Orange-County-Olive-Garden-Mulberry-Park8.jpg" },
    { img: "/images/contruction-update/Orange-County-Olive-Garden-Mulberry-Park-CU/Orange-County-Olive-Garden-Mulberry-Park9.jpg" },
    { img: "/images/contruction-update/Orange-County-Olive-Garden-Mulberry-Park-CU/Orange-County-Olive-Garden-Mulberry-Park10.jpg" },
  ];
  const AirportData = [
    { img: "/images/contruction-update/Dholera-International-Airport-City-11/Dholera-International-Airport-City-11.jpg" },
    { img: "/images/contruction-update/Dholera-International-Airport-City-11/Dholera-International-Airport-City-12.jpg" },
    { img: "/images/contruction-update/Dholera-International-Airport-City-11/Dholera-International-Airport-City-13.jpg" },
    { img: "/images/contruction-update/Dholera-International-Airport-City-11/Dholera-International-Airport-City-14.jpg" },
    { img: "/images/contruction-update/Dholera-International-Airport-City-11/Dholera-International-Airport-City-15.jpg" },
  ];
  const gardenData = [
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-1.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-2.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-3.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-4.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-5.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-6.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-7.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-8.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-9.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-10.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-11.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-12.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-13.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-14.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-15.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-16.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-17.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-18.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-19.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-20.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-21.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-22.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-23.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-24.jpg" },
    { img: "/images/contruction-update/Maple-Garden-CU/Maple-Garden-25.jpg" },
  ];


  // useEffect(() => {
  //   const loadSwiper = async () => {
  //     const swiper = await import("swiper/react");
  //     const SwiperCore = await import("swiper");
  //     const { Navigation, Pagination, Autoplay, Keyboard, Scrollbar } = await import("swiper/modules");
  //     SwiperCore.default.use([Navigation, Pagination, Autoplay, Keyboard, Scrollbar]);

  //     setSwiperComponents({
  //       Swiper: swiper.Swiper,
  //       SwiperSlide: swiper.SwiperSlide,
  //     });
  //   };

  //   loadSwiper();
  //   if (window.innerWidth < 767) setMobilescreen(true);
  // }, []);

  // const { Swiper, SwiperSlide } = SwiperComponents;

  const constructiontownshipData = [
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect1.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect2.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect3.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect4.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect5.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect6.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect7.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect8.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect9.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect10.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect11.jpg" },
    { img: "/images/contruction-update/DHOLERA-EXPRESSWAY-CITY-TOWNSHIP/dect12.jpg" },
  ];


  return (
    <>
      <div className="reecosys-template-page-wrapper">
        <div className="consctruction-update-wrapper">
          <section
            className="reecosys-section relative"
            data-aos="fade-in"
            data-aos-delay="600"
            data-aos-duration="400"
            id="reecosys-contact-us-section-1"
          >
            <div className="common-listing-banner relative">
              <img src="/images/contruction-update/CU-Banner.jpg" alt="" />
              <div className="common-list-overlay"></div>
              <div className="common-banner-title-abs">
                <div className="banner-title">
                  <h1 className="white-color capitalize">Construction Updates</h1>
                </div>
              </div>  
            </div>
            <div className="black_overlay"></div>
          </section>

          <section className="reecosys-template-section cp-update  section-padding relative">
            <div className="inner-flex inner-flex-medium">
              <div className="main-container-fluid ">
                <div className="inner-flex inner-flex-medium">
                  <div className="flex-row alend j-c-sb w100 cp-tab-col">
                    <div className="section-information inner-flex ">
                      <div className="section-title ">
                        <h2 className="secondary-color" data-aos="fade-in" data-aos-delay="400" data-aos-duration="600">
                          DHOLERA FOREST ESTATE
                        </h2>
                      </div>
                    </div>
                    <div className="timeline-navigation flex-row alc">
                      <div className="swiper-button-prev dholera-button">
                        <img src="/images/icon/left-arrow.svg" alt="" />
                      </div>
                      <div className="swiper-button-next dholera-button">
                        <img src="/images/icon/right-arrow.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timelineSwiper">
                {/* {Swiper && SwiperSlide && ( */}
                <Swiper
                  className="swiper-container"
                  modules={[Navigation, Pagination, Autoplay, Keyboard, Mousewheel, FreeMode]}
                  observer={true}
                  observeParents={true}
                  slidesPerView={3}
                  spaceBetween={16}
                  freeMode={true}
                  navigation={{
                    prevEl: ".swiper-button-prev.dholera-button",
                    nextEl: ".swiper-button-next.dholera-button",
                  }}
                  breakpoints={{
                    1152: {
                      slidesPerView: 2.5,
                    },
                    767: {
                      slidesPerView: 1.15,
                    },
                    0: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {dholeraData.map((data, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={`inner-flex inner-flex-medium`
                        }
                        data-aos="fade-in"
                        data-aos-delay="300"
                        data-aos-duration="600"
                      >
                        <a
                          href={data.img}
                          data-fancybox="DholeratownshipFancybox2"
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   handleImageClick(data.img);
                          // }}
                          target="_self"
                          rel="noopener noreferrer"
                        >
                          <img src={data.img} alt="" />
                        </a>
                      </div>
                    </SwiperSlide>

                  ))}
                </Swiper>
                {/* )} */}
              </div>
            </div>
          </section>
          <section
            className="reecosys-template-section cp-update highlight-bg section-padding relative"
            id="reecosys-template-home-section-5"
          >
            <div className="inner-flex inner-flex-medium">
              <div className="main-container-fluid">
                <div className="inner-flex inner-flex-medium">
                  <div className="flex-row alend j-c-sb w100 cp-tab-col">
                    <div className="section-information inner-flex">
                      <div className="section-title">
                        <h2
                          className=""
                          data-aos="fade-up"
                          data-aos-delay="400"
                          data-aos-duration="600"
                        >
                          DHOLERA EXPRESSWAY CITY 1
                        </h2>
                      </div>
                    </div>
                    <div className="timeline-navigation flex-row alc">
                      <div className="swiper-button-prev construction-button">
                        <img src="/images/icon/left-arrow.svg" alt="" />
                      </div>
                      <div className="swiper-button-next construction-button">
                        <img src="/images/icon/right-arrow.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timelineSwiper">
                {/* {Swiper && SwiperSlide && ( */}
                <Swiper
                  className="swiper-container"
                  observer={true}
                  modules={[Navigation, Pagination, Autoplay, Keyboard, Mousewheel, FreeMode]}
                  observeParents={true}
                  slidesPerView={3}
                  spaceBetween={16}
                  freeMode={true}
                  navigation={{
                    prevEl: ".swiper-button-prev.construction-button",
                    nextEl: ".swiper-button-next.construction-button",
                  }}
                  breakpoints={{
                    1152: {
                      slidesPerView: 3,
                    },
                    767: {
                      slidesPerView: 2,
                    },
                    0: {
                      slidesPerView: 1.2,
                    },
                  }}
                >
                  {constructionData.map((data, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="inner-flex inner-flex-medium"
                        data-aos="fade-in"
                        data-aos-delay="300"
                        data-aos-duration="600"
                      >
                        <a
                          href={data.img}
                          data-fancybox="DholeraFancybox"
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   handleConstructionImageClick(data.img);
                          // }}
                          target="_self"
                          rel="noopener noreferrer"
                        >
                          <img src={data.img} alt="" />
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* )} */}
              </div>
            </div>
          </section>

          <section className="reecosys-template-section cp-update section-padding relative">
            <div className="inner-flex inner-flex-medium">
              <div className="main-container-fluid">
                <div className="inner-flex inner-flex-medium">
                  <div className="flex-row alend j-c-sb w100 cp-tab-col">
                    <div className="section-information inner-flex">
                      <div className="section-title">
                        <h2
                          className="secondary-color"
                          data-aos="fade-in"
                          data-aos-delay="400"
                          data-aos-duration="600"
                        >
                          DHOLERA EXPRESSWAY CITY TOWNSHIP ( II, III, IV)
                        </h2>
                      </div>
                    </div>
                    <div className="timeline-navigation flex-row alc">
                      <div className="swiper-button-prev constructiontownshipSwiper-button">
                        <img src="/images/icon/left-arrow.svg" alt="" />
                      </div>
                      <div className="swiper-button-next constructiontownshipSwiper-button">
                        <img src="/images/icon/right-arrow.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timelineSwiper">
                {/* {Swiper && SwiperSlide && ( */}
                <Swiper
                  className="swiper-container"
                  modules={[Navigation, Pagination, Autoplay, Keyboard, Mousewheel, FreeMode]}
                  observer={true}
                  observeParents={true}
                  slidesPerView={3}
                  spaceBetween={16}
                  freeMode={true}
                  navigation={{
                    prevEl: ".swiper-button-prev.constructiontownshipSwiper-button",
                    nextEl: ".swiper-button-next.constructiontownshipSwiper-button",
                  }}
                  breakpoints={{
                    1152: {
                      slidesPerView: 3,
                    },
                    767: {
                      slidesPerView: 2,
                    },
                    0: {
                      slidesPerView: 1.2,
                    },
                  }}
                >
                  {constructiontownshipData.map((data, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="inner-flex inner-flex-medium"
                        data-aos="fade-in"
                        data-aos-delay="300"
                        data-aos-duration="600"
                      >
                        <a
                          href={data.img}
                          data-fancybox="DholeratownshipFancybox"
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   handleTownshipImageClick(data.img);
                          // }}
                          target="_self"
                          rel="noopener noreferrer"
                        >
                          <img src={data.img} alt="" />
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* )} */}
              </div>
            </div>
          </section>
          <section
            className="reecosys-template-section cp-update highlight-bg section-padding relative"
            id="reecosys-template-home-section-5"
          >
            <div className="inner-flex inner-flex-medium">
              <div className="main-container-fluid">
                <div className="inner-flex inner-flex-medium">
                  <div className="flex-row alend j-c-sb w100 cp-tab-col">
                    <div className="section-information inner-flex">
                      <div className="section-title">
                        <h2
                          className=""
                          data-aos="fade-up"
                          data-aos-delay="700"
                          data-aos-duration="600"
                        >
                          Orange County/Olive Garden/Mulberry Park
                        </h2>
                      </div>
                    </div>
                    <div className="timeline-navigation flex-row alc">
                      <div className="swiper-button-prev oliveGarden-button">
                        <img src="/images/icon/left-arrow.svg" alt="" />
                      </div>
                      <div className="swiper-button-next oliveGarden-button">
                        <img src="/images/icon/right-arrow.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timelineSwiper">
                {/* {Swiper && SwiperSlide && ( */}
                <Swiper
                  className="swiper-container"
                  observer={true}
                  observeParents={true}
                  slidesPerView={3}
                  modules={[Navigation, Pagination, Autoplay, Keyboard, Mousewheel, FreeMode]}
                  spaceBetween={16}
                  freeMode={true}
                  navigation={{
                    prevEl: ".swiper-button-prev.oliveGarden-button",
                    nextEl: ".swiper-button-next.oliveGarden-button",
                  }}
                  breakpoints={{
                    1152: {
                      slidesPerView: 3,
                    },
                    767: {
                      slidesPerView: 2,
                    },
                    0: {
                      slidesPerView: 1.2,
                    },
                  }}
                >
                  {oliveGardenData.map((data, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="inner-flex inner-flex-medium"
                        data-aos="fade-in"
                        data-aos-delay="300"
                        data-aos-duration="600"
                      >
                        <a
                          href={data.img}
                          data-fancybox="DholeraFancybox2"
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   handleOliveGardenImageClick(data.img);
                          // }}
                          target="_self"
                          rel="noopener noreferrer"
                        >
                          <img src={data.img} alt="" />
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* )} */}
              </div>
            </div>
          </section>
          <section className="reecosys-template-section cp-update section-padding relative">
            <div className="inner-flex inner-flex-medium">
              <div className="main-container-fluid">
                <div className="inner-flex inner-flex-medium">
                  <div className="flex-row alend j-c-sb w100 cp-tab-col">
                    <div className="section-information inner-flex">
                      <div className="section-title">
                        <h2
                          className="secondary-color"
                          data-aos="fade-up"
                          data-aos-delay="400"
                          data-aos-duration="600"
                        >
                          Dholera International Airport City 1
                        </h2>
                      </div>
                    </div>
                    <div className="timeline-navigation flex-row alc">
                      <div className="swiper-button-prev Airport-button">
                        <img src="/images/icon/left-arrow.svg" alt="" />
                      </div>
                      <div className="swiper-button-next Airport-button">
                        <img src="/images/icon/right-arrow.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timelineSwiper">
                {/* {Swiper && SwiperSlide && ( */}
                <Swiper
                  className="swiper-container"
                  observer={true}
                  observeParents={true}
                  modules={[Navigation, Pagination, Autoplay, Keyboard, Mousewheel, FreeMode]}
                  slidesPerView={3}
                  spaceBetween={16}
                  freeMode={true}
                  navigation={{
                    prevEl: ".swiper-button-prev.Airport-button",
                    nextEl: ".swiper-button-next.Airport-button",
                  }}
                  breakpoints={{
                    1152: {
                      slidesPerView: 3,
                    },
                    767: {
                      slidesPerView: 2,
                    },
                    0: {
                      slidesPerView: 1.2,
                    },
                  }}
                >
                  {AirportData.map((data, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="inner-flex inner-flex-medium"
                        data-aos="fade-in"
                        data-aos-delay="300"
                        data-aos-duration="600"
                      >
                        <a
                          href={data.img}
                          data-fancybox="DholeratownshipFancybox22"
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   handleAirportImageClick(data.img);
                          // }}
                          target="_self"
                          rel="noopener noreferrer"
                        >
                          <img src={data.img} alt="" />
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* )} */}
              </div>
            </div>
          </section>
          <section
            className="reecosys-template-section cp-update highlight-bg section-padding relative"
            id="reecosys-template-home-section-5"
          >
            <div className="inner-flex inner-flex-medium">
              <div className="main-container-fluid">
                <div className="inner-flex inner-flex-medium">
                  <div className="flex-row alend j-c-sb w100 cp-tab-col">
                    <div className="section-information inner-flex">
                      <div className="section-title">
                        <h2
                          className=""
                          data-aos="fade-up"
                          data-aos-delay="400"
                          data-aos-duration="600"
                        >
                          Maple Garden
                        </h2>
                      </div>
                    </div>
                    <div className="timeline-navigation flex-row alc">
                      <div className="swiper-button-prev garden-button">
                        <img src="/images/icon/left-arrow.svg" alt="" />
                      </div>
                      <div className="swiper-button-next garden-button">
                        <img src="/images/icon/right-arrow.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timelineSwiper">
                {/* {Swiper && SwiperSlide && ( */}
                <Swiper
                  className="swiper-container"
                  observer={true}
                  observeParents={true}
                  slidesPerView={3}
                  modules={[Navigation, Pagination, Autoplay, Keyboard, Mousewheel, FreeMode]}
                  spaceBetween={16}
                  freeMode={true}
                  navigation={{
                    prevEl: ".swiper-button-prev.garden-button",
                    nextEl: ".swiper-button-next.garden-button",
                  }}
                  breakpoints={{
                    1152: {
                      slidesPerView: 3,
                    },
                    767: {
                      slidesPerView: 3,
                    },
                    0: {
                      slidesPerView: 1.2,
                    },
                  }}
                >
                  {gardenData.map((data, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="inner-flex inner-flex-medium"
                        data-aos="fade-in"
                        data-aos-delay="700"
                        data-aos-duration="600"
                      >
                        <a
                          href={data.img}
                          data-fancybox="DholeraFancybox3"
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   handleGardenImageClick(data.img);
                          // }}
                          target="_self"
                          rel="noopener noreferrer"
                        >
                          <img src={data.img} alt="" />
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* )} */}
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

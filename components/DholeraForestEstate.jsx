"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ReadMore from "components/ReadMore";
import WalkthroughVideo from "components/Walkthrough";
import rawProjectData from "data/projectList.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import {
  Pagination,
  Keyboard,
  Mousewheel,
  Autoplay,
  Navigation,
  FreeMode,
} from "swiper/modules";
// import InquiryForm from "components/InquiryForm";
import BottomStrip from "components/BottomStrip";
import "swiper/css";

export default function DholeraForestEstate({
  isAmenityOpen,
  setAmenityToggle,
  inquiryPopupObj,
  setInquiryPopupObj,
  inquiryPopup,
  setInquiryPopup,
  projectData,
  propertylist,
}) {
  const projectsArray = rawProjectData.list;

  const [countryFlag, setCountryFlag] = useState(false);
  const [projectDetail, setPropertyDetail] = useState(projectData || null);
  const [isMobilescreen, setMobileScreen] = useState(false);
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // ✅ Compute SEO data during render (SSR-friendly)
  const seoMetaData = projectDetail && {
    page_title: projectDetail.page_title || projectDetail.project_title,
    page_description: projectDetail.page_description,
    page_keywords: projectDetail.page_keywords,
    slug: projectDetail.slug,
    image: projectDetail.page_image_full
      ? projectDetail.page_image_full.includes("?")
        ? `${projectDetail.page_image_full}&w=1280&h=640`
        : `${projectDetail.page_image_full}?w=1280&h=640`
      : "/images/og-image.png ",
  };

  useEffect(() => {
    let dataToUse;
    let StaticData = {};
    // console.log(projectsArray);
    if (projectData) {
      dataToUse = projectData;
      StaticData = projectsArray.find(
        (p) => p.project_id == dataToUse.project_id
      );
    } else {
      dataToUse = propertylist.find(
        (project) => project.slug === "dholera-forest-estate"
      );
      if (dataToUse) {
        StaticData = projectsArray.find(
          (p) => p.project_id == dataToUse.project_id
        );
      }
    }
    if (dataToUse) {
      // setPropertyDetail({ ...dataToUse });
      setPropertyDetail({
        ...dataToUse,
        banners_mob: StaticData.banners_mob || [],
        total_area: StaticData.total_area || "",
        why_us: StaticData.why_us || [],
        why_us_img: StaticData.why_us_img || "",
        location_link: StaticData.location_link || "",
      });
    }
  }, [projectData, propertylist]);

  useEffect(() => {
    if (
      projectDetail &&
      projectDetail.banners_data &&
      projectDetail.banners_data.images &&
      projectDetail.banners_data.images.length > 0
    ) {
      const imgUrl = `${projectDetail.banners_data.images[0].image_web_full}&w=1920&h=1080&q=100`;
      const img = new Image();
      img.src = imgUrl;

      img.onload = () => {
        // optional delay to simulate $timeout in AngularJS
        setTimeout(() => {
          setIsBannerLoaded(true);
        }, 1000);
      };
    }
  }, [projectDetail]);

  useEffect(() => {
    let fancyboxInstance;
    if (window.innerWidth < 767) {
      setMobileScreen(true);
    }
    import("@fancyapps/ui").then(({ Fancybox }) => {
      Fancybox.bind("[data-fancybox=virtual-tour]", {
        type: "iframe", // explicitly define the content type
        Toolbar: false,
        smallBtn: true,
        iframe: {
          preload: false,
        },
      });
      Fancybox.bind("[data-fancybox=project-gallery-fancy]", {
        Carousel: {
          infinite: true,
        },
      });
    });
    return () => {
      import("@fancyapps/ui").then(({ Fancybox }) => {
        Fancybox.destroy();
      });
    };
  }, []);

  if (projectDetail) {
    return (
      <>
        {/* {seoMetaData && <Seo metaData={seoMetaData} />} */}

        {/* ng-click="country_code_click_close()" */}
        <div
          className="reecosys-main-wrapper dholera_forest"
          id="reecosys-main-wrapper"
        >
          <div className="relative ">
            <section
              className="reecosys-section reecosys-banner-section relative piramyd-banner-section relative pt0"
              id="reecosys-project-detail-section-1 piramyd-banner-section overflow_section"
            >
              <div className="banner-swiper homeBannerSwiper relative ">
                {projectDetail.banners_data.images.length > 0 && (
                  <Swiper
                    modules={[Pagination, Keyboard, Mousewheel, Autoplay]}
                    observer={true}
                    observeParents={true}
                    loop={true}
                    loopAdditionalSlides={0}
                    speed={1000}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      el: ".swiper-pagination.homeSwiperPagination",
                      clickable: true,
                    }}
                    grabCursor={false}
                    watchSlidesProgress={true}
                    keyboard={{ enabled: true }}
                    mousewheel={{ forceToAxis: true }}
                    className="hide-tab-mobile"
                  >
                    {projectDetail.banners_data.images.map(
                      (banner_data, index) => (
                        <SwiperSlide key={index}>
                          {banner_data.image_web_type == "image" &&
                            banner_data.image_web_full && (
                              <div className="project_banner_image relative overflow ">
                                <img
                                  src={`${banner_data.image_web_full}&h=1080&w=1903&q=100`}
                                  alt={projectDetail.project_title}
                                />
                                <div className="homeBannerOverlayOne hidden-xs"></div>
                                <div className="homeBannerOverlaytwo"></div>
                                <div
                                  className={`bannerAnimationOVerlay  ${isBannerLoaded ? "active" : ""
                                    } `}
                                ></div>
                              </div>
                            )}
                        </SwiperSlide>
                      )
                    )}
                  </Swiper>
                )}

                {projectDetail.banners_data.images.length > 0 && (
                  <div className="visible-tab-mobile ">
                    {projectDetail.banners_data.images.length > 0 && (
                      <Swiper
                        modules={[Pagination, Keyboard, Mousewheel, Autoplay]}
                        observer={true}
                        observeParents={true}
                        loop={true}
                        loopAdditionalSlides={0}
                        speed={1000}
                        autoplay={{
                          delay: 3000,
                          disableOnInteraction: false,
                        }}
                        pagination={{
                          el: ".swiper-pagination.detailSwiperPagination1",
                          clickable: true,
                        }}
                        grabCursor={false}
                        watchSlidesProgress={true}
                        keyboard={{ enabled: true }}
                        mousewheel={{ forceToAxis: true }}
                      >
                        {projectDetail.banners_mob &&
                          projectDetail.banners_mob.map(
                            (banner_data, index) => (
                              <SwiperSlide key={index}>
                                <div className="project_banner_image relative overflow ">
                                  <img
                                    src={banner_data.images}
                                    alt={projectDetail.project_title}
                                  />
                                  <div className="homeBannerOverlaytwo"></div>
                                  <div
                                    className={`bannerAnimationOVerlay  ${isBannerLoaded ? "active" : ""
                                      } `}
                                  ></div>
                                </div>
                              </SwiperSlide>
                            )
                          )}
                      </Swiper>
                    )}
                  </div>
                )}

                {projectDetail.banners_data.images.length > 0 && (
                  <div>
                    <div className="swiper-pagination detailSwiperPagination"></div>
                  </div>
                )}
                {projectDetail.banners_data.images.length > 0 && (
                  <div>
                    <div className="swiper-pagination  detailSwiperPagination1"></div>
                  </div>
                )}

                <div className="projectBannerFlex ">
                  <div className="inner-flex inner-flex-medium w100">
                    <div className="inner-flex inner-flex-zero">
                      {projectDetail.project_title && (
                        <div className="banner-title-small overflow_section w60">
                          <h1
                            className="white-color bold-fonts "
                            style={{ fontWeight: "700" }}
                            dangerouslySetInnerHTML={{
                              __html: projectDetail.project_title,
                            }}
                          ></h1>
                        </div>
                      )}

                      <div className="section-content overflow_section flex-row inner-flex-common inner-flex-mob j-c-c">
                        <div className="flex-row inner-flex-smallest alc">
                          <div className="common-icon">
                            <img
                              src="/images/icon/building.svg"
                              alt=""
                              className="filterIcon"
                            />
                          </div>
                          <div className="section-content">
                            <p className="white-color">
                              {" "}
                              {projectDetail.size_price}
                            </p>
                          </div>
                        </div>
                        <div className="flex-row inner-flex-smallest alc">
                          <div className="common-icon">
                            <img
                              src="/images/icon/area.svg"
                              alt=""
                              className="filterIcon"
                            />
                          </div>
                          <div className="section-content">
                            <p className="white-color">
                              {" "}
                              {projectDetail.total_area}
                            </p>
                          </div>
                        </div>
                        <div className="flex-row inner-flex-smallest alc">
                          <div className="common-icon">
                            <img
                              src="/images/icon/location.svg"
                              alt=""
                              className="filterIcon"
                            />
                          </div>
                          <div className="section-content">
                            <p className="white-color">
                              {" "}
                              {projectDetail.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="m0auto wfc">
                      {/* ng-click="inquire_popup_click(); inquiry_from_click();" */}
                      <div className="about-btn-home outline-div-button button-div ">
                        <button className="reecosys-template-button button-style-white white-text ">
                          <span className="material-symbols-outlined">
                            call
                          </span>
                          <p className="capitalize">Inquire Now</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {projectDetail.big_text_pain && (
              <section
                className="reecosys-section relative section-padding "
                id="reecosys-project-detail-section-2"
              >
                <div className="main-container">
                  <div className="flex-row inner-flex-tab inner-flex-medium section-padding pt0">
                    <div className="section-title flex40">
                      <h2 className="highlight-color  regular-fonts">
                        About <br className="hide-tab-mobile" />
                        Dholera Forest Estate
                      </h2>
                    </div>
                    <div className="inner-flex flex60 inner-flex-big  ">
                      <div className="mobile-flex">
                        {projectDetail.overview_title && (
                          <div className="section-information inner-flex inner-flex-common">
                            <div className="section-title">
                              <h2
                                data-aos="fade-in"
                                data-aos-delay="400"
                                data-aos-duration="600"
                              >
                                {projectDetail.overview_title}
                              </h2>
                            </div>

                            {projectDetail.big_text_pain && (
                              <div className="section-content  ">
                                <p
                                  data-aos="fade-in"
                                  data-aos-delay="500"
                                  data-aos-duration="600"
                                  dangerouslySetInnerHTML={{
                                    __html: projectDetail.project_title,
                                  }}
                                ></p>
                              </div>
                            )}
                            {projectDetail.amenities_image &&
                              projectDetail.highlights.length > 0 && (
                                <div
                                  data-aos="zoom-in"
                                  data-aos-delay="400"
                                  data-aos-duration="600"
                                >
                                  <img
                                    src={projectDetail.amenities_image}
                                    alt=""
                                    style={{ height: "100%;" }}
                                  />
                                </div>
                              )}

                            {projectDetail.rera_number && (
                              <div className="section-content  ">
                                <p className="capitalize gray-color">
                                  RERA : {projectDetail.rera_number}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        <div
                          className="flex-row alc  downloadDataFlex flex-wrap  "
                          data-aos-delay="700"
                          data-aos-duration="600"
                          data-aos={isMobilescreen ? "fade-in" : "fade-up"}
                        >
                          <div className="about-btn-home outline-div-button button-div ">
                            {/* ng-click="inquire_popup_click(); inquiry_from_click();" */}
                            <button className="reecosys-template-button button-style-secondary ">
                              <span className="material-symbols-outlined">
                                chat
                              </span>
                              <p className="capitalize">Inquire Now</p>
                            </button>
                          </div>
                          {projectDetail.document_other_data.length > 0 &&
                            projectDetail.document_other_data.map(
                              (data, index) => (
                                <div
                                  className="about-btn-home outline-div-button button-div"
                                  key={index}
                                >
                                  {/* ng-click="inquire_popup_click(); inquiry_from_click(data.type);" */}
                                  <button className="reecosys-template-button button-style-secondary-outline ">
                                    <span className="material-symbols-outlined">
                                      download
                                    </span>
                                    <p className="capitalize">
                                      {`${isMobilescreen ? "" : "Download "}${data.type || ""
                                        }`}
                                    </p>
                                  </button>
                                </div>
                              )
                            )}
                          {/* ng-click="inquire_popup_click();    inquiry_from_click('legal-document');" */}
                          <div className="about-btn-home outline-div-button button-div  ">
                            <button className="reecosys-template-button button-style-secondary-outline ">
                              <span className="material-symbols-outlined">
                                download
                              </span>
                              <p className="capitalize">
                                {`${isMobilescreen ? "" : "Download "
                                  }Legal Document`}
                              </p>
                            </button>
                          </div>
                          <div className="about-btn-home outline-div-button button-div  ">
                            {/* ng-click="availableUnitClick(projectDetail.category , projectDetail.project_id )" */}
                            <Link href="book_plot/">
                              <button className="reecosys-template-button button-style-secondary-outline ">
                                <span className="material-symbols-outlined">
                                  apartment
                                </span>
                                <p className="capitalize">Book Plot</p>
                              </button>
                            </Link>
                          </div>
                          <div className="about-btn-home outline-div-button button-div">
                            {/* ng-click="availableUnitClick('Residential' , 814 )"> */}
                            <Link href="book_plot/">
                              <button className="reecosys-template-button button-style-secondary-outline ">
                                <span className="material-symbols-outlined">
                                  apartment
                                </span>
                                <p className="capitalize">Book Plot Phase 2</p>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="section-padding foresthighlight-flex">
                    {projectDetail.highlights.length > 0 &&
                      projectDetail.highlights.map((data, index) => (
                        <div
                          key={index}
                          className=" inner-flex   highlight-flex "
                          data-aos="fade-in"
                          data-aos-duration="1000"
                          data-aos-delay="800"
                        >
                          <div
                            className="section-title-large"
                            style={{ minWidth: "fit-content" }}
                          >
                            <h2 className=" capitalize medium-fonts">
                              {data.name}
                            </h2>
                          </div>
                          <div className="section-paragraph">
                            <p className="highlight-color  regular-fonts capitalize">
                              {data.tag_line}
                            </p>
                          </div>
                        </div>
                      ))}
                    {projectDetail.amenities_image &&
                      !projectDetail.highlights.length > 0 && (
                        <div
                          data-aos="zoom-in"
                          data-aos-delay="400"
                          data-aos-duration="600"
                        >
                          <img
                            src="{{projectDetail.amenities_image}}"
                            alt=""
                            style={{ height: "100%" }}
                          />
                        </div>
                      )}
                    {!projectDetail.amenities_image &&
                      !projectDetail.highlights.length > 0 && (
                        <div
                          data-aos="fade-in"
                          data-aos-delay="400"
                          data-aos-duration="600"
                        >
                          <img
                            src="https://dummyimage.com/800x690/c1c1c1/c1c1c1"
                            alt=""
                          />
                        </div>
                      )}
                  </div>
                </div>
              </section>
            )}

            {projectDetail.virtual_data.length > 0 &&
              projectDetail.virtual_data
                .filter((video) => video.type == "walk-through")
                .map((video, index) => (
                  <section
                    key={index}
                    className="reecosys-section relative"
                    data-aos-delay="400"
                    data-aos-duration="1000"
                    id="reecosys-project-detail-section-4"
                  >
                    <div>
                      <div className="inner-flex">
                        <div className="walkthrough-project-thumb relative">
                          <div className="walk-thumbnail-image relative">
                            <WalkthroughVideo virtualDataArray={video.url} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
            {projectDetail.gallery_data[0].image.length > 0 && (
              <section
                id="reecosys-project-detail-section-5"
                className="section-padding-half  highlight-bg"
              >
                {projectDetail.gallery_data
                  .filter((gallery) => gallery.image.length > 0)
                  .map((gallery, index) => (
                    <div
                      key={index}
                      className="reecosys-section"
                      id="reecosys-detail-section-gallery"
                    >
                      <div className="inner-flex inner-flex-medium">
                        <div className="main-container">
                          <div
                            className="flex-row alc j-c-sb relative"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay="400"
                          >
                            <div className="inner-flex inner-flex-medium">
                              {gallery.title && (
                                <div className="section-title white-color">
                                  <h2 className=" regular-fonts white-color">
                                    {gallery.title}
                                  </h2>
                                </div>
                              )}
                              {gallery.tag_line && (
                                <div className="section-information inner-flex ">
                                  <div className="section-paragraph">
                                    <p
                                      className="white-color"
                                      data-aos="fade-up"
                                      data-aos-delay="400"
                                      data-aos-duration="600"
                                    >
                                      {gallery.tag_line}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {projectDetail.virtual_data.length > 0 &&
                                !isMobilescreen &&
                                projectDetail.virtual_data
                                  .filter(
                                    (video) => video.type == "virtual-tour"
                                  )
                                  .map((video, index) => (
                                    <div key={index} className="web-3d-icon">
                                      <a
                                        className="fancybox"
                                        data-fancybox="virtual-tour"
                                        data-type="iframe"
                                        data-src={video.url}
                                        href="javascript:void(0)"
                                      >
                                        <button
                                          className="reecosys-template-button button-blackborder border-black "
                                          data-aos="fade-in"
                                          data-aos-duration="1000"
                                          data-aos-delay="500"
                                        >
                                          <p>
                                            <span className="bold-fonts">
                                              360&deg;
                                            </span>{" "}
                                            Virtual Tour
                                          </p>
                                        </button>
                                      </a>
                                    </div>
                                  ))}
                            </div>
                            <div className="visible-tab-mobile">
                              <div className="gallerySwiper-swiper-btn flex-row inner-flex-common alc">
                                <div
                                  className="swiper-button-prev gallerySwiper-button swiper-button-disabled"
                                  tabIndex="0"
                                  role="button"
                                  aria-label="Previous slide"
                                  aria-disabled="true"
                                >
                                  <img
                                    src="/images/icon/left-arrow.svg"
                                    alt=""
                                  />
                                </div>
                                <div
                                  className="swiper-button-next gallerySwiper-button"
                                  tabIndex="0"
                                  role="button"
                                  aria-label="Next slide"
                                  aria-disabled="false"
                                >
                                  <img
                                    src="/images/icon/right-arrow.svg"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="project-gallery-outer">
                          <div className="gallery-swiper-container">
                            <div className="relative">
                              <Swiper
                                modules={[Navigation, FreeMode]}
                                observer={true}
                                observeParents={true}
                                slidesPerView={1}
                                spaceBetween={16}
                                freeMode={true}
                                navigation={{
                                  prevEl:
                                    ".swiper-button-prev.gallerySwiper-button",
                                  nextEl:
                                    ".swiper-button-next.gallerySwiper-button",
                                }}
                                breakpoints={{
                                  767: {
                                    slidesPerView: 1.1,
                                    spaceBetween: 48,
                                  },
                                }}
                                className="gallerySwiper"
                              >
                                {gallery.image.map((gallaryImgData, index) => (
                                  <SwiperSlide key={index}>
                                    <a
                                      data-fancybox="project-gallery-fancy"
                                      href={gallaryImgData.image_full}
                                      className="w100"
                                      target="_self"
                                      rel="noreferrer"
                                    >
                                      <div className="overflow project_gallery_hover relative">
                                        <img
                                          src={`${gallaryImgData.image}&w=1400&h=600&q=100`}
                                          alt={
                                            projectDetail?.size_price ||
                                            "Gallery image"
                                          }
                                          className="image-cover aos fadeIn"
                                          data-aos="fade-in"
                                          data-aos-duration="1000"
                                          data-aos-delay={index * 300}
                                        />
                                        <div className="project_gallery_overlay"></div>

                                        {gallaryImgData.title && (
                                          <div className="smallest-font galleryFonts">
                                            <p className="capitalize white-color">
                                              { }
                                            </p>
                                          </div>
                                        )}

                                        <div className="gallery-zoomicon hide-tab-mobile">
                                          <img
                                            src="/images/icon/gallery-zoomicon.svg"
                                            alt="Zoom"
                                          />
                                        </div>
                                      </div>
                                    </a>
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                              <div className="gallerySwiper-swiper-btn hide-tab-mobile inner-flex inner-flex-common alc">
                                <div
                                  className="swiper-button-prev gallerySwiper-button swiper-button-disabled"
                                  tabIndex="0"
                                  role="button"
                                  aria-label="Previous slide"
                                  aria-disabled="true"
                                >
                                  <img
                                    src="/images/icon/left-arrow.svg"
                                    alt=""
                                  />
                                </div>
                                <div
                                  className="swiper-button-next gallerySwiper-button"
                                  tabIndex="0"
                                  role="button"
                                  aria-label="Next slide"
                                  aria-disabled="false"
                                >
                                  <img
                                    src="/images/icon/right-arrow.svg"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {projectDetail.virtual_data.length > 0 &&
                          isMobilescreen && (
                            <div className="main-container">
                              {projectDetail.virtual_data
                                .filter((video) => video.type == "virtual-tour")
                                .map((video, index) => (
                                  <div className="w100" key={index}>
                                    <a
                                      className="fancybox"
                                      data-fancybox="virtual-tour"
                                      data-type="iframe"
                                      data-src={video.url}
                                      href="javascript:void(0)"
                                    >
                                      <button
                                        className="reecosys-template-button button-blackborder border-black  w100"
                                        data-aos="fade-in"
                                        data-aos-duration="600"
                                        data-aos-delay="600"
                                      >
                                        <p>
                                          <span className="bold-fonts">
                                            360&deg;
                                          </span>{" "}
                                          Virtual Tour
                                        </p>
                                      </button>
                                    </a>
                                  </div>
                                ))}
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
              </section>
            )}

            {projectDetail.why_us && projectDetail.why_us.length > 0 && (
              <section
                className="reecosys-template-about-section-6 reecosys-template-section  section-padding relative"
                id="reecosys-template-about-section-6"
              >
                <div className="main-container inner-flex inner-flex-big">
                  <div className=" inner-flex inner-flex-medium">
                    <div className="section-information inner-flex ">
                      <div className="section-title ">
                        <h2
                          className="highlight-color"
                          data-aos="fade-in"
                          data-aos-delay="400"
                          data-aos-duration="600"
                        >
                          Why Invest in {projectDetail.project_title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="flex-row inner-flex-mob alc inner-flex-big">
                    <div className="flex60">
                      <img src={projectDetail.why_us_img} alt="" />
                    </div>

                    <div className="detail-accordion flex40" id="accordion">
                      <div className="">
                        {projectDetail.why_us.map((why_usData, index) => (
                          <div
                            key={index}
                            className="accordian-title accordion-block"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={index * 200}
                          >
                            <div
                              className={`flex-row j-c-sb alc w100 accordion_click accordion_click_relative 
                                                        ${activeIndex ==
                                  why_usData.title
                                  ? "active"
                                  : ""
                                } `}
                              onClick={() => {
                                toggleAccordion(why_usData.title);
                              }}
                            >
                              <div className="w100 section-paragraph">
                                <p className=" medium-fonts">
                                  {why_usData.title}
                                </p>
                              </div>
                              <div className="accordian-icon">
                                <img
                                  src="/images/icon/minus.svg"
                                  alt=""
                                  className="minusimg"
                                />
                                <img
                                  src="/images/icon/plus.svg"
                                  alt=""
                                  className="plusimg"
                                />
                              </div>
                            </div>

                            <div
                              className={`content_accordian section-content accordion-dec-padding w100 ${activeIndex == why_usData.title ? "active" : ""
                                } `}
                              style={{
                                opacity:
                                  activeIndex == why_usData.title ? "1" : "0",
                              }}
                            >
                              <p
                                className="secondary-color"
                                dangerouslySetInnerHTML={{
                                  __html: why_usData.desc,
                                }}
                              ></p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section
              className="reecosys-template-section section-padding  relative"
              id="reecosys-template-home-section-9"
            >
              <div className="main-container inner-flex inner-flex-medium">
                <div className="features-grid">
                  <div className="inner-flex inner-flex-medium">
                    <div className="section-information inner-flex ">
                      <div className="specification-bg-img">
                        <img src="/images/icon/features-img.jpg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="inner-flex inner-flex-small">
                    <div className="section-title">
                      <h2 className="highlight-color">Features</h2>
                    </div>
                    <div
                      className="faqAccordion"
                      data-aos="fade-in"
                      data-aos-delay="500"
                      data-aos-duration="600"
                      id="accordion"
                    >
                      {projectDetail.specifications.map(
                        (specification, index) => (
                          <div
                            className="faqAccordionBlock accordion-block"
                            key={index}
                          >
                            <div
                              className={`accordion_click flex-row alc j-c-sb section-paragraph ${activeIndex == specification.title
                                ? "active"
                                : ""
                                } `}
                              onClick={() => {
                                toggleAccordion(specification.title);
                              }}
                            >
                              <p>{specification.title}</p>
                              <span className="material-symbols-outlined secondary-color plus">
                                add
                              </span>
                              <span className="material-symbols-outlined secondary-color minus">
                                remove
                              </span>
                            </div>
                            <div
                              className={`content_accordian section-content ${activeIndex == specification.title
                                ? "active"
                                : ""
                                } `}
                              style={{
                                opacity:
                                  activeIndex == specification.title
                                    ? "1"
                                    : "0",
                              }}
                            >
                              <ul
                                className="inner-flex inner-flex-common features-ul"
                                dangerouslySetInnerHTML={{
                                  __html: specification.description,
                                }}
                              ></ul>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {projectDetail.amenities_data && (
              <section
                className="reecosys-section section-padding  relative"
                id="reecosys-project-detail-section-6"
              >
                <div className="main-container">
                  <div className="inner-flex inner-flex-medium ">
                    <div className="flex-row alend j-c-sb w100 ">
                      <div className="section-title">
                        <h2 className=" highlight-color ">Amenities</h2>
                      </div>
                    </div>

                    <div
                      className="amenities-grid dholera-forest-amenities"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay="600"
                    >
                      {projectDetail.amenities_data.map(
                        (amenities, index) =>
                          index < 8 && (
                            <div key={index}>
                              <div className="amenities-icon ">
                                <img
                                  src={amenities.icon}
                                  alt={projectDetail.project_title}
                                />
                              </div>
                              <div className="section-paragraph">
                                <p className="capitalize ">
                                  {amenities.amenity}
                                </p>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                    <div
                      className="wfc m0auto"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay="700"
                    >
                      {projectDetail.amenities_data.length > 8 && (
                        <div className="">
                          {/* ng-click="amenityClick()" */}
                          <button
                            className={`reecosys-template-button button-style-secondary ${isMobilescreen ? "w100" : ""
                              } `}
                            onClick={() => {
                              setAmenityToggle(true);
                            }}
                          >
                            <p className="capitalize">View All Amenities</p>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section
              className="reecosys-section section-padding relative"
              id="reecosys-project-detail-section-8"
            >
              <div className="main-container">
                <div className="inner-flex inner-flex-medium">
                  <div className="section-title">
                    <h2 className="highlight-color ">
                      {projectDetail.location_title}
                    </h2>
                  </div>
                  {projectDetail.location_tag_line && (
                    <div className="section-information inner-flex ">
                      <div className="section-paragraph">
                        <p
                          data-aos="fade-in"
                          data-aos-delay="400"
                          data-aos-duration="600"
                        >
                          {projectDetail.location_tag_line}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="two-grid inner-flex-tab inner-flex-medium revs-col-tab">
                    <div className="location-4grid  inner-flex-mob inner-flex-small">
                      <div className="inner-flex inner-flex-smallest ">
                        <div className="flex-row alc">
                          <div className="common-icon">
                            <img src="/images/icon/MapPinArea.svg" alt="" />
                          </div>
                          <div className="section-content">
                            <p>Site Address</p>
                          </div>
                        </div>
                        <div className="section-paragraph">
                          <a href={projectDetail.location_link} target="_blank">
                            <p>
                              Dholera Forest Estate By SmartHomes, Pachchham,
                              Gujarat 382465
                            </p>
                          </a>
                        </div>
                      </div>
                      <div className="inner-flex inner-flex-smallest ">
                        <div className="flex-row alc">
                          <div className="common-icon">
                            <img src="/images/icon/email.svg" alt="" />
                          </div>
                          <div className="section-content">
                            <p>Email Address</p>
                          </div>
                        </div>
                        <div className="section-paragraph wfc">
                          <a
                            href="mailto:info@smarthomesinfra.com"
                            target="_blank"
                          >
                            <p>info@smarthomesinfra.com</p>
                          </a>
                        </div>
                      </div>
                      <div className="inner-flex inner-flex-smallest ">
                        <div className="flex-row alc">
                          <div className="common-icon">
                            <img src="/images/icon/PhoneCallblack.svg" alt="" />
                          </div>
                          <div className="section-content">
                            <p>Phone Number</p>
                          </div>
                        </div>
                        <div className="section-paragraph wfc">
                          <a href="tel:+917096961250" target="_blank">
                            <p>+91 70969 61250</p>
                          </a>
                        </div>
                      </div>
                      <div style={{ marginTop: "2rem" }}>
                        <a href={projectDetail.location_link} target="_blank">
                          <button className="reecosys-template-button button-style-secondary ">
                            <p className="">View On Map</p>
                          </button>
                        </a>
                      </div>
                    </div>

                    {projectDetail.map_iframe && (
                      <div className="project-map-iframe relative">
                        <iframe
                          src={projectDetail.map_iframe}
                          allowFullScreen=""
                          className="lazyload"
                          data-aos="fade-in"
                          data-aos-duration="1s"
                          data-aos-delay="0.6s"
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
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
                    {/* <InquiryForm
                      pageDetail={projectDetail}
                      countryFlag={countryFlag}
                      setCountryFlag={setCountryFlag}
                    /> */}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div
          className={`click-overlay ${isAmenityOpen ? "active" : ""}`}
          onClick={() => {
            setAmenityToggle(false);
          }}
        ></div>
        <div className={`amenities_popup ${isAmenityOpen ? "active" : ""} `}>
          <div className="relative">
            <div
              className="amenities-close-icon"
              onClick={() => {
                setAmenityToggle(false);
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </div>
            <div className="all-amenities-grid-detail inner-flex inner-flex-medium">
              <div className="">
                {projectDetail.amenities_title && (
                  <div className="section-content ">
                    <p className="title-color capitalize">
                      {projectDetail.amenities_title}
                    </p>
                  </div>
                )}
                {projectDetail.amenities_tagline && (
                  <div className="section-title">
                    <h2>{projectDetail.amenities_tagline}</h2>
                  </div>
                )}
              </div>
              <div className="all-amenites-list">
                <ul>
                  {projectDetail.amenities_data.map((amenities, index) => (
                    <li key={index} className="flex-row alc">
                      <div className="amenities-icon ">
                        <img
                          src={amenities.icon}
                          alt={projectDetail.project_title}
                          className="lazyload"
                        />
                      </div>
                      <div className="amenities-text">
                        <p>{amenities.amenity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <BottomStrip
          projectDetail={projectDetail}
          isAmenityOpen={isAmenityOpen}
          inquiryPopup={inquiryPopup}
          setInquiryPopup={setInquiryPopup}
          isMobilescreen={isMobilescreen}
          setInquiryPopupObj={setInquiryPopupObj}
        />
      </>
    );
  } else {
    return <h1>Please Wait</h1>;
  }
}

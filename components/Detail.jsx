"use client"
import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
import Link from "next/link";
// import "public/styles/Detail.css"
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Keyboard,
  Mousewheel,
  Autoplay,
  Navigation,
  FreeMode,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import rawProjectData from "data/projectList.json";
import { openInquiry, setProjectDetail, setThankYouData } from '../store/inquirySlice'
import { useDispatch } from 'react-redux'
// import InquiryForm from "components/InquiryForm";
import BottomStrip from "components/BottomStrip";
import InquiryForm from "./InquiryForm";
export default function Detail({
  // isAmenityOpen,
  // setAmenityToggle,
  // inquiryPopupObj,
  setInquiryPopupObj,
  inquiryPopup,
  setInquiryPopup,
  projectDetail,
  propertylist,
  projectListJson
}) {
  // console.log(projectDetail)
  const projectsArray = rawProjectData.list;
  const dispatch = useDispatch()
  // const { slug } = useParams();
  // const navigate = useNavigate();
  const [countryFlag, setCountryFlag] = useState(false);
  // const [projectDetail, setPropertyDetail] = useState(projectData || null);
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);
  const [isMobilescreen, setMobileScreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isAmenityOpen, setAmenityToggle] = useState(false);
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  const matchedProject = projectListJson.find(
    (item) => item.project_id == projectDetail.project_id
  );
  useEffect(() => {
    let dataToUse;
    let StaticData = {};
    // if (projectDetail && projectDetail.slug === slug) {
    //   dataToUse = projectDetail;
    // } else {
    //   dataToUse = propertylist.find((project) => project.slug === slug);
    // }
    if (dataToUse) {
      StaticData =
        projectsArray.find((p) => p.project_id == dataToUse.project_id) || {};
      setPropertyDetail({
        ...dataToUse,
        banners_mob: StaticData.banners_mob || [],
        total_area: StaticData.total_area || "",
        why_us: StaticData.why_us || [],
        why_us_img: StaticData.why_us_img || "",
        location_link: StaticData.location_link || "",
      });
    }
  }, [projectDetail, propertylist]);
  const bannerImages = projectDetail?.banners_data?.images || [];
  const mobileBanners = projectDetail?.banners_mob || [];
  const hasMultipleImages = bannerImages?.length > 1;
  const hasSingleImage = bannerImages?.length === 1;
  const hasMobileImages = mobileBanners[0]?.images;
  useEffect(() => {
    if (
      projectDetail &&
      projectDetail.banners_data &&
      projectDetail.banners_data.images &&
      projectDetail.banners_data.images?.length > 0
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
    const shouldLockScroll = inquiryPopup || isAmenityOpen;
    document.body.style.overflow = shouldLockScroll ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [inquiryPopup, isAmenityOpen]);
  useEffect(() => {
    let fancyboxInstance;
    if (window.innerWidth < 767) {
      setMobileScreen(true);
    }
    import("@fancyapps/ui").then(({ Fancybox }) => {
      fancyboxInstance = Fancybox.bind(
        "[data-fancybox=project-gallery-fancy]",
        {
          Carousel: {
            infinite: true,
          },
        }
      );
      fancyboxInstance = Fancybox.bind(
        "[data-fancybox=project-gallery-fancy2]",
        {
          Carousel: {
            infinite: true,
          },
        }
      );
      Fancybox.bind("[data-fancybox=virtual-tour]", {
        type: "iframe", // explicitly define the content type
        Toolbar: false,
        smallBtn: true,
        iframe: {
          preload: false,
        },
      });
      Fancybox.bind("[data-fancybox=walkthrough-fancy]", {
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
  // if (projectDetail) {
  // return (
  //     <>
  //         <h1>
  //             Hello From {projectDetail.project_title}
  //         </h1>
  //     </>
  // )
  return (
    <>
      {/* {seoMetaData && <Seo metaData={seoMetaData} />} */}
      <div
        className="reecosys-main-wrapper"
        id="reecosys-main-wrapper"
        onClick={() => {
          setCountryFlag(false);
        }}
        style={{ overflow: 'hidden' }}
      >
        <div className="relative ">
          {bannerImages?.length > 0 && (
            <section
              id="reecosys-project-detail-section-1"
              className="reecosys-section reecosys-banner-section relative piramyd-banner-section pt0 overflow_section"
            >
              <div className="banner-swiper homeBannerSwiper relative">
                {/* Swiper for desktop view - multiple images */}
                {hasMultipleImages && (
                  <Swiper
                    modules={[Pagination, Keyboard, Mousewheel, Autoplay]}
                    loop
                    speed={1000}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      el: ".swiper-pagination.detailSwiperPagination",
                      clickable: true,
                    }}
                    keyboard={{ enabled: true }}
                    mousewheel={{ forceToAxis: true }}
                    className="hide-tab-mobile"
                  >
                    {bannerImages.map((banner, index) =>
                      banner.image_web_type === "image" &&
                        banner.image_web_full ? (
                        <SwiperSlide key={index}>
                          <div className="project_banner_image relative overflow">
                            <img
                              src={`${banner.image_web_full}&h=1080&w=1903&q=100`}
                              alt={projectDetail.project_title}
                            />
                            <div className="homeBannerOverlayOne hidden-xs"></div>
                            <div className="homeBannerOverlaytwo"></div>
                            <div
                              className={`bannerAnimationOVerlay ${isBannerLoaded ? "active" : ""
                                }`}
                            />
                          </div>
                        </SwiperSlide>
                      ) : null
                    )}
                  </Swiper>
                  // <>Swiper Here</>
                )}
                {/* Mobile view - multiple images */}
                {hasMultipleImages && (
                  <div className="visible-tab-mobile">
                    {hasMobileImages ? (
                      <Swiper
                        modules={[Pagination, Autoplay]}
                        loop
                        autoplay={{ delay: 3000 }}
                        className="mobileSwiper"
                      >
                        {mobileBanners.map((banner, index) =>
                          banner.images ? (
                            <SwiperSlide key={index}>
                              <div className="project_banner_image relative overflow">
                                <img
                                  src={banner.images}
                                  alt={projectDetail.project_title}
                                />
                                <div className="homeBannerOverlaytwo"></div>
                                <div
                                  className={`bannerAnimationOVerlay ${isBannerLoaded ? "active" : ""
                                    }`}
                                />
                              </div>
                            </SwiperSlide>
                          ) : null
                        )}
                      </Swiper>
                    ) : (
                      <Swiper
                        modules={[Pagination, Autoplay]}
                        loop
                        autoplay={{ delay: 3000 }}
                        className="mobileSwiper"
                      >
                        {bannerImages.map((banner, index) =>
                          banner.image_web_type === "image" &&
                            banner.image_web_full ? (
                            <SwiperSlide key={index}>
                              <div className="project_banner_image relative overflow">
                                <img
                                  src={`${banner.image_web_full}&h=800&w=600&q=100`}
                                  alt={projectDetail.project_title}
                                />
                                <div className="homeBannerOverlaytwo"></div>
                                <div
                                  className={`bannerAnimationOVerlay ${isBannerLoaded ? "active" : ""
                                    }`}
                                />
                              </div>
                            </SwiperSlide>
                          ) : null
                        )}
                      </Swiper>
                    )}
                  </div>
                )}
                {/* Pagination dots */}
                {hasMultipleImages && (
                  <>
                    <div className="swiper-pagination detailSwiperPagination"></div>
                    <div className="swiper-pagination detailSwiperPagination1"></div>
                    <div className="swiper-pagination detailSwiperPagination2"></div>
                  </>
                )}
                {/* Single image desktop */}
                {hasSingleImage &&
                  bannerImages.map((banner, index) =>
                    banner.image_web_type === "image" &&
                      banner.image_web_full ? (
                      <div className="hide-tab-mobile" key={index}>
                        <div className="project_banner_image relative overflow">
                          <img
                            src={`${banner.image_web_full}&h=1080&w=1903&q=100`}
                            alt={projectDetail.project_title}
                          />
                          <div className="homeBannerOverlay detail-overlay"></div>
                          <div
                            className={`bannerAnimationOVerlay ${isBannerLoaded ? "active" : ""
                              }`}
                          />
                        </div>
                      </div>
                    ) : null
                  )}
                {/* Single image mobile */}
                {hasSingleImage && (
                  <div className="visible-tab-mobile">
                    {!hasMobileImages &&
                      bannerImages.map((banner, index) =>
                        banner.image_web_type === "image" &&
                          banner.image_web_full ? (
                          <div key={index}>
                            <div className="project_banner_image relative overflow">
                              <img
                                src={`${banner.image_web_full}&h=1080&w=1903&q=100`}
                                alt={projectDetail.project_title}
                              />
                              <div className="homeBannerOverlay detail-overlay"></div>
                              <div
                                className={`bannerAnimationOVerlay ${isBannerLoaded ? "active" : ""
                                  }`}
                              />
                            </div>
                          </div>
                        ) : null
                      )}
                    {hasMobileImages &&
                      mobileBanners.map((banner, index) =>
                        banner.images ? (
                          <div key={index}>
                            <div className="project_banner_image relative overflow">
                              <img
                                src={banner.images}
                                alt={projectDetail.project_title}
                              />
                              <div className="homeBannerOverlaytwo"></div>
                              <div
                                className={`bannerAnimationOVerlay ${isBannerLoaded ? "active" : ""
                                  }`}
                              />
                            </div>
                          </div>
                        ) : null
                      )}
                  </div>
                )}
                {/* Project Info Overlay */}
                {(projectDetail.banner_data?.title ||
                  projectDetail.size_price ||
                  projectDetail.location ||
                  projectDetail.status ||
                  (matchedProject?.total_area && matchedProject.total_area.trim() !== '')) && (
                    <div className="projectBannerFlex">
                      <div className="inner-flex w100">
                        <div className="section-content">
                          <p className="statusTag uppercase white-color light-fonts relative wfc">
                            {projectDetail.status === "under construction"
                              ? "Ongoing"
                              : projectDetail.status}
                          </p>
                        </div>
                        {projectDetail.project_title && (
                          <div className="section-title overflow_section w60">
                            <h1
                              className="white-color"
                              style={{ fontWeight: 700 }}
                              dangerouslySetInnerHTML={{
                                __html: projectDetail.project_title,
                              }}
                            />
                          </div>
                        )}
                        <div className="section-content overflow_section">
                          <p
                            className="capitalize white-color bold-fonts"
                            style={{ lineHeight: 2 }}
                          >
                            {projectDetail.size_price && (
                              <>
                                {projectDetail.size_price}
                                <br className="visible-xs" />
                                <span className="white-color bold-fonts hidden-xs">
                                  &nbsp; | &nbsp;
                                </span>
                              </>
                            )}
                            {matchedProject?.total_area && matchedProject.total_area.trim() !== '' && (
                              <>
                                {matchedProject.total_area}
                                <br className="visible-xs" />
                                <span className="white-color bold-fonts hidden-xs">
                                  &nbsp; | &nbsp;
                                </span>
                              </>
                            )}
                            {projectDetail.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </section>
          )}
          {projectDetail.big_text_pain && (
            <section
              className="reecosys-section relative section-padding "
              id="reecosys-project-detail-section-2"
            >
              <div className="main-container-fluid">
                <div className="inner-flex inner-flex-medium">
                  <div className="link-font-size">
                    <p className=" uppercase bold-fonts">About</p>
                  </div>
                  <div className="two-grid  inner-flex-medium inner-flex-tab revs-col-tab">
                    <div className="mobile-flex">
                      {projectDetail.overview_title && (
                        <div className="section-information inner-flex inner-flex-common">
                          <div className="section-title">
                            <h2
                              data-aos="fade-top"
                              data-aos-delay="400"
                              data-aos-duration="600"
                            >
                              {projectDetail.overview_title}
                            </h2>
                          </div>
                          {projectDetail.big_text_pain && (
                            <div className="section-content  ">
                              <p
                                data-aos="fade-top"
                                data-aos-delay="500"
                                data-aos-duration="600"
                                dangerouslySetInnerHTML={{
                                  __html: projectDetail.big_text_pain,
                                }}
                              ></p>
                            </div>
                          )}
                          {projectDetail.amenities_image &&
                            projectDetail.highlights?.length > 0 && (
                              <div
                                data-aos="zoom-in"
                                data-aos-delay="400"
                                data-aos-duration="600"
                              >
                                <img
                                  src={projectDetail.amenities_image}
                                  alt=""
                                  style={{ height: "100%" }}
                                />
                              </div>
                            )}
                          {!projectDetail.amenities_image &&
                            Array.isArray(projectDetail.highlights) &&
                            projectDetail.highlights.length > 0 &&
                            Array.isArray(projectDetail.gallery_data) &&
                            projectDetail.gallery_data.length > 0 &&
                            Array.isArray(projectDetail.gallery_data[0].image) &&
                            projectDetail.gallery_data[0].image.length > 0 &&
                            projectDetail.gallery_data[0].image[0].image && (
                              <div
                                data-aos="fade-top"
                                data-aos-delay="400"
                                data-aos-duration="600"
                              >
                                <img
                                  src={`${projectDetail.gallery_data[0].image[0].image}&h=800&w=700&q=100`}
                                  alt=""
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
                        className="flex-row alc  downloadDataFlex flex-wrap "
                        data-aos={isMobilescreen ? "fade-top" : "fade-in"}
                        data-aos-delay="0.7s"
                        data-aos-duration="600"
                      >
                        <div className="about-btn-home outline-div-button button-div " onClick={() => {
                          dispatch(openInquiry())
                        }}>
                          {/* ng-click="inquire_popup_click(); inquiry_from_click();" */}
                          <button className="reecosys-template-button button-style-secondary ">
                            <span className="material-symbols-outlined">
                              chat
                            </span>
                            <p className="capitalize">Inquire Now</p>
                          </button>
                        </div>
                        {projectDetail.document_other_data?.length > 0 &&
                          projectDetail.document_other_data.map(
                            (data, index) => (
                              <div
                                key={index}
                                className="about-btn-home outline-div-button button-div  "
                              >
                                {/* ng-click="inquire_popup_click(); inquiry_from_click(data.type);" */}
                                <button className="reecosys-template-button button-style-secondary-outline " onClick={() => {
                                  dispatch(openInquiry())
                                }}>
                                  <span className="material-symbols-outlined">
                                    download
                                  </span>
                                  <p className="capitalize">
                                    {isMobilescreen ? "" : "Download "}
                                    {data.type}
                                  </p>
                                </button>
                              </div>
                            )
                          )}
                        {(projectDetail.legal_document ||
                          matchedProject?.legal_document?.trim() !== "") && (
                            <div className="about-btn-home outline-div-button button-div  ">
                              <button
                                className="reecosys-template-button button-style-secondary-outline "
                                onClick={() => {
                                  dispatch(openInquiry());
                                  // dispatch(setThankYouData({ drive_url:  matchedProject.legal_document}));
                                }}
                              >
                                <span className="material-symbols-outlined">download</span>
                                <p className="capitalize">
                                  {isMobilescreen ? "" : "Download"} Legal Document
                                </p>
                              </button>
                            </div>
                          )}
                        <div className="about-btn-home outline-div-button button-div  ">
                          {/* ng-click="availableUnitClick(projectDetail.category , projectDetail.project_id )" */}
                          <Link
                            href="/book_plot/"
                            state={{
                              projectDetail: {
                                category: projectDetail.category,
                                project_id: projectDetail.project_id,
                              },
                            }}
                              onClick={() => {
                              dispatch(setProjectDetail(projectDetail))
                            }}
                          >
                            <button className="reecosys-template-button button-style-secondary-outline ">
                              <span className="material-symbols-outlined">
                                apartment
                              </span>
                              <p className="capitalize">Book Plot</p>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="sticky-div">
                      {projectDetail.highlights?.length > 0 &&
                        projectDetail.highlights.map((data, index) => (
                          <div
                            key={index}
                            className=" inner-flex   highlight-flex "
                            data-aos="zoom-in"
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
                              <p className="gray-color capitalize">
                                {data.tag_line}
                              </p>
                            </div>
                          </div>
                        ))}
                      {projectDetail.amenities_image &&
                        !projectDetail.highlights?.length > 0 && (
                          <div
                            data-aos="zoom-in"
                            data-aos-delay="400"
                            data-aos-duration="600"
                          >
                            <img
                              src={projectDetail.amenities_image}
                              alt=""
                            // style={{width : '100%'}}
                            />
                          </div>
                        )}
                      {!projectDetail.amenities_image &&
                        !projectDetail.highlights?.length > 0 && (
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
                </div>
              </div>
            </section>
          )}
          {projectDetail.virtual_data?.length > 0 &&
            projectDetail.virtual_data
              .filter((video) => video.type == "walk-through" && video.image)
              .map((video, index) => (
                <section
                  key={index}
                  className="reecosys-section section-padding relative"
                  data-aos="fade-in"
                  data-aos-delay="400"
                  data-aos-duration="1000"
                  id="reecosys-project-detail-section-4"
                >
                  <div className=" ">
                    <div className="inner-flex relative">
                      <div className="walkthrough-project-thumb relative ">
                        <a
                          data-fancybox="walkthrough-fancy"
                          href={video.url}
                          target="_self"
                          className=""
                        >
                          <div className="walk-thumbnail-image relative transition overflow">
                            <img
                              src={`${video.image}&w=1920&q=100&h=950`}
                              className="image-cover"
                              data-aos="fade-in"
                              data-aos-duration="600"
                              data-aos-delay="300"
                              alt={projectDetail.size_price}
                            />
                            <div className="black_overlay"></div>
                            <div className="walkthrough-banner-content">
                              <div
                                className="inner-flex inner-flex-small   j-c-c alc aos fade-top"
                                data-aos-duration="600"
                              >
                                <div className="wlakthroughBtn relative">
                                  <img
                                    src="/images/icon/play-button.svg"
                                    alt=""
                                  />
                                  <div className="wlak-throughanimation">
                                    <div className="circle"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {projectDetail.rera_number && (
                              <div
                                className="section-content section-padding-small rera-text rera-text-abs"
                                data-aos="fade-in"
                                data-aos-duration="600"
                                data-aos-delay="1000"
                              >
                                <p className="capitalize white-color text-right">
                                  RERA : {projectDetail.rera_number}
                                </p>
                              </div>
                            )}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
          {Array.isArray(projectDetail?.gallery_data) &&
            projectDetail.gallery_data.length > 0 &&
            projectDetail.gallery_data[0].image?.length > 0 && (
              <section
                id="reecosys-project-detail-section-5"
                className="section-padding pt0"
              >
                {projectDetail.gallery_data
                  .filter((gallery) => gallery.image?.length > 0)
                  .map((gallery, index) => (
                    <div
                      key={index}
                      className="reecosys-section"
                      id="reecosys-detail-section-gallery"
                    >
                      <div className="inner-flex inner-flex-medium">
                        <div className="main-container-fluid">
                          <div
                            className="flex-row alc j-c-sb relative "
                            data-aos="fade-top"
                            data-aos-duration="1000"
                            data-aos-delay="400"
                          >
                            {gallery.title ||
                              (gallery.tag_line && (
                                <div className="inner-flex inner-flex-medium ">
                                  {gallery.title && (
                                    <div className="section-title">
                                      <h2 className="  ">{gallery.title}</h2>
                                    </div>
                                  )}
                                  {gallery.tag_line && (
                                    <div
                                      className="section-information inner-flex "
                                      ng-if=" && gallery.tag_line != 'undefined'"
                                    >
                                      <div className="section-title">
                                        <h2
                                          className=" aos fadeInUp"
                                          data-aos-delay="400"
                                          data-aos-duration="600"
                                        >
                                          {gallery.tag_line}
                                        </h2>
                                      </div>
                                    </div>
                                  )}
                                  {projectDetail.virtual_data?.length > 0 &&
                                    !isMobilescreen && (
                                      <div className="web-3d-icon">
                                        {projectDetail.virtual_data
                                          .filter(
                                            (video) =>
                                              video.type == "virtual-tour"
                                          )
                                          .map((video, index) => (
                                            <a
                                              key={index}
                                              className="fancybox"
                                              data-fancybox="virtual-tour"
                                              data-src={video.url}
                                              href="javascript:void(0)"
                                              target="_self"
                                            >
                                              <button
                                                className="reecosys-template-button button-blackborder border-black"
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
                                          ))}
                                      </div>
                                    )}
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="project-gallery-outer">
                          <div className="project_gallery_grid main-container-fluid">
                            {gallery.image.map((gallaryImgData, index) => (
                              <div
                                key={index}
                                className={`galleryItem ${index < 8 ? "gallery-active" : ""
                                  } `}
                              >
                                <a
                                  data-fancybox="project-gallery-fancy"
                                  href={gallaryImgData.image_full}
                                  target="_self"
                                >
                                  <div className=" overflow project_gallery_hover   relative">
                                    <img
                                      src={`${gallaryImgData.image}&h=500&w=500&q=100`}
                                      alt={projectDetail.size_price}
                                      className="image-cover"
                                      data-aos="fade-in"
                                      data-aos-duration="1000"
                                      data-aos-delay={index * 300}
                                    />
                                    <div className="project_gallery_overlay"></div>
                                    {gallaryImgData.title &&
                                      !isMobilescreen && (
                                        <div className="smallest-font galleryFonts">
                                          <p className="capitalize white-color">
                                            {gallaryImgData.title}
                                          </p>
                                        </div>
                                      )}
                                  </div>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="main-container">
                          {gallery.image?.length > 8 && (
                            <div
                              className={`view_gallery_btn m0auto ${isMobilescreen ? "" : "wfc"
                                } `}
                            >
                              {gallery.image.map((gallaryImgData, index) => (
                                <a
                                  key={index}
                                  href={gallaryImgData.image_full}
                                  data-fancybox="project-gallery-fancy2"
                                  target="_self"
                                  className={index != 0 ? "hidden" : ""}
                                >
                                  <button
                                    className={`reecosys-template-button button-style-secondary-outline ${isMobilescreen ? "w100" : ""
                                      } `}
                                  >
                                    <p>View All Images</p>
                                  </button>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        {projectDetail.virtual_data?.length > 0 &&
                          isMobilescreen && (
                            <div className="main-container">
                              {projectDetail.virtual_data
                                .filter((video) => video.type == "virtual-tour")
                                .map((video, index) => (
                                  <div className="w100" key={index}>
                                    <a
                                      className="fancybox"
                                      data-fancybox="virtual-tour"
                                      data-src={video.url}
                                      href="javascript:void(0)"
                                      target="_self"
                                    >
                                      <button
                                        className="reecosys-template-button button-blackborder border-black  w100"
                                        data-aos="fade-in"
                                        data-aos-duration="6000"
                                        data-aos-delay="6000"
                                      >
                                        <p>
                                          <span className="bold">360&deg;</span>{" "}
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
          {projectDetail.why_us && projectDetail.why_us?.length > 0 && (
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
                          data-aos="fade-top"
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
          {projectDetail.specifications?.length > 0 && (
            <section
              className="reecosys-section section-padding highlight-bg relative"
              id="reecosys-project-detail-section-6"
            >
              <div className="main-container-fluid">
                <div className="inner-flex inner-flex-medium ">
                  <div className="flex-row w100 j-c-sb alc">
                    <div className="section-title">
                      <h2 className="white-color  ">Features</h2>
                    </div>
                    <div className="visible-sm visible-xs">
                      <div className="timeline-navigation flex-row alc ">
                        <div className="swiper-button-prev  amenities-button">
                          <img src="/images/icon/left-arrow.svg" alt="" />
                        </div>
                        <div className="swiper-button-next  amenities-button">
                          <img src="/images/icon/right-arrow.svg" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inner-flex inner-flex-medium ">
                    <Swiper
                      modules={[Navigation, FreeMode]}
                      setWrapperSize={true}
                      observer={true}
                      observeParents={true}
                      slidesPerView={1}
                      spaceBetween={16}
                      freeMode={true}
                      navigation={{
                        prevEl: ".swiper-button-prev.amenities-button",
                        nextEl: ".swiper-button-next.amenities-button",
                      }}
                      breakpoints={{
                        1152: {
                          slidesPerView: 2,
                          spaceBetween: 16,
                        },
                        767: {
                          slidesPerView: 1,
                          spaceBetween: 16,
                        },
                        0: {
                          slidesPerView: 1,
                          spaceBetween: 16,
                        },
                      }}
                      className="visible-sm visible-xs swiper-container"
                      style={{ width: '100%' }}
                    >
                      {projectDetail.specifications.map(
                        (specification, index) => (
                          <SwiperSlide
                            className="inner-flex alstart"
                            key={index}
                            style={{ width: 'fit-contain' }}
                          >
                            <div className="specification-swiper">
                              <div className="flex-row alc ">
                                <div className="specificationIcon">
                                  <img
                                    src={specification.image_full}
                                    alt={projectDetail.project_title}
                                  />
                                </div>
                                <div className="section-paragraph">
                                  <p className="white-color">
                                    {specification.title}
                                  </p>
                                </div>
                              </div>
                              <div className="link-font-size specificationContent text-left">
                                <ul
                                  className="specification-ul"
                                  dangerouslySetInnerHTML={{
                                    __html: specification.description,
                                  }}
                                ></ul>
                              </div>
                            </div>
                          </SwiperSlide>
                        )
                      )}
                    </Swiper>
                    <div
                      className="amenities-grid  specification-grid two-col  hidden-sm hidden-xs"
                      data-aos="fade-top"
                      data-aos-duration="1000"
                      data-aos-delay="600"
                    >
                      {projectDetail.specifications.map(
                        (specification, index) => (
                          <div key={index} className="">
                            <div className="flex-row alc ">
                              <div className="specificationIcon">
                                <img
                                  src={specification.image_full}
                                  alt={projectDetail.project_title}
                                />
                              </div>
                              <div className="section-paragraph">
                                <p className="white-color">
                                  {specification.title}
                                </p>
                              </div>
                            </div>
                            <div className="link-font-size specificationContent ">
                              <ul
                                className="specification-ul"
                                dangerouslySetInnerHTML={{
                                  __html: specification.description,
                                }}
                              ></ul>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    {projectDetail.specifications?.length > 8 && (
                      <div
                        className="wfc m0auto"
                        data-aos="fade-top"
                        data-aos-duration="1000"
                        data-aos-delay="700"
                      >
                        <div className="">
                          <button
                            className={`reecosys-template-button button-style-white white-text ${isMobilescreen ? "w100" : ""
                              } `}
                          >
                            <p className="capitalize">View All</p>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
          {projectDetail.amenities_data && (
            <section
              className="reecosys-section section-padding  relative"
              id="reecosys-project-detail-section-6"
            >
              <div className="main-container-fluid ">
                <div className="inner-flex inner-flex-medium ">
                  <div className="flex-row alend j-c-sb w100 ">
                    <div className="section-title">
                      <h2>Amenities</h2>
                    </div>
                  </div>
                  <div
                    className="amenities-grid dholera-forest-amenities "
                    data-aos="fade-top"
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
                    data-aos="fade-top"
                    data-aos-duration="1000"
                    data-aos-delay="700"
                  >
                    {projectDetail.amenities_data?.length > 8 && (
                      <div className="btn-amn">
                        {/* ng-click="amenityClick()" */}
                        <button
                          className={`reecosys-template-button button-style-secondary-outline ${isMobilescreen ? "w100" : ""
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
          {(projectDetail.map_iframe || projectDetail.location_link) && (
            <section
              className="reecosys-section section-padding relative"
              id="reecosys-project-detail-section-8"
            >
              <div className="main-container-fluid">
                <div className="inner-flex inner-flex-medium">
                  <div className="section-title">
                    <h2>{projectDetail.location_title}</h2>
                  </div>
                  {projectDetail.location_tag_line && (
                    <div className="section-information inner-flex ">
                      <div className="section-title">
                        <h2
                          data-aos="fade-top"
                          data-aos-delay="400"
                          data-aos-duration="600"
                        >
                          {projectDetail.location_tag_line}
                        </h2>
                      </div>
                    </div>
                  )}
                  {projectDetail.map_iframe && (
                    <div className="project-map-iframe relative">
                      <iframe
                        src={projectDetail.map_iframe}
                        allowFullScreen
                        data-aos="fade-in"
                        data-aos-duration="1000"
                        data-aos-delay="600"
                      ></iframe>
                    </div>
                  )}
                  {matchedProject.location_link && (
                    <div className="wfc m0auto">
                      <div className="">
                        <a
                          href={matchedProject.location_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="reecosys-template-button button-style-secondary-outline ">
                            <span className="material-symbols-outlined">
                              distance
                            </span>
                            <p className="">View On Map</p>
                          </button>
                        </a>
                      </div>
                    </div>
                  )}
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
                    pageDetail={projectDetail}
                    countryFlag={countryFlag}
                    setCountryFlag={setCountryFlag}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
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
                  Prefer connecting directly? Get in touch with us via phone,
                  email, or visit us at our office—we're here to help!
                </h2>
              </div>
            </div>
            <div className="flex-row alc contactBtnFlex relative" style={{ zIndex: 2 }}>
              <Link href="tel:+917096961250" passHref>
                <button
                  className="reecosys-template-button button-style-white white-text wow fadeInUp"
                  data-wow-delay="0.3s"
                  data-wow-duration="0.6s"
                >
                  <span className="material-symbols-outlined">phone_in_talk</span>
                  <p>Call Us</p>
                </button>
              </Link>
              <Link href="mailto:info@smart-homes.in" passHref>
                <button
                  className="reecosys-template-button button-style-white white-text wow fadeInUp"
                  data-wow-delay="0.4s"
                  data-wow-duration="0.6s"
                >
                  <span className="material-symbols-outlined">drafts</span>
                  <p>Send an email</p>
                </button>
              </Link>
              <Link href="https://maps.app.goo.gl/4CYF8dhjXH65BjNK7" target="_blank" rel="noopener noreferrer">
                <button
                  className="reecosys-template-button button-style-white white-text wow fadeInUp"
                  data-wow-delay="0.5s"
                  data-wow-duration="0.6s"
                >
                  <span className="material-symbols-outlined">distance</span>
                  <p>Visit Our Office</p>
                </button>
              </Link>
            </div>
            <div className="homeContactFormOverlay"></div>
          </div>
        </div>
      </section>
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
                {Array.isArray(projectDetail.amenities_data) &&
                  projectDetail.amenities_data.length > 0 &&
                  projectDetail.amenities_data.map((amenities, index) => (
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
  // } else {
  //   return <h1>Please Wait</h1>;
  // }
}

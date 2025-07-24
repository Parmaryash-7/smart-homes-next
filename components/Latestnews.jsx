"use client";
import React from "react";
import "./Latestnews.css";

export default function Latestnews({ blogs_types_list }) {
  return (
    <>
      <div className="latestnews_wrapper">
        <div className="reecosys-main-wrapper" id="reecosys-main-wrapper">
          <div
            id="reecosys-contact-wrapper"
            className=" inner-flex inner-flex-big"
          >
            <section
              className="reecosys-section relative"
              data-aos="fade-in"
              data-aos-delay="600"
              data-aos-duration="400"
              id="reecosys-contact-us-section-1"
            >
              <div className="common-listing-banner relative">
                <img src="/images/detail/blog_img.jpg" alt=""/>
                <div className="common-list-overlay"></div>
              </div>
              <div className="top-left-overlay-new"></div>
            </section>
            <div className="main-container">
              <div className="flex-row articles-tab">
                <div className="section-title">
                  <h2 className="secondary-color">Latest News</h2>
                </div>
              </div>
            </div>
            <section
              className="reecosys-section project_blog_list_setion"
              id="reecosys-blog-section-2"
            >
              <div className="main-container">
                <div className="inner-flex">
                  {/* <div className="tags_type_click relative" ng-if="tag_type">
                            <div className="blog_tags_text capitalize relative">
                                <p>{tag_type}</p>
                                <div className="clear_tags_filter" ng-click="clear_tag();">
                                    <img src="/images/icons/close_image.svg" alt="" />
                                </div>
                            </div>
                        </div> */}

                  {blogs_types_list.length <= 0 ||
                    (!blogs_types_list && (
                      <div className="inner-flex alc j-c-c" ng-if=" ">
                        <div className="section-paragraph ">
                          <p className="text-center"> No Blogs Right Now </p>
                        </div>
                        <div className="section-content">
                          <p>
                            <Link href="/">Back To Home</Link>
                          </p>
                        </div>
                      </div>
                    ))}
                  {blogs_types_list.length > 0 && (
                    <div className="project-list-grid project-list-grid-2-column project-listsmall-gap">
                      {blogs_types_list.map(
                        (data, i) =>
                          data.tags_commaseparted === "Latest-News" && (
                            <div
                              key={i}
                              ng-if=""
                              className="data-list-news-card"
                            >
                              <a
                                href={data.banner_title}
                                className="data-list-news-card-flex"
                                target="_blank"
                              >
                                <div className=" ">
                                  <div className="list_blog_img overflow">
                                    <img
                                      src={`${data.image_full}&h=100&w=150&q=100`}
                                      alt=""
                                      className="image-cover lazyload"
                                    />
                                  </div>
                                </div>
                                <div className="project-info-list">
                                  <div className="">
                                    <div className=" flex-row j-c-sb list_blogs_text alend">
                                      <div className="inner-flex">
                                        <div className="section-paragraph">
                                          <p className="capitalize bold-fonts ellipsis-2 ellipsis-2removemob">
                                            {data.title}
                                          </p>
                                        </div>
                                        {data.published_date && (
                                          <div
                                            className="banner-detail-row banner-detail-row-grid"
                                            ng-if=""
                                          >
                                            <div className="project-information-div">
                                              <div className="section-content banner-detail-row-grid-text">
                                                <p className="capitalize">
                                                  {data.published_date}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="read-more-arrow-news">
                                        <div className="section-content">
                                          <span className="material-symbols-outlined">
                                            east
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}


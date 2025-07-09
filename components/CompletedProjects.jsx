"use client";

import React, { useEffect, useState } from "react";
import "./CompletedProjects.css";
import "swiper/css";
// import Seo from "../components/Seo"; 
import Link from "next/link";

export default function CompletedProjects({ completedPropertylist, pageList }) {
  const [isMobilescreen, setMobileScreen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 767) {
      setMobileScreen(true);
    }
  }, []);

  // page_title: "Completed Residential & Commercial Projects | Swati Procon",
  // 		page_description: "Explore Swati Procon's successfully completed projects, including luxury apartments, office spaces, and retail showrooms across Ahmedabad.",
  // 		page_keywords: "Completed real estate projects, Swati Procon developments, luxury apartments Ahmedabad, commercial spaces, successful projects",
  const seoMetaData = {
    page_title: "Completed Residential & Commercial Projects | Swati Procon",
    page_description:
      "Explore Swati Procon's successfully completed projects, including luxury apartments, office spaces, and retail showrooms across Ahmedabad.",
    page_keywords:
      "Completed real estate projects, Swati Procon developments, luxury apartments Ahmedabad, commercial spaces, successful projects",
    slug: "/completed-projects",
    image: "/images/sswati-procon.png",
  };

  if (completedPropertylist.length > 0) {
    return (
      <>
        {/* {seoMetaData &&
            <Seo metaData={seoMetaData} />} */}
        <div className="completed_projects_wrapper">
          <div className="reecosys-main-wrapper" id="reecosys-main-wrapper">
            <div
              id="reecosys-list-wrapper"
              className="relative inner-flex-big inner-flex"
            >
              <section
                className="reecosys-section "
                id="reecosys-list-section-2"
              >
                <div className="main-container-fluid">
                  <div className="inner-flex ">
                    <div
                      className="section-title wow fadeIn"
                      data-wow-delay="0.6s"
                      data-wow-duration="0.6s"
                    >
                      <h2>Completed Projects</h2>
                    </div>
                  </div>
                </div>
              </section>
              <section
                className="reecosys-section overflow"
                id="reecosys-list-section-3"
              >
                <div className="main-container-fluid">
                  <div className="list-grid-block active">
                    <div className="completed-project-list-grid">
                      {completedPropertylist?.map((project_list_data, i) => (
                        <div className="project-list-card relative" key={i}>
                          {project_list_data.project_id != 744 && (
                            <div>
                              <Link
                                href={`/${project_list_data.slug}`}
                                className="inner-flex relative wow fade_top"
                                data-wow-delay="0.4s"
                                style={{ zIndex: 2 }}
                                data-wow-duration={`0.${i + 3}s"`}
                              >
                                <div className="project-info-list ">
                                  <div className="inner-flex-small inner-flex">
                                    <div className="section-title flex-row j-c-sb alc">
                                      <h2 className="capitalize charter_regular">
                                        {project_list_data.project_title}
                                      </h2>
                                    </div>
                                    <div className="inner-flex">
                                      {project_list_data.size_price && (
                                        <div className="project-information-div flex-row">
                                          <div className="building-icon common-icon">
                                            <img
                                              src="/images/icon/building.svg"
                                              alt="reecosys"
                                            />
                                          </div>
                                          <div className="section-content banner-detail-row-grid-text">
                                            <p className="capitalize ">
                                              {project_list_data.size_price}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                      {project_list_data.location && (
                                        <div className="project-information-div flex-row">
                                          <div className="building-icon common-icon">
                                            <img
                                              src="/images/icon/location.svg"
                                              alt="reecosys"
                                            />
                                          </div>
                                          <div className="section-content">
                                            <p className="capitalize">
                                              {project_list_data.location}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Please Wait</h1>;
  }
}

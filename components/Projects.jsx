"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./Projects.css";
import rawProjectData from "data/projectList.json";

export default function Projects({ propertylist: initialPropertyList, pageList }) {
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [propertylist, setPropertylist] = useState(initialPropertyList || []);
  const projectsArray = rawProjectData.list;

  useEffect(() => {
    if (window.innerWidth < 767) {
      setIsMobileScreen(true);
    }

    const mergedList = initialPropertyList.map((propertyItem) => {
      const matchedProject = projectsArray.find(
        (projectItem) => projectItem.project_id === propertyItem.project_id
      );

      if (matchedProject) {
        return {
          ...propertyItem,
          total_area: matchedProject.total_area,
        };
      }

      return propertyItem;
    });

    setPropertylist(mergedList);
  }, [initialPropertyList]);

  return (
    <>
      <div className="reecosys-main-wrapper" id="reecosys-main-wrapper">
        <div
          id="reecosys-list-wrapper"
          className="relative inner-flex-big inner-flex"
        >
          <section className="reecosys-section " id="reecosys-list-section-2">
            <div className="main-container-fluid">
              <div className="inner-flex inner-flex-medium">
                <div className="link-font-size">
                  <p className="secondary-color uppercase bold-fonts">
                    Our Projects
                  </p>
                </div>
                <div
                  className=""
                  data-aos="fade-in"
                  data-aos-delay="300"
                  data-aos-duration="600"
                >
                  <div className="section-title wfc  relative">
                    <h2 className="secondary-color">
                      From completed landmarks to ongoing ventures, explore our
                      portfolio and discover how we are shaping the future of
                      residential and commercial spaces.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="reecosys-section overflow section-padding pt0 "
            id="reecosys-list-section-3"
          >
            <div className="main-container-fluid">
              <div className="list-grid-block active">
                <div className="project-list-grid project-list-grid-2-column">
                  {propertylist &&
                    propertylist
                      .filter(
                        (data) =>
                          data.project_id != 744 && data.project_id != 814
                      )
                      .map((project_list_data, index) => (
                        <div key={index} className="project-list-card relative">
                          <div>
                            <Link
                              href={`/${project_list_data.slug}`}
                              className="inner-flex "
                              data-aos="fade-up"
                              data-aos-delay={400}
                              data-aos-duration={index * 300}
                            >
                              <div className="relative ">
                                {project_list_data.banner_data.image_web_type ==
                                  "image" && (
                                    <div className="project-img-list overflow relative">
                                      <img
                                        src={`${project_list_data.banner_data.image_web_full}&h=1079&w=1920&q=100`}
                                        alt={project_list_data.project_title}
                                        style={{ aspectRatio: "16/9", background: 'gray' }}
                                      // className="shimer-block"
                                      />
                                    </div>
                                  )}

                                {project_list_data.banner_data.image_web_type ==
                                  "video" && (
                                    <div className="project-img-list relative">
                                      <video
                                        autoplay
                                        muted
                                        loop
                                        playsinline
                                        id="myVideo"
                                      >
                                        <source
                                          src="{{project_list_data.banner_data.image_web_full}}"
                                          type="video/mp4"
                                        />
                                      </video>
                                    </div>
                                  )}
                                <div className="listingOverlay"></div>
                                <div className="projectBtn">
                                  <button className="reecosys-template-button button-style-white-fill ">
                                    <p className="">View Project</p>
                                  </button>
                                </div>
                              </div>
                              <div className="project-info-list ">
                                <div className="inner-flex inner-flex-smallest ">
                                  <div className="section-paragraph">
                                    <p className="medium-fonts">
                                      {project_list_data.project_title}
                                    </p>
                                  </div>
                                  <div className="flex-row flex-wrap  inner-flex-common  flex-col-teb">
                                    {project_list_data.size_price && (
                                      <div
                                        className={`project-information-div flex-row alc  inner-flex-smallest 
                                              ${isMobileScreen
                                            ? "w100"
                                            : ""
                                          } `}
                                      >
                                        <div className="building-icon common-icon">
                                          <img
                                            src="/images/icon/detail-icons/building.svg"
                                            alt="reecosys"
                                          />
                                        </div>
                                        <div className="link-font-size ">
                                          <p className="uppercase secondary-color medium-fonts">
                                            {project_list_data.size_price}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                    {project_list_data.total_area && (
                                      <div
                                        className={`project-information-div flex-row alc  inner-flex-smallest 
                                                                ${isMobileScreen
                                            ? "w100"
                                            : ""
                                          } `}
                                      >
                                        <div className="building-icon common-icon">
                                          <img
                                            src="/images/icon/detail-icons/area.svg"
                                            alt="reecosys"
                                          />
                                        </div>
                                        <div className="link-font-size ">
                                          <p className="uppercase secondary-color medium-fonts">
                                            Total Area of{" "}
                                            {project_list_data.total_area}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {project_list_data.location && (
                                      <div
                                        className={`project-information-div flex-row alc  inner-flex-smallest 
                                                                ${isMobileScreen
                                            ? "w100"
                                            : ""
                                          } `}
                                      >
                                        <div className="building-icon common-icon">
                                          <img
                                            src="/images/icon/detail-icons/location.svg"
                                            alt="reecosys"
                                          />
                                        </div>
                                        <div className="link-font-size ">
                                          <p className="uppercase secondary-color medium-fonts">
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
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

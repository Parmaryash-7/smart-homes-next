"use client";
import React from "react";
import "./Newsletter.css";

export default function Newsletter({ blogs_types_list }) {
  return (
    <>
      <div className="newsletter_wrapper">
        <div className="reecosys-main-wrapper" id="reecosys-main-wrapper">
          <div
            id="reecosys-contact-wrapper"
            className=" inner-flex inner-flex-big"
          >
            <div className="section-padding pb0">
              <div className="main-container ">
                <div className="flex-row articles-tab">
                  <div className="section-title">
                    <h2 className="secondary-color"> News Letters</h2>
                  </div>
                </div>
              </div>
            </div>
            <section className="reecosys-section" id="reecosys-blog-section-3">
              <div className="main-container">
                <div className="three-col-grid">
                  {blogs_types_list?.map(
                    (data, i) =>
                      data.tags_commaseparted === "Newsletter" && (
                        <div key={i} className="">
                          <a href={data.banner_title} target="_blank">
                            <div
                              className="inner-flex gap0"
                              style={{ height: "100%" }}
                            >
                              <div style={{ height: "100%" }}>
                                <img
                                  src={`${data.image_full}&h=733&w=617&q=100"`}
                                  className="image-cover lazyload"
                                  style={{ height: "100%" }}
                                />
                              </div>
                              <div
                                className="section-content news-pdf-name"
                                style={{ padding: "0.5rem" }}
                              >
                                <p className="uppercase">{data.title}</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      )
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


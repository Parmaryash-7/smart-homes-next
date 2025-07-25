"use client";
import React from "react";
import "./Newsletter.css";

export default function Newsletter({ blogs_types_list }) {
  // data/newsPdf.js
  const newsPdf = [
    {
      pdfImg: "/images/pdf/vol-06.png",
      pdf: "/images/pdf/Dholera-Expressway-City-vol-05.pdf",
      name: "DHOLERA SMART CITY NEWS BY SMART HOMES VOL 06",
    },
    {
      pdfImg: "/images/pdf/vol-01.png",
      pdf: "/images/pdf/DHOLERA-SMAR-CITY-NEWS-BY-SMART-HOMES-VOL-09.pdf",
      name: "DHOLERA-SMART CITY NEWS BY SMART HOMES VOL 9",
    },
    {
      pdfImg: "/images/pdf/vol-01.png",
      pdf: "/images/pdf/dholera-smart-city-news-by-smart-homes-vol-01.pdf",
      name: "DHOLERA SMART CITY NEWS BY SMART HOMES VOL 01",
    },
    {
      pdfImg: "/images/pdf/vol-02.png",
      pdf: "/images/pdf/dholera-smart-city-news-by-smart-homes-vol-02.pdf",
      name: "DHOLERA SMART CITY NEWS BY SMART HOMES VOL 02",
    },
    {
      pdfImg: "/images/pdf/vol-03.png",
      pdf: "/images/pdf/DHOLERA-SMART-CITY-NEWS-BY-SMART-HOMES-VOL-03.pdf",
      name: "DHOLERA SMART CITY NEWS BY SMART HOMES VOL 03",
    },
    {
      pdfImg: "/images/pdf/vol-04.png",
      pdf: "/images/pdf/DHOLERA-SMART-CITY-NEWS-BY-SMART-HOMES-VOL-04.pdf",
      name: "DHOLERA SMART CITY NEWS BY SMART HOMES VOL 04",
    },
    {
      pdfImg: "/images/pdf/vol-05.png",
      pdf: "/images/pdf/DHOLERA-SMART-CITY-NEWS-BY-SMART-HOMES-VOL-05.pdf",
      name: "DHOLERA SMART CITY NEWS BY SMART HOMES VOL 05",
    },
    {
      pdfImg: "/images/pdf/vol-07.png",
      pdf: "/images/pdf/DHOLERA-SMART-CITY-NEWS-BY-SMART-HOMES-VOL-07.pdf",
      name: "DHOLERA-SMART CITY NEWS BY SMART HOMES VOL 07",
    },
    {
      pdfImg: "/images/pdf/vol-08.png",
      pdf: "/images/pdf/DHOLERA-SMART-CITY-NEWS-BY-SMART-HOMES-VOL-08.pdf",
      name: "DHOLERA-SMART CITY NEWS BY SMART HOMES VOL 8",
    },
    {
      pdfImg: "/images/pdf/vol-10.png",
      pdf: "/images/pdf/DHOLERA-SMART-CITY-NEWS-BY-SMART-HOMES-VOL-10.pdf",
      name: "DHOLERA-SMART CITY NEWS BY SMART HOMES VOL 10",
    },
    {
      pdfImg: "/images/pdf/vol-10.png",
      pdf: "/images/pdf/DHOLERA-SMART-CITY-NEWS-BY-SMART-HOMES-VOL-11.pdf",
      name: "DHOLERA-SMART CITY NEWS BY SMART HOMES VOL 11",
    },
    {
      pdfImg: "/images/pdf/Times-Gujarat-Icon-2022-Award.jpg",
      pdf: "/images/pdf/Times-Gujarat-Icons-2022-Award.pdf",
      name: "Times Gujarat Icons 2022 Award",
    },
    {
      pdfImg: "/images/pdf/Times-Realty-and-Retail-Icons.png",
      pdf: "/images/pdf/times-realty-and-retail-icons-2021-ahmedabad.pdf",
      name: "Times Realty and Retail Icons 2021, Ahmedabad",
    },
  ];


  return (
    <>
      <div className="reecosys-main-wrapper" id="reecosys-main-wrapper">
        <div id="reecosys-contact-wrapper" className="inner-flex inner-flex-big">
          <div className="section-padding pb0">
            <div className="main-container">
              <div className="flex-row articles-tab">
                <div className="section-title">
                  <h2 className="secondary-color">News Letters</h2>
                </div>
              </div>
            </div>
          </div>

          <section className="reecosys-section" id="reecosys-blog-section-3">
            <div className="main-container">
              <div className="three-col-grid">
                {newsPdf.map((data, index) => (
                  <div key={index} className="">
                    <a href={data.pdf} target="_blank" rel="noopener noreferrer">
                      <div className="inner-flex gap0" style={{ height: "100%" }}>
                        <div style={{ height: "100%" }}>
                          <img
                            src={data.pdfImg}
                            alt={data.name}
                            className="image-cover"
                            style={{ height: "100%" }}
                          />
                        </div>
                        <div
                          className="section-content news-pdf-name"
                          style={{ padding: "0.5rem" }}
                        >
                          <p className="uppercase">{data.name}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <style jsx>{`
        .article-chips {
          background-color: #ccd9ce;
          padding: 0.7rem 1rem;
          width: fit-content;
          height: fit-content;
          line-height: 1;
        }

        .articles-tab .article-chips:nth-child(2) {
          margin-left: auto !important;
        }

        .flex-row-tab-btns {
          margin-left: auto;
        }

        .article-chips.active {
          background-color: var(--highlight-color) !important;
        }

        .article-chips.active h2 {
          color: var(--white-color) !important;
        }

        .article-chips h2 {
          color: var(--highlight-color);
          font-size: 1.25rem !important;
        }
      `}</style>
      </div>
    </>
  );
}


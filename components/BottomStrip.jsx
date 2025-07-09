"use client"

import React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";


export default function BottomStrip({
  isMobilescreen,
  isAmenityOpen,
  projectDetail,
  inquiryPopup,
  setInquiryPopup,
  setInquiryPopupObj,
}) {
  const bottomStripRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const remainingDistance = documentHeight - (scrollTop + windowHeight);

      const bottomStrip = bottomStripRef.current;

      if (scrollTop > 600 && remainingDistance > 600) {
        bottomStrip?.classList.add("showStrip");
      } else if (scrollTop < 200) {
        bottomStrip?.classList.remove("showStrip");
      } else if (remainingDistance < 600) {
        setTimeout(() => {
          bottomStrip?.classList.remove("showStrip");
        }, 100);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up on unmount
    };
  }, []);

  return (
    <>
      <div
        ref={bottomStripRef}
        className={`bottomStrip ${isAmenityOpen || inquiryPopup ? "hidestrip" : ""
          } `}
        id="bottomStrip"
      >
        <div className="bottomStripFlex main-container relative">
          <Link
            href="/projects"
            className="flex-row inner-flex-zero backArrowProject"
          >
            <span className="material-symbols-outlined"> chevron_left </span>
          </Link>

          <div className="bottomSubFlex hidden-xs hidden-sm">
            <div className=" ">
              <div className="section-content">
                <p className="uppercase gray-color">Project</p>
              </div>
              <div className="section-paragraph">
                <p className="capitalize bold-fonts">
                  {projectDetail.project_title}
                </p>
              </div>
            </div>
            <div className="">
              <div className="section-content">
                <p className="uppercase gray-color">Type</p>
              </div>
              <div className="section-paragraph">
                <p className="capitalize bold-fonts">
                  {projectDetail.size_price}
                </p>
              </div>
            </div>
            <div className="">
              <div className="section-content">
                <p className="uppercase gray-color">Location</p>
              </div>
              <div className="section-paragraph">
                <p className="capitalize bold-fonts">
                  {projectDetail.location}
                </p>
              </div>
            </div>
          </div>
          <div className={`bottomEnquirybtn  ${isMobilescreen ? "w100" : ""}`}>
            <div className="hidden-xs">
              {/* ng-click="inquire_popup_click();  inquiry_from_click(); " */}
              <button
                className={`reecosys-template-button button-style-secondary ${isMobilescreen ? "w100" : ""
                  } `}
              >
                <span className="material-symbols-outlined"> chat </span>
                <p className="capitalize">Inquire Now</p>
              </button>
            </div>
            <div className="w100 visible-xs">
              {/* ng-click="inquire_popup_click();  inquiry_from_click(); "  */}
              <button className="bottomStripButton reecosys-template-button button-style-secondary w100">
                <div className="flex-row alc">
                  <span className="bottomInquiryImg">
                    <img
                      src={`${projectDetail.banners_data.images[0].image_web_full}&h=100&w=100&q=100`}
                      alt={projectDetail.project_title}
                      className=""
                      style={{ borderRadius: "5px" }}
                    />
                  </span>
                  <p className="capitalize">Inquire Now</p>
                </div>
                <span className="material-symbols-outlined">
                  {" "}
                  keyboard_arrow_right{" "}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <BottomStrip projectDetail={projectDetail} isAmenityOpen={isAmenityOpen} inquiryPopup={inquiryPopup} setInquiryPopup={setInquiryPopup} isMobilescreen={isMobilescreen} setInquiryPopupObj={setInquiryPopupObj} /> */}
    </>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { openInquiry, setDrive, setProjectDetail } from '../store/inquirySlice';
import { useDispatch, useSelector } from 'react-redux';

export default function BottomStrip({
  isMobilescreen,
  isAmenityOpen,
  projectDetail,
}) {
  const bottomStripRef = useRef(null);
  const dispatch = useDispatch();
  const isInquiryOpen = useSelector((state) => state.inquiry.isOpen);

  useEffect(() => {
    if (isInquiryOpen || isAmenityOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isInquiryOpen, isAmenityOpen]);

  useEffect(() => {
    const bottomStrip = bottomStripRef.current;

    const handleScroll = () => {
      if (!bottomStrip) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const remainingDistance = documentHeight - (scrollTop + windowHeight);

      if (isInquiryOpen || isAmenityOpen) {
        bottomStrip.classList.remove("showStrip");
        bottomStrip.classList.add("hidestrip");
        return;
      }

      if (scrollTop > 600 && remainingDistance > 600) {
        bottomStrip.classList.add("showStrip");
        bottomStrip.classList.remove("hidestrip");
      } else if (scrollTop < 200) {
        bottomStrip.classList.remove("showStrip");
        bottomStrip.classList.add("hidestrip");
      } else if (remainingDistance < 800) {
        setTimeout(() => {
          bottomStrip.classList.remove("showStrip");
          bottomStrip.classList.add("hidestrip");
        }, 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isInquiryOpen, isAmenityOpen]);
  // const projectDetailInq = useSelector((state) => state.inquiry.projectDetailInq);
  dispatch(setProjectDetail(projectDetail))
  const handleInq = () => {
    // console.log(projectDetail);
    dispatch(openInquiry(projectDetail))
    dispatch(setDrive(false))
  }

  return (
    <>
      <div
        ref={bottomStripRef}
        className={`bottomStrip ${isAmenityOpen || isInquiryOpen ? "hidestrip" : "showStrip"}`}
        id="bottomStrip"
      >
        <div className="bottomStripFlex main-container relative">
          <Link
            href="/projects"
            className="flex-row inner-flex-zero backArrowProject"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </Link>

          <div className="bottomSubFlex hidden-xs hidden-sm">
            <div>
              <div className="section-content">
                <p className="uppercase gray-color">Project</p>
              </div>
              <div className="section-paragraph">
                <p className="capitalize bold-fonts">{projectDetail.project_title}</p>
              </div>
            </div>

            <div>
              <div className="section-content">
                <p className="uppercase gray-color">Type</p>
              </div>
              <div className="section-paragraph">
                <p className="capitalize bold-fonts">{projectDetail.size_price}</p>
              </div>
            </div>

            <div>
              <div className="section-content">
                <p className="uppercase gray-color">Location</p>
              </div>
              <div className="section-paragraph">
                <p className="capitalize bold-fonts">{projectDetail.location}</p>
              </div>
            </div>
          </div>

          <div className={`bottomEnquirybtn  ${isMobilescreen ? "w100" : ""}`}>
            <div className="hidden-xs">
              <button
                onClick={handleInq}
                className={`reecosys-template-button button-style-secondary ${isMobilescreen ? "w100" : ""}`}
              >
                <span className="material-symbols-outlined">chat</span>
                <p className="capitalize">Inquire Now</p>
              </button>
            </div>

            <div className="w100 visible-xs">
              <button
                onClick={handleInq}
                className="bottomStripButton reecosys-template-button button-style-secondary w100"
              >
                <div className="flex-row alc">
                  <span className="bottomInquiryImg">
                    <img
                      src={`${projectDetail.banners_data.images[0].image_web_full}&h=100&w=100&q=100`}
                      alt={projectDetail.project_title}
                      style={{ borderRadius: "5px" }}
                    />
                  </span>
                  <p className="capitalize">Inquire Now</p>
                </div>
                <span className="material-symbols-outlined">keyboard_arrow_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

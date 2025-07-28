'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openCareerInquiry } from '../store/inquiryCareerSlice';
import './Career.css'
const Career = ({ career_full_list, pageList }) => {
    const [isMobilescreen, setIsMobilescreen] = useState(false);
    const [privacyData, setPrivacy] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const found = pageList.find((page) => page.slug === "career");
        if (found) setPrivacy(found);
    }, [pageList]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobilescreen(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // console.log(career_full_list);

    // useEffect(() => {
    //     if (career_full_list.length > 0) {
    //         setActiveIndex(0);
    //     }
    // }, [career_full_list]);

    const handleToggle = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const career_click = (data) => {
        dispatch(openCareerInquiry(data));
    };
    return (
        <div className="reecosys-main-wrapper career-wrapper" id="reecosys-main-wrapper">
            <div id="reecosys-contact-us-wrapper" className="relative inner-flex-big inner-flex">
                <section
                    className="reecosys-section relative"
                    data-aos='fade-in'
                    data-aos-delay="600"
                    data-aos-duration="400"
                    id="reecosys-contact-us-section-1"
                >
                    <div className="common-listing-banner relative">
                        <img
                            src={`${privacyData?.banner_web_full}&w=1920&h=750`}
                            alt=""
                        />
                        <div className="common-list-overlay"></div>
                        <div className="common-banner-title-abs">
                            <div className="section-title">
                                <h1 className="white-color">{privacyData?.banner_title}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="top-left-overlay-new"></div>
                </section>

                <section
                    className="reecosys-section section-padding-bottom relative wow fadeIn"
                    data-wow-delay="0.6s"
                    data-wow-duration="0.4s"
                    id="reecosys-contact-us-section-2"
                >
                    <div className="mini-container">
                        <div>
                            <div className="inner-flex inner-flex-medium">
                                <div className="inner-flex">
                                    <div className="section-title">
                                        <h2>Current Job Openings</h2>
                                    </div>
                                    <div className="section-content">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: privacyData?.primary_text_display || "",
                                            }}
                                        />
                                    </div>
                                </div>

                                {career_full_list?.length > 0 && (
                                    <div className="reecosys-section relative">
                                        <div className="career_position_block inner-flex inner-flex-small" id="accordion">
                                            {career_full_list.map((data, index) => (
                                                <div
                                                    key={index}
                                                    className="career_position_list inner-flex wow fade_top"
                                                    data-wow-delay="0.6s"
                                                    data-wow-duration={`${index * 0.2}s`}
                                                >
                                                    <div
                                                        className={`flex-row alstart j-c-sb w100 accordion_click ${activeIndex === index ? 'active' : ''}`}
                                                        onClick={() => handleToggle(index)}
                                                    >
                                                        <div>
                                                            {data.position && (
                                                                <div className="section-title flex-row alc career_title">
                                                                    <h2>{data.position}</h2>
                                                                    {data.description && (
                                                                        <span className="material-symbols-outlined">
                                                                            keyboard_arrow_down
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                            {data.exp_years && (
                                                                <div className="section-content">
                                                                    <p>{data.exp_years}</p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {!isMobilescreen && data.position && (
                                                            <div
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    career_click(data);
                                                                }}
                                                            >
                                                                <button className="reecosys-template-button button-style-primary">
                                                                    <p className="capitalize">Apply Now</p>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {data.description && (
                                                        <div
                                                            className="content_accordian section-padding-small pb0"
                                                            style={{ display: activeIndex === index ? 'block' : 'none' }}
                                                        >
                                                            <div className="career_detail_content section-content">
                                                                <p
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: data.description,
                                                                    }}
                                                                />

                                                            </div>
                                                        </div>
                                                    )}

                                                    {isMobilescreen && data.position && (
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                career_click(data);
                                                            }}
                                                            style={{
                                                                position: 'fixed',
                                                                bottom: '2rem',
                                                                left: '50%',
                                                                width: 'fit-content',
                                                                transform: 'translateX(-50%)',
                                                                zIndex: '9999'
                                                            }}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="reecosys-template-button button-style-primary w100"
                                                            >
                                                                <p className="capitalize">Apply Now</p>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Career;

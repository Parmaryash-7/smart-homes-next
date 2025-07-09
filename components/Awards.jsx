"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import awardsData from "data/awards.json";

export default function Awards({ pageList }) {
    const [awardsList, setAwardsList] = useState([]);
    const [projectsList, setProjectsList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [privacyData, setPrivacy] = useState(null);
    const [isMobileScreen, setMobileScreen] = useState(false);

    useEffect(() => {
        if (!privacyData && pageList?.length) {
            const privacyDData = pageList.find((page) => page.slug === "awards-and-accolades");
            setPrivacy(privacyDData);
        }

        if (window.innerWidth < 767) setMobileScreen(true);

        if (awardsData?.awards?.length) {
            setAwardsList(awardsData.awards);
        }
        if (awardsData?.projects_full_list?.length) {
            setProjectsList(awardsData.projects_full_list);
        }
        if (awardsData?.country_list?.length) {
            setCountryList(awardsData.country_list);
        }
    }, [pageList]);

    // useEffect(() => {
    //     fetch("/awards.json")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data?.awards?.length) setAwardsList(data.awards);
    //             if (data?.projects_full_list?.length) setProjectsList(data.projects_full_list);
    //             if (data?.country_list?.length) setCountryList(data.country_list);
    //         })
    //         .catch((err) => console.error("Error loading awards:", err));
    // }, []);




    const handleSubmit = (e) => {
        e.preventDefault();
        setSaveInquiryHomeF(true);
        // console.log("Submitting:", awardsInquiryObj);
        setTimeout(() => setSaveInquiryHomeF(false), 1500);
    };

    const handleCountryClick = (code, flag) => {
        setAwardsInquiryObj({ ...awardsInquiryObj, country: code, flag });
        setCountryCodeClickF(false);
    };

    return (
        // <div className="reecosys-main-wrapper" id="reecosys-main-wrapper" onClick={() => setCountryCodeClickF(false)}>
        <div className="reecosys-main-wrapper" id="reecosys-main-wrapper">
            <div className="awards-wrapper-main">
                <section className="reecosys-section section-padding" id="reecosys-awards-section-2">
                    <div className="main-container">
                        <div className="inner-flex inner-flex-common">
                            <div className="link-font-size">
                                <p className="uppercase">Awards & Accolades</p>
                            </div>
                            <div className="inner-flex inner-flex-big">
                                <div className="section-title">
                                    <h2>Featured Awards</h2>
                                </div>
                                <div className="awardCard-grid">
                                    {awardsList.map((award, index) => (
                                        <div key={index}>
                                            <Link href={`/awards/${award.slug}`}>
                                                <div className="awardCard inner-flex inner-flex-small">
                                                    <div className="awardImg wfc">
                                                        <img src={award.image} alt="" />
                                                    </div>
                                                    <div className="awardContent inner-flex inner-flex-smallest">
                                                        <div className="section-paragraph">
                                                            <p>{award.name}</p>
                                                        </div>
                                                        <div className="link-font-size ellipsis-3">
                                                            <p className="secondary-color">{award.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="wfc">
                                                        <div>
                                                            <button className="reecosys-template-button button-style-secondary-outline">
                                                                <p>Read More</p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="section-padding" style={{ backgroundColor: "#ffffff" }}>
                    <div className="main-container">
                        <div className="contactFormWrapper relative" style={{ zIndex: 2 }}>
                            <div className="section-title">
                                <h2 className="secondary-color">Inquire Now</h2>
                            </div>
                            <div className="contactForm detailForm project-input w100">
                                <form id="awardContent" onSubmit={handleSubmit}>
                                    <div className="contact_lable select_option select_apr relative">
                                        <select
                                            name="project_id"
                                            className="form-control"
                                            value={awardsInquiryObj.project_id}
                                            onChange={(e) => setAwardsInquiryObj({ ...awardsInquiryObj, project_id: e.target.value })}

                                        >
                                            <option value="" disabled>Select Projects</option>
                                            {propertylist?.map((data, i) => (
                                                <option value={data.project_id} key={i}>{data.project_title}</option>
                                            ))}

                                        </select>
                                        <label className="md-lable project_id_label" htmlFor="project_id">Project*</label>
                                        <div className="fa-icon">
                                            <i className="fa fa-angle-down" style={{ color: "var(--secondary-color)" }} />
                                        </div>
                                    </div>

                                    <div className="contact_lable">
                                        <input
                                            type="text"
                                            name="first_name"
                                            className="form-control"

                                            value={awardsInquiryObj.first_name}
                                            onChange={(e) => setAwardsInquiryObj({ ...awardsInquiryObj, first_name: e.target.value })}
                                        />
                                        <label className="md-lable" htmlFor="first_name">First Name*</label>
                                    </div>

                                    <div className="contact_lable">
                                        <input
                                            type="text"
                                            name="last_name"
                                            className="form-control"

                                            value={awardsInquiryObj.last_name}
                                            onChange={(e) => setAwardsInquiryObj({ ...awardsInquiryObj, last_name: e.target.value })}
                                        />
                                        <label className="md-lable" htmlFor="last_name">Last Name*</label>
                                    </div>

                                    <div className="contact_lable">
                                        <input
                                            type="text"
                                            name="client_contact_no_display"
                                            className="form-control contact-form"
                                            value={awardsInquiryObj.client_contact_no_display}
                                            onChange={(e) => setAwardsInquiryObj({ ...awardsInquiryObj, client_contact_no_display: e.target.value })}
                                            minLength="10"
                                            maxLength="10"

                                        />
                                        <label className="md-lable" htmlFor="client_contact_no_display">Phone Number*</label>
                                        <div className="conatct_number_input">
                                            <div className="country_code_data" onClick={(e) => {
                                                e.stopPropagation();
                                                setCountryCodeClickF(!countryCodeClickF);
                                            }}>
                                                <div className="section-paragraph">
                                                    <span><img src={awardsInquiryObj.flag} alt="" /></span>
                                                    <p>+{awardsInquiryObj.country}</p>
                                                    <p>|</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`country_code_list_data ${countryCodeClickF ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
                                            <div className="search_c-code">
                                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                                            </div>
                                            <ul>
                                                {countryList
                                                    .filter(c => c.phonecode.includes(search))
                                                    .map((c, i) => (
                                                        <li key={i} onClick={() => handleCountryClick(c.phonecode, c.flag)}>
                                                            <div>
                                                                <img src={c.flag} alt="flag" />
                                                                <span className="display_country_code">+{c.phonecode}</span> | &nbsp; {c.nicename}
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="contact_lable">
                                        <input
                                            type="text"
                                            name="email_address"
                                            className="form-control"
                                            value={awardsInquiryObj.email_address}
                                            onChange={(e) => setAwardsInquiryObj({ ...awardsInquiryObj, email_address: e.target.value })}
                                        />
                                        <label className="md-lable" htmlFor="email_address">Email Address</label>
                                    </div>

                                    <div className="contact_lable commentbox">
                                        <textarea
                                            name="remarks"
                                            className="form-control"
                                            rows="2"
                                            value={awardsInquiryObj.remarks}
                                            onChange={(e) => setAwardsInquiryObj({ ...awardsInquiryObj, remarks: e.target.value })}
                                        />
                                        <label className="md-lable" htmlFor="remarks">Comments</label>
                                    </div>

                                    <div className="wfc m0auto homeSubmitBtn">
                                        <button className="reecosys-template-button button-style-secondary" type="submit" disabled>
                                            <p>{saveInquiryHomeF ? "Please Wait..." : "Submit"}</p>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>*/}

                <section className="reecosys-template-section relative" id="reecosys-template-home-section-10">
                    <div className="">
                        <div className="homeContactForm relative j-c-sb">
                            <div className="inner-flex j-c-sb relative" style={{ zIndex: 2 }}>
                                <div className="section-title" data-aos="fade-up"
                                    data-aos-delay="300"
                                    data-aos-duration="600">
                                    <h2 className="white-color">
                                        Prefer connecting directly? Get in touch with us via phone, email, or visit us at our
                                        office—we're here to help!
                                    </h2>
                                </div>
                            </div>
                            <div className="flex-row alc contactBtnFlex relative" style={{ zIndex: 2 }}>
                                <a href="tel:+917096961250">
                                    <button className="reecosys-template-button button-style-white white-text" data-aos="fade-in"
                                        data-aos-delay="300"
                                        data-aos-duration="600">
                                        <span className="material-symbols-outlined">phone_in_talk</span>
                                        <p>Call Us</p>
                                    </button>
                                </a>
                                <a href="mailto:info@smarthomesinfra.com">
                                    <button className="reecosys-template-button button-style-white white-text" data-aos="fade-in"
                                        data-aos-delay="400"
                                        data-aos-duration="600">
                                        <span className="material-symbols-outlined">drafts</span>
                                        <p>Send an email</p>
                                    </button>
                                </a>
                                <a href="https://maps.app.goo.gl/4CYF8dhjXH65BjNK7" target="_blank">
                                    <button className="reecosys-template-button button-style-white white-text" data-aos="fade-in"
                                        data-aos-delay="500"
                                        data-aos-duration="600">
                                        <span className="material-symbols-outlined">distance</span>
                                        <p>Visit Our Office</p>
                                    </button>
                                </a>
                            </div>
                            <div className="homeContactFormOverlay"></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

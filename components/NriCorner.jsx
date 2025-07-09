"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryList } from "store/countrySlice";
import { projectInquiry } from "lib/ProjectInquiry";

export default function NriCorner({ pageList }) {
    const [pageData, setPageData] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [countryFlag, setCountryFlag] = useState(false);
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState({});
    const [inquiryObj, setInquiryObj] = useState({
        name: "",
        email: "",
        contact_no_display: "",
        country: "91",
        flag: "https://flagcdn.com/w40/in.webp",
        message: "",
        department: "",
    });

    const dispatch = useDispatch();
    const { countryList } = useSelector((state) => state.country);

    useEffect(() => {
        const data = pageList.find((page) => page.slug === "nricorner");
        setPageData(data);
        if (window.innerWidth < 767) setIsMobile(true);

        dispatch(fetchCountryList());
    }, [pageList, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({})
        let val = value;
        if (name === "name") val = val.replace(/[0-9]/g, "");
        if (name === "contact_no_display") val = val.replace(/[^0-9]/g, "").slice(0, 10);
        setInquiryObj((prev) => ({ ...prev, [name]: val }));
    };

    const handleCountrySelect = (phonecode, flag) => {
        setInquiryObj((prev) => ({ ...prev, country: phonecode, flag }));
        setCountryFlag(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        const nameRegex = /^[a-zA-Z\s]+$/;
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\d{10}$/;

        if (!inquiryObj.name.trim()) newErrors.name = true;
        else if (!nameRegex.test(inquiryObj.name)) newErrors.name = true;

        if (!inquiryObj.email.trim()) newErrors.email = true;
        else if (!emailRegex.test(inquiryObj.email)) newErrors.email = true;

        if (!inquiryObj.contact_no_display.trim()) newErrors.contact_no_display = true;
        else if (!phoneRegex.test(inquiryObj.contact_no_display)) newErrors.contact_no_display = true;

        if (!inquiryObj.department.trim()) newErrors.department = true;
        if (!inquiryObj.message.trim()) newErrors.message = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setFormSubmitted(true);

        // const contactData = {
        //     name: inquiryObj.name,
        //     email: inquiryObj.email,
        //     contact_no: inquiryObj.country + inquiryObj.contact_no_display,
        //     message: inquiryObj.message,
        //     department: inquiryObj.department,
        // };
        // inquiryObj.contact_no_display = inquiryObj.country + " " + inquiryObj.contact_no_display

        try {
            console.log(inquiryObj);
            alert("Form submitted successfully!");
            setInquiryObj({
                name: "",
                email: "",
                contact_no_display: "",
                country: "91",
                flag: "https://flagcdn.com/w40/in.webp",
                message: "",
                department: "",
            });
            setSearch("");
            document.getElementById("agree_tandc").checked = false;
        } catch (error) {
            alert("Submission failed.");
            console.error(error);
        } finally {
            setFormSubmitted(false);
        }
    };


    return (
        <div className="reecosys-main-wrapper" id="reecosys-main-wrapper" onClick={() => setCountryFlag(false)}  >
            <div id="reecosys-nri-wrapper" className="relative inner-flex-big inner-flex">
                <section className="reecosys-section relative" data-aos="fade-in"
                    data-aos-delay="600"
                    data-aos-duration="400" id="reecosys-contact-us-section-1">
                    {pageData?.banner_web_type === "image" && (
                        <div className="common-listing-banner nri-banner-section relative">
                            <img
                                src="/images/nri/nri-banner.jpg"
                                alt=""
                                className="hide-tab-mobile"
                            />
                            <img
                                src="/images/nri/nri-banner-mob.jpg"
                                alt=""
                                className="visible-tab-mobile"
                            />
                            <div className="black_overlay"></div>
                            <div className="common-banner-title-abs">
                                <div className="banner-title">
                                    <h1 className="white-color capitalize">{pageData?.banner_title}</h1>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                <section className="reecosys-section section-padding-bottom relative" data-aos="fade-in"
                    data-aos-delay="600"
                    data-aos-duration="400" id="reecosys-contact-us-section-2">
                    <div className="inner-flex inner-flex-big">
                        <div className="section-title text-center section-content mini-container">
                            <h2 className="capitalize secondary-color">Why NRIs Should Invest in India, Especially in Dholera Smart City</h2>
                            <p>
                                India's real estate market has become a prime investment destination for Non-Resident Indians (NRIs), offering high returns,
                                economic stability, and long-term growth potential. Among the emerging smart cities, Dholera Smart City stands out as a
                                future-ready urban hub, offering world-class infrastructure, strategic connectivity, and a government-backed investment ecosystem.
                            </p>
                        </div>

                        <div className="main-container-fluid">
                            <div className="page-list-2-col-grid nriGrid green_lable">
                                <div className="inner-flex inner-flex-medium nri-text-color">
                                    <div className="inner-flex inner-flex-common">
                                        <div className="section-subtitle">
                                            <h4>Why NRIs Should Invest in India?</h4>
                                        </div>
                                        <ul className="nri-text-ul">
                                            <li>
                                                <span className="primary-color">Rapid Economic Growth:</span> India's economy is one of the fastest-growing globally, making real estate a high-value investment option.
                                            </li>
                                            <li>
                                                <span className="primary-color">Government Reforms & Policies:</span> Initiatives like RERA, GST benefits, and relaxation of FDI norms have increased transparency and security.
                                            </li>
                                            <li>
                                                <span className="primary-color">High ROI & Appreciation:</span> India's real estate has consistently delivered higher returns, especially in Dholera.
                                            </li>
                                            <li>
                                                <span className="primary-color">Emotional & Financial Security:</span> Property in India offers both peace of mind and a connection to roots.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="nri-sect-imgs border-radius">
                                        <img src="/images/nri/nri-sect-1.jpg" alt="" />
                                    </div>

                                    <div className="inner-flex inner-flex-common">
                                        <div className="section-subtitle">
                                            <h4>Dholera Smart City - India's First Greenfield Smart City<br className="hide-tab-mobile" />The Ideal Investment Destination for NRIs</h4>
                                        </div>
                                        <ul className="nri-text-ul">
                                            <li>Dholera spans 920 sq. km. and is part of DMIC.</li>
                                            <li><span className="primary-color">Strategic Location:</span> Just 70 km from Ahmedabad, well-connected via road, metro, and airport.</li>
                                            <li><span className="primary-color">World-Class Infrastructure:</span> 6-lane highways, smart utilities, 24x7 power/water, ICT governance.</li>
                                            <li><span className="primary-color">Global Business Hub:</span> Aerospace, defense, electronics, IT, and green energy industries are booming here.</li>
                                            <li><span className="primary-color">Smart & Sustainable Living:</span> Eco-friendly development and modern planning make it ideal for investment.</li>
                                        </ul>
                                    </div>

                                    <div className="nri-sect-imgs border-radius">
                                        <img src="/images/nri/nri-sect-2.jpg" alt="" />
                                    </div>

                                    <div className="inner-flex inner-flex-common">
                                        <div className="section-subtitle inner-flex section-content">
                                            <h4>Why SmartHomes Infrastructure is the Right Partner for NRIs?</h4>
                                            <p>
                                                SmartHomes Infrastructure is a top real estate name in Dholera, offering secure, legal, and high-return investments.
                                            </p>
                                        </div>
                                        <div className="inner-flex inner-flex-common">
                                            <ul className="nri-text-ul">
                                                <li><span className="primary-color">100% Legally Clear Properties</span> with all government approvals and clear title.</li>
                                                <li><span className="primary-color">Large Land Parcels Available:</span> Revenue matters are pre-resolved.</li>
                                                <li><span className="primary-color">High & Mid-Ticket Size Investors</span> from UK, Italy, USA, Canada, UAE, and more have invested.</li>
                                                <li><span className="primary-color">Exclusive Investment Opportunities</span> in residential, commercial, and industrial plots.</li>
                                                <li><span className="primary-color">Hassle-Free Buying Process</span> including virtual tours, site visits, and financial advisory.</li>
                                            </ul>
                                            <div className="section-paragraph inner-flex inner-flex-smallest">
                                                <p>
                                                    Dholera Smart City is a rare chance for NRIs to invest in India's most promising smart city.
                                                </p>
                                                <p>
                                                    Join NRIs worldwide who trust SmartHomes Infrastructure to grow their future.
                                                </p>
                                                <p>
                                                    For assistance, contact us at: <a href="tel:+917096961250" target="_blank" className="highlight-color">+91 7096961250</a>
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="inner-flex inner-flex-big sticky-form green_lable">
                                    <div className="form-box border-radius-contact">
                                        <div className="inner-flex inner-flex-medium">
                                            <div className="section-subtitle">
                                                <h4 className="text-center">Register Your Interest</h4>
                                            </div>
                                            <form onSubmit={handleSubmit} autoComplete="off">
                                                <div className="form_wrapper nri-form contact_form">
                                                    <div className="contact_lable">
                                                        <input id="name" name="name" type="text" value={inquiryObj.name} onChange={handleChange} className={`form-control ${errors.name ? "error" : ""}`} />
                                                        <label className="md-lable" htmlFor="name">Name*</label>
                                                    </div>

                                                    <div className="contact_lable">
                                                        <input id="client_contact_no_display" name="contact_no_display" type="text" value={inquiryObj.contact_no_display} onChange={handleChange} className={`form-control contact-form ${errors.contact_no_display ? "error" : ""}`} minLength={10} maxLength={10} />
                                                        <label className="md-lable" htmlFor="client_contact_no_display">Phone Number*</label>
                                                        <div className="conatct_number_input">
                                                            <div
                                                                className="country_code_data"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setCountryFlag((prev) => !prev);
                                                                }}
                                                            >
                                                                <div className="section-paragraph">
                                                                    <span><img src={inquiryObj.flag} alt="" /></span>
                                                                    <p>+{inquiryObj.country}</p>
                                                                    <p>|</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {countryFlag && (
                                                            <div className="country_code_list_data active" onClick={(e) => e.stopPropagation()}>
                                                                <div className="search_c-code">
                                                                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                                                                </div>
                                                                <ul>
                                                                    {countryList.filter(c => c.phonecode.includes(search)).map((country, i) => (
                                                                        <li key={i} onClick={() => handleCountrySelect(country.phonecode, country.flag)}>
                                                                            <div>
                                                                                <img src={country.flag} alt="flag" />
                                                                                <span className="display_country_code">+{country.phonecode}</span>
                                                                                | &nbsp; {country.nicename}
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="contact_lable">
                                                        <input id="email" name="email" type="text" value={inquiryObj.email} onChange={handleChange} className={`form-control ${errors.email ? "error" : ""}`} />
                                                        <label className="md-lable" htmlFor="email">Email*</label>
                                                    </div>

                                                    <div className="contact_lable commentbox">
                                                        <input id="message" name="message" type="text" value={inquiryObj.message} onChange={handleChange} className={`form-control ${errors.message ? "error" : ""}`} />
                                                        <label className="md-lable" htmlFor="message">Message</label>
                                                    </div>

                                                    <p className="relative check_box_error get_update_text align_center">
                                                        <input type="checkbox" id="agree_tandc" name="agree_tandc" onChange={(e) => setInquiryObj(prev => ({ ...prev, department: e.target.checked ? "Yes" : "" }))} className="get_update_checkbox" />
                                                        <label className="darkgray-font" htmlFor="agree_tandc">Keep me updated.</label>
                                                    </p>

                                                    <div className="wfc m0auto homeSubmitBtn">
                                                        <button className="reecosys-template-button button-style-secondary" type="submit" disabled={formSubmitted}>
                                                            <p>{formSubmitted ? "Please Wait..." : "Submit"}</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

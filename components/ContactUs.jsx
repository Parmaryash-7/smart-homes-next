"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryList } from "store/countrySlice";
import { useRouter } from 'next/navigation'
import { setThankYouData } from 'store/inquirySlice'
import { Toast } from './Toast'
import { projectInquiry } from "lib/ProjectInquiry";
import "./ContactUs.css";
import api from "lib/api.interceptor";

export default function ContactUs({ pageList, contactDetails }) {
    const [inquiryObj, setInquiryObj] = useState({
        agree_tandc: "1",
        agree_tandc_display: true,
        contact_no: "",
        name: "",
        email: "",
        client_contact_no_display: "",
        country: "91",
        flag: "https://flagcdn.com/w40/in.webp",
        message: "",
        department: "",
        from_app: "true",
        logged_in_master_user_id: 339,
        master_user_id: 339
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    // const [countryList, setCountryList] = useState([]);
    const [countryFlag, setCountryFlag] = useState(false);
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState({});
    const [privacyData, setPrivacy] = useState(null);

    const router = useRouter()
    const dispatch = useDispatch();
    const { countryList, status } = useSelector((state) => state.country);

    // Load country list from redux store
    useEffect(() => {
        dispatch(fetchCountryList());
    }, [dispatch]);


    useEffect(() => {
        let privacyDData = {};
        if (privacyData == null) {
            privacyDData = pageList.find((page) => page.slug == "contact-us");
            setPrivacy(privacyDData);
        }
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInquiryObj((prev) => ({ ...prev, [name]: val }));

        let val = value;
        let error = false;

        // Validation patterns
        const nameRegex = /^[a-zA-Z\s]+$/;
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\d{10}$/;

        // Modify value & validate based on field
        // if (name === "name") {
        //     val = val.replace(/[0-9]/g, "");
        //     if (!val.trim() || !nameRegex.test(val)) error = true;
        // }

        if (name === "email") {
            if (!val.trim() || !emailRegex.test(val)) error = true;
        }

        if (name === "client_contact_no_display") {
            val = val.replace(/[^0-9]/g, "").slice(0, 10);
            if (!val.trim() || !phoneRegex.test(val)) error = true;
        }

        // if (name === "department") {
        //     if (!val.trim()) error = true;
        // }

        // Optional: message validation (if required)
        // if (name === "message") {
        //     if (!val.trim()) error = true;
        // }

        // Set error or clear it
        setErrors((prev) => ({ ...prev, [name]: error }));

        // Update the form state
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

        if (!inquiryObj.client_contact_no_display.trim()) newErrors.client_contact_no_display = true;
        else if (!phoneRegex.test(inquiryObj.client_contact_no_display)) newErrors.client_contact_no_display = true;

        if (!inquiryObj.department.trim()) newErrors.department = true;

        // if (!inquiryObj.message.trim()) newErrors.message = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setFormSubmitted(true);
        inquiryObj.contact_no = inquiryObj.country + ' ' + inquiryObj.client_contact_no_display;


        try {
            const response = await api.ContactInq(inquiryObj)
            // console.log(inquiryObj);
            if (response.success) {
                // alert("Form submitted successfully!");
                dispatch(setThankYouData({ page_name: 'Contact Us', document: [] }))
                router.push('/contact-us/thankyou')

                Toast(response.message)
                setInquiryObj({
                    agree_tandc: "1",
                    agree_tandc_display: true,
                    contact_no: "",
                    name: "",
                    email: "",
                    client_contact_no_display: "",
                    country: "91",
                    flag: "https://flagcdn.com/w40/in.webp",
                    message: "",
                    department: "",
                    from_app: "true",
                    logged_in_master_user_id: 339,
                    master_user_id: 339
                });
                setSearch("");
            }
            // Toast(response.message)
        } catch (error) {
            console.error(error);
        }

    };




    return (
        <div
            className="reecosys-main-wrapper"
            id="reecosys-main-wrapper"
            onClick={() => setCountryFlag(false)}
        >
            <div id="reecosys-contact-us-wrapper contact-us-wrapper" className="relative inner-flex-big inner-flex">

                {/* Banner Section */}
                <section
                    className="reecosys-section relative"
                    data-aos="fade-in"
                    data-aos-delay="600"
                    data-aos-duration="400"
                    id="reecosys-contact-us-section-1"
                >
                    <div className="common-listing-banner-about relative">
                        <img
                            src={`${privacyData?.banner_web_full}&w=1920&h=750`}
                            alt=""
                        />
                        <div className="common-banner-title-abs">
                            <div
                                className="banner-title"
                                data-aos="fade-up"
                                data-aos-delay="400"
                                data-aos-duration="600"
                            >
                                <h1 className="white-color capitalize">
                                    {privacyData?.banner_title}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="black_overlay "></div>
                </section>

                <section
                    className="reecosys-section section-padding-bottom contact_page_form relative"
                    data-aos="fade-in"
                    data-aos-delay="600"
                    data-aos-duration="400"
                    id="reecosys-contact-us-section-2"
                >
                    <div className="main-container-fluid ">
                        <div className="inner-flex inner-flex-medium">
                            {privacyData?.primary_text_display && (
                                <div className="section-title">
                                    <h2
                                        className="section-title highlight-color"
                                        dangerouslySetInnerHTML={{
                                            __html: privacyData.primary_text_display,
                                        }}
                                    />
                                </div>
                            )}

                            <div className="page-list-2-col-grid">
                                <div className="inner-flex inner-flex-medium">

                                    {/* Map */}
                                    <div className="mapiframe">
                                        <div>
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4553.478923843906!2d72.5414256!3d23.1139178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83930923a74f%3A0x129658ea84833cbd!2sSmartHomes%20Infrastructure%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1737636715820!5m2!1sen!2sin"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="border-radius-contact"
                                            ></iframe>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    {contactDetails?.contact_list?.[0]?.address && (
                                        <div className="inner-flex">
                                            <div className="contact-left_flex">
                                                <div className="icon">
                                                    <img src="/images/contact/call.svg" alt="" />
                                                </div>
                                                <div className="section-contentx link-font-size">
                                                    <p>
                                                        <a
                                                            className="semibold-fonts highlight-color"
                                                            href={`tel:${contactDetails.contact_list[0].details[0].contact_no}`}
                                                        >
                                                            {contactDetails.contact_list[0].details[0].contact_no}
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="contact-left_flex">
                                                <div className="icon">
                                                    <img src="/images/contact/email.svg" alt="" />
                                                </div>
                                                <div className="section-contentx link-font-size">
                                                    <p>
                                                        <a
                                                            className="semibold-fonts highlight-color"
                                                            href={`mailto:${contactDetails.contact_list[0].details[0].email_address}`}
                                                        >
                                                            {contactDetails.contact_list[0].details[0].email_address}
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="contact-left_flex_out">
                                                <div>
                                                    <div className="contact-left_flex">
                                                        <div className="icon">
                                                            <img src="/images/contact/location.svg" alt="" />
                                                        </div>
                                                        <div className="link-font-size location_para">
                                                            <p className="highlight-color">
                                                                {contactDetails.contact_list[0].address}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="contact_btn">
                                                    <a href={contactDetails.contact_list[0].map_url} target="_blank" rel="noreferrer">
                                                        <div className="" data-aos="fade-in"
                                                            data-aos-delay="700"
                                                            data-aos-duration="600">
                                                            <button className="reecosys-template-button button-style-secondary-outline">
                                                                <div className="map-icon">
                                                                    <span className="material-symbols-outlined">
                                                                        location_on
                                                                    </span>
                                                                </div>
                                                                <p>View on map</p>
                                                            </button>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Form */}
                                <div className="form-box green_lable form-box-top_padding border-radius-contact">
                                    <form
                                        id="contact"
                                        name="contact"
                                        onSubmit={handleSubmit}
                                        autoComplete="off" >
                                        <div className="form_wrapperx contact_form contact_form_flex">
                                            <div className="contact_lable">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    className={`form-control ${errors.name ? "error" : ""}`}
                                                    value={inquiryObj.name}
                                                    onChange={handleChange}

                                                    tabIndex="1"
                                                />
                                                {/* <label className="md-lable" htmlFor="name">Name*</label> */}

                                                <label className={`md-lable ${errors.name ? "error-label" : ""}`}>Name*</label>


                                            </div>
                                            <div className="contact_lable">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    className={`form-control ${errors.email ? "error" : ""}`}

                                                    value={inquiryObj.email}
                                                    onChange={handleChange}

                                                    tabIndex="2"
                                                />
                                                {/* <label className="md-lable" htmlFor="email">Email*</label> */}
                                                <label className={`md-lable ${errors.email ? "error-label" : ""}`}>Email*</label>
                                            </div>
                                            <div className="contact_lable relative">
                                                <input
                                                    id="contact_no"
                                                    name="client_contact_no_display"
                                                    type="tel"
                                                    className={`form-control contact-form ${errors.client_contact_no_display ? "error" : ""}`}
                                                    value={inquiryObj.client_contact_no_display}
                                                    onChange={handleChange}

                                                    // minLength="10"
                                                    // maxLength="10"
                                                    tabIndex="3"
                                                />
                                                {/* <label className="md-lable contact_code" htmlFor="contact_no">
                                                    Mobile Number*
                                                </label> */}
                                                <label className={`md-lable contact_code ${errors.client_contact_no_display ? "error-label" : ""}`}>
                                                    Mobile Number*
                                                </label>

                                                <div className="conatct_number_input">
                                                    <div
                                                        className="country_code_data"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setCountryFlag((prev) => !prev);
                                                        }}
                                                    >

                                                        <div className="section-paragraph">
                                                            <span>
                                                                <img src={inquiryObj.flag} alt="" />
                                                            </span>
                                                            <p>+{inquiryObj.country}</p>
                                                            <p>|</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`country_code_list_data ${countryFlag ? "active" : ""}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <div className="search_c-code">
                                                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                                                    </div>
                                                    <ul>
                                                        {countryList
                                                            .filter(
                                                                (item) =>
                                                                    item.phonecode.includes(search) ||
                                                                    item.nicename
                                                                        .toLowerCase()
                                                                        .includes(search.toLowerCase())
                                                            )
                                                            .map((item, index) => (
                                                                <li
                                                                    key={index}
                                                                    onClick={() =>
                                                                        handleCountrySelect(item.phonecode, item.flag)
                                                                    }
                                                                >
                                                                    <div>
                                                                        <img src={item.flag} alt="flag" />
                                                                        <span className="display_country_code">
                                                                            +{item.phonecode}
                                                                        </span>{" "}
                                                                        {item.nicename}
                                                                    </div>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="contact_lable select_option select_apr relative">
                                                <select
                                                    name="department"
                                                    className={`form-control ${errors.department ? "error" : ""}`}
                                                    id="department"
                                                    value={inquiryObj.department}
                                                    onChange={(e) =>
                                                        setInquiryObj((prev) => ({
                                                            ...prev,
                                                            department: e.target.value,
                                                        }))
                                                    }

                                                    tabIndex="4"
                                                >
                                                    <option value="" disabled className="gray-color">
                                                        {/* Select Department */}
                                                    </option>
                                                    {contactDetails?.contact_list?.[0]?.details?.map((dept, i) => (
                                                        <option
                                                            key={i}
                                                            value={dept.department}
                                                            className="capitalize"
                                                        >
                                                            {dept.department}
                                                        </option>
                                                    ))}
                                                </select>
                                                {/* <label
                                                    className="md-lable department_label"
                                                    htmlFor="department"
                                                >
                                                    Department*
                                                </label> */}
                                                <label className={`md-lable department_label ${errors.department ? "error-label" : ""}`}>Department*</label>

                                                <span className="material-symbols-outlined about-banner-text fa-icon">
                                                    keyboard_arrow_down
                                                </span>
                                            </div>
                                            <div className="contact_lable commentbox">
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    className="form-control"
                                                    value={inquiryObj.message}
                                                    onChange={handleChange}
                                                    rows="2"

                                                    tabIndex="5"
                                                />
                                                {/* <label className="md-lable" htmlFor="message">Comment</label> */}
                                                <label className={`md-lable ${errors.message ? "error-label" : ""}`} htmlFor="message">Comment</label>

                                            </div>
                                            {/* <p className="relative check_box_error get_update_text align_center">
                                                <input
                                                    className="get_update_checkbox"
                                                    type="checkbox"
                                                    id="agree_tandc"
                                                    name="agree_tandc"
                                                    tabIndex="6"
                                                />
                                                <label className="darkgray-font" htmlFor="agree_tandc">
                                                    Keep me updated.
                                                </label>
                                            </p> */}
                                            <div className="submit-button contact_submit border-div-venus-wrapper submit-button-contact form_button">
                                                <button
                                                    className="reecosys-template-button button-style-secondary w100x"
                                                    type="submit"
                                                    tabIndex="7"
                                                >
                                                    <p>{formSubmitted ? "Please Wait..." : "Submit"}</p>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

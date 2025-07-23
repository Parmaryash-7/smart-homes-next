'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountryList } from 'store/countrySlice';
import { useRouter } from 'next/navigation'
import { setThankYouData } from 'store/inquirySlice'
import { Toast } from "./Toast";
import api from 'lib/api.interceptor'

export default function ChannelPartner({ pageList }) {
    const [privacyData, setPrivacy] = useState(null);
    const [isMobilescreen, setMobilescreen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [errors, setErrors] = useState({});
    const [cp_save_f, setCpSaveF] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();
    const { countryList } = useSelector((state) => state.country);

    useEffect(() => {
        dispatch(fetchCountryList());
    }, [dispatch]);

    useEffect(() => {
        const found = pageList.find((page) => page.slug === "channelpartner");
        if (found) setPrivacy(found);
        if (window.innerWidth < 767) setMobilescreen(true);
    }, [pageList]);

    const [cpFormData, setCpFormData] = useState({
        AgreeTandC: "1",
        AgreeTandC_display: true,
        first_name: "",
        email_address: "",
        contact_no_display: "",
        birthdate: "",
        contact_no_display_2: "",
        country: "91",
        flag: "https://flagcdn.com/w40/in.webp",
        country2: "91",
        flag2: "https://flagcdn.com/w40/in.webp",
        country3: "91",
        flag3: "https://flagcdn.com/w40/in.webp",
        pan_no: "",
        aadhar_no: "",
        years_of_experience_in_real_estate: "",
        previous_projects_developers_worked_with: "",
        primary_areas_of_operation: "",
        nature_of_business: "",
        average_monthly_sales: "",
        bank_name: "",
        branch_name: "",
        account_holder_name: "",
        bank_account_no: "",
        ifsc_code: "",
        agree_tandc_display: false,
        reference_number_display: "",
        secondary_contact_no: ""
    });




    const [cpObj, setCpObj] = useState({
        company_type: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        company_url: "",
        gst_no: "",
    });

    const [countryDropdown1, setCountryDropdown1] = useState(false);
    const [countryDropdown2, setCountryDropdown2] = useState(false);
    const [countryDropdown3, setCountryDropdown3] = useState(false);

    // const handleInputChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     let newVal = type === "checkbox" ? checked : value;

    //     if (name === "first_name") newVal = newVal.replace(/[0-9]/g, "");
    //     if (name === "contact_no_display" || name === "contact_no_display_2") {
    //         newVal = newVal.replace(/[^0-9]/g, "").slice(0, 10);
    //     }
    //     // if (name === "aadhar_no") {
    //     //     newVal = newVal.replace(/[^0-9]/g, "").slice(0, 12);
    //     // }

    //     if (name === "reference_number") {
    //         newVal = newVal.replace(/[^0-9]/g, "").slice(0, 10);
    //     }
    //     setCpFormData((prev) => ({ ...prev, [name]: newVal }));
    //     setErrors((prev) => ({ ...prev, [name]: false }));
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCpObj((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: false }));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newVal = type === "checkbox" ? checked : value;
        let error = false;

        // Validation patterns
        const nameRegex = /^[a-zA-Z\s]+$/;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        const aadharRegex = /^[2-9]{1}[0-9]{11}$/;
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        // Cleanup and validate by field
        switch (name) {
            case "first_name":
                newVal = newVal.replace(/[0-9]/g, "");
                if (!newVal.trim() || !nameRegex.test(newVal)) error = true;
                break;
            case "email_address":
                if (!newVal.trim() || !emailRegex.test(newVal)) error = true;
                break;
            case "contact_no_display":
            case "contact_no_display_2":
            case "reference_number":
                newVal = newVal.replace(/[^0-9]/g, "").slice(0, 10);
                if (!newVal.trim() || !phoneRegex.test(newVal)) error = true;
                break;
            case "aadhar_no":
                newVal = newVal.replace(/[^0-9]/g, "").slice(0, 12);
                if (!newVal.trim() || !aadharRegex.test(newVal)) error = true;
                break;
            case "pan_no":
                newVal = newVal.toUpperCase();
                if (!newVal.trim() || !panRegex.test(newVal)) error = true;
                break;
            case "agree_tandc_display":
                if (!checked) error = true;
                break;
            default:
                break;
        }

        // Update form data
        setCpFormData((prev) => ({ ...prev, [name]: newVal }));

        // Update error state
        setErrors((prev) => ({ ...prev, [name]: error }));
    };



    const handleCountryClick = (code, flag) => {
        setCpFormData((prev) => ({ ...prev, country: code, flag }));
        setCountryDropdown1(false);
    };

    const handleCountryClick2 = (code, flag) => {
        setCpFormData((prev) => ({ ...prev, country2: code, flag2: flag }));
        setCountryDropdown2(false);
    };

    const handleCountryClick3 = (code, flag) => {
        setCpFormData((prev) => ({ ...prev, country3: code, flag3: flag }));
        setCountryDropdown3(false);
    };

    // const validateForm = () => {
    //     const newErrors = {};

    //     const nameRegex = /^[a-zA-Z\s]+$/;
    //     const phoneRegex = /^\d{10}$/;
    //     const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    //     const aadharRegex = /^[2-9]{1}[0-9]{11}$/;
    //     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    //     const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    //     const pincodeRegex = /^[1-9][0-9]{5}$/;

    //     if (!cpFormData.first_name.trim() || !nameRegex.test(cpFormData.first_name)) newErrors.first_name = true;
    //     if (!cpFormData.email_address.trim() || !emailRegex.test(cpFormData.email_address)) newErrors.email_address = true;
    //     if (!cpFormData.contact_no_display.trim() || !phoneRegex.test(cpFormData.contact_no_display)) newErrors.contact_no_display = true;
    //     if (!cpFormData.aadhar_no.trim() || !aadharRegex.test(cpFormData.aadhar_no)) newErrors.aadhar_no = true;
    //     if (!cpFormData.pan_no.trim() || !panRegex.test(cpFormData.pan_no.toUpperCase())) newErrors.pan_no = true;
    //     if (!cpObj.pincode.trim() || !pincodeRegex.test(cpObj.pincode)) newErrors.pincode = true;
    //     if (!cpObj.gst_no.trim() || !gstRegex.test(cpObj.gst_no.toUpperCase())) newErrors.gst_no = true;
    //     if (!cpFormData.agree_tandc_display) newErrors.agree_tandc_display = true;

    //     // console.log("Validation errors",);
    //     return newErrors;
    // };

    // console.log("cpFormData:", cpFormData);
    // console.log("cpObj:", cpObj);


    // const handleSubmit = async (e) => {
    //     console.log("🚀 Submit clicked");
    //     e.preventDefault();

    //     const validationErrors = validateForm();
    //     if (Object.keys(validationErrors).length > 0) {
    //         setErrors(validationErrors);
    //         return;
    //     }

    //     setCpSaveF(true);

    //     // Combine all data into one payload
    //     const contactPayload = {
    //         ...cpFormData,
    //         ...cpObj,
    //         pan_no: cpFormData.pan_no.toUpperCase(),
    //         contact_no: cpFormData.country + ' ' + cpFormData.contact_no_display,
    //         reference_number: cpFormData.country + ' ' + cpFormData.contact_no_display_2,
    //         from_app: "true",
    //         logged_in_master_user_id: 339,
    //         master_user_id: 339,
    //         company_id: 14,
    //         is_crown: "0",
    //         last_name: "",
    //         company_name: "",
    //         associated_company: false,
    //         reference_name: "",
    //     };
    //     console.log(contactPayload)

    //     try {
    //         const response = await api.ContactInq(contactPayload);
    //         console.log(response)
    //         if (response.success) {
    //             dispatch(setThankYouData({
    //                 type: "channelpartner",
    //                 name: cpFormData.first_name,
    //             }));
    //             router.push("/channel-partner/thank-you");

    //             setCpFormData({
    //                 AgreeTandC: "1",
    //                 AgreeTandC_display: true,
    //                 agree_tandc_display: true,
    //                 first_name: "",
    //                 email_address: "",
    //                 contact_no_display: "",
    //                 contact_no_display_2: "",
    //                 country: "91",
    //                 flag: "https://flagcdn.com/w40/in.webp",
    //                 country2: "91",
    //                 flag2: "https://flagcdn.com/w40/in.webp",
    //                 country3: "91",
    //                 flag3: "https://flagcdn.com/w40/in.webp",
    //                 pan_no: "",
    //                 aadhar_no: "",
    //                 years_of_experience_in_real_estate: "",
    //                 previous_projects_developers_worked_with: "",
    //                 primary_areas_of_operation: "",
    //                 nature_of_business: "",
    //                 average_monthly_sales: "",
    //                 bank_name: "",
    //                 branch_name: "",
    //                 account_holder_name: "",
    //                 bank_account_no: "",
    //                 ifsc_code: "",
    //                 agree_tandc_display: false,
    //             });

    //             setCpObj({
    //                 company_type: "",
    //                 address: "",
    //                 city: "",
    //                 state: "",
    //                 pincode: "",
    //                 company_url: "",
    //                 gst_no: "",
    //             });

    //             setErrors({});
    //         }
    //         Toast(response.message || "Something went wrong!");
    //     } catch (err) {
    //         console.error("Submission error", err);
    //         alert("Submission failed.");
    //     } finally {
    //         setCpSaveF(false);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        const nameRegex = /^[a-zA-Z\s]+$/;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        const aadharRegex = /^[2-9]{1}[0-9]{11}$/;
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        const pincodeRegex = /^[1-9][0-9]{5}$/;

        // Validate fields
        if (!cpFormData.first_name.trim() || !nameRegex.test(cpFormData.first_name)) newErrors.first_name = true;
        if (!cpFormData.email_address.trim() || !emailRegex.test(cpFormData.email_address)) newErrors.email_address = true;
        if (!cpFormData.contact_no_display.trim() || !phoneRegex.test(cpFormData.contact_no_display)) newErrors.contact_no_display = true;
        if (!cpFormData.aadhar_no.trim() || !aadharRegex.test(cpFormData.aadhar_no)) newErrors.aadhar_no = true;
        if (!cpFormData.pan_no.trim() || !panRegex.test(cpFormData.pan_no.toUpperCase())) newErrors.pan_no = true;
        if (!cpObj.pincode.trim() || !pincodeRegex.test(cpObj.pincode)) newErrors.pincode = true;
        if (!cpFormData.agree_tandc_display) newErrors.agree_tandc_display = true;
        // if (!cpObj.gst_no.trim() || !gstRegex.test(cpObj.gst_no.toUpperCase())) newErrors.gst_no = true;

        if (Object.keys(newErrors).length > 0) {

            setErrors(newErrors);
            // console.log("Form Errors:", newErrors);
            setCpSaveF(false);
            return;
        }

        setErrors({});
        setCpSaveF(true);

        const contactPayload = {
            ...cpFormData,
            ...cpObj,
            pan_no: cpFormData.pan_no.toUpperCase(),
            contact_no: cpFormData.country + ' ' + cpFormData.contact_no_display,
            reference_number: cpFormData.country + ' ' + cpFormData.contact_no_display_2,
            secondary_contact_no: cpFormData.country + ' ' + cpFormData.contact_no_display_2,
            from_app: "true",
            logged_in_master_user_id: 339,
            master_user_id: 339,
            company_id: 14,
            is_crown: "0",
            last_name: "",
            company_name: "",
            birthdate: Math.floor(Date.now() / 1000),
            associated_company: false,
            reference_name: "Test",
        };

        // Filter out empty, null, undefined and `false` boolean values
        const filteredPayload = Object.fromEntries(
            Object.entries(contactPayload).filter(
                ([_, value]) =>
                    value !== "" &&
                    value !== null &&
                    value !== undefined &&
                    !(typeof value === "boolean" && value === false)
            )
        );

        // console.log("✅ Final Submitted Data:", filteredPayload);

        try {
            const response = await api.ChannelInquiry(contactPayload);

            if (response.success) {
                dispatch(setThankYouData({
                    type: "channelpartner",
                    name: cpFormData.first_name,
                }));

                router.push("/channel-partner/thank-you");

                // Reset forms
                setCpFormData({
                    AgreeTandC: "1",
                    AgreeTandC_display: true,
                    first_name: "",
                    email_address: "",
                    contact_no_display: "",
                    contact_no_display_2: "",
                    country: "91",
                    flag: "https://flagcdn.com/w40/in.webp",
                    country2: "91",
                    flag2: "https://flagcdn.com/w40/in.webp",
                    country3: "91",
                    flag3: "https://flagcdn.com/w40/in.webp",
                    pan_no: "",
                    aadhar_no: "",
                    years_of_experience_in_real_estate: "",
                    previous_projects_developers_worked_with: "",
                    primary_areas_of_operation: "",
                    nature_of_business: "",
                    average_monthly_sales: "",
                    bank_name: "",
                    branch_name: "",
                    account_holder_name: "",
                    bank_account_no: "",
                    ifsc_code: "",
                    agree_tandc_display: false,
                    birthdate: ''
                });

                setCpObj({
                    company_type: "",
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                    company_url: "",
                    gst_no: "",
                });

                setErrors({});
            }

            Toast(response.message);
        } catch (error) {
            console.error("❌ Submission error:", error);
        }
    };



    return (
        <>
            <div
                className="reecosys-main-wrapper"
                id="reecosys-main-wrapper"
                onClick={(e) => {
                    e.stopPropagation();
                    setCountryDropdown1(false);
                    setCountryDropdown2(false);
                    setCountryDropdown3(false);
                }}
            >
                <div id="reecosys-contact-us-wrapper" className="relative inner-flex-big inner-flex">
                    <section
                        className="reecosys-section relative"
                        data-aos="fade-in"
                        data-aos-delay="600"
                        data-aos-duration="600"
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
                        <div className="black_overlay"></div>
                    </section>
                    <section className="reecosys-section section-padding-bottom relative" data-aos="fade-in"
                        data-aos-delay="700"
                        data-aos-duration="600" id="reecosys-contact-us-section-2"  >
                        <div className="main-container-fluid">
                            <div className="inner-flex inner-flex-medium">
                                <div className="section-title">
                                    <h2 className="capitalize highlight-color">
                                        {privacyData?.title}
                                    </h2>
                                </div>
                                <div className="page-list-2-col-grid">
                                    <div className="section-content channelPartnerDescription">
                                        <p
                                            className=""
                                            dangerouslySetInnerHTML={{
                                                __html: privacyData?.primary_text_display || "",
                                            }}
                                        />
                                    </div>

                                    <div className="form-box green_lable form-box-top_padding form_bg_input border-radius-contact">
                                        {/* <form id="cp_form_data"> */}
                                        <form id="cp_form_data" onSubmit={handleSubmit}>
                                            <div className="section-paragraph flb100" style={{ paddingBottom: "1rem" }}>
                                                <p className="secondary-highlight-color">1. Personal Details</p>
                                            </div>
                                            <div className="form_wrapperx cp_form_flex contact_formx" style={{ padding: "2rem 0 0" }}>
                                                <div className="contact_lable">
                                                    <input
                                                        id="first_name"
                                                        name="first_name"
                                                        value={cpFormData.first_name}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        className={`form-control ${errors.first_name ? "error" : ""}`}
                                                        tabIndex="11"
                                                    />
                                                    <label className="md-lable" htmlFor="first_name">Full Name*</label>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="email_address"
                                                        name="email_address"
                                                        value={cpFormData.email_address}
                                                        onChange={handleInputChange}
                                                        type="email"
                                                        className={`form-control ${errors.email_address ? "error" : ""}`}
                                                        autoComplete="off"
                                                        tabIndex="12"
                                                    />
                                                    <label className="md-lable" htmlFor="email_address">Email*</label>
                                                </div>

                                                {/* Mobile Number 1 */}
                                                <div className="contact_lable relative">
                                                    <input
                                                        id="contact_no"
                                                        name="contact_no_display"
                                                        value={cpFormData.contact_no_display}
                                                        onChange={handleInputChange}
                                                        type="tel"
                                                        minLength="10"
                                                        maxLength="10"
                                                        className={`form-control contact-form ${errors.contact_no_display ? "error" : ""}`}
                                                        tabIndex="13"
                                                    />
                                                    <label className="md-lable contact_code" htmlFor="contact_no">Mobile Number*</label>
                                                    <div className="conatct_number_input">
                                                        <div
                                                            className="country_code_data"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setCountryDropdown1(!countryDropdown1);
                                                                setCountryDropdown2(false);
                                                            }}
                                                        >
                                                            <div className="section-paragraph">
                                                                <span><img src={cpFormData.flag} alt="" /></span>
                                                                <p>+{cpFormData.country}</p>
                                                                <p>|</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {countryDropdown1 && (
                                                        <div className="country_code_list_data active" onClick={(e) => e.stopPropagation()}>
                                                            <div className="search_c-code">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search"
                                                                    value={searchTerm}
                                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                                />
                                                            </div>
                                                            <ul>
                                                                {countryList
                                                                    .filter((c) =>
                                                                        c.nicename.toLowerCase().includes(searchTerm.toLowerCase())
                                                                    )
                                                                    .map((c, i) => (
                                                                        <li key={i} onClick={() => handleCountryClick(c.phonecode, c.flag)}>
                                                                            <div onClick={(e) => e.preventDefault()}>
                                                                                <div><img src={c.flag} alt="flag" /></div>
                                                                                <span className="display_country_code">+{c.phonecode}</span>
                                                                                {c.nicename}
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Alternate Number */}
                                                <div className="contact_lable relative">
                                                    <input
                                                        id="contact_no_2"
                                                        name="contact_no_display_2"
                                                        value={cpFormData.contact_no_display_2}
                                                        onChange={handleInputChange}
                                                        type="tel"
                                                        minLength="10"
                                                        maxLength="10"
                                                        className="form-control contact-form"
                                                        tabIndex="14"
                                                    />
                                                    <label className="md-lable contact_code" htmlFor="contact_no_2">Alternate Mobile Number</label>
                                                    <div className="conatct_number_input">
                                                        <div
                                                            className="country_code_data"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setCountryDropdown2(!countryDropdown2);
                                                                setCountryDropdown1(false);
                                                                setCountryDropdown3(false);
                                                            }}
                                                        >
                                                            <div className="section-paragraph">
                                                                <span><img src={cpFormData.flag2} alt="" /></span>
                                                                <p>+{cpFormData.country2}</p>
                                                                <p>|</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {countryDropdown2 && (
                                                        <div
                                                            className="country_code_list_data active"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <div className="search_c-code">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search"
                                                                    value={searchTerm}
                                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                                />
                                                            </div>
                                                            <ul>
                                                                {countryList
                                                                    .filter((c) =>
                                                                        c.nicename.toLowerCase().includes(searchTerm.toLowerCase())
                                                                    )
                                                                    .map((c, i) => (
                                                                        <li key={i} onClick={() => handleCountryClick2(c.phonecode, c.flag)}>
                                                                            <div>
                                                                                <div><img src={c.flag} alt="flag" /></div>
                                                                                <span className="display_country_code">+{c.phonecode}</span>
                                                                                {c.nicename}
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>


                                                {/* PAN Number */}
                                                <div className="contact_lable">
                                                    <input
                                                        id="pan_no"
                                                        name="pan_no"
                                                        value={cpFormData.pan_no}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        // className="form-control"
                                                        className={`form-control ${errors.pan_no ? "error" : ""}`}
                                                        minLength="10"
                                                        maxLength="10"
                                                        tabIndex="15"
                                                        style={{ textTransform: "uppercase" }}
                                                    />
                                                    <label className="md-lable" htmlFor="pan_no">PAN Number*</label>
                                                </div>

                                                {/* Aadhar Number */}
                                                <div className="contact_lable">
                                                    <input
                                                        id="aadhar_no"
                                                        name="aadhar_no"
                                                        value={cpFormData.aadhar_no}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        // className="form-control"
                                                        className={`form-control ${errors.aadhar_no ? "error" : ""}`}
                                                        pattern="\d*"
                                                        inputMode="numeric"
                                                        minLength="12"
                                                        maxLength="12"
                                                        tabIndex="16"
                                                    />
                                                    <label className="md-lable" htmlFor="aadhar_no">Aadhar Number*</label>
                                                </div>

                                                <div className="section-paragraph flb100" style={{ padding: "2rem 0 1rem" }}>
                                                    <p className="secondary-highlight-color">2. Company Details (If Applicable)</p>
                                                </div>

                                                <div className="contact_lable">
                                                    <select
                                                        name="company_type"
                                                        className="form-control"
                                                        id="company_type"
                                                        value={cpObj.company_type}
                                                        onChange={handleChange}
                                                        tabIndex={17}
                                                    >
                                                        <option value="" disabled></option>
                                                        <option value="Proprietorship">Proprietorship</option>
                                                        <option value="Partnership">Partnership</option>
                                                        <option value="Pvt. Ltd">Pvt. Ltd</option>
                                                        <option value="LLP">LLP</option>
                                                        <option value="Others">Others</option>
                                                    </select>
                                                    <label className="md-lable" htmlFor="company_type">Company Type</label>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="address"
                                                        name="address"
                                                        type="text"
                                                        className="form-control"
                                                        tabIndex={18}
                                                        value={cpObj.address}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="md-lable" htmlFor="address">Registered Business Address</label>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        className="form-control"
                                                        tabIndex={19}
                                                        value={cpObj.city}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="md-lable" htmlFor="city">City</label>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="state"
                                                        name="state"
                                                        type="text"
                                                        className="form-control"
                                                        tabIndex={20}
                                                        value={cpObj.state}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="md-lable" htmlFor="state">State</label>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="Pincode"
                                                        name="pincode"
                                                        type="text"
                                                        className="form-control"
                                                        tabIndex={21}
                                                        minLength={6}
                                                        maxLength={6}
                                                        value={cpObj.pincode}
                                                        onChange={handleChange}
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                    />
                                                    <label className="md-lable" htmlFor="Pincode">Pincode</label>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="company_url"
                                                        name="company_url"
                                                        type="url"
                                                        className="form-control"
                                                        tabIndex={22}
                                                        value={cpObj.company_url}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="md-lable" htmlFor="company_url">Company Website</label>
                                                </div>

                                                <div className="contact_lable flb100">
                                                    <input
                                                        id="gst_no"
                                                        name="gst_no"
                                                        type="text"
                                                        className="form-control"
                                                        tabIndex={23}
                                                        value={cpObj.gst_no}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="md-lable" htmlFor="gst_no">GST Number</label>
                                                </div>
                                                <div className="section-paragraph flb100" style={{ padding: "2rem 0 1rem" }}>
                                                    <p className="secondary-highlight-color">
                                                        3. Business Experience & Real Estate Background
                                                    </p>
                                                </div>

                                                <div className="contact_lable">
                                                    <select
                                                        name="years_of_experience_in_real_estate"
                                                        className="form-control"
                                                        id="years_of_experience_in_real_estate"

                                                        value={cpFormData.years_of_experience_in_real_estate}
                                                        onChange={handleInputChange}
                                                        tabIndex="24"
                                                    >
                                                        <option value="" disabled></option>
                                                        <option value="1-3">1-3</option>
                                                        <option value="3-5">3-5</option>
                                                        <option value="5-10">5-10</option>
                                                        <option value="10+">10+</option>
                                                    </select>
                                                    <label className="md-lable" htmlFor="years_of_experience_in_real_estate">
                                                        Years of Experience in Real Estate
                                                    </label>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="previous_projects_developers_worked_with"
                                                        name="previous_projects_developers_worked_with"
                                                        value={cpFormData.previous_projects_developers_worked_with}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        className="form-control"
                                                        tabIndex="25"
                                                    />
                                                    <label className="md-lable" htmlFor="previous_projects_developers_worked_with">
                                                        Previous Projects/Developers Worked With
                                                    </label>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="primary_areas_of_operation"
                                                        name="primary_areas_of_operation"
                                                        value={cpFormData.primary_areas_of_operation}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        className="form-control"
                                                        tabIndex="26"
                                                    />
                                                    <label className="md-lable" htmlFor="primary_areas_of_operation">
                                                        Primary Areas of Operation (Cities/Regions)
                                                    </label>
                                                </div>

                                                <div className="contact_lable">
                                                    <select
                                                        name="nature_of_business"
                                                        className="form-control"
                                                        id="nature_of_business"
                                                        value={cpFormData.nature_of_business}
                                                        onChange={handleInputChange}
                                                        tabIndex="27"
                                                    >
                                                        <option value=""></option>
                                                        <option value="Broker">Broker</option>
                                                        <option value="Consultant">Consultant</option>
                                                        <option value="Firm">Firm</option>
                                                        <option value="Agency">Agency</option>
                                                        <option value="Investment Firm">Investment Firm</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    <label className="md-lable" htmlFor="nature_of_business">Nature of Business</label>
                                                </div>

                                                <div className="contact_lable flb100">
                                                    <select
                                                        name="average_monthly_sales"
                                                        className="form-control"
                                                        id="average_monthly_sales"
                                                        value={cpFormData.average_monthly_sales}
                                                        onChange={handleInputChange}
                                                        tabIndex="28"
                                                    >
                                                        <option value=""></option>
                                                        <option value="< 5 Cr">&lt; 5 Cr</option>
                                                        <option value="5-10 Cr">5-10 Cr</option>
                                                        <option value="10-20 Cr">10-20 Cr</option>
                                                        <option value="20+ Cr">20+ Cr</option>
                                                    </select>
                                                    <label className="md-lable" htmlFor="average_monthly_sales">Average Monthly Sales Volume</label>
                                                </div>
                                                <div className="section-paragraph flb100" style={{ padding: "2rem 0 1rem" }}>
                                                    <p className="secondary-highlight-color">
                                                        4 .Banking Details (For Commission Payments)
                                                    </p>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="bank_name"
                                                        name="bank_name"
                                                        value={cpFormData.bank_name}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        className="form-control"
                                                        tabIndex="29"
                                                    />
                                                    <label className="md-lable" htmlFor="bank_name">Bank Name</label>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="branch_name"
                                                        name="branch_name"
                                                        value={cpFormData.branch_name}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        className="form-control"
                                                        tabIndex="30"
                                                    />
                                                    <label className="md-lable" htmlFor="branch_name">Branch Name & Address</label>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="account_holder_name"
                                                        name="account_holder_name"
                                                        value={cpFormData.account_holder_name}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        className="form-control"
                                                        tabIndex="31"
                                                    />
                                                    <label className="md-lable" htmlFor="account_holder_name">Account Holder's Name</label>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="bank_account_no"
                                                        name="bank_account_no"
                                                        value={cpFormData.bank_account_no}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        className="form-control"
                                                        tabIndex="32"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                    />
                                                    <label className="md-lable" htmlFor="bank_account_no">Account Number</label>
                                                </div>

                                                <div className="contact_lable flb100">
                                                    <input
                                                        id="ifsc_code"
                                                        name="ifsc_code"
                                                        value={cpFormData.ifsc_code}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        className="form-control"
                                                        style={{ textTransform: "uppercase" }}
                                                        tabIndex="33"
                                                    />
                                                    <label className="md-lable" htmlFor="ifsc_code">IFSC Code</label>
                                                </div>

                                                <div className="section-paragraph flb100" style={{ padding: "2rem 0 1rem" }}>
                                                    <p className="secondary-highlight-color">5 . Referee Details</p>
                                                </div>

                                                <div className="contact_lable">
                                                    <input
                                                        id="reference_name"
                                                        name="reference_name"
                                                        type="text"
                                                        tabIndex="34"
                                                        autoComplete="off"
                                                        className="form-control"
                                                        value={cpFormData.reference_name}
                                                        onChange={handleInputChange}
                                                    />
                                                    <label className="md-lable" htmlFor="reference_name">Reference Name</label>
                                                </div>

                                                <div className="contact_lable relative">
                                                    <input
                                                        id="reference_number"
                                                        name="reference_number"
                                                        type="tel"
                                                        minLength="10"
                                                        maxLength="10"
                                                        className="form-control contact-form"
                                                        tabIndex="35"
                                                        value={cpFormData.reference_number}
                                                        onChange={handleInputChange}
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                    />
                                                    <label className="md-lable contact_code" htmlFor="reference_number">Reference Number</label>

                                                    <div className="conatct_number_input">
                                                        <div
                                                            className="country_code_data"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setCountryDropdown3(!countryDropdown3);
                                                                setCountryDropdown1(false);
                                                                setCountryDropdown2(false);
                                                            }}
                                                        >
                                                            <div className="section-paragraph">
                                                                <span><img src={cpFormData.flag3} alt="" /></span>
                                                                <p>+{cpFormData.country3}</p>
                                                                <p>|</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {countryDropdown3 && (
                                                        <div className="country_code_list_data active" onClick={(e) => e.stopPropagation()}>
                                                            <div className="search_c-code">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search"
                                                                    value={searchTerm}
                                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                                />
                                                            </div>
                                                            <ul>
                                                                {countryList
                                                                    .filter((c) => c.nicename.toLowerCase().includes(searchTerm.toLowerCase()))
                                                                    .map((c, i) => (
                                                                        <li
                                                                            key={i}
                                                                            onClick={() => handleCountryClick3(c.phonecode, c.flag)}
                                                                        >
                                                                            <div>
                                                                                <div><img src={c.flag} alt="flag" /></div>
                                                                                <span className="display_country_code">+{c.phonecode}</span>
                                                                                {c.nicename}
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flb100">
                                                    <p className="relative check_box_error get_update_text align_center">
                                                        <input
                                                            type="checkbox"
                                                            id="AgreeTandC"
                                                            name="AgreeTandC"

                                                            className="get_update_checkbox"
                                                            tabIndex="36"
                                                            checked={cpFormData.agree_tandc_display}
                                                            onChange={(e) =>
                                                                setCpFormData({
                                                                    ...cpFormData,
                                                                    agree_tandc_display: e.target.checked,
                                                                })
                                                            }
                                                        />
                                                        <label className={`darkgray-font ${errors.agree_tandc_display ? "error-label-red" : "darkgray-font"}`} htmlFor="AgreeTandC" onChange={handleChange}>
                                                            I confirm that the information provided is accurate and true. I agree to
                                                            abide by the terms and conditions of SmartHomes Infrastructure Pvt. Ltd.
                                                            as a Channel Partner.
                                                        </label>
                                                    </p>
                                                </div>

                                                {/* <div className="submit-button border-div-venus-wrapper form_button w100x flb100">
                                                    <button onClick={(e) => { e.stopPropagation(); handleSubmit(e) }}
                                                        className="reecosys-template-button button-style-secondary w100x"
                                                        type="submit"
                                                        tabIndex="37"
                                                    >
                                                        <p>{cp_save_f ? "Please Wait..." : "Submit"}</p>
                                                    </button>
                                                </div> */}
                                                <div className="submit-button border-div-venus-wrapper form_button w100x flb100">
                                                    <button
                                                        className="reecosys-template-button button-style-secondary w100x"
                                                        type="submit"
                                                        tabIndex="37"
                                                    >
                                                        <p>{cp_save_f ? "Please Wait..." : "Submit"}</p>
                                                    </button>
                                                </div>

                                            </div>

                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
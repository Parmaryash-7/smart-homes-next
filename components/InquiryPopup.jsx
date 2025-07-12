"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeInquiry } from '../store/inquirySlice';
import { fetchCountryList } from '../store/countrySlice';
import './InquiryPopup.css';

export default function InquiryPopup() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.inquiry.isOpen);
    const countryList = useSelector((state) => state.country.list);

    const [form, setForm] = useState({
        project_id: '',
        client_name: '',
        client_contact_no_display: '',
        email_address: '',
        remarks: '',
        flag: '/images/flags/in.png',
        country: '91',
    });

    const [search, setSearch] = useState('');
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [save_inquiry_detail_f, setSaveInquiryDetailF] = useState(false);

    useEffect(() => {
        dispatch(fetchCountryList());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaveInquiryDetailF(true);

        setTimeout(() => {
            alert('Form submitted!');
            setSaveInquiryDetailF(false);
            dispatch(closeInquiry());
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <section
            className="section-padding"
            style={{
                height: '100svh',
                display: 'grid',
                placeItems: 'center',
                background: '#FFFFFF',
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                overflowY: 'auto',
            }}
            onClick={() => dispatch(closeInquiry())}
        >
            <div className="main-container" onClick={(e) => e.stopPropagation()}>
                <div className="contactFormWrapper relative" style={{ zIndex: 2 }}>
                    <div className="section-title wow fadeInUp" data-wow-duration="0.4s" data-wow-delay="0.6s">
                        <h2>Inquire Now</h2>
                    </div>

                    <div className="contactForm detailForm w100 wow fadeIn" data-wow-duration="0.5s" data-wow-delay="0.6s">
                        <form id="detailForm" name="detailForm" onSubmit={handleSubmit}>
                            <div className="contact_lable select_option select_apr relative">
                                <select
                                    name="project_id"
                                    className="form-control"
                                    id="project_id"
                                    value={form.project_id}
                                    required
                                    autoComplete="off"
                                    tabIndex="1"
                                    onChange={(e) => setForm({ ...form, project_id: e.target.value })}
                                >
                                    <option value="" disabled className="gray-color">
                                        Select Projects
                                    </option>
                                    <option value="101" className="capitalize">
                                        Sample Project A
                                    </option>
                                    <option value="102" className="capitalize">
                                        Sample Project B
                                    </option>
                                </select>
                                <label className="md-lable project_id_label" htmlFor="project_id">
                                    Project*
                                </label>
                                <div className="fa-icon">
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                </div>
                            </div>

                            <div className="contact_lable">
                                <input
                                    type="text"
                                    name="client_name"
                                    id="client_name"
                                    className="form-control"
                                    required
                                    tabIndex="2"
                                    value={form.client_name}
                                    onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                                />
                                <label className="md-lable" htmlFor="client_name">
                                    Full Name*
                                </label>
                            </div>

                            <div className="contact_lable">
                                <input
                                    type="text"
                                    name="client_contact_no_display"
                                    id="client_contact_no_display"
                                    className="form-control contact-form"
                                    minLength="10"
                                    maxLength="10"
                                    required
                                    tabIndex="3"
                                    value={form.client_contact_no_display}
                                    onChange={(e) => setForm({ ...form, client_contact_no_display: e.target.value })}
                                />
                                <label className="md-lable" htmlFor="client_contact_no_display">
                                    Phone Number*
                                </label>

                                <div className="conatct_number_input">
                                    <div
                                        className="country_code_data"
                                        onClick={(e) => {
                                            setShowCountryDropdown(!showCountryDropdown);
                                            e.stopPropagation();
                                        }}
                                    >
                                        <div className="section-paragraph">
                                            <span>
                                                <img src={form.flag} alt="" />
                                            </span>
                                            <p>+{form.country}</p>
                                            <p>|</p>
                                        </div>
                                    </div>
                                </div>

                                {showCountryDropdown && (
                                    <div
                                        className={`country_code_list_data ${showCountryDropdown ? 'active' : ''}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="search_c-code">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                        <ul>
                                            {countryList
                                                .filter((c) =>
                                                    c.nicename.toLowerCase().includes(search.toLowerCase()) ||
                                                    c.phonecode.includes(search)
                                                )
                                                .map((c) => (
                                                    <li
                                                        key={c.phonecode}
                                                        onClick={() => {
                                                            setForm({ ...form, country: c.phonecode, flag: c.flag });
                                                            setShowCountryDropdown(false);
                                                        }}
                                                    >
                                                        <div>
                                                            <img src={c.flag} alt="flag" />
                                                            <span className="display_country_code">+{c.phonecode}</span> | &nbsp;
                                                            {c.nicename}
                                                        </div>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="contact_lable">
                                <input
                                    type="email"
                                    name="email_address"
                                    id="email_address"
                                    className="form-control"
                                    tabIndex="4"
                                    value={form.email_address}
                                    onChange={(e) => setForm({ ...form, email_address: e.target.value })}
                                />
                                <label className="md-lable" htmlFor="email_address">
                                    Email Address
                                </label>
                            </div>

                            <div className="contact_lable commentbox">
                                <textarea
                                    id="remarks"
                                    name="remarks"
                                    className="form-control"
                                    rows="1"
                                    tabIndex="5"
                                    value={form.remarks}
                                    onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                                ></textarea>
                                <label className="md-lable" htmlFor="remarks">
                                    Comments
                                </label>
                            </div>

                            <div className="wfc m0auto homeSubmitBtn">
                                <button
                                    className="reecosys-template-button button-style-secondary"
                                    tabIndex="6"
                                    disabled={save_inquiry_detail_f}
                                    type="submit"
                                >
                                    <p>{save_inquiry_detail_f ? 'Please Wait...' : 'Submit'}</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
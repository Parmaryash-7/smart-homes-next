'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setThankYouData } from 'store/inquirySlice';
import { closeCareerInquiry } from 'store/inquiryCareerSlice';
import { fetchCountryList } from 'store/countrySlice';
import api from 'lib/api.interceptor.js';
import { Toast } from './Toast';
import './InquiryCareerPopup.css';

export default function InquiryCareer() {
  const isOpen = useSelector((state) => state.inquiryCareer.isOpen);
  const router = useRouter();
  const dispatch = useDispatch();
  const [countryFlag, setCountryFlag] = useState(false);
  const [search, setSearch] = useState('');
  const [saveCareer, setSaveCareer] = useState(false);
  const { countryList } = useSelector((state) => state.country);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    agree_tandc: "1",
    name: '',
    email: '',
    contact_no_display: '',
    country: '91',
    contact_no: '',
    current_company: '',
    experience: "2 - 3 Years",
    from_app: "true",
    logged_in_master_user_id: 339,
    master_user_id: 339,
    department: "Sales Executive",
    current_designation: '',
    resume_upload: '',
    agree_tandc_display: true,
    resume: '',
    flag: 'https://flagcdn.com/w40/in.webp',
  });

  useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleCountrySelect = (phonecode, flag) => {
    setForm((prev) => ({
      ...prev,
      country: phonecode,
      flag,
    }));
    setCountryFlag(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const res = await api.CareerFileUpload(file)
    if (res.success) {
      // console.log(res);
      setForm({ ...form, resume_upload: file, resume: res.file_name });
    }
    Toast(res.message)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saveCareer) return;

    const validateCareerForm = (form) => {
      const errors = {};
      const nameRegex = /^[a-zA-Z\s]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;

      if (!form.name.trim()) {
        errors.name = 'Name is required';
      } else if (!nameRegex.test(form.name)) {
        errors.name = 'Only letters allowed';
      }

      if (!form.email.trim()) {
        errors.email = 'Email is required';
      } else if (!emailRegex.test(form.email)) {
        errors.email = 'Invalid email';
      }

      if (!form.contact_no_display.trim()) {
        errors.contact_no_display = 'Phone number is required';
      } else if (!phoneRegex.test(form.contact_no_display)) {
        errors.contact_no_display = 'Must be 10 digits';
      }

      if (!form.current_company.trim()) {
        errors.current_company = 'Current company is required';
      }

      if (!form.current_designation.trim()) {
        errors.current_designation = 'Current designation is required';
      }

      if (!form.resume_upload) {
        errors.resume_upload = 'Resume is required';
      }

      return errors;
    };

    const newErrors = validateCareerForm(form);
    setErrors(newErrors);

    // if (Object.keys(newErrors).length > 0) {
    //   Toast('Please correct the highlighted fields');
    //   return;
    // }

    setSaveCareer(true);

    // const formData = new FormData();
    // formData.append('name', form.name);
    // formData.append('email', form.email);
    // formData.append('contact_no', `+${form.country} ${form.contact_no_display}`);
    // formData.append('current_company', form.current_company);
    // formData.append('current_designation', form.current_designation);
    // formData.append('agree_tandc_display', form.agree_tandc_display);
    // formData.append('resume_upload', form.resume_upload);
    form.contact_no = `+${form.country} ${form.contact_no_display}`
    // console.log(form);
    try {
      const response = await api.CareerInquiry(form);
      Toast(response.message);
      if (response.success) {
        dispatch(closeCareerInquiry());
        dispatch(
            setThankYouData({
              page_name: 'Career',
              document: []
            })
          )
        router.push('/career/thankyou');
        setForm({
          agree_tandc: "1",
          name: '',
          email: '',
          contact_no_display: '',
          country: '91',
          contact_no: '',
          current_company: '',
          experience: "2 - 3 Years",
          from_app: "true",
          logged_in_master_user_id: 339,
          master_user_id: 339,
          department: "Sales Executive",
          current_designation: '',
          resume_upload: '',
          agree_tandc_display: true,
          resume: '',
          flag: 'https://flagcdn.com/w40/in.webp',
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Career form error:', error);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="click-overlay2" onClick={() => dispatch(closeCareerInquiry())}>
      <div
        className={`inquiry_popupCareer ${isOpen ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setCountryFlag(false);
        }}
      >
        <span
          className="material-symbols-outlined wfc mlauto close_icon"
          onClick={() => dispatch(closeCareerInquiry())}
        >
          close
        </span>

        <div className="inner-flex inner-flex-small">
          <div>
            <div className="section-title">
              <h2>Job Application</h2>
            </div>

            <div className="content-size-div">
              <p>Sales Executive (2 - 3 Years)</p>
            </div>
          </div>

          <form id="career_form" onSubmit={handleSubmit}>
            <div className="form_wrapper">
              <div className="contact_lable">
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'error' : ''}`}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <label className="md-lable">Name*</label>
              </div>

              <div className="contact_lable">
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <label className="md-lable">Email*</label>
              </div>

              <div className="contact_lable relative">
                <input
                  type="tel"
                  className={`form-control contact-form ${errors.contact_no_display ? 'error' : ''}`}
                  minLength="10"
                  maxLength="10"
                  value={form.contact_no_display}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      contact_no_display: e.target.value.replace(/\D/g, ''),
                    })
                  }
                />
                <label className="md-lable contact_code">Mobile Number*</label>

                <div className="conatct_number_input">
                  <div
                    className="country_code_data"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCountryFlag((prev) => !prev);
                    }}
                  >
                    <div className="contact_country_flag">
                      <img src={form.flag} alt="flag" />
                    </div>
                    <div>&nbsp;+{form.country}</div>
                    <div>
                      <span className="material-symbols-outlined" style={{ margin: '1rem 0' }}>
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`country_code_list_data ${countryFlag ? 'active' : ''}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="search_c-code">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search"
                    />
                  </div>
                  <ul>
                    {countryList
                      ?.filter((c) => c.phonecode.includes(search))
                      .map((item, idx) => (
                        <li
                          key={idx}
                          onClick={() =>
                            handleCountrySelect(item.phonecode, item.flag)
                          }
                        >
                          <div>
                            <img src={item.flag} alt="flag" />
                            <span className="display_country_code">
                              +{item.phonecode}
                            </span>{' '}
                            {item.nicename}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="contact_lable">
                <input
                  type="text"
                  className={`form-control ${errors.current_company ? 'error' : ''}`}
                  value={form.current_company}
                  onChange={(e) =>
                    setForm({ ...form, current_company: e.target.value })
                  }
                />
                <label className="md-lable">Current Company</label>
              </div>


              <div className="contact_lable">
                <input
                  type="text"
                  className={`form-control ${errors.current_designation ? 'error' : ''}`}
                  value={form.current_designation}
                  onChange={(e) =>
                    setForm({ ...form, current_designation: e.target.value })
                  }
                />
                <label className="md-lable">Current Designation</label>
              </div>


              <div className="contact_lable">
                <div className="relative upload_input">
                  <input
                    type="file"
                    className={`upload-button-wrapper-input upload_file_input ${errors.resume_upload ? 'error' : ''}`}
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <div className="upload-button-wrapper">
                    <img src="/images/icon/upload.svg" alt="upload icon" />
                    <p className="transition_0s">
                      {form.resume_upload ? form.resume_upload.name : 'Resume Attachment'}
                    </p>
                  </div>
                  <p className="other_message">Allow only pdf, doc, docx file.</p>
                </div>
              </div>

              <p className="relative check_box_error get_update_text align_center">
                <input
                  type="checkbox"
                  id="agree_tandc_display"
                  className="get_update_checkbox"
                  checked={form.agree_tandc_display}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      agree_tandc_display: e.target.checked,
                    })
                  }
                />
                <label htmlFor="agree_tandc_display" className="darkgray-font">
                  Keep me updated.
                </label>
              </p>


              <div className="submit-button button-div filled-div-button form_button">
                <button
                  className="reecosys-template-button button-style-primary w100"
                  type="submit"
                >
                  <p>{saveCareer ? 'Please Wait...' : 'Submit'}</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

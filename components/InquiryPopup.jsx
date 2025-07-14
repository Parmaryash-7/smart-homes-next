'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeInquiry } from 'store/inquirySlice';
import { useRouter } from 'next/navigation';
import { setThankYouData } from 'store/inquirySlice'
import { fetchCountryList } from 'store/countrySlice';
import './InquiryPopup.css';
import api from 'lib/api.interceptor.js'
import { Toast } from './Toast'


export default function InquiryPopupDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useSelector((state) => state.inquiry.isOpen);
  const [propertylist, setPropertylist] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);

  const [form, setForm] = useState({
    agree_tandc: '1',
    agree_tandc_display: true,
    client_name: '',
    first_name: '',
    last_name: '',
    email_address: '',
    client_contact_no_display: '',
    client_contact_no: '',
    remarks: '',
    property_type: '',
    from_app: 'true',
    master_user_id: '339',
    logged_in_master_user_id: '339',
    inquiry_from: 'web',
    user_type: 'N',
    flag: 'https://flagcdn.com/w40/in.webp',
    country: '91',
    project_id: '756'
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await api.Propertylist();
        const filtered = result.filter((item) => item.project_id !== 744 && item.project_id !== 814);
        setPropertylist(result);
        setProjectOptions(filtered);
        console.log("object");
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);


  // const handleChange = (e) => {
  //   const selectedId = parseInt(e.target.value);
  //   setSelectedProjectId(selectedId);

  //   const selected = propertylist.find((p) => p.project_id === selectedId);
  //   if (onProjectChange) onProjectChange(selected);
  // };

  const [countryFlag, setCountryFlag] = useState(false);
  const [search, setSearch] = useState('');
  const [saveInquiry, setSaveInquiry] = useState(false);
  const [errors, setErrors] = useState({});
  const inquiryPrefill = useSelector((state) => state.inquiry.inquiryPrefill);
  useEffect(() => {
    if (isOpen && inquiryPrefill) {
      setForm((prevForm) => ({
        ...prevForm,
        project_id: inquiryPrefill.projectId || '',
        remarks: inquiryPrefill.remarks || '',
      }));
    }
  }, [isOpen, inquiryPrefill]);

  const { countryList, status } = useSelector((state) => state.country)

  useEffect(() => {
    dispatch(fetchCountryList())
  }, [dispatch])
  const handleCountrySelect = (phonecode, flag) => {
    setForm((prev) => ({
      ...prev,
      country: phonecode,
      flag,
    }));
    setCountryFlag(false);
  };


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

  // const validate = () => {
  //   const newErrors = {};
  //   const nameRegex = /^[a-zA-Z\s]+$/;
  //   const phoneRegex = /^\d{10}$/;

  //   if (!form.project_id) newErrors.project_id = 'Project is required';
  //   if (!form.property_type) newErrors.property_type = 'Property type is required';

  //   if (!form.first_name.trim()) {
  //     newErrors.first_name = 'First name is required';
  //   } else if (!nameRegex.test(form.first_name)) {
  //     newErrors.first_name = 'Only letters allowed';
  //   }

  //   if (!form.last_name.trim()) {
  //     newErrors.last_name = 'Last name is required';
  //   } else if (!nameRegex.test(form.last_name)) {
  //     newErrors.last_name = 'Only letters allowed';
  //   }

  //   if (!form.client_contact_no_display.trim()) {
  //     newErrors.client_contact_no_display = 'Phone number is required';
  //   } else if (!phoneRegex.test(form.client_contact_no_display)) {
  //     newErrors.client_contact_no_display = 'Must be 10 digits';
  //   }

  //   return newErrors;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saveInquiry) return;

    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!form.project_id) newErrors.project_id = true;
    if (!form.property_type) newErrors.property_type = true;

    if (!form.first_name.trim()) newErrors.first_name = true;
    else if (!nameRegex.test(form.first_name)) newErrors.first_name = true;

    if (!form.last_name.trim()) newErrors.last_name = true;
    else if (!nameRegex.test(form.last_name)) newErrors.last_name = true;

    if (!form.client_contact_no_display.trim()) newErrors.client_contact_no_display = true;
    else if (!phoneRegex.test(form.client_contact_no_display)) newErrors.client_contact_no_display = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSaveInquiry(false);
      return;
    }

    setErrors({});
    setSaveInquiry(true);
    form.client_contact_no = form.country + ' ' + form.client_contact_no_display;
    form.client_name = form.first_name + " " + form.last_name;
    // const finalPayload = {
    //   ...form,
    //   contact_no: form.country + ' ' + form.client_contact_no_display,
    // };

    // console.log('Submitted Form Data:',);

    try {
      const response = await api.Projectinquiry(form);
      // console.log(response);
      if (response.success) {
        dispatch(setThankYouData({ page_name: '', document: [] }));
        router.push('/home/thankyou');

        setForm({
          agree_tandc: '1',
          agree_tandc_display: true,
          client_name: '',
          first_name: '',
          last_name: '',
          email_address: '',
          client_contact_no_display: '',
          client_contact_no: '',
          remarks: '' + "Looking For : Plot",
          property_type: '',
          from_app: 'true',
          master_user_id: '339',
          logged_in_master_user_id: '339',
          inquiry_from: 'web',
          user_type: 'N',
          flag: 'https://flagcdn.com/w40/in.webp',
          country: '91',
          project_id: '756'
        });
        setSaveInquiry(false);
      }
      else {
        Toast(response.message)
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSaveInquiry(false);
    }
  };



  if (!isOpen) return null;

  return (
    <>

      {/* {JSON.stringify(countryList, null, 2)} */}
      <div
        className={`click-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => {
          setCountryFlag(false);
          dispatch(closeInquiry());
        }}
      />

      <div className="inquiry_popup relative inqury_active">
        <div className="close_icon" onClick={() => dispatch(closeInquiry())}>
          <span className="material-symbols-outlined">close</span>
        </div>

        <div className="inner-flex inner-flex-medium" onClick={(e) => e.stopPropagation()}>
          <div className="section-title">
            <h2>Inquire Now</h2>
          </div>

          <form id="inquiry_form" onSubmit={handleSubmit} onClick={() => setCountryFlag(false)}>
            <div className="form_wrapper">
              <div className="contact_lable select_option select_apr relative">
                <select
                  name="project_id"
                  className={`form-control ${errors.project_id ? 'error' : ''}`}
                  id="project_id"
                  value={form.project_id}
                  autoComplete="off"
                  onChange={(e) => setForm({ ...form, project_id: e.target.value })}
                >
                  <option value="" disabled>Select Projects</option>
                  {projectOptions.map((data) => (
                    <option key={data.project_id} value={data.project_id} className="capitalize">
                      {data.project_title}
                    </option>
                  ))}
                </select>

                <label className="md-lable project_id_label">Project*</label>
              </div>

              <div className="contact_lable select_option select_apr relative">
                <select
                  name="property_type"
                  className={`form-control ${errors.property_type ? 'error' : ''}`}
                  value={form.property_type}
                  onChange={(e) => setForm({ ...form, property_type: e.target.value })}
                >
                  <option value="" disabled>Select Type</option>
                  {/* <option value="Villa">Villa</option> */}
                  <option value="Plot">Plot</option>
                </select>
                <label className="md-lable project_id_label">Looking For*</label>
              </div>

              <div className="contact_lable">
                <input
                  type="text"
                  name="first_name"
                  className={`form-control ${errors.first_name ? 'error' : ''}`}
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                />
                <label className="md-lable">First Name*</label>
                {/* {errors.first_name && <span className="error-text">{errors.first_name}</span>} */}
              </div>

              <div className="contact_lable">
                <input
                  type="text"
                  name="last_name"
                  className={`form-control ${errors.last_name ? 'error' : ''}`}
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                />
                <label className="md-lable">Last Name*</label>
                {/* {errors.last_name && <span className="error-text">{errors.last_name}</span>} */}
              </div>

              <div className="contact_lable">
                <input
                  type="email"
                  name="email_address"
                  className="form-control"
                  value={form.email_address}
                  onChange={(e) => setForm({ ...form, email_address: e.target.value })}
                />
                <label className="md-lable">Email</label>
              </div>

              {/* Contact Number */}
              <div className="contact_lable relative">
                <input
                  id="client_contact_no_display"
                  name="client_contact_no_display"
                  type="tel"
                  className={`form-control contact-form ${errors.client_contact_no_display ? 'error' : ''
                    }`}
                  value={form.client_contact_no_display}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, ''); // remove non-digits
                    setForm({ ...form, client_contact_no_display: numericValue });
                  }}
                  minLength="10"
                  maxLength="10"
                  tabIndex={4}
                />

                {/* <label className="md-lable contact_code" htmlFor="contact_no">
                                                    Mobile Number*
                                                </label> */}
                <label
                  className="md-lable contact_code"
                  htmlFor="contact_no"
                >
                  Phone Number*
                </label>

                <div className="conatct_number_input">
                  <div
                    className="country_code_data"
                    onClick={(e) => {
                      setCountryFlag((prev) => !prev)
                      e.stopPropagation()
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
                <div
                  className={`country_code_list_data ${countryFlag ? 'active' : ''
                    }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="search_c-code">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      placeholder="Search"
                    />
                  </div>

                  <ul>
                    {countryList?.map((item, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleCountrySelect(
                            item.phonecode,
                            item.flag
                          )
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

              <div className="contact_lable commentbox">
                <textarea
                  name="remarks"
                  className="form-control"
                  rows="3"
                  value={form.remarks}
                  onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                ></textarea>
                <label className="md-lable">Comments</label>
              </div>

              <p className="relative check_box_error get_update_text align_center">
                <input
                  className="get_update_checkbox"
                  type="checkbox"
                  checked={form.agree_tandc_display}
                  onChange={(e) => setForm({ ...form, agree_tandc_display: e.target.checked })}
                />
                <label className="darkgray-font">Keep me updated.</label>
              </p>

              <div className="submit-button button-div filled-div-button form_button">
                <button
                  className="reecosys-template-button button-style-secondary w100"
                  type="submit"
                  disabled={saveInquiry}
                >
                  <p>{saveInquiry ? 'Please wait...' : 'Submit'}</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

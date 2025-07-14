'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Bulk_Land.css'
import { fetchCountryList } from 'store/countrySlice'
import { Toast } from './Toast'
import { setThankYouData } from 'store/inquirySlice'
import { useRouter } from 'next/navigation'
import api from 'lib/api.interceptor'
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Bulk_Land({ projects_full_list_detail }) {
  const [inquiryObj, setInquiryObj] = useState({
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
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [countryFlag, setCountryFlag] = useState(false)
  // const [countryList, setCountryList] = useState([]);
  const [search, setSearch] = useState('')
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const router = useRouter()

  const { countryList, status } = useSelector((state) => state.country)

  // Load country list from redux store
  useEffect(() => {
    dispatch(fetchCountryList())
  }, [dispatch])

  // useEffect(() => {
  //   async function loadCountry() {
  //     try {
  //       const data = await CountryList();
  //       const filtered = data.filter((c) => c.phonecode !== "92");
  //       setCountryList(filtered);
  //     } catch (error) {
  //       console.error("Error loading countries", error);
  //     }
  //   }
  //   loadCountry();
  // }, []);

  const validate = () => {
    let newErrors = {}
    const nameRegex = /^[a-zA-Z\s]+$/
    const phoneRegex = /^\d{10}$/
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

    if (!inquiryObj.first_name.trim()) {
      newErrors.first_name = 'Name is required'
    } else if (!nameRegex.test(inquiryObj.first_name)) {
      newErrors.first_name = 'Name must contain only letters'
    }

    if (!inquiryObj.last_name.trim()) {
      newErrors.last_name = 'Name is required'
    } else if (!nameRegex.test(inquiryObj.last_name)) {
      newErrors.last_name = 'Name must contain only letters'
    }

    if (!inquiryObj.client_contact_no_display.trim()) {
      newErrors.client_contact_no_display = 'Contact number is required'
    } else if (!phoneRegex.test(inquiryObj.client_contact_no_display)) {
      newErrors.client_contact_no_display = 'Contact number must be 10 digits'
    }

    if (!inquiryObj.property_type || inquiryObj.property_type === '') {
      newErrors.property_type = 'Project type is required'
    }

    // if (!inquiryObj.email_address.trim()) {
    //   newErrors.email_address = "Email is required";
    // } else if (!emailRegex.test(inquiryObj.email_address)) {
    //   newErrors.email_address = "Invalid email format";
    // }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let updatedValue = value

    if (name === 'first_name') {
      updatedValue = value.replace(/[0-9]/g, '')
    }

    if (name === 'last_name') {
      updatedValue = value.replace(/[0-9]/g, '')
    }

    if (name === 'client_contact_no_display') {
      updatedValue = value.replace(/[^0-9]/g, '').slice(0, 10)
    }

    setInquiryObj((prev) => ({
      ...prev,
      [name]: updatedValue
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }))
  }

  const handleCountrySelect = (phonecode, flag) => {
    setInquiryObj((prev) => ({
      ...prev,
      country: phonecode,
      flag
    }))
    setCountryFlag(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    inquiryObj.client_contact_no =
    inquiryObj.country + ' ' + inquiryObj.client_contact_no_display
    inquiryObj.client_name = inquiryObj.first_name + ' ' + inquiryObj.last_name
    inquiryObj.remarks =
      inquiryObj.remarks +
      ' , BulkLand Project Name: ' +
      inquiryObj.property_type +
      ' ,  Looking For: ' +
      inquiryObj.property_type

    try {
      const response = await api.Projectinquiry(inquiryObj)
      //   console.log("Inquiry submitted:", response);
      // console.log("Inquiry submitted:", inquiryObj);

      if (response.success) {
        dispatch(setThankYouData({ page_name: 'Bulk Land', document: [] }))
        router.push('/bulk-land-in-dholera/thankyou')
        console.log(response)

        Toast(response.message)
        setInquiryObj({
          agree_tandc: '1',
          agree_tandc_display: true,
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
        })
      } else {
        Toast(response.message)
      }
      // Reset form
      setFormSubmitted(false)
      setErrors({})
      // alert('Inquiry submitted successfully!')
    } catch (err) {
      console.error('Submission error:', err)
      setFormSubmitted(false)
      // alert('Failed to submit inquiry. Please try again.')
    }
  }

  return (
    <>
      <div className="bulk_land_wrapper">
        <div
          className="reecosys-main-wrapper"
          id="reecosys-main-wrapper"
          onClick={() => {
            setCountryFlag(false)
          }}
        >
          <div
            id="reecosys-nri-wrapper"
            className="relative inner-flex-big inner-flex"
          >
            <section
              className="reecosys-section relative wow fadeIn"
              data-wow-delay="0.6s"
              data-wow-duration="0.4s"
              id="reecosys-contact-us-section-1"
            >
              {projects_full_list_detail.banners_data.images.length > 0 && (
                <div className="common-listing-banner relative">
                  <img
                    src={`${projects_full_list_detail.banners_data.images[0].image_web_full}&h=1080&w=1903&q=100`}
                    alt=""
                  />
                  <div className="banner-overly-green"></div>
                  <div className="common-banner-title-abs">
                    <div className="banner-title-small">
                      {projects_full_list_detail.banners_data.banner_title && (
                        <h1 className="white-color capitalize">
                          {projects_full_list_detail.banners_data.banner_title}
                        </h1>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>
            <section
              className="reecosys-section section-padding-bottom relative wow fadeIn"
              data-wow-delay="0.6s"
              data-wow-duration="0.4s"
              id="reecosys-contact-us-section-2"
            >
              <div className="inner-flex inner-flex-big">
                <div className="section-title text-center section-content mini-container">
                  <h2 className="capitalize secondary-color">
                    Bulk Land Investment in Dholera - Residential, Commercial &
                    Industrial Opportunities
                  </h2>
                  <p>
                    Dholera, India's first greenfield smart city, is rapidly
                    emerging as a global investment destination with world-class
                    infrastructure, strategic connectivity, and high-growth
                    potential. Whether you're looking for residential land for
                    plotted development, commercial spaces for hotels, schools,
                    or offices, or large industrial land parcels, SmartHomes
                    Infrastructure is your trusted partner for secure and
                    legally compliant land acquisition.
                  </p>
                </div>

                <div className="main-container-fluid">
                  <div className="page-list-2-col-grid nriGrid green_lable">
                    <div className="inner-flex inner-flex-medium nri-text-color">
                      <div className="inner-flex inner-flex-common">
                        <div className="section-subtitle inner-flex section-content">
                          <h4>Prime Locations Across Dholera SIR</h4>
                          <p>
                            We offer strategically located land parcels across
                            key Town Planning (TP) Schemes of Dholera SIR,
                            covering:
                          </p>
                        </div>
                        <div className="">
                          <ul className="nri-text-ul">
                            <li>
                              <span className="primary-color">
                                Near Dholera International Airport -
                              </span>
                              Ideal for logistics hubs, commercial
                              establishments, and hospitality projects.
                            </li>
                            <li>
                              <span className="primary-color">
                                Along Dholera Expressway -
                              </span>
                              Best suited for industrial, mixed-use, and retail
                              developments.
                            </li>
                            <li>
                              <span className="primary-color">
                                Close to National Maritime Heritage Complex
                                (NMHC), Lothal -
                              </span>
                              A great opportunity for tourism, cultural, and
                              hospitality ventures.
                            </li>
                            <li>
                              <span className="primary-color">
                                Near Velavadar National Park -
                              </span>
                              Perfect for eco-resorts, farmhouses, and
                              nature-centric projects.
                            </li>
                            <li>
                              <span className="primary-color">
                                Dholera Activation Area, Residential Zone, High
                                Access Corridor Zone, Knowledge & IT Zone, City
                                Center -
                              </span>
                              Prime land for plotted townships, housing
                              projects, IT parks, 3-star & 5-star hotels, shops
                              & offices, mixed-use developments, industrial
                              plants & sheds, warehouses.
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="nri-sect-imgs border-radius">
                        <img
                          src="/images/bulk-land/why-smart-homes-bulk-land.png"
                          alt=""
                        />
                      </div>
                      <div className="inner-flex inner-flex-common">
                        <div className="section-subtitle">
                          <h4>Why SmartHomes Infrastructure?</h4>
                        </div>
                        <div className="">
                          <ul className="nri-text-ul">
                            <li>
                              <span className="primary-color">
                                Legally Verified Land -
                              </span>
                              Clear Title, NA/NOC (CLU) Approved
                            </li>
                            <li>
                              <span className="primary-color">
                                Comprehensive Land Solutions -
                              </span>
                              Residential, Commercial & Industrial Parcels
                            </li>
                            <li>
                              <span className="primary-color">
                                End-to-End Legal & Regulatory Assistance -
                              </span>
                              Revenue Records, Plan Approvals & Valuations
                            </li>
                            <li>
                              <span className="primary-color">
                                Strategic & High-Growth Locations -
                              </span>
                              Covering All Key Zones of Dholera SIR
                            </li>
                            <li>
                              <span className="primary-color">
                                10+ Years of Trust & Credibility -
                              </span>
                              Leading Land Aggregator & Developer in Dholera
                            </li>
                          </ul>
                        </div>
                        <div className="section-content">
                          <p>
                            Dholera is India's next economic powerhouse, and we
                            ensure a 100% legally secure, hassle-free land
                            buying experience. Whether you're an investor,
                            developer, or business owner, we have the right land
                            for your vision.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="inner-flex inner-flex-big sticky-form green_lable">
                      <div className="form-box border-radius-contact">
                        <div className="inner-flex inner-flex-medium">
                          <div className="section-subtitle">
                            <h4 className="text-center">
                              Get in touch today and secure your future in
                              Dholera!
                            </h4>
                          </div>
                          <form id="detailForm" name="detailForm">
                            <div className="form_wrapper nri-form contact_form">
                              <div className="contact_lable">
                                <input
                                  type="text"
                                  name="first_name"
                                  id="first_name"
                                  className={`form-control ${errors.first_name ? 'error' : ''
                                    }`}
                                  // required
                                  tabIndex={1}
                                  value={inquiryObj.first_name}
                                  onChange={handleChange}
                                />
                                <label
                                  className="md-lable"
                                  htmlFor="first_name"
                                >
                                  First Name*
                                </label>
                              </div>

                              <div className="contact_lable">
                                <input
                                  type="text"
                                  name="last_name"
                                  id="last_name"
                                  className={`form-control ${errors.last_name ? 'error' : ''
                                    }`}
                                  // required
                                  tabIndex={2}
                                  value={inquiryObj.last_name}
                                  onChange={handleChange}
                                />
                                <label className="md-lable" htmlFor="last_name">
                                  Last Name*
                                </label>
                              </div>

                              <div className="contact_lable select_option select_apr relative">
                                <select
                                  name="property_type"
                                  className={`form-control ${errors.property_type ? 'error' : ''
                                    }`}
                                  id="property_type"
                                  value={inquiryObj.property_type}
                                  onChange={(e) =>
                                    setInquiryObj({
                                      ...inquiryObj,
                                      property_type: e.target.value
                                    })
                                  }
                                  tabIndex={3}
                                //   defaultValue={"Select Type"}
                                >
                                  <option
                                    value=""
                                    disabled={
                                      inquiryObj.property_type ? 'disabled' : ''
                                    }
                                    className="gray-color"
                                  // selected
                                  >
                                    Select Type
                                  </option>
                                  <option value="Residential Plots / Dholera Bulk land deals">
                                    Residential Plots / Dholera Bulk land deals
                                  </option>
                                  <option value="Commercial Plots / Land in Dholera SIR">
                                    Commercial Plots / Land in Dholera SIR
                                  </option>
                                  <option value="Industrial land in Dholera SIR">
                                    Industrial land in Dholera SIR
                                  </option>
                                </select>
                                <label
                                  className="md-lable project_id_label"
                                  htmlFor="project_id"
                                >
                                  Project Type *
                                </label>
                                {/* <KeyboardArrowDownIcon className="fa-icon" /> */}
                                <span className="material-symbols-outlined fa-icon">
                                  keyboard_arrow_down
                                </span>
                              </div>

                              {/* Contact Number */}
                              <div className="contact_lable relative">
                                <input
                                  id="client_contact_no_display"
                                  name="client_contact_no_display"
                                  type="tel"
                                  className={`form-control contact-form ${errors.client_contact_no_display
                                      ? 'error'
                                      : ''
                                    }`}
                                  value={inquiryObj.client_contact_no_display}
                                  onChange={handleChange}
                                  required
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
                                      setCountryFlag(true)
                                      e.stopPropagation()
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

                              <div className="contact_lable">
                                <input
                                  type="text"
                                  name="email_address"
                                  id="email_address"
                                  className={`form-control ${errors.email_address ? 'error' : ''
                                    }`}
                                  tabIndex={5}
                                  onChange={handleChange}
                                  value={inquiryObj.email_address}
                                />
                                <label
                                  className="md-lable"
                                  htmlFor="email_address"
                                >
                                  Email Address
                                </label>
                              </div>

                              <div className="contact_lable">
                                <input
                                  id="remarks"
                                  name="remarks"
                                  type="text"
                                  onChange={handleChange}
                                  className={`form-control ${errors.remarks ? 'error' : ''
                                    }`}
                                  tabIndex={6}
                                  value={inquiryObj.remarks}
                                />
                                <label className="md-lable" htmlFor="remarks">
                                  Comments
                                </label>
                              </div>

                              <div className="wfc m0auto">
                                <button
                                  tabIndex={7}
                                  className="reecosys-template-button button-style-secondary"
                                  type="submit"
                                  onClick={handleSubmit}
                                >
                                  <p>Submit</p>
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
      </div>
    </>
  )
}

export default Bulk_Land

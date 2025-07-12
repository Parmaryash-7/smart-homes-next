'use client'

import React, { useEffect, useState, useMemo, useRef } from 'react'
import moment from 'moment'
import './BookPlot.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountryList } from 'store/countrySlice'
// import getPlotList from "lib/getPlotList";

export default function BookPlotsForm({
  propertylist = [],
  completedPropertylist = [],
  searchParams = {}
}) {
  const dispatch = useDispatch()
  const { countryList } = useSelector((state) => state.country)
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [formErrors, setFormErrors] = useState({})
  const [bookPlotBirthDate, setBookPlotBirthDate] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filteredProjects, setFilteredProjects] = useState([])
  const [unitPlans, setUnitPlans] = useState([])
  const widgetIdRef = useRef(null)
  const [showUserCountryDropdown, setShowUserCountryDropdown] = useState(false)
  const [showRefCountryDropdown, setShowRefCountryDropdown] = useState(false)
  const [userSearchText, setUserSearchText] = useState('')
  const [refSearchText, setRefSearchText] = useState('')

  const handleUserFlagClick = () => {
    setShowUserCountryDropdown((prev) => !prev)
    setShowRefCountryDropdown(false)
  }

  const handleRefFlagClick = () => {
    setShowRefCountryDropdown((prev) => !prev)
    setShowUserCountryDropdown(false)
  }
  const handleUserCountrySelect = (code, flag) => {
    const selected = countryList.find((c) => c.phonecode === code)
    setInquiryObj2((prev) => ({
      ...prev,
      country: code,
      flag: flag,
      nationality: selected?.nicename || prev.nationality
    }))
    setShowUserCountryDropdown(false)
  }

  const handleRefCountrySelect = (code, flag) => {
    setInquiryObj2((prev) => ({
      ...prev,
      country4: code,
      flag4: flag
    }))
    setShowRefCountryDropdown(false)
  }

  const filteredUserCountries = useMemo(() => {
    return countryList.filter(
      (country) =>
        country.nicename.toLowerCase().includes(userSearchText.toLowerCase()) ||
        country.phonecode.includes(userSearchText)
    )
  }, [userSearchText, countryList])

  const filteredRefCountries = useMemo(() => {
    return countryList.filter(
      (country) =>
        country.nicename.toLowerCase().includes(refSearchText.toLowerCase()) ||
        country.phonecode.includes(refSearchText)
    )
  }, [refSearchText, countryList])

  const allProjects = propertylist
  const { project_id, plot_no, project_type } = searchParams || {}

  useEffect(() => {
    dispatch(fetchCountryList())
  }, [dispatch])
  const [inquiryObj2, setInquiryObj2] = useState({
    full_name: '',
    so_do_wo: '',
    phone_number: '',
    email: '',
    date_of_birth_display: '',
    nationality: 'India',
    permanent_address: '',
    current_address: '',
    occupation: '',
    company_name: '',
    work_address: '',
    flag: 'https://flagcdn.com/w40/in.webp',
    flag4: 'https://flagcdn.com/w40/in.webp',
    country4: '91',
    country: '91',
    project_type: '',
    project_id: '',
    plot_number: '',
    plot_size: '',
    unit_id: '',
    terms_condition_agreed_display: true
  })

  const validateForm = () => {
    const errors = {}

    // Basic text validations
    if (!inquiryObj2.full_name.trim())
      errors.full_name = 'Full Name* is required'
    if (!inquiryObj2.so_do_wo.trim())
      errors.so_do_wo = 'S/O, D/O, W/O* is required'

    // Phone validation
    if (
      !inquiryObj2.phone_number ||
      inquiryObj2.phone_number.trim().length !== 10 ||
      !/^\d{10}$/.test(inquiryObj2.phone_number.trim())
    ) {
      errors.phone_number = 'Valid 10-digit mobile number is required'
    }

    // Email validation
    if (!inquiryObj2.email.trim()) {
      errors.email = 'Email* is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryObj2.email.trim())) {
      errors.email = 'Enter a valid Email'
    }

    // Birthdate and nationality
    if (!inquiryObj2.date_of_birth_display.trim())
      errors.date_of_birth_display = 'Date of Birth* is required'
    if (!inquiryObj2.nationality) {
      errors.nationality = 'Nationality* is required'
    } else {
      const selectedCountry = countryList.find(
        (c) => c.nicename === inquiryObj2.nationality
      )
      if (!selectedCountry) {
        errors.nationality = 'Select a valid nationality'
      } else {
        // ✅ Set country code and flag again in case user bypassed select logic
        inquiryObj2.country = selectedCountry.phonecode
        inquiryObj2.flag = selectedCountry.flag
      }
    }

    // Address, occupation, etc.
    if (!inquiryObj2.permanent_address.trim())
      errors.permanent_address = 'Permanent Address* is required'
    if (!inquiryObj2.current_address.trim())
      errors.current_address = 'Present Home Address* is required'
    if (!inquiryObj2.occupation.trim())
      errors.occupation = 'Profession* is required'
    if (!inquiryObj2.company_name.trim())
      errors.company_name = 'Company Name* is required'

    // Reference
    if (!inquiryObj2.reference_name?.trim())
      errors.reference_name = 'Reference Name* is required'
    if (
      !inquiryObj2.reference_contact_number ||
      inquiryObj2.reference_contact_number.trim().length !== 10 ||
      !/^\d{10}$/.test(inquiryObj2.reference_contact_number.trim())
    ) {
      errors.reference_contact_number =
        'Valid 10-digit reference number is required'
    }

    // Project details
    if (!inquiryObj2.project_type)
      errors.project_type = 'Project Type* is required'
    if (!inquiryObj2.project_id) errors.project_id = 'Please select a project'
    if (!inquiryObj2.plot_number) errors.plot_number = 'Please select a plot'
    if (!inquiryObj2.unit_id) errors.unit_id = 'Please select a unit'

    // Terms checkbox
    if (!inquiryObj2.terms_condition_agreed_display) {
      errors.terms_condition_agreed_display = 'You must agree to terms'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      console.log('Form Submitted', inquiryObj2)

      alert('Form submitted successfully!')

      setInquiryObj2({
        full_name: '',
        so_do_wo: '',
        phone_number: '',
        email: '',
        date_of_birth_display: '',
        nationality: 'India',
        permanent_address: '',
        current_address: '',
        occupation: '',
        company_name: '',
        work_address: '',
        project_type: '',
        project_id: '',
        plot_number: '',
        plot_size: '',
        unit_id: '',
        reference_name: '',
        reference_contact_number: '',
        terms_condition_agreed_display: true,
        flag: 'https://flagcdn.com/w40/in.webp',
        country: '91',
        flag4: 'https://flagcdn.com/w40/in.webp',
        country4: '91'
      })

      // ✅ Clear errors
      setFormErrors({})
    } else {
      console.log('Validation Failed')

      // ✅ Scroll to top on error
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // useEffect(() => {
  //     setFilteredProjects(
  //         allProjects.filter(
  //             (project) => !filterType || project.category === filterType
  //         )
  //     );
  // }, [allProjects, filterType]);

  useEffect(() => {
    setFilteredProjects(
      propertylist.filter(
        (project) =>
          (!filterType || project.category === filterType) &&
          project.project_title !== 'Bulk Land'
      )
    )
  }, [propertylist, filterType])

  const birthdateDisplay = (value) => {
    if (value) {
      setBookPlotBirthDate(moment(value).format('DD-MM-YYYY'))
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    // ✅ PHONE FIELDS — digits only
    if (name === 'phone_number' || name === 'reference_contact_number') {
      const numericValue = value.replace(/\D/g, '') // removes non-digit characters
      setInquiryObj2((prev) => ({
        ...prev,
        [name]: numericValue
      }))

      // Also handle real-time error removal
      setFormErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors }
        if (numericValue.length === 10) delete updatedErrors[name]
        return updatedErrors
      })

      return
    }

    // ✅ NATIONALITY — sync flag and code
    if (name === 'nationality') {
      const selected = countryList.find((c) => c.nicename === value)
      if (selected) {
        setInquiryObj2((prev) => ({
          ...prev,
          nationality: value,
          country: selected.phonecode,
          flag: selected.flag
        }))
      }

      // Clear error if valid
      setFormErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors }
        if (value.trim() !== '') delete updatedErrors[name]
        return updatedErrors
      })

      return
    }

    // ✅ PROJECT TYPE — filter
    if (name === 'project_type') {
      setFilterType(value)
    }

    // ✅ PROJECT ID — fetch unit plans
    if (name === 'project_id') {
      const selectedProject = filteredProjects.find(
        (p) => p.project_id === value
      )
      if (selectedProject?.floor_plans?.[0]?.unit_plans?.length > 0) {
        setUnitPlans(selectedProject.floor_plans[0].unit_plans)
      } else {
        setUnitPlans([])
      }
    }

    // ✅ PLOT NUMBER — update plot size and ID
    if (name === 'plot_number') {
      const selectedUnit = unitPlans.find((unit) => unit.flat_no_temp === value)
      if (selectedUnit) {
        setInquiryObj2((prev) => ({
          ...prev,
          plot_number: value,
          plot_size: `${selectedUnit.super_built_up_area} SA sq. ft - ${selectedUnit.carpet_area} CA sq. ft / ${selectedUnit.super_build_up_area_yard} SA sq. yd - ${selectedUnit.carpet_area_yard} CA sq. yd`,
          unit_id: selectedUnit.unit_id
        }))
      }
    }

    // ✅ Default update for input/select/checkbox
    setInquiryObj2((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // ✅ Real-time error removal for all other fields
    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors }

      switch (name) {
        case 'full_name':
        case 'so_do_wo':
        case 'email':
        case 'nationality':
        case 'permanent_address':
        case 'current_address':
        case 'occupation':
        case 'company_name':
        case 'project_type':
        case 'project_id':
        case 'plot_number':
        case 'reference_name':
          if (value.trim() !== '') delete updatedErrors[name]
          break

        case 'date_of_birth_display':
          if (value !== '') delete updatedErrors[name]
          break

        case 'terms_condition_agreed_display':
          if (checked) delete updatedErrors[name]
          break

        default:
          break
      }

      return updatedErrors
    })
  }

  const fetchUnitPlansFromAPI = async (projectId) => {
    try {
      const res = await fetch('/api/plotlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId })
      })

      const result = await res.json()
      // console.log("this is result !!!", result);

      setUnitPlans(result || [])
    } catch (err) {
      console.error('❌ Client: Failed to fetch plot list:', err)
    }
  }

  // useEffect(() => {
  //     window.onRecaptchaSuccess = (response) => {
  //         setIsRecaptchaVerified(true);
  //         setRecaptchaResponse(response);
  //     };

  //     window.onRecaptchaExpired = () => {
  //         setIsRecaptchaVerified(false);
  //         setRecaptchaResponse(null);
  //     };
  // }, []);

  // for capture

  useEffect(() => {
    const renderRecaptcha = () => {
      if (typeof window.grecaptcha !== 'undefined') {
        if (widgetIdRef.current === null) {
          widgetIdRef.current = window.grecaptcha.render(
            'recaptcha-container',
            {
              sitekey: '6Lc8goArAAAAABEfJMPPR3G7Rx89r5yrsr-X-iew',
              callback: 'onRecaptchaSuccess',
              'expired-callback': 'onRecaptchaExpired'
            }
          )
        } else {
          window.grecaptcha.reset(widgetIdRef.current)
        }
      } else {
        setTimeout(renderRecaptcha, 500)
      }
    }

    renderRecaptcha()
  }, [])

  const handleProjectSelect = async (projectId) => {
    setInquiryObj2((prev) => ({ ...prev, project_id: projectId }))
    setSelectedProjectId(projectId)

    await fetchUnitPlansFromAPI(projectId)
  }

  const handlePlotSelect = (plotNumber) => {
    const selectedUnit = unitPlans.find(
      (unit) => unit.flat_no_temp === plotNumber
    )
    if (selectedUnit) {
      setInquiryObj2((prev) => ({
        ...prev,
        plot_number: plotNumber,
        plot_size: `${selectedUnit.super_built_up_area} SA sq. ft - ${selectedUnit.carpet_area} CA sq. ft / ${selectedUnit.super_build_up_area_yard} SA sq. yd - ${selectedUnit.carpet_area_yard} CA sq. yd`,
        unit_id: selectedUnit.unit_id
      }))
    }
  }

  // 🧠 Pre-fill from searchParams (simulate AngularJS $location.search())
  useEffect(() => {
    if (project_type && project_id) {
      setInquiryObj2((prev) => ({
        ...prev,
        project_type,
        project_id,
        plot_number: plot_no || ''
      }))
      setFilterType(project_type)

      fetchUnitPlansFromAPI(project_id).then(() => {
        if (plot_no) {
          handlePlotSelect(plot_no)
        }
      })
    }
  }, [project_type, project_id, plot_no])

  return (
    <div className="book-plots-wrapper" style={{ backgroundColor: '#ffffff' }}>
      <section className="section-padding">
        <div className="mini-container">
          <div className="">
            <div className="inner-flex inner-flex-big">
              <div className="">
                <div className="section-title">
                  <h2 className="bold-fonts capitalize text-center highlight-color">
                    Plot Booking Form
                  </h2>
                </div>
              </div>
              <form
                id="inquiry_form"
                name="inquiry_form"
                onSubmit={handleSubmit}
              >
                <div className="form_wrapper">
                  <div className="section-paragraph section-padding-half-ooo pb0">
                    <p className="bold-fonts highlight-color">
                      PERSONAL INFORMATION*
                    </p>
                  </div>

                  <div className="personal-grid">
                    <div className="contact_lable">
                      <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        className={`form-control ${
                          formErrors.full_name ? 'error' : ''
                        }`}
                        tabIndex="101"
                        autoComplete="off"
                        value={inquiryObj2.full_name}
                        onChange={handleChange}
                      />
                      <label className="md-lable" htmlFor="full_name">
                        Full Name*
                      </label>
                    </div>

                    <div className="contact_lable">
                      <input
                        id="so_do_wo"
                        name="so_do_wo"
                        type="text"
                        className={`form-control ${
                          formErrors.so_do_wo ? 'error' : ''
                        }`}
                        tabIndex="102"
                        autoComplete="off"
                        value={inquiryObj2.so_do_wo}
                        onChange={handleChange}
                      />
                      <label className="md-lable" htmlFor="so_do_wo">
                        {' '}
                        S/O, D/O, W/O*
                      </label>
                    </div>

                    <div className="contact_lable relative">
                      {/* Mobile Input Field */}
                      <input
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        minLength="10"
                        maxLength="10"
                        autoComplete="off"
                        className={`form-control contact-form ${
                          formErrors.phone_number ? 'error' : ''
                        }`}
                        tabIndex="103"
                        value={inquiryObj2.phone_number}
                        onChange={handleChange}
                      />

                      <label
                        className="md-lable contact_code"
                        htmlFor="phone_number"
                      >
                        Mobile Number*
                      </label>

                      {/* Country Code Selector with Flag */}
                      <div className="conatct_number_input">
                        <div
                          className="country_code_data"
                          onClick={handleUserFlagClick}
                        >
                          <div className="section-paragraph">
                            <span>
                              <img src={inquiryObj2.flag} alt="flag" />
                            </span>
                            <p>+{inquiryObj2.country}</p>
                            <p>|</p>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown */}
                      {showUserCountryDropdown && (
                        <div
                          className="country_code_list_data active"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="search_c-code">
                            <input
                              type="text"
                              value={userSearchText}
                              onChange={(e) =>
                                setUserSearchText(e.target.value)
                              }
                              placeholder="Search"
                            />
                          </div>
                          <ul>
                            {filteredUserCountries.map((country, i) => (
                              <li
                                key={i}
                                onClick={() =>
                                  handleUserCountrySelect(
                                    country.phonecode,
                                    country.flag
                                  )
                                }
                              >
                                <div>
                                  <img
                                    src={country.flag}
                                    alt={country.nicename}
                                    style={{
                                      width: 20,
                                      height: 14,
                                      marginRight: 8
                                    }}
                                  />
                                  <span className="display_country_code">
                                    +{country.phonecode}
                                  </span>
                                  {country.nicename}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="contact_lable">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        className={`form-control ${
                          formErrors.email ? 'error' : ''
                        }`}
                        tabIndex="104"
                        value={inquiryObj2.email}
                        onChange={handleChange}
                      />
                      <label className="md-lable" htmlFor="email">
                        Email*
                      </label>
                    </div>

                    <div className="contact_lable noPrint">
                      <div className="relative">
                        <input
                          id="date_of_birth_display"
                          name="date_of_birth_display"
                          type="date"
                          max={moment().format('YYYY-MM-DD')}
                          className={`date_picker_input form-control ${
                            formErrors.date_of_birth_display ? 'error' : ''
                          }`}
                          tabIndex="105"
                          value={inquiryObj2.date_of_birth_display}
                          onChange={(e) => {
                            handleChange(e)
                            birthdateDisplay(e.target.value)
                          }}
                        />
                        <div className="date_picker_input_text">
                          <p
                            className={`date_picker_input_text_p ${
                              bookPlotBirthDate ? 'active' : ''
                            }`}
                          >
                            {bookPlotBirthDate || 'dd-mm-yyyy'}
                          </p>
                          <span
                            className="material-symbols-outlined"
                            style={{ cursor: 'pointer' }}
                          >
                            calendar_today
                          </span>
                        </div>
                        <label className="md-lable" htmlFor="date_of_birth">
                          Date of Birth*
                        </label>
                      </div>
                    </div>

                    <div className="contact_lable select_option select_apr relative noPrint">
                      <select
                        name="nationality"
                        className={`form-control ${
                          formErrors.nationality ? 'error' : ''
                        }`}
                        id="nationality"
                        tabIndex="106"
                        value={inquiryObj2.nationality}
                        onChange={handleChange}
                      >
                        <option value="" disabled className="gray-color">
                          Nationality
                        </option>
                        {countryList.map((country, index) => (
                          <option key={index} value={country.nicename}>
                            {country.nicename}
                          </option>
                        ))}
                      </select>

                      <label
                        className="md-lable project_id_label"
                        htmlFor="nationality"
                      >
                        Nationality
                      </label>
                      {/* <div className="fa-icon">
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            </div> */}
                      <span className="material-symbols-outlined fa-icon">
                        keyboard_arrow_down
                      </span>
                    </div>

                    <div className="contact_lable commentb  ox">
                      <textarea
                        id="permanent_address"
                        name="permanent_address"
                        autoComplete="off"
                        className={`form-control ${
                          formErrors.permanent_address ? 'error' : ''
                        }`}
                        tabIndex="107"
                        rows="3"
                        value={inquiryObj2.permanent_address}
                        onChange={handleChange}
                      />
                      <label className="md-lable" htmlFor="permanent_address">
                        Permanent Address*
                      </label>
                    </div>

                    <div className="contact_lable commentbox">
                      <textarea
                        id="current_address"
                        name="current_address"
                        autoComplete="off"
                        className={`form-control ${
                          formErrors.current_address ? 'error' : ''
                        }`}
                        tabIndex="107"
                        rows="3"
                        value={inquiryObj2.current_address}
                        onChange={handleChange}
                      />
                      <label className="md-lable" htmlFor="current_address">
                        Present Home Address*
                      </label>
                    </div>

                    <div className="contact_lable">
                      <input
                        id="occupation"
                        name="occupation"
                        type="text"
                        autoComplete="off"
                        className={`form-control ${
                          formErrors.occupation ? 'error' : ''
                        }`}
                        tabIndex="108"
                        value={inquiryObj2.occupation}
                        onChange={handleChange}
                      />
                      <label className="md-lable" htmlFor="occupation">
                        Profession*
                      </label>
                    </div>

                    <div className="contact_lable">
                      <input
                        id="company_name"
                        name="company_name"
                        type="text"
                        autoComplete="off"
                        className={`form-control ${
                          formErrors.company_name ? 'error' : ''
                        }`}
                        tabIndex="109"
                        value={inquiryObj2.company_name}
                        onChange={handleChange}
                      />
                      <label className="md-lable" htmlFor="company_name">
                        Company Name*
                      </label>
                    </div>

                    <div className="contact_lable">
                      <input
                        id="work_address"
                        name="work_address"
                        type="text"
                        autoComplete="off"
                        className={`form-control ${
                          formErrors.work_address ? 'error' : ''
                        }`}
                        tabIndex="110"
                        value={inquiryObj2.work_address}
                        onChange={handleChange}
                      />
                      <label className="md-lable" htmlFor="work_address">
                        Work Address*
                      </label>
                    </div>
                  </div>
                  <div className="plot-details-grid">
                    <div className="contact_lable select_option select_apr relative noPrint">
                      <select
                        name="project_type"
                        id="project_type"
                        className="form-control"
                        value={inquiryObj2.project_type}
                        onChange={handleChange}
                      >
                        <option value="">Select Type</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                      <label className="md-lable" htmlFor="project_type">
                        Project Type*
                      </label>
                      {/* <div className="fa-icon"><i className="fa fa-angle-down" /></div> */}
                      <span className="material-symbols-outlined fa-icon">
                        keyboard_arrow_down
                      </span>
                    </div>

                    <div className="contact_lable select_option select_apr relative noPrint">
                      <select
                        name="project_id"
                        id="project_id"
                        className="form-control"
                        value={inquiryObj2.project_id}
                        onChange={(e) => {
                          handleChange(e)
                          handleProjectSelect(e.target.value)
                        }}
                        disabled={!inquiryObj2.project_type}
                      >
                        <option value="" disabled>
                          Select Projects
                        </option>
                        {filteredProjects.map((project) => (
                          <option
                            key={project.project_id}
                            value={project.project_id}
                          >
                            {project.project_title}
                          </option>
                        ))}
                      </select>
                      <label className="md-lable" htmlFor="project_id">
                        Project Name*
                      </label>
                      {/* <div className="fa-icon"><i className="fa fa-angle-down" /></div> */}
                      <span className="material-symbols-outlined fa-icon">
                        keyboard_arrow_down
                      </span>
                    </div>

                    <div className="contact_lable select_option select_apr relative noPrint">
                      <select
                        name="plot_number"
                        id="plot_number"
                        className="form-control"
                        value={inquiryObj2.plot_number}
                        onChange={(e) => {
                          handleChange(e)
                          handlePlotSelect(e.target.value)
                        }}
                        disabled={!inquiryObj2.project_id}
                      >
                        <option value="" disabled>
                          Select Plot
                        </option>
                        {unitPlans.map((unit) => (
                          <option key={unit.unit_id} value={unit.flat_no_temp}>
                            {unit.flat_no_temp}
                          </option>
                        ))}
                      </select>
                      <label className="md-lable" htmlFor="plot_number">
                        Plot Number*
                      </label>
                      {/* <div className="fa-icon"><i className="fa fa-angle-down" /></div> */}
                      <span className="material-symbols-outlined fa-icon">
                        keyboard_arrow_down
                      </span>
                    </div>

                    <div className="contact_lable">
                      <input
                        name="plot_size"
                        id="plot_size"
                        type="text"
                        value={inquiryObj2.plot_size}
                        className="form-control"
                        readOnly
                      />
                      <label className="md-lable" htmlFor="plot_size">
                        Plot Size
                      </label>
                    </div>
                  </div>

                  <div className="section-paragraph section-padding-half pb0">
                    <p className="bold-fonts highlight-color">REFERRED BY*</p>
                  </div>

                  <div className="plot-details-grid">
                    {/* Reference Name */}
                    <div className="contact_lable">
                      <input
                        id="reference_name"
                        name="reference_name"
                        type="text"
                        className={`form-control ${
                          formErrors.reference_name ? 'error' : ''
                        }`}
                        tabIndex="118"
                        autoComplete="off"
                        value={inquiryObj2.reference_name || ''}
                        onChange={handleChange}
                      />
                      <label className="md-lable" htmlFor="reference_name">
                        Reference Name*
                      </label>
                    </div>

                    {/* Reference Mobile Number */}
                    <div className="contact_lable relative">
                      <input
                        id="reference_contact_number"
                        name="reference_contact_number"
                        type="tel"
                        minLength="10"
                        maxLength="10"
                        autoComplete="off"
                        className={`form-control contact-form ${
                          formErrors.reference_contact_number ? 'error' : ''
                        }`}
                        tabIndex="119"
                        value={inquiryObj2.reference_contact_number || ''}
                        onChange={handleChange}
                      />
                      <label
                        className="md-lable contact_code"
                        htmlFor="reference_contact_number"
                      >
                        Reference Mobile Number *
                      </label>

                      <div className="conatct_number_input">
                        <div
                          className="country_code_data"
                          onClick={handleRefFlagClick}
                        >
                          <div className="section-paragraph">
                            <span>
                              <img src={inquiryObj2.flag4 || ''} alt="" />
                            </span>
                            <p>+{inquiryObj2.country4 || ''}</p>
                            <p>|</p>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown */}
                      {showRefCountryDropdown && (
                        <div
                          className="country_code_list_data active"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="search_c-code">
                            <input
                              type="text"
                              value={refSearchText}
                              onChange={(e) => setRefSearchText(e.target.value)}
                              placeholder="Search"
                            />
                          </div>
                          <ul>
                            {filteredRefCountries.map((country, i) => (
                              <li
                                key={i}
                                onClick={() =>
                                  handleRefCountrySelect(
                                    country.phonecode,
                                    country.flag
                                  )
                                }
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                  }}
                                >
                                  <img
                                    src={country.flag}
                                    alt={country.nicename}
                                    style={{
                                      width: 20,
                                      height: 14,
                                      objectFit: 'cover'
                                    }}
                                  />
                                  <span className="display_country_code">
                                    +{country.phonecode}
                                  </span>
                                  {country.nicename}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="inner-flex inner-flex-smallest section-padding-half pb0">
                    <div className="section-paragraph ">
                      <p className="highlight-color bold-fonts uppercase">
                        Declaration & Agreement
                      </p>
                    </div>
                    <div className="section-content">
                      <p>
                        By signing this application for the plotting project, I
                        hereby declare that all the information provided herein
                        is true, accurate, and complete to the best of my
                        knowledge. I understand that any misrepresentation or
                        omission of facts may result in the re- jection of my
                        application or, if discovered later, may lead to the
                        termination of my participation in the project without
                        any refund. I also acknowledge that I have read and
                        understood all the terms and conditions associated with
                        this application and agree to abide by them.
                        Furthermore, I authorize the project management team to
                        verify the information provided and to contact any
                        necessary parties for this purpose.
                      </p>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <p
                    className={`relative check_box_error get_update_text align_center ${
                      formErrors.terms_condition_agreed_display ? 'error' : ''
                    }`}
                  >
                    <input
                      className={`get_update_checkbox ${
                        formErrors.terms_condition_agreed_display ? 'error' : ''
                      }`}
                      type="checkbox"
                      id="terms_condition_agreed"
                      name="terms_condition_agreed_display"
                      tabIndex="120"
                      checked={
                        inquiryObj2.terms_condition_agreed_display || false
                      }
                      onChange={handleChange}
                    />
                    <label
                      className={`darkgray-font ${
                        formErrors.terms_condition_agreed_display
                          ? 'error-label'
                          : ''
                      }`}
                      htmlFor="terms_condition_agreed"
                    >
                      I Agree with the website's{' '}
                      <a
                        href="/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        terms-and-conditions
                      </a>
                    </label>
                  </p>

                  <div
                    id="recaptcha-container"
                    className="g-recaptcha"
                    data-sitekey="6Lc8goArAAAAABEfJMPPR3G7Rx89r5yrsr-X-iew"
                    data-callback="onRecaptchaSuccess"
                    data-expired-callback="onRecaptchaExpired"
                  ></div>

                  <div className="flex-row alc">
                    <div className="submit-button button-div filled-div-button form_button noPrint">
                      <button
                        className="reecosys-template-button button-style-secondary"
                        type="submit"
                        tabIndex="121"
                      >
                        <p>Submit</p>
                      </button>
                    </div>
                    <div className="submit-button button-div filled-div-button form_button noPrint">
                      <button
                        className="reecosys-template-button button-style-secondary"
                        type="button"
                        tabIndex="168"
                        onClick={() => window.print()}
                      >
                        <p>Print</p>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

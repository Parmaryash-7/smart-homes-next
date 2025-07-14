'use client'

import React, { useEffect, useState } from 'react'
// import { CountryList } from "../services/CountryList";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountryList } from 'store/countrySlice'
import { projectInquiry } from 'lib/ProjectInquiry'
import InputField from './InputFeild'
import { toast } from 'react-toastify'

export default function InquiryForm({
  pageDetail,
  countryFlag,
  setCountryFlag,
  isHome,
  isAbout,
  propertyList
}) {
  // const [countryList, setcountryList] = useState(null);
  const [search, setSearch] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setisSubmitting] = useState(false)

  // const [seoMetaData, setSeoMetaData] = useState(null);
  const [inquiryObj, setInquiryObj] = useState({
    agree_tandc: '1',
    from_app: 'true',
    master_user_id: '339',
    logged_in_master_user_id: '339',
    agree_tandc_display: true,
    last_name: '',
    property_type: '',
    first_name: '',
    client_contact_no_display: '',
    client_contact_no: '',
    email_address: '',
    remarks: '',
    user_type: 'N',
    flag: 'https://flagcdn.com/w40/in.webp',
    country: '91',
    project_id: ''
  })
  const dispatch = useDispatch()
  const { countryList } = useSelector((state) => state.country)

  // Load country list from redux store
  useEffect(() => {
    dispatch(fetchCountryList())
  }, [pageDetail, dispatch])

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target

    let updatedValue = value
    // Prevent numbers in client_name (handle paste or typing)
    if (name === 'client_name') {
      updatedValue = value.replace(/[0-9]/g, '') // remove any digits
    }

    // For contact_no, allow only numbers
    if (name === 'client_contact_no_display') {
      updatedValue = value.replace(/[^0-9]/g, '') // remove non-numeric chars
      if (updatedValue.length > 10) {
        updatedValue = updatedValue.slice(0, 10) // limit to 10 digits
      }
    }

    // Update state
    setInquiryObj((prev) => ({
      ...prev,
      [name]: updatedValue
    }))

    // Clear error for the current field
    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }))
  }
  const validate = () => {
    let newErrors = {}
    const nameRegex = /^[a-zA-Z\s]+$/
    const phoneRegex = /^\d{10}$/
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

    if (!inquiryObj.first_name.trim()) {
      newErrors.first_name = 'First Name is required'
    } else if (!nameRegex.test(inquiryObj.first_name)) {
      newErrors.first_name = 'Name must contain only letters'
    }
    if (!inquiryObj.last_name.trim()) {
      newErrors.last_name = 'Last Name is required'
    } else if (!nameRegex.test(inquiryObj.last_name)) {
      newErrors.last_name = 'Name must contain only letters'
    }

    if (!inquiryObj.client_contact_no_display.trim()) {
      newErrors.client_contact_no_display = 'Contact number is required'
    } else if (!phoneRegex.test(inquiryObj.client_contact_no_display)) {
      newErrors.client_contact_no_display = 'Contact number must be 10 digits'
    }

    if (
      !isHome &&
      (!inquiryObj.property_type || inquiryObj.property_type.trim() === '')
    ) {
      newErrors.property_type = 'Address is required'
    }

    // if (!inquiryObj.email_address.trim()) {
    //     newErrors.email_address = "Email is required";
    // } else if (!emailRegex.test(inquiryObj.email_address)) {
    //     newErrors.email_address = "Invalid email format";
    // }

    return newErrors
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      // Scroll to first error field
      const firstErrorField = Object.keys(validationErrors)[0]
      const el = document.querySelector(`[name="${firstErrorField}"]`)
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.focus()
      }

      return
    }

    setisSubmitting(true)

    let project_id = !isHome ? pageDetail.project_id : ''
    let client_name = inquiryObj.first_name + ' ' + inquiryObj.last_name
    let client_contact_no =
      inquiryObj.country + ' ' + inquiryObj.client_contact_no_display

    inquiryObj.remarks = !isHome
      ? inquiryObj.remarks + ' , Looking For : ' + inquiryObj.property_type
      : ''

    const finalInquiry = {
      ...inquiryObj,
      project_id,
      client_name,
      client_contact_no
    }

    console.log('Form Data:', finalInquiry)

    // Example POST
    // const res = await projectInquiry(finalInquiry)
    // const response = await res.json()
    // toast.success('Inquiry submitted successfully')

    setisSubmitting(false)
    setFormSubmitted(false)
  }


  const handleCountrySelect = (phonecode, flag) => {
    setInquiryObj({
      ...inquiryObj,
      country: phonecode,
      flag: flag
    })
    setCountryFlag(false)
  }

  // const loadCountry = async () => {
  //   try {
  //     // const data = await CountryList();

  //     // Filter directly, without `await`
  //     // const filtered = data.filter((country) => country.phonecode !== "92");

  //     setcountryList(filtered);
  //   } catch (err) {
  //     console.error("Error loading country data:", err);
  //   }
  // };
  // useEffect(() => {
  //   loadCountry();
  // }, []);

  useEffect(() => {
    if (isAbout) {
      setInquiryObj({
        ...inquiryObj,
        about_project_id: ''
      })
    }
  }, [])

  const projectType = [
    {
      name: '',
      value: ''
    },
    {
      name: 'Villa',
      value: 'Villa'
    },
    {
      name: 'Plot',
      value: 'Plot'
    }
  ]

  const aboutProjectType = [
    {
      name: '',
      value: ''
    },
    {
      name: 'Plot',
      value: 'Plot'
    }
  ]

  const propertyListName = [
    { name: '', value: '' },
    { name: 'name1', value: 'name1' },
    { name: 'name2', value: 'name2' }
  ]

  // return null;

  return (
    <form className="contactForm detailForm w100" onSubmit={handleSubmit}>
      {pageDetail && (
        <InputField
          tag="select"
          selectList={projectType}
          id="property_type"
          placeholder="Select Project"
          name="property_type"
          value={inquiryObj.property_type}
          handleChange={handleChange}
          errors={errors}
          label="Project*"
        />
      )}

      {isAbout && propertyListName ? (
        <InputField
          tag="select"
          selectList={propertyListName}
          name="about_project_id"
          value={inquiryObj.about_project_id}
          handleChange={handleChange}
          errors={errors}
          label="Project Type*"
        />
      ) : (
        <></>
      )}

      {isAbout ? (
        <InputField
          tag="select"
          selectList={aboutProjectType}
          name="property_type"
          value={inquiryObj.property_type}
          handleChange={handleChange}
          errors={errors}
          label="Project Type*"
        />
      ) : (
        <></>
      )}

      <InputField
        tag="input"
        id="first_name"
        type="text"
        name="first_name"
        value={inquiryObj.first_name}
        handleChange={handleChange}
        errors={errors}
        label="First Name*"
      />

      <InputField
        tag="input"
        id="last_name"
        type="text"
        name="last_name"
        value={inquiryObj.last_name}
        handleChange={handleChange}
        errors={errors}
        label="Last Name*"
      />

      <InputField
        tag="input"
        id="client_contact_no_display"
        type="text"
        name="client_contact_no_display"
        value={inquiryObj.client_contact_no_display}
        handleChange={handleChange}
        errors={errors}
        label="Phone Number*"
        country={inquiryObj.country}
        flag={inquiryObj.flag}
        handleCountrySelect={handleCountrySelect}
        countryFlag={countryFlag}
        setCountryFlag={setCountryFlag}
        search={search}
        setSearch={setSearch}
        countryList={countryList}
      />

      <InputField
        tag="input"
        id="email_address"
        type="text"
        name="email_address"
        value={inquiryObj.email_address}
        handleChange={handleChange}
        label="Email Address"
      />

      <InputField
        tag="textarea"
        row={isHome || isAbout ? 2 : 1}
        id="remarks"
        type="text"
        name="remarks"
        value={inquiryObj.remarks}
        handleChange={handleChange}
        errors={errors}
        label="Comments"
        isHome={isHome ? isHome : false}
      />

      <div className="wfc m0auto homeSubmitBtn formSubmit">
        <button
          className="reecosys-template-button button-style-secondary"
          type="submit"
          disabled={isSubmitting}
        // onClick={(e) => {
        //   e.preventDefault()
        //   e.stopPropagation()
        //   handleSubmit()
        // }}
        >
          <p>{isSubmitting ? 'Please Wait...' : 'Submit'}</p>
        </button>
      </div>
    </form>
  )
}

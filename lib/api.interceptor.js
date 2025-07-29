const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://www.reecosys.com/api/Admin'
const SERVICES_URL =
  process.env.NEXT_PUBLIC_SERVICES_API_URL ||
  'https://www.reecosys.com/api/Services'
const MAIL_URL =
  process.env.NEXT_PUBLIC_MAIL_API_URL || 'https://www.smarthomesinfra.com'
// API service methods that use fetchData
const masterIds = {
  master_user_id: 339,
  logged_in_master_user_id: 339,
  user_name: 'smarthomesinfrastructure'
}
// export const uploadPath = process.env.SERVICES_API_URL
const generateFormData = (json) => {
  const formData = new FormData()
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const value = json[key]
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item))
      } else {
        formData.append(key, value)
      }
    }
  }
  return formData
}
const getToken = () => {
  return 'CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093'
}
const getUserId = () => {
  return JSON.parse(sessionStorage.getItem('userId'))
}
const fetchDataWithToken = async (url, options = {}) => {
  try {
    const response = await fetch(BASE_URL + url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    })
    return await response.json()
  } catch (error) {
    console.error('Error fetching data with token:', error)
    return null
  }
}
// Helper function to handle requests without token (for public resources)
const fetchDataWithoutToken = async (url, options = {}) => {
  try {
    const response = await fetch(BASE_URL + url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${token}`,
      }
    })
    return await response.json()
  } catch (error) {
    console.error('Error fetching data without token:', error)
    return null
  }
}
export const fetchData = {
  // POST request with token (for protected endpoints)
  adminPost: async (url, data) => {
    try {
      const response = await fetch(ADMIN_URL + url, {
        method: 'POST',
        headers: {
          Authorization: `User ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with POST request:', error)
      return null
    }
  },
  // POST request with token (for protected endpoints)  
  servicesPost: async (url, data) => {
    // console.log(SERVICES_URL + url)
    try {
      const response = await fetch(SERVICES_URL + url, {
        method: 'POST',
        headers: {
          Authorization: `User ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with POST request:', error)
      return null
    }
  },
  // POST request with token (for protected endpoints)
  mailInq: async (data) => {
    // console.log(SERVICES_URL + url)
    try {
      const response = await fetch(MAIL_URL, {
        method: 'POST',
        headers: {
          Authorization: `User ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with POST request:', error)
      return null
    }
  },
  uploadFilePost: async (url, data) => {
    // console.log(SERVICES_URL + url)
    try {
      const response = await fetch(SERVICES_URL + url, {
        method: 'POST',
        headers: {
          Authorization: `User ${getToken()}`
        },
        body: data
      })
      return await response.json()
    } catch (error) {
      console.error('Error with POST request:', error)
      return null
    }
  }
}
const checkSuccess = (data) => {
  if (data.success == 1) {
    return data.data
  } else {
    // console.log(data)
    return data
  }
}
const api = {
  // FarmsAll API
  //Admin methods Start
  AdminDetail: async () => {
    const body = { ...masterIds }
    const data = await fetchData.adminPost(`/admin/details`, body)
    return checkSuccess(data)
  },
  PageList: async () => {
    const body = { ...masterIds }
    const data = await fetchData.adminPost(`/pages/list`, body)
    return checkSuccess(data)
  },
  HomeDetail: async () => {
    const body = { ...masterIds }
    const data = await fetchData.adminPost(`/home/details`, body)
    return checkSuccess(data)
  },
  CompletedPropertyList: async () => {
    const body = { ...masterIds, all_detail: '1' }
    const data = await fetchData.servicesPost(
      `/properties/completed_properties`,
      body
    )
    return checkSuccess(data)
  },
  SocialMediaList: async () => {
    const body = { ...masterIds }
    const data = await fetchData.adminPost(`/social_page/list`, body)
    return checkSuccess(data)
  },
  ContactFData: async () => {
    const body = { ...masterIds }
    const data = await fetchData.adminPost(`/contact_page/details`, body)
    return checkSuccess(data)
  },
  CountryList: async () => {
    const body = { ...masterIds }
    const data = await fetchData.adminPost(`/country/list`, body)
    return checkSuccess(data)
  },
  PageDetail: async (slug) => {
    const body = { ...masterIds, slug: slug }
    const data = await fetchData.adminPost(`/pages/list`, body)
    return checkSuccess(data)
  },
  //Admin methods End
  //Services methods Start
  Propertylist: async () => {
    const body = { ...masterIds, all_detail: '1' }
    const data = await fetchData.servicesPost(`/properties/list`, body)
    return checkSuccess(data)
  },
  BulkLand: async () => {
    const body = { ...masterIds, all_detail: '1', slug: 'bulk-land-in-dholera' }
    const data = await fetchData.servicesPost(`/properties/list`, body)
    return checkSuccess(data)
  },
  ProjectUnitAllList: async () => {
    const body = { ...masterIds, show_all_units: "yes", from_app: true, cp_user_id: "", search: "", }
    const data = await fetchData.servicesPost(`projects_units/unit_all_list`, body)
    // console.log(data);
    return checkSuccess(data)
  },
  CareerPage: async () => {
    const body = { ...masterIds }
    const data = await fetchData.servicesPost(`/career_jobs/list`, body)
    // console.log(data);
    return checkSuccess(data)
  },
  CareerInquiry: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.servicesPost(`/career/save`, body)
    return data
  },
  ChannelPartnerInquiry: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.servicesPost(`/channelpartner/save`, body)
    return data
  },
  ContactInquiry: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.servicesPost(`/contact_web/save`, body)
    return data
  },
  ChannelInquiry: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.servicesPost(`/channelpartner/save`, body)
    return data
  },
  Projectinquiry: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.servicesPost(`/inquiries/save`, body)
    return data
  },
  NriInq: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.servicesPost(`/nri/save`, body)
    return data
  },
  ContactInq: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.servicesPost(`/contact_web/save`, body)
    return data
  },
  ChannelPartner: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.servicesPost(`/channelpartner/save`, body)
    return data
  },
  // CareerPage: async (postData) => {
  //   // const body = JSON.stringify(postData)
  //   const body = postData
  //   const data = await fetchData.servicesPost(`/career_jobs/list`, body)
  //   console.log(data);
  //   return data
  // },
  PropertyDetail: async (slug) => {
    const body = { ...masterIds, all_detail: '1', slug: slug }
    const data = await fetchData.servicesPost(`/properties/list`, body)
    return checkSuccess(data)
  },
  RedevelopmentInquiry: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.servicesPost(`/redevelopment/save`, body)
    return data
  },
  VendorInquiry: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.servicesPost(`/vendor/save`, body)
    return data
  },
  FooterEmail: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.servicesPost(`/subscription/save`, body)
    return data
  },
  //Services methods End
  // Mail Inq
  RedevelopmentMailInquiry: async (postData) => {
    // const body = JSON.stringify(postData)
    const body = postData
    const data = await fetchData.mailInq(`/redevelopment_inquiry.php`, body)
    return data
  },
  //Upload File Method Start
  CareerFileUpload: async (uploadData) => {
    const formData = new FormData()
    formData.append('from_app', true)
    formData.append('upload_type', 'resume')
    formData.append('resume_upload', uploadData)
    const body = formData
    // console.log(uploadData)
    const data = await fetchData.uploadFilePost(`/career/upload_file`, body)
    return data
  },
  VendorFileUpload: async (uploadData) => {
    const formData = new FormData()
    formData.append('from_app', 'true')
    Object.entries(uploadData).forEach(([key, val]) => {
      formData.append(key, val)
    })
    const body = formData
    // console.log(uploadData)
    const data = await fetchData.uploadFilePost(`/vendor/upload_file`, body)
    return data
  }
  //Upload File Method End
  // //JSON CALL
  //   Gallery_json: async () => {
  //     const fileContents = await fs.readFile(
  //       path.join(__dirname, 'gallery_img.json'),
  //       'utf-8'
  //     )
  //     const data = JSON.parse(fileContents)
  //     return data
  //   }
}
export default api
const otherExampleMethods = {
  // GET request with token (for protected endpoints)
  get: async (url) => {
    try {
      return await fetchDataWithToken(url)
    } catch (error) {
      console.error(`Error fetching data for ${url}:`, error)
      return null
    }
  },
  // GET request without token (for public endpoints)
  getWithoutToken: async (url) => {
    try {
      return await fetchDataWithoutToken(url)
    } catch (error) {
      console.error(`Error fetching data for ${url}:`, error)
      return null
    }
  },
  patch: async (url, data) => {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with POST request:', error)
      return null
    }
  },
  // POST request without token (for public endpoints)
  postWithoutToken: async (url, data) => {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with POST request:', error)
      return null
    }
  },
  // PUT request with token (for protected endpoints)
  put: async (url, data) => {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with PUT request:', error)
      return null
    }
  },
  patch: async (url, data) => {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with PATCH request:', error)
      return null
    }
  },
  // PUT request without token (for public endpoints)
  putWithoutToken: async (url, data) => {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with PUT request:', error)
      return null
    }
  },
  // DELETE request with token (for protected endpoints)
  delete: async (url, body) => {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with DELETE request:', error)
      return null
    }
  },
  // DELETE request without token (for public endpoints)
  deleteWithoutToken: async (url) => {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return await response.json()
    } catch (error) {
      console.error('Error with DELETE request:', error)
      return null
    }
  },
  // POST request with FormData (used for uploading files)
  postWithFormData: async (url, formData) => {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: generateFormData(formData)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with FormData POST:', error)
      return null
    }
  },
  putWithFormData: async (url, formData) => {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: generateFormData(formData)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with FormData POST:', error)
      return null
    }
  },
  // POST request without FormData (public)
  postWithoutFormData: async (url, data) => {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error('Error with POST request:', error)
      return null
    }
  }
}

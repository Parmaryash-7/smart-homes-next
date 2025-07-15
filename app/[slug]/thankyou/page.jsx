// import React from 'react'
// import ThankYou from 'components/ThankYou'

// export default function ThankYouPage() {
//   return <ThankYou pageName="your inquiry" />
// }


import React from 'react'
import ThankYou from 'components/ThankYou'
import api from 'lib/api.interceptor'

import { redirect } from 'next/navigation'

export default async function ThankYouPage({ params }) {
  const {slug} = params

  try {
    const res = await api.PropertyDetail(slug)

    if (res.success == 0) {
       redirect('/')
    }
  } catch (error) {
    console.error('Error fetching project:', error)
  }

  return <ThankYou />
}

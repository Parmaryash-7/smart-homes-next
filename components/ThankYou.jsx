'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import Link from 'next/link'

export default function ThankYou() {
  const { page_name } = useSelector((state) => state.inquiry.thankyouData)

  const router = useRouter()

  if (!page_name) return router.push('/')

  return (
    <div className="reecosys-main-wrapper" id="reecosys-thankyou-wrapper">
      <section
        className="reecosys-section relative"
        id="reecosys-thankyou-section-1"
      >
        <div className="mini-container">
          <div className="thankyou_wrapper inner-flex alc j-c-c text-center">
            <div className="inner-flex">
              <div className="thankyou-title">
                <h1>Thank You</h1>
              </div>
              <div className="section-title">
                <h2>For Getting in Touch!</h2>
              </div>
              <div className="section-content">
                <p className="capitalize">
                  We appreciate you contacting us about{' '}
                  <span className="medium-fonts">{page_name}</span>.
                  <br />
                  Team SmartHomes Infrastructure will get back to you Shortly.
                </p>
              </div>
              <div className="section-content BacktoHome">
                <Link href="/">
                  <p>Back to Home</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ThankYou() {
  const router = useRouter()
  const { page_name, documents } = useSelector((state) => state.inquiry.thankyouData || {})

  const [showPDF, setShowPDF] = useState(false)
  const [pdfURL, setPdfURL] = useState('')

  const openPDF = (url) => {
    setPdfURL(url)
    setShowPDF(true)
  }

  const closePDF = () => {
    setShowPDF(false)
    setPdfURL('')
  }

  if (!page_name) {
    router.push('/')
    return null
  }

  useEffect(() => {
    console.log(documents);
  }, [])


  return (
    <div className="reecosys-main-wrapper" id="reecosys-thankyou-wrapper">
      <section className="reecosys-section relative" id="reecosys-thankyou-section-1">
        <div className="mini-container">
          <div className="thankyou_wrapper inner-flex alc j-c-c text-center">
            <div className="inner-flex alc">
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
                  Team SmartHomes Infrastructure will get back to you shortly.
                </p>
              </div>

              {documents?.length > 0 && (
                <>
                  <ul className="flex-row inner-flex-small flex-col-mob j-c-c">
                    {documents.map((doc, index) => (
                      <li key={index}>
                        <button
                          className="reecosys-template-button button-style-secondary"
                          onClick={() => openPDF(doc.url)}
                        >
                          <span className="material-symbols-outlined">visibility</span>
                          <p className="capitalize">View {doc.type}</p>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {showPDF && (
                    <div id="pdf-viewer-container">
                      <div
                        className={`flex-row inner-flex-small alc j-c-c ${documents.length === 1 ? "alc" : "alc" 
                          } white-bg`}
                        style={{ padding: '1.5rem 0' }}
                      >
                        <div>
                          <button
                            onClick={closePDF}
                            className="reecosys-template-button button-style-secondary-outline"
                          >
                            <p>Close Brochure</p>
                          </button>
                        </div>

                        {documents.length === 1 ? (
                          <div>
                            <a href={documents[0].url} target="_blank" rel="noopener noreferrer">
                              <button
                                onClick={closePDF}
                                className="reecosys-template-button button-style-secondary"
                              >
                                <p>Download {documents[0].type}</p>
                              </button>
                            </a>
                          </div>
                        ) : (
                          documents.map((doc, i) => (
                            <div key={i}>
                              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                <button
                                  onClick={closePDF}
                                  className="reecosys-template-button button-style-secondary"
                                >
                                  <p>Download {doc.type}</p>
                                </button>
                              </a>
                            </div>
                          ))
                        )}
                      </div>

                      <iframe src={pdfURL} width="100%" height="100%" />
                    </div>
                  )}

                </>
              )}

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

// // app/bookplotpayment/page.jsx
// import React from 'react'
// import './bookpltpayment.css'

// export default function BookPlotPayment() {
//     return (
//         <div className="book-plots-wrapper" style={{ backgroundColor: '#ffffff' }}>
//             <section className="section-padding">
//                 <div className="mini-container">
//                     <div className="inner-flex inner-flex-big">
//                         <div className="inner-flex">
//                             <div className="section-title">
//                                 <h2 className="bold-fonts capitalize text-center highlight-color">
//                                     Thank You
//                                 </h2>
//                             </div>
//                             <div className="section-content">
//                                 <p className="capitalize text-center">
//                                     We have received your Details. Please make payment
//                                     <br />
//                                     & secure your plot now.
//                                 </p>
//                             </div>
//                         </div>

//                         <form
//                             id="payment_bookingform"
//                             name="payment_bookingform"
//                             action="/api/bookplotpayment"
//                             method="POST"
//                         >
//                             <div className="form_wrapper">
//                                 <div className="section-paragraph">
//                                     <p className="bold-fonts highlight-color">BOOKING DETAILS</p>
//                                 </div>

//                                 <div className="inentification-grid">
//                                     <div className="contact_lable">
//                                         <input
//                                             id="amount"
//                                             name="amount"
//                                             type="number"
//                                             className="form-control"
//                                             tabIndex="130"
//                                             autoComplete="off"
//                                             required
//                                         />
//                                         <label className="md-lable" htmlFor="amount">
//                                             Booking Amount*
//                                         </label>
//                                     </div>
//                                 </div>

//                                 <div className="flex-row alc" style={{ margin: '1.25rem auto 0' }}>
//                                     <div className="submit-button button-div filled-div-button form_button">
//                                         <button
//                                             className="reecosys-template-button button-style-secondary"
//                                             type="submit"
//                                             tabIndex="167"
//                                         >
//                                             <p>Make Payment</p>
//                                         </button>
//                                     </div>  
//                                 </div>
//                             </div>
//                         </form>

//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }


// 'use client'

// import React, { useEffect, useState } from 'react'
// import Script from 'next/script'
// import { useRouter } from 'next/navigation'

// export default function BookPlotPayment() {
//     const [bookingObj, setBookingObj] = useState(null)
//     const [plotBookingStatus, setPlotBookingStatus] = useState(false)
//     const router = useRouter()

//     useEffect(() => {
//         const data = sessionStorage.getItem('paymentDetailObj')
//         if (!data) {
//             router.push('/bookplot') 
//         } else {
//             const parsed = JSON.parse(data)
//             parsed.payment_details = 'Razorpay'
//             setBookingObj(parsed)
//         }
//     }, [router])

//     const handleRazorpay = () => {
//         if (!bookingObj || plotBookingStatus) return

//         setPlotBookingStatus(true)

//         const options = {
//             // key: 'rzp_live_IwzA0grLh3Rpct', //Live API Key
//             key: 'rzp_test_gPEm9Lk8sfM128', //Test API Key
//             amount: bookingObj.amount * 100,
//             name: 'Smart Homes',
//             description: 'Plot Booking Payment',
//             handler: async function (response) {
//                 if (response.razorpay_payment_id) {
//                     try {
//                         // 1. Save Transaction
//                         await fetch('https://www.reecosys.com/api/booking/unit_transaction', {
//                             method: 'POST',
//                             headers: { 'Content-Type': 'application/json' },
//                             body: JSON.stringify({
//                                 razorpay_payment_id: response.razorpay_payment_id,
//                                 booking_id: bookingObj.id,
//                                 unit_id: bookingObj.unit_id,
//                                 amount: bookingObj.amount,
//                                 name: bookingObj.full_name,
//                                 email: bookingObj.email,
//                                 contact_no: bookingObj.contact_no
//                             })
//                         })

//                         // 2. Update Payment Status
//                         const res = await fetch('https://www.reecosys.com/api/booking/update_payment_status', {
//                             method: 'POST',
//                             headers: { 'Content-Type': 'application/json' },
//                             body: JSON.stringify({
//                                 razorpay_payment_id: response.razorpay_payment_id,
//                                 id: bookingObj.id,
//                                 unit_id: bookingObj.unit_id
//                             })
//                         })

//                         const result = await res.json()
//                         if (result.status === 1) {
//                             sessionStorage.removeItem('paymentDetailObj')
//                             router.push('/bookplot/thankyou')
//                         } else {
//                             alert(result.message || 'Payment status update failed.')
//                             setPlotBookingStatus(false)
//                         }
//                     } catch (err) {
//                         console.error('Payment processing failed', err)
//                         setPlotBookingStatus(false)
//                     }
//                 } else {
//                     alert('Payment failed. Please try again.')
//                     setPlotBookingStatus(false)
//                 }
//             },
//             modal: {
//                 ondismiss: () => {
//                     setPlotBookingStatus(false)
//                 }
//             },
//             theme: {
//                 color: '#9D1555'
//             }
//         }

//         const rzp = new window.Razorpay(options)
//         rzp.open()
//     }

//     return (
//         <div className="book-plots-wrapper">
//             <Script src="https://checkout.razorpay.com/v1/checkout.js" />
//             <section className="section-padding">
//                 <div className="mini-container">
//                     <h2 className="bold-fonts capitalize text-center highlight-color">
//                         Thank You
//                     </h2>
//                     <p className="capitalize text-center">
//                         We have received your Details. Please make payment and secure your plot now.
//                     </p>

//                     {bookingObj && (
//                         <form className="form_wrapper" onSubmit={(e) => { e.preventDefault(); handleRazorpay(); }}>
//                             <p className="bold-fonts highlight-color">BOOKING DETAILS</p>

//                             <div className="contact_lable">
//                                 <input
//                                     id="amount"
//                                     name="amount"
//                                     type="text"
//                                     value={bookingObj.amount}
//                                     className="form-control"
//                                     disabled
//                                 />
//                                 <label className="md-lable" htmlFor="amount">Booking Amount*</label>
//                             </div>

//                             <div className="flex-row alc" style={{ marginTop: '1.25rem' }}>
//                                 <button
//                                     type="submit"
//                                     className="reecosys-template-button button-style-secondary"
//                                     disabled={plotBookingStatus}
//                                 >
//                                     {plotBookingStatus ? 'Please wait...' : 'Make Payment'}
//                                 </button>
//                             </div>
//                         </form>
//                     )}
//                 </div>
//             </section>
//         </div>
//     )
// }


// import dynamic from 'next/dynamic'
// import { redirect } from 'next/navigation'
import BookPlotPayment from 'components/BookPlotPayment'

// const BookPlotPayment = dynamic(() => import('components/BookPlotPayment'), { ssr: false })

export default function BookPlotPaymentPage() {
    // const paymentDetail = typeof window !== 'undefined'
    //     ? sessionStorage.getItem('paymentDetailObj')
    //     : null
    // console.log("PLOT");

    // return <>PAYMENT</>
    return <BookPlotPayment />
}

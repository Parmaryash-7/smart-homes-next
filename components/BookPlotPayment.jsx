// 'use client';

// import React, { useState } from 'react';

// export default function ThankYouPayment() {
//   const [bookingObj, setBookingObj] = useState({ amount: '' });
//   const [plotBookingStatus, setPlotBookingStatus] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'amount') {
//       const numericValue = value.replace(/\D/g, ''); // Only digits
//       setBookingObj((prev) => ({ ...prev, [name]: numericValue }));
//     }
//   };

//   const submitPaymentBooking = async (e) => {
//     e.preventDefault();
//     if (!bookingObj.amount) return;

//     setPlotBookingStatus(true);
//     try {
//       // TODO: Replace this with actual payment logic (e.g., Razorpay or API call)
//       console.log('Booking Amount:', bookingObj.amount);
//       alert('Payment Process Initiated');
//     } catch (error) {
//       console.error('Payment Error:', error);
//     } finally {
//       setPlotBookingStatus(false);
//     }
//   };

//   return (
//     <div className="book-plots-wrapper" style={{ backgroundColor: '#ffffff' }}>
//       <section className="section-padding">
//         <div className="mini-container">
//           <div className="">
//             <div className="inner-flex inner-flex-big">
//               <div className="inner-flex">
//                 <div className="section-title">
//                   <h2 className="bold-fonts capitalize text-center highlight-color">Thank You</h2>
//                 </div>
//                 <div className="section-content">
//                   <p className="capitalize text-center">
//                     We have received your Details. Please make payment
//                     <br />
//                     & secure your plot now.
//                   </p>
//                 </div>
//               </div>

//               <form id="payment_bookingform" name="payment_bookingform" onSubmit={submitPaymentBooking}>
//                 <div className="form_wrapper">
//                   <div className="section-paragraph">
//                     <p className="bold-fonts highlight-color">BOOKING DETAILS</p>
//                   </div>

//                   <div className="inentification-grid">
//                     <div className="contact_lable">
//                       <input
//                         id="amount"
//                         name="amount"
//                         type="text"
//                         className="form-control"
//                         tabIndex="130"
//                         autoComplete="off"
//                         value={bookingObj.amount}
//                         onChange={handleChange}
//                         required
//                       />
//                       <label className="md-lable" htmlFor="amount">Booking Amount*</label>
//                     </div>

//                     {/* Uncomment if you want to show static payment type */}
//                     {/* <div className="contact_lable">
//                       <input
//                         id="payment_details"
//                         name="payment_details"
//                         type="text"
//                         className="form-control"
//                         value="Razorpay"
//                         disabled
//                         tabIndex="131"
//                         autoComplete="off"
//                       />
//                       <label className="md-lable" htmlFor="payment_details">Payment Type</label>
//                     </div> */}
//                   </div>

//                   <div className="flex-row alc" style={{ margin: '1.25rem auto 0' }}>
//                     <div className="submit-button button-div filled-div-button form_button">
//                       <button
//                         className="reecosys-template-button button-style-secondary"
//                         type="submit"
//                         disabled={plotBookingStatus}
//                         tabIndex="167"
//                       >
//                         <p>{plotBookingStatus ? 'Please wait...' : 'Make Payment'}</p>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>

//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import api from 'lib/api.interceptor'

export default function ThankYouPayment() {
  const [bookingObj, setBookingObj] = useState({
    amount: '',
    id: '',
    unit_id: '',
    full_name: '',
    email: '',
    contact_no: '',
  });

  const [plotBookingStatus, setPlotBookingStatus] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);

  // ✅ Load bookingObj from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('bookingData');
    if (storedData) {
      try {
        setBookingObj(JSON.parse(storedData));
      } catch (err) {
        console.error('Error parsing bookingData from localStorage:', err);
      }
    }
  }, []);

  // ✅ Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsRazorpayReady(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const submitPaymentBooking = async (e) => {
    e.preventDefault();
    if (!bookingObj.amount || plotBookingStatus || !isRazorpayReady) return;

    setPlotBookingStatus(true);

    const options = {
      key: 'rzp_test_gPEm9Lk8sfM128',
      amount: bookingObj.amount * 100,
      lead_id: 1,
      id: bookingObj.id,
      name: 'Smart Homes',
      handler: async function (response_razorpay) {
        console.log('Payment Success:', response_razorpay);
        if (response_razorpay.razorpay_payment_id) {
          try {
            const authToken = localStorage.getItem('authToken');

            // 1. unit_transcation
            await fetch("https://www.reecosys.com/api/Bookings/unit_transcation", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
              },
              body: JSON.stringify({
                razorpay_payment_id: response_razorpay.razorpay_payment_id,
                booking_id: bookingObj.id,
                unit_id: bookingObj.unit_id,
                amount: bookingObj.amount,
                name: bookingObj.full_name,
                email: bookingObj.email,
                contact_no: bookingObj.contact_no,
              }),
            });

            // 2. update_payment_status
            const res2 = await fetch('https://www.reecosys.com/api/Bookings/update_payment_status', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
              },
              body: JSON.stringify({
                razorpay_payment_id: response_razorpay.razorpay_payment_id,
                id: bookingObj.id,
                unit_id: bookingObj.unit_id,
              }),
            });

            const data2 = await res2.json();
            if (data2.status === 1) {
              alert(data2.message);
              localStorage.removeItem('bookingData');
              window.location.href = '/book_plot/thankyou';
            } else {
              alert('Payment update failed');
            }
          } catch (error) {
            console.error('API error during payment:', error);
            alert('Something went wrong during payment.');
          } finally {
            setPlotBookingStatus(false);
          }
        } else {
          alert('Payment Failed. Please try again!');
          setPlotBookingStatus(false);
        }
      },
      modal: {
        ondismiss: () => {
          setPlotBookingStatus(false);
        },
      },
      theme: {
        color: '#9D1555',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

    const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      const numericValue = value.replace(/\D/g, ''); // Only digits
      setBookingObj((prev) => ({ ...prev, [name]: numericValue }));
    }
  };

  return (
    <div className="book-plots-wrapper" style={{ backgroundColor: '#ffffff' }}>
      <section className="section-padding">
        <div className="mini-container">
          <div className="">
            <div className="inner-flex inner-flex-big">
              <div className="inner-flex">
                <div className="section-title">
                  <h2 className="bold-fonts capitalize text-center highlight-color">Thank You</h2>
                </div>
                <div className="section-content">
                  <p className="capitalize text-center">
                    We have received your Details. Please make payment
                    <br />
                    & secure your plot now.
                  </p>
                </div>
              </div>

              <form onSubmit={submitPaymentBooking}>
                <div className="form_wrapper">
                  <div className="section-paragraph">
                    <p className="bold-fonts highlight-color">BOOKING DETAILS</p>
                  </div>

                  <div className="inentification-grid">
                    <div className="contact_lable">
                      <input
                        id="amount"
                        name="amount"
                        type="text"
                        className="form-control"
                        tabIndex="130"
                        autoComplete="off"
                        value={bookingObj.amount}
                        onChange={handleChange}
                        required
                      />
                      <label className="md-lable" htmlFor="amount">Booking Amount*</label>
                    </div>
                  </div>

                  <div className="flex-row alc" style={{ margin: '1.25rem auto 0' }}>
                    <div className="submit-button button-div filled-div-button form_button">
                      <button
                        className="reecosys-template-button button-style-secondary"
                        type="submit"
                        disabled={plotBookingStatus}
                        tabIndex="167"
                      >
                        <p>{plotBookingStatus ? 'Please wait...' : 'Make Payment'}</p>
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
  );
}

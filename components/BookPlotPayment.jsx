
'use client';

import React, { useEffect, useState } from 'react';
import { setThankYouData } from '../store/inquirySlice';
import { clearBookingData } from "../store/BookingSlice"
import { useDispatch, useSelector } from 'react-redux'
import api from 'lib/api.interceptor'
import { useRouter } from 'next/navigation';



export default function BookPlotPayment() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [bookingObj, setBookingObj] = useState({
    amount: '',
    id: '',
    unit_id: '',
    full_name: '',
    email: '',
    contact_no: '',
  });

  const plotBookingObj = useSelector((state) => state.booking.booking_data)

  const [plotBookingStatus, setPlotBookingStatus] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);


  useEffect(() => {
    if (plotBookingObj && Object.keys(plotBookingObj).length > 0) {
      const temp = plotBookingObj;
      setBookingObj({
        id: temp.booking_id,
        unit_id: temp.unit_id,
        full_name: temp.full_name,
        email: temp.email,
        contact_no: temp.contact_no,
      });
    } else {
      // router.push("/book_plot/");
    }
  }, [plotBookingObj]);

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
      // Test Key
      // key: 'rzp_test_gPEm9Lk8sfM128',

      // Live Key
      key: 'rzp_live_IwzA0grLh3Rpct', 

      amount: bookingObj.amount * 100,
      lead_id: 1,
      id: bookingObj.id,
      name: 'Smart Homes',
      handler: async function (response_razorpay) {
        // console.log('Payment Success:', response_razorpay);
        if (response_razorpay.razorpay_payment_id) {

          const res1Obj = {
            razorpay_payment_id: response_razorpay.razorpay_payment_id,
            booking_id: bookingObj.id,
            unit_id: bookingObj.unit_id,
            amount: bookingObj.amount,
            name: bookingObj.full_name,
            email: bookingObj.email,
            contact_no: bookingObj.contact_no,
          }
          const res2Obj = {
            razorpay_payment_id: response_razorpay.razorpay_payment_id,
            id: bookingObj.id,
            unit_id: bookingObj.unit_id,
          }

          const res1 = await api.unitTransaction(res1Obj);
          // console.log(res1);

          const res2 = await api.updatePaymentStatus(res2Obj);
          // console.log(res2);
          if (res2.status == "1") {
            localStorage.removeItem('bookingData');
            dispatch(setThankYouData({
              page_name: 'Book Plot',
              // type: "book_plot",
            }));
            router.push("/book_plot/thankyou");
            
            dispatch(clearBookingData())

          } else { }

          // try {


          // const authToken = "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093";

          // // 1. unit_transcation
          // await fetch("https://www.reecosys.com/api/Bookings/unit_transcation", {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     Authorization: authToken,
          //   },
          //   body: JSON.stringify({
          //     razorpay_payment_id: response_razorpay.razorpay_payment_id,
          //     booking_id: bookingObj.id,
          //     unit_id: bookingObj.unit_id,
          //     amount: bookingObj.amount,
          //     name: bookingObj.full_name,
          //     email: bookingObj.email,
          //     contact_no: bookingObj.contact_no,
          //   }),
          // });

          // 2. update_payment_status
          //   const res2 = await fetch('https://www.reecosys.com/api/Bookings/update_payment_status', {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //       Authorization: authToken,
          //     },
          //     body: JSON.stringify({
          //       razorpay_payment_id: response_razorpay.razorpay_payment_id,
          //       id: bookingObj.id,
          //       unit_id: bookingObj.unit_id,
          //     }),
          //   });

          //   const data2 = await res2.json();
          //   if (data2.status == "1") {
          //     // alert(data2.message);
          //     localStorage.removeItem('bookingData');
          //     dispatch(clearBookingData())
          //     dispatch(setThankYouData({
          //       page_name: 'book_plot',
          //       type: "book_plot",
          //     }));

          //     router.push("/book_plot/thankyou");
          //   } else {
          //     // alert('Payment update failed');
          //   }
          // } catch (error) {
          //   console.error('API error during payment:', error);
          //   // alert('Something went wrong during payment.');
          // } finally {
          //   setPlotBookingStatus(false);
          // }
        } else {
          // alert('Payment Failed. Please try again!');
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
      const numericValue = value.replace(/\D/g, ''); 
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

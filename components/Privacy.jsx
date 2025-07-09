"use client";

import React, { useEffect, useState } from "react";
import "./Privacy.css";

export default function Privacy({ pageList }) {
  const [privacyData, setPrivacy] = useState(null);
  const [isMobilescreen, setMobilescreen] = useState(false);

  useEffect(() => {
    let privacyDData = {};
    if (privacyData == null) {
      privacyDData = pageList.find((page) => page.slug == "privacy-policy");
      setPrivacy(privacyDData);
    }

    if (window.innerWidth < 767) setMobilescreen(true);
  });

  return (
    <>
      {privacyData && privacyData.page_name && (
        <div className="privacy_wrapper">
          <div
            className="reecosys-main-wrapper"
            id="reecosys-main-wrapper-privacy"
          // ng-click="country_code_click_false();"
          >
            <div
              id="reecosys-aboutus-wrapper"
              className="relative inner-flex inner-flex-big"
            >
              <div className="mini-container">
                <div>
                  <h1>Privacy Policy</h1>
                </div>
                <br />
                <br />
                <div>
                  <p>
                    This privacy policy has been compiled to better serve those
                    who are concerned with how their 'Personally identifiable
                    information' (PII) is being used online. PII, as used in US
                    privacy law and information security, is information that
                    can be used on its own or with other information to
                    identify, contact, or locate a single person, or to identify
                    an individual in context. Please read our privacy policy
                    carefully to get a clear understanding of how we collect,
                    use, protect or otherwise handle your Personally
                    Identifiable Information in accordance with our website.
                  </p>
                </div>

                <div>
                  <h3>
                    What personal information do we collect from the people that
                    visit our blog, website or app?
                  </h3>
                </div>

                <div>
                  <p>
                    When enquiring or registering on our site, as appropriate,
                    you may be asked to enter your name, email address, mailing
                    address, phone number or other details to help you with your
                    experience.
                  </p>
                </div>

                <h3>When do we collect information?</h3>
                <p>
                  We collect information from you when you register on our site,
                  subscribe to a newsletter, fill out a form or enter
                  information on our site.
                </p>

                <h3>How do we use your information?</h3>
                <p>
                  We may use the information we collect from you when you
                  register, make a purchase, sign up for our newsletter, respond
                  to a survey or marketing communication, surf the website, or
                  use certain other site features in the following ways:
                </p>
                <ul>
                  <li>
                    <p>
                      To personalize user's experience and to allow us to
                      deliver the type of content and product offerings in which
                      you are most interested.
                    </p>
                  </li>
                  <li>
                    <p>To improve our website in order to better serve you.</p>
                  </li>
                  <li>
                    <p>
                      To allow us to better service you in responding to your
                      customer service requests.
                    </p>
                  </li>
                  <li>
                    <p>
                      To administer a contest, promotion, survey or other site
                      feature.
                    </p>
                  </li>
                  <li>
                    <p>
                      To send periodic emails regarding your order or other
                      products and services.
                    </p>
                  </li>
                </ul>

                <h3>How do we protect visitor information?</h3>

                <p>
                  Our website is scanned on a regular basis for security holes
                  and known vulnerabilities in order to make your visit to our
                  site as safe as possible.
                </p>
                <p>We use regular Malware Scanning.</p>
                <p>
                  We do not use an SSL certificate because we do not ask for
                  credit card or debit card information.
                </p>
                <h3>Do we use 'cookies'?</h3>
                <p>
                  Yes. Cookies are small files that a site or its service
                  provider transfers to your computer's hard drive through your
                  Web browser (if you allow) that enables the site's or service
                  provider's systems to recognize your browser and capture and
                  remember certain information. For instance, we use cookies to
                  help us remember and process the items in your shopping cart.
                  They are also used to help us understand your preferences
                  based on previous or current site activity, which enables us
                  to provide you with improved services. We also use cookies to
                  help us compile aggregate data about site traffic and site
                  interaction so that we can offer better site experiences and
                  tools in the future.
                </p>
                <h4>We use cookies to:</h4>
                <ul>
                  <li>
                    <p>
                      Understand and save user's preferences for future visits.
                    </p>
                  </li>
                  <li>
                    <p>
                      Compile aggregate data about site traffic and site
                      interactions in order to offer better site experiences and
                      tools in the future. We may also use trusted third party
                      services that track this information on our behalf. your
                      browser's Help menu to learn the correct way to modify
                      your cookies.
                    </p>
                  </li>
                </ul>

                <p>
                  You can choose to have your computer warn you each time a
                  cookie is being sent, or you can choose to turn off all
                  cookies. You do this through your browser (like Internet
                  Explorer) settings. Each browser is a little different, so
                  look at your browser's Help menu to learn the correct way to
                  modify your cookies. If you disable cookies off, it won't
                  affect the users experience.
                </p>
                <h4>Third Party Disclosure</h4>
                <p>
                  We do not sell, trade, or otherwise transfer to outside
                  parties your personally identifiable information.
                </p>

                <h4>Third party links</h4>
                <p>
                  Occasionally, at our discretion, we may include or offer third
                  party products or services on our website. These third party
                  sites have separate and independent privacy policies. We
                  therefore have no responsibility or liability for the content
                  and activities of these linked sites. Nonetheless, we seek to
                  protect the integrity of our site and welcome any feedback
                  about these sites.
                </p>

                <h4>CAN SPAM Act</h4>
                <p>
                  The CAN-SPAM Act is a law that sets the rules for commercial
                  email, establishes requirements for commercial messages, gives
                  recipients the right to have emails stopped from being sent to
                  them, and spells out tough penalties for violations.
                </p>
                <p className="we-collect-padding">
                  We collect your email address in order to:
                </p>
                <ul>
                  <li>
                    Send information, respond to inquiries, and/or other
                    requests or questions.
                  </li>
                </ul>

                <p>
                  To be in accordance with CANSPAM we agree to the following:
                </p>
                <ul>
                  <li>
                    <p>
                      NOT use false, or misleading subjects or email addresses
                    </p>
                  </li>
                  <li>
                    <p>
                      Identify the message as an advertisement in some
                      reasonable way
                    </p>
                  </li>
                  <li>
                    <p>
                      Include the physical address of our business or site
                      headquarters
                    </p>
                  </li>
                  <li>
                    <p>
                      Monitor third party email marketing services for
                      compliance, if one is used.
                    </p>
                  </li>
                  <li>
                    <p>Honor opt-out/unsubscribe requests quickly</p>
                  </li>
                  <li>
                    <p>
                      Allow users to unsubscribe by using the link at the bottom
                      of each email
                    </p>
                  </li>
                </ul>

                <p>
                  IIf at any time you would like to unsubscribe from receiving
                  future emails, you can email us at:
                  <a
                    href="info@dholera-smart-city.com"
                    rel="external nofollow noopener"
                    target="_blank"
                  >
                    info@dholera-smart-city.com
                  </a>
                  and we will promptly remove you from ALL correspondence.
                </p>
                <h4>Contacting Us</h4>

                <p>
                  If there are any questions regarding this privacy policy you
                  may contact us using the information below.
                </p>
                <p>
                  Email:{" "}
                  <a href="info@smarthomesinfra.com">
                    info@smarthomesinfra.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


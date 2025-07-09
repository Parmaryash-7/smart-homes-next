"use client";

import React, { useEffect, useState } from "react";
import "./Terms.css";

export default function Terms({ pageList }) {
  const [termsData, setTermsData] = useState(null);
  const [isMobilescreen, setMobilescreen] = useState(false);

  useEffect(() => {
    if (!termsData) {
      const matched = pageList.find(
        (page) => page.slug === "terms-and-conditions"
      );
      setTermsData(matched);
    }

    if (window.innerWidth < 767) setMobilescreen(true);
  }, [termsData, pageList]);

  return (
    <>
      {termsData && termsData.page_name && (
        <div
          className="reecosys-main-wrapper"
          id="reecosys-main-wrapper-terms"
          ng-click="country_code_click_false();"
          ng-if="!is_commonpage_loading && common_page_list.page_name"
        >
          <div
            id="reecosys-aboutus-wrapper"
            className="relative inner-flex inner-flex-big"
          >
            <div className="mini-container">
              <div>
                <h1>TERMS AND CONDITIONS</h1>
              </div>

              <ol>
                <li>
                  <p>
                    By using or accessing the Website, Terms and Condition, the
                    User agrees, acknowledges and accepts all the Terms and
                    Conditions without any qualification or limitation.
                  </p>
                </li>
                <li>
                  <p>
                    The aforesaid website is the only official website of The
                    Company. User(s) are cautioned and advised not to rely upon
                    any information stated on any other websites which may
                    appear to be similar to the Company's official website and/
                    or contain Company's logo / brand name or information about
                    the Company or its Projects.
                  </p>
                </li>
                <li>
                  <p>
                    Customers/Investors are advised to use their own discretion
                    while investing in Company's Projects and the Investors must
                    read all the information about the company before investing
                    in its projects, all efforts have been made to ensure
                    accuracy of the information, the same should not be
                    interpreted as a statement of law or used for any legal
                    purposes.
                  </p>
                </li>
                <li>
                  <p>
                    Artistic works contained in this website like 360-degree
                    view, walkthrough, E-Brochures, other similar material, etc.
                    are for representation purpose only and do not form a part
                    of any agreement or legal binding.
                  </p>
                </li>
                <li>
                  <p>
                    The website and all The Company's contents are provided on
                    "as is" and on "as available" basis. No information given
                    under this Website creates a warranty or expand the scope of
                    any warranty that cannot be disclaimed under applicable law.
                    Your use of the Website and content is solely at your own
                    risk. This website is for guidance only. It does not
                    constitute part of an offer or contract. Design &
                    specifications are subject to change without prior notice.
                    Computer generated images are the artist's impression and
                    are an indicative of the actual designs.
                  </p>
                </li>
                <li>
                  <p>
                    You should take appropriate steps to verify any information
                    contained on our sites, by inspecting the property and any
                    other relevant documentation, and where applicable seek
                    proper legal, tax and, if appropriate, independent financial
                    advice, from a qualified professional adviser before taking,
                    or refraining from, any action on the basis of the content
                    on our sites. Nothing on our sites shall be regarded or
                    taken as legal or financial advice.
                  </p>
                </li>
                <li>
                  <p>
                    We do not guarantee that our sites will be secure or free
                    from bugs or viruses. You are responsible for configuring
                    your information technology, computer programmes and
                    platform in order to access our sites. You should use your
                    own virus protection software.
                  </p>
                </li>
                <li>
                  <p>
                    Stamp duty, on the purchase of the property by the investor,
                    will be charged at 4.90% of sale consideration till any
                    further notification by the Government of Gujarat. G.S.T
                    will be charged as per the Government Regulations.
                    Registration charges will be charged at 1% of the sale
                    consideration of the property for male customers & companies
                    but registration charges will be waived off if the property
                    is purchased in name of a female customer as per the rules
                    laid out by government of Gujarat.
                  </p>
                </li>
                <li>
                  <p>
                    In case if there will be any delay on the part of the
                    government in giving possession, company will not be not
                    liable for action. However, company will accommodate the
                    investor in best possible way to give the comfort level to
                    the investor.
                  </p>
                </li>
                <li>
                  <p>
                    The area, plot number and measurements of plot allotted by
                    the company may vary because of the several aspects as of:
                  </p>
                  <ul>
                    <li>
                      <p>a{")"} Enhancement in unit plans passed or;</p>
                    </li>
                    <li>
                      <p>
                        b{")"} Amendment/changes in regulations of the area.
                      </p>
                    </li>
                    <li>
                      <p>c{")"} If any unforeseen situation occurs etc.</p>
                    </li>
                  </ul>
                </li>
                <li>
                  <p>
                    The Company shall not be liable for the uncertainties and
                    delay caused by the government or authorities.
                  </p>
                </li>
                <li>
                  <p>
                    The foregoing is subject to the prevailing laws of India and
                    the courts in Ahmedabad shall have the exclusive
                    jurisdiction on any dispute that may arise out of the use of
                    this site.
                  </p>
                </li>
              </ol>
              <p className="link-padding">
                For further information, write to us at &nbsp;
                <a
                  href="mailto:info@smarthomesinfra.com"
                  rel="external nofollow noopener"
                  target="_blank"
                >
                  info@smarthomesinfra.com &nbsp;
                </a>
                Or call us on
                <a href="tel:7096961250 - 45."> +91 7096961250 - 45.</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Footer.css";

export default function Footer({
    homeDetails,
    adminData,
    propertylist
}) {
    const activePath = usePathname();
    const year = new Date().getFullYear();
    const [openAccordions, setOpenAccordions] = useState({});
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState(false);

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };


    const validate = () => {
        if (!email.trim()) {
            setError("Please enter your email.");
            return false;
        }
        if (!isValidEmail(email)) {
            setError("Please enter a valid email.");
            return false;
        }
        setError("");
        return true;
    };


    const subscribeform = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            // console.log("Email : ", email);
            setEmail("");
            setIsSubmitting(false);
        }, 1000);
    };

    const toggleAccordion = (key) => {
        setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
    };


    const projects_category = [
        ...new Set(propertylist.map((item) => item.category).filter(Boolean)),
    ].map((cat) => ({ category: cat }));

    return (
        <>
            <div className="members-flex section-padding-small inner-flex-mob white-bg flex-row j-c-c inner-flex-medium alc">
                <div className="flex-row inner-flex-medium j-c-c alc dsda-logos">
                    <div>
                        <img src="/images/logo/dsda.png" alt="DSDA" />
                    </div>
                    <div className="dsda-logos-line"></div>
                    <div>
                        <img src="/images/logo/memberofCredai.jpg" alt="Credai" />
                    </div>
                </div>
            </div>

            <div className="section-padding-small footer-wrapper">
                <div className="main-container">
                    <div className="inner-flex hide-tab-mobile">
                        <div className="footerGrid flex-row inner-flex-medium section-padding-small j-c-sb">
                            <div className="inner-flex inner-flex-medium">
                                <div className="footer-logo">
                                    <Link href="/" title={adminData?.name || "Smart Homes"}>
                                        <img
                                            src="/images/logo/smart-homes-logo.svg"
                                            alt="Smart Homes Infrastructure"
                                        />
                                    </Link>
                                </div>

                                <div className="inner-flex contactDetailFlex">
                                    <div className="flex-row alc">
                                        <span className="material-symbols-outlined">
                                            phone_in_talk
                                        </span>
                                        <p className="address-hover">
                                            <a href="tel:+917096961250" className="secondary-color">
                                                +91 70969 61250
                                            </a>
                                        </p>
                                    </div>

                                    <div className="flex-row alc">
                                        <span className="material-symbols-outlined">drafts</span>
                                        <p className="address-hover">
                                            <a
                                                href="mailto:info@smarthomesinfra.com"
                                                className="secondary-color"
                                            >
                                                info@smarthomesinfra.com
                                            </a>
                                        </p>
                                    </div>

                                    <div className="flex-row alc">
                                        <span className="material-symbols-outlined">distance</span>
                                        <p className="address-hover">
                                            <a
                                                href="https://maps.app.goo.gl/Uqam4igTpm3YEPCF8"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="secondary-color"
                                            >
                                                1204 & 1205 Ganesh Glory, Near BSNL Office, Jagatpur
                                                Chenpur, Road, Sarkhej - Gandhinagar Hwy, Jagatpur,
                                                Ahmedabad, Gujarat 382481
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                {(homeDetails.facebook_url || homeDetails.instagram_url || homeDetails.twitter_url || homeDetails.linkedin_url || homeDetails.youtube_page_url) && (
                                    <div className="flex-row inner-flex-medium">
                                        <ul className="flex-row alc">
                                            {homeDetails.facebook_url && (
                                                <li>
                                                    <div>
                                                        <Link
                                                            href={homeDetails.facebook_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <img
                                                                src="/images/icon/social-icons/facebook.svg"
                                                                alt="Facebook"
                                                                className="social-media-icon-footer common-icon"
                                                            />
                                                        </Link>
                                                    </div>
                                                </li>
                                            )}
                                            {homeDetails.instagram_url && (
                                                <li>
                                                    <div>
                                                        <Link
                                                            href={homeDetails.instagram_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <img
                                                                src="/images/icon/social-icons/instagram.svg"
                                                                alt="Instagram"
                                                                className="social-media-icon-footer common-icon"
                                                            />
                                                        </Link>
                                                    </div>
                                                </li>
                                            )}
                                            {homeDetails.twitter_url && (
                                                <li>
                                                    <div>
                                                        <Link
                                                            href={homeDetails.twitter_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <img
                                                                src="/images/icon/social-icons/twitter.svg"
                                                                alt="Twitter"
                                                                className="social-media-icon-footer common-icon"
                                                            />
                                                        </Link>
                                                    </div>
                                                </li>
                                            )}
                                            {homeDetails.linkedin_url && (
                                                <li>
                                                    <div>
                                                        <Link
                                                            href={homeDetails.linkedin_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <img
                                                                src="/images/icon/social-icons/linkedin.svg"
                                                                alt="LinkedIn"
                                                                className="social-media-icon-footer common-icon"
                                                            />
                                                        </Link>
                                                    </div>
                                                </li>
                                            )}
                                            {homeDetails.youtube_page_url && (
                                                <li>
                                                    <div>
                                                        <Link
                                                            href={homeDetails.youtube_page_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <img
                                                                src="/images/icon/social-icons/youtube.svg"
                                                                alt="YouTube"
                                                                className="social-media-icon-footer common-icon"
                                                            />
                                                        </Link>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                                <div className="inner-flex j-c-sb alc inner-flex-common alstart flex-col-mob ">
                                    <div>
                                        <div className="inner-flex">
                                            <div>
                                                <p className="uppercase">Subscribe to our newsletter</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inquiryWrapper footer-subscribe">
                                        <form
                                            name="subscribeForm"
                                            id="subscribeForm"
                                            className="footer-inquiryForm"
                                            onSubmit={subscribeform}
                                        >
                                            <div className="inquiry-label subscribe-label">
                                                <input
                                                    className={
                                                        touched && !isValidEmail(email) ? "ng-invalid" : touched ? "ng-valid" : ""
                                                    }
                                                    type="email"
                                                    name="email_address"
                                                    id="email_address"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        if (error) setError("");
                                                    }}
                                                    onBlur={() => setTouched(true)}
                                                />


                                            </div>

                                            <div>
                                                <button
                                                    className={`reecosys-template-button button-style-secondary ${!isValidEmail(email) ? 'ng-invalid' : 'ng-valid'
                                                        }`}
                                                    type="submit"
                                                >
                                                    <p>{isSubmitting ? "Please wait..." : "Submit"}</p>
                                                </button>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="footerLinkGrid">
                                {projects_category.map((category_data, index) => (
                                    <div key={index} className="inner-flex inner-flex-small"  >
                                        <ul className="inner-flex footer-navigation-link">
                                            <div className="wfc titleContent link-font-size">
                                                <p className="uppercase">{category_data.category}</p>
                                            </div>

                                            <div className="inner-flex inner-flex-smallest footer-navigation-link">
                                                {propertylist
                                                    .filter(
                                                        (data) =>
                                                            data.category === category_data.category &&
                                                            data.project_id !== 744
                                                    )
                                                    .map((data, idx) => (
                                                        <li key={idx} className="wfc footer-hover">
                                                            <Link
                                                                href={`/${data.slug}/`}
                                                                className={
                                                                    activePath === `/${data.slug}/`
                                                                        ? "active_page"
                                                                        : ""
                                                                }
                                                            >
                                                                <p className="capitalize">{data.project_title}</p>
                                                            </Link>
                                                        </li>
                                                    ))}
                                            </div>
                                        </ul>

                                        {/* Legal and Useful Links section */}
                                        <div className="legal-useful-main">
                                            <div className="inner-flex inner-flex-small">
                                                <div className="legal-links">
                                                    <ul className="inner-flex footer-navigation-link">
                                                        <div className="wfc titleContent link-font-size">
                                                            <p className="uppercase">Legal</p>
                                                        </div>

                                                        <div className="inner-flex inner-flex-smallest footer-navigation-link">
                                                            <li className="wfc footer-hover">
                                                                <Link
                                                                    href="/privacy-policy"
                                                                    className={
                                                                        activePath === "/privacy-policy/"
                                                                            ? "active_page"
                                                                            : ""
                                                                    }
                                                                >
                                                                    <p className="capitalize">Privacy Policy</p>
                                                                </Link>
                                                            </li>
                                                            <li className="wfc footer-hover">
                                                                <Link
                                                                    href="/terms-and-conditions"
                                                                    className={
                                                                        activePath === "/terms-and-conditions/"
                                                                            ? "active_page"
                                                                            : ""
                                                                    }
                                                                >
                                                                    <p className="capitalize">Terms & Conditions</p>
                                                                </Link>
                                                            </li>
                                                            <li className="wfc footer-hover">
                                                                <Link
                                                                    href="/disclaimer"
                                                                    className={
                                                                        activePath === "/disclaimer/"
                                                                            ? "active_page"
                                                                            : ""
                                                                    }
                                                                >
                                                                    <p className="capitalize">Disclaimer</p>
                                                                </Link>
                                                            </li>
                                                        </div>
                                                    </ul>
                                                </div>

                                                <div className="useful-links">
                                                    <ul className="inner-flex footer-navigation-link">
                                                        <div className="wfc titleContent link-font-size">
                                                            <p className="uppercase">Useful Links</p>
                                                        </div>

                                                        <div className="inner-flex inner-flex-smallest footer-navigation-link">
                                                            <li className="wfc footer-hover">
                                                                <Link
                                                                    href="/important-documents"
                                                                    className={
                                                                        activePath === "/important-documents/"
                                                                            ? "active_page"
                                                                            : ""
                                                                    }
                                                                >
                                                                    <p>Important Documents</p>
                                                                </Link>
                                                            </li>
                                                            <li className="wfc footer-hover">
                                                                <a
                                                                    href="https://anyror.gujarat.gov.in/"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <p>https://anyror.gujarat.gov.in/</p>
                                                                </a>
                                                            </li>
                                                            <li className="wfc footer-hover">
                                                                <a
                                                                    href="https://dholera.gujarat.gov.in"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <p>https://dholera.gujarat.gov.in</p>
                                                                </a>
                                                            </li>
                                                            <li className="wfc footer-hover">
                                                                <a
                                                                    href="https://www.nicdc.in/"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <p>https://www.nicdc.in/</p>
                                                                </a>
                                                            </li>
                                                            <li className="wfc footer-hover">
                                                                <a
                                                                    href="https://www.gidb.org/"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <p>https://www.gidb.org/</p>
                                                                </a>
                                                            </li>
                                                        </div>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="inner-flex inner-flex-medium">
                                    <ul className="inner-flex footer-navigation-link ">
                                        <li className="wfc titleContent link-font-size">
                                            <p className="uppercase">Quick links</p>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="about-us/" className={activePath === "/about-us" ? "active_page" : ""}>
                                                <p className="capitalize">About</p>
                                            </Link>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="/completed-projects" className={activePath === "/completed-projects" ? "active_page" : ""}>
                                                <p className="capitalize">Completed Projects</p>
                                            </Link>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="/channel-partners" className={activePath === "/channel-partners" ? "active_page" : ""}>
                                                <p className="capitalize">Channel Partners</p>
                                            </Link>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="/contact-us">
                                                <p className="capitalize">Contact Us</p>
                                            </Link>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="/dholera-sir" className={activePath === "/dholera-sir/" ? "active_page" : ""}>
                                                <p className="capitalize">Dholera SIR</p>
                                            </Link>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="/construction-updates" className={activePath === "/construction-updates/" ? "active_page" : ""}>
                                                <p className="capitalize">Construction Updates</p>
                                            </Link>
                                        </li>
                                        <li className="footer-hover">
                                            <Link href="/awards-and-accolades/" className={activePath === "/awards-and-accolades" ? "active_page" : ""}>
                                                <p className="capitalize">Awards &amp; Accolades</p>
                                            </Link>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="/nri-corner" className={activePath === "/nri-corner" ? "active_page" : ""}>
                                                <p className="capitalize">NRI Corner</p>
                                            </Link>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="/blogs" className={activePath === "/blogs" ? "active_page" : ""}>
                                                <p className="capitalize">blogs</p>
                                            </Link>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="/latest-news" className={activePath === "/latest-news" ? "active_page" : ""}>
                                                <p className="capitalize">Latest News</p>
                                            </Link>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="/newsletters" className={activePath === "/newsletters" ? "active_page" : ""}>
                                                <p className="capitalize">News Letters</p>
                                            </Link>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="/franchise-opportunities" className={activePath === "/franchise-opportunities" ? "active_page" : ""}>
                                                <p className="capitalize">Franchise Opportunities</p>
                                            </Link>
                                        </li>
                                        <li className="wfc footer-hover">
                                            <Link href="/sitemap">
                                                <p className="capitalize">Sitemap</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="reecosys_footer_copyright flex-row j-c-sb alc">
                                <div className="flex-row inner-flex-medium alc">
                                    <div className="link-font-size">
                                        <p className="p0">
                                            Copyright &copy; {year} All rights reserved, {homeDetails.name} Pvt. Ltd.
                                            CIN No. :- U70200GJ2012PTC100931
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-row alc">
                                    <div className="link-font-size">
                                        <p>Powered By :</p>
                                    </div>
                                    <div className="link-font-size wfc footer-hover">
                                        <a href="https://www.reecosys.com/" target="_blank" rel="noopener noreferrer">
                                            <p className="">REECOSYS</p>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="link-font-size reecosys_footer_copyright">
                                <p className="">
                                    All Pictures/Images shown on this website are for illustration purpose only. Actual product may
                                    vary due to product enhancement
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="visible-tab-mobile">
                        <div className="reecosys-footer-link-sections reecosys-mainfooter-section-links">
                            <div className="inner-flex section-padding-small pt0">
                                <div className="footer-logo">
                                    <Link href="/" title={adminData?.name || "Smart Homes"}>
                                        <img
                                            src="https://www.reecosys.com/assets/uploads/partners/logo/logo_1734528736_84.png"
                                            alt="Smart Homes Infrastructure"
                                        />
                                    </Link>
                                </div>

                                <div className="inner-flex contactDetailFlex">
                                    <div className="flex-row alc">
                                        <span className="material-symbols-outlined">phone_in_talk</span>
                                        <p>
                                            <a href="tel:+917096961250" className="secondary-color">
                                                +91 70969 61250
                                            </a>
                                        </p>
                                    </div>
                                    <div className="flex-row alc">
                                        <span className="material-symbols-outlined">drafts</span>
                                        <p>
                                            <a href="mailto:info@smarthomesinfra.com" className="secondary-color">
                                                info@smarthomesinfra.com
                                            </a>
                                        </p>
                                    </div>
                                    <div className="flex-row alc">
                                        <span className="material-symbols-outlined">distance</span>
                                        <p>
                                            <a
                                                href="https://maps.app.goo.gl/Uqam4igTpm3YEPCF8"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="secondary-color"
                                            >
                                                1204 & 1205 Ganesh Glory, Near BSNL Office, Jagatpur Chenpur, Road,
                                                Sarkhej - Gandhinagar Hwy, Jagatpur, Ahmedabad, Gujarat 382481
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                {(homeDetails.facebook_url ||
                                    homeDetails.instagram_url ||
                                    homeDetails.twitter_url ||
                                    homeDetails.linkedin_url ||
                                    homeDetails.youtube_page_url) && (
                                        <div className="flex-row inner-flex-medium socialMediaFlex">
                                            <ul className="flex-row alc">
                                                {homeDetails.facebook_url && (
                                                    <li>
                                                        <div>
                                                            <Link href={homeDetails.facebook_url} target="_blank" rel="noopener noreferrer">
                                                                <img
                                                                    src="/images/icon/social-icons/facebook.svg"
                                                                    alt=""
                                                                    className="social-media-icon-footer common-icon"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </li>
                                                )}
                                                {homeDetails.instagram_url && (
                                                    <li>
                                                        <div>
                                                            <Link href={homeDetails.instagram_url} target="_blank" rel="noopener noreferrer">
                                                                <img
                                                                    src="/images/icon/social-icons/instagram.svg"
                                                                    alt=""
                                                                    className="social-media-icon-footer common-icon"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </li>
                                                )}
                                                {homeDetails.twitter_url && (
                                                    <li>
                                                        <div>
                                                            <Link href={homeDetails.twitter_url} target="_blank" rel="noopener noreferrer">
                                                                <img
                                                                    src="/images/icon/social-icons/twitter.svg"
                                                                    alt=""
                                                                    className="social-media-icon-footer common-icon"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </li>
                                                )}
                                                {homeDetails.linkedin_url && (
                                                    <li>
                                                        <div>
                                                            <Link href={homeDetails.linkedin_url} target="_blank" rel="noopener noreferrer">
                                                                <img
                                                                    src="/images/icon/social-icons/linkedin.svg"
                                                                    alt=""
                                                                    className="social-media-icon-footer common-icon"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </li>
                                                )}
                                                {homeDetails.youtube_page_url && (
                                                    <li>
                                                        <div>
                                                            <Link href={homeDetails.youtube_page_url} target="_blank" rel="noopener noreferrer">
                                                                <img
                                                                    src="/images/icon/social-icons/youtube.svg"
                                                                    alt=""
                                                                    className="social-media-icon-footer common-icon"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                <div className="inner-flex j-c-sb alc inner-flex-common alstart flex-col-mob">
                                    <div>
                                        <div className="inner-flex">
                                            <div className="section-content section-content">
                                                <p className="uppercase">Subscribe to our newsletter</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="inquiryWrapper footer-subscribe">
                                        <form
                                            name="subscribeForm"
                                            id="subscribeForm"
                                            className="footer-inquiryForm"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="inquiry-label subscribe-label">
                                                <input
                                                    type="email"
                                                    name="email_address"
                                                    id="email_address"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <div>
                                                <button
                                                    className="reecosys-template-button button-style-secondary"
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    <p>{isSubmitting ? "Please wait..." : "Submit"}</p>
                                                </button>
                                            </div>
                                        </form>
                                    </div> */}
                                </div>
                            </div>
                            <div className="mob-link">
                                <ul className="quicklinks-footer quicklinks-footer-mobile inner-flex section-content section-padding-small" id="accordion">
                                    <li className="footerAccordionBlock">
                                        <div>
                                            <ul className="inner-flex inner-flex-common">
                                                <li className="footerAccordionBlock">
                                                    <div className="section-content flex-row alc j-c-sb w100 footer_accordion_click">
                                                        <Link href="/about-us">
                                                            <p className="capitalize">About</p>
                                                        </Link>
                                                    </div>
                                                </li>

                                                {projects_category.map((category) => (
                                                    <li className="inner-flex inner-flex-small footerAccordionBlock accordion-block" key={category.category}>
                                                        <div className="section-content flex-row alc j-c-sb w100 footer_accordion_click header_accordion accordion_click" onClick={() => toggleAccordion(category.category)}>
                                                            <div>
                                                                <p className="capitalize">{category.category}</p>
                                                            </div>
                                                            <img
                                                                src={openAccordions[category.category] ? "/images/icon/up-arrow.svg" : "/images/icon/down-arrow.svg"}
                                                                style={{ width: "24px" }}
                                                                alt="accordion-arrow"
                                                                className="manu-accordian-arrow"
                                                            />
                                                        </div>
                                                        {openAccordions[category.category] && (
                                                            <div className="content_accordian_1">
                                                                <div className="footer-category">
                                                                    <div className="inner-flex projectList_li inner-flex-zero">
                                                                        {propertylist
                                                                            .filter((data) => data.category === category.category && data.project_id !== '744')
                                                                            .map((data, index) => (
                                                                                <Link href={`/${data.slug}`} className="header-hover" key={data.project_id}>
                                                                                    <div className="flex-row flex-gap-small">
                                                                                        <div className="flex-30">
                                                                                            <img
                                                                                                src={`${data.banner_data.image_web_full}&h=250&w=250`}
                                                                                                alt="reecosys"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="flex-70 inner-flex">
                                                                                            <div className="section-paragraph">
                                                                                                <p className="footer-title capitalize">{data.project_title}</p>
                                                                                            </div>
                                                                                            <div className="inner-flex inner-flex-smallest">
                                                                                                {data.size_price && (
                                                                                                    <div className="flex-row alc">
                                                                                                        <div className="iconimg">
                                                                                                            <img src="/images/icon/detail-icons/building.svg" alt="building-icon" />
                                                                                                        </div>
                                                                                                        <div className="section-content">
                                                                                                            <span className="ellipsis-1 uppercase secondary-color">{data.size_price}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )}
                                                                                                {data.total_area && (
                                                                                                    <div className="flex-row alc">
                                                                                                        <div className="iconimg">
                                                                                                            <img src="/images/icon/detail-icons/area.svg" alt="area-icon" />
                                                                                                        </div>
                                                                                                        <div className="section-content">
                                                                                                            <span className="ellipsis-1 uppercase secondary-color">{data.total_area}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )}
                                                                                                {data.location && (
                                                                                                    <div className="flex-row alc">
                                                                                                        <div className="iconimg">
                                                                                                            <img src="/images/icon/detail-icons/location.svg" alt="location-icon" />
                                                                                                        </div>
                                                                                                        <div className="section-content">
                                                                                                            <span className="ellipsis-1 uppercase secondary-color">{data.location}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </Link>
                                                                            ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}

                                                {[
                                                    {
                                                        label: "Legal", links: [
                                                            { text: "Privacy Policy", url: "privacy-policy/" },
                                                            { text: "Terms & Conditions", url: "terms-and-conditions/" },
                                                            { text: "Disclaimer", url: "disclaimer/" }
                                                        ]
                                                    },
                                                    {
                                                        label: "useful-links", links: [
                                                            { text: "Important Documents", url: "important-documents/" },
                                                            { text: "https://anyror.gujarat.gov.in/", url: "https://anyror.gujarat.gov.in/", external: true },
                                                            { text: "https://dholera.gujarat.gov.in", url: "https://dholera.gujarat.gov.in", external: true },
                                                            { text: "https://www.nicdc.in/", url: "https://www.nicdc.in/", external: true },
                                                            { text: "https://www.gidb.org/", url: "https://www.gidb.org/", external: true }
                                                        ]
                                                    }
                                                ].map((section) => (
                                                    <li className="footerAccordionBlock accordion-block" key={section.label}>
                                                        <div className="section-content flex-row alc j-c-sb w100 footer_accordion_click header_accordion accordion_click" onClick={() => toggleAccordion(section.label)}>
                                                            <div>
                                                                <p className="capitalize">{section.label}</p>
                                                            </div>
                                                            <img
                                                                src={openAccordions[section.label] ? "/images/icon/up-arrow.svg" : "/images/icon/down-arrow.svg"}
                                                                style={{ width: "24px" }}
                                                                alt="accordion-arrow"
                                                                className="manu-accordian-arrow"
                                                            />

                                                        </div>
                                                        {openAccordions[section.label] && (
                                                            <div className="content_accordian_1">
                                                                <div className="section-paragraph w100 footer_accordion_click">
                                                                    {section.links.map((link) => (
                                                                        <Link
                                                                            key={link.text}
                                                                            href={link.url}
                                                                            target={link.external ? "_blank" : "_self"}
                                                                            rel={link.external ? "noopener noreferrer" : undefined}
                                                                        >
                                                                            <p className="capitalize">{link.text}</p>
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}

                                                {["completed-projects", "channel-partners", "contact-us", "dholera-sir", "construction-updates", "awards-and-accolades", "nri-corner", "blogs", "latest-news", "newsletters", "franchise-opportunities", "sitemap"].map((link) => (
                                                    <li className="footerAccordionBlock" key={link}>
                                                        <div className="section-content flex-row alc j-c-sb w100 footer_accordion_click">
                                                            <Link href={`/${link}`}>
                                                                <p className="capitalize">{link.replace(/-/g, " ")}</p>
                                                            </Link>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <ul className="quicklinks-footer-copyright inner-flex inner-flex-small ">
                                <li>
                                    <div className="web_copyright reecosys_footer_copyright link-font-size">
                                        <p className="p0 text-center"> Copyright &copy; {year} All rights reserved ,
                                            {homeDetails.name} Pvt. Ltd. <br /> CIN No. :- U70200GJ2012PTC100931
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="link-font-size  reecosys_footer_copyright ">
                                        <p className="text-center">
                                            All Pictures/Images shown on this website are for illustration purpose only. Actual
                                            product may
                                            vary due to product enhancement
                                        </p>
                                    </div>
                                </li>
                                <li className="reecosys_footer_copyright link-font-size">
                                    <div className="flex-row alc j-c-c">
                                        <div className="">
                                            <p>
                                                Powered By :
                                            </p>
                                        </div>
                                        <div className="">
                                            <a href="https://www.reecosys.com/" target="_blank">
                                                <p className="">
                                                    REECOSYS
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

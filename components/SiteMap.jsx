"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import './SiteMap.css'

export default function Sitemap() {
    return (
        <div className="reecosys-main-wrapper highlight-bg" id="reecosys-main-wrapper-terms">
            <div id="reecosys-aboutus-wrapper" className="relative inner-flex inner-flex-big">
                <div className="relative sitemap-banner-img">
                    <Image src="/images/sitemap-banner-img.jpg" alt="Sitemap Banner" fill className="object-cover object-bottom" />
                    <div className="black_overlay"></div>
                    <h1 className="text-center">Sitemap</h1>
                </div>

                <div className="mini-container">
                    <div className="sitemap-grid-wrapper">
                        <div className="card-1">
                            <div className="section-paragraph">
                                <p>Residential</p>
                            </div>
                            <ul className="sitemaps-links-ul">
                                {[
                                    { href: "/dholera-forest-estate", text: "Dholera Forest Estate" },
                                    { href: "/dholera-expressway-city-I", text: "Dholera Expressway City 1" },
                                    { href: "/dholera-expressway-city-township", text: "Dholera Expressway City Township" },
                                    { href: "/dholera-expressway-avenue-I", text: "Dholera Expressway Avenue 1" },
                                    { href: "/dholera-expressway-avenue-township", text: "Dholera Expressway Avenue Township" },
                                    { href: "/dholera-international-airport-city-I", text: "Dholera International Airport city 1" },
                                    { href: "/dholera-international-airport-city-2", text: "Dholera International Airport City 2" },
                                    { href: "/piccadilly-square-2", text: "Piccadilly Square 2" },
                                    { href: "/bulk-land-in-dholera", text: "Bulk Land" },
                                ].map(({ href, text }, i) => (
                                    <li key={i}><Link href={href}>{text}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div className="card-1">
                            <div className="section-paragraph">
                                <p>Commercial</p>
                            </div>
                            <ul className="sitemaps-links-ul">
                                {[
                                    { href: "/dholera-expressway-avenue-1-commercial-plots", text: "Dholera Expressway Avenue 1" },
                                    { href: "/dholera-forest-estate-commercial-plots", text: "Forest Shopping Arcade" },
                                    { href: "/dholera-international-airport-city-2-commercial-plots", text: "Dholera International Airport City 2" },
                                ].map(({ href, text }, i) => (
                                    <li key={i}><Link href={href}>{text}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div className="card-1">
                            <div className="section-paragraph">
                                <p>Completed Projects</p>
                            </div>
                            <ul className="sitemaps-links-ul">
                                {[
                                    "orange-county",
                                    "olive-garden",
                                    "mulberry-park",
                                    "maple-garden",
                                    "abcd-enclave-I",
                                    "abcd-enclave-2",
                                    "abcd-enclave-3",
                                    "abcd-enclave-4",
                                    "abcd-greens-1"
                                ].map((slug, i) => (
                                    <li key={i}><Link href={`/${slug}`}>{slug.replace(/-/g, ' ')}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div className="card-1">
                            <div className="section-paragraph">
                                <p>Quick Links</p>
                            </div>
                            <ul className="sitemaps-links-ul">
                                {[
                                    { href: "/about-us", text: "About" },
                                    { href: "/completed-projects", text: "Completed Projects" },
                                    { href: "/channel-partners", text: "Channel Partners" },
                                    { href: "/contact-us", text: "Contact Us" },
                                    { href: "/dholera-sir", text: "Dholera SIR" },
                                    { href: "/construction-updates", text: "Construction Updates" },
                                    { href: "/awards-and-accolades", text: "Achievements and Awards" },
                                    { href: "/nri-corner", text: "NRI Corner" },
                                    { href: "/blogs", text: "Blogs" },
                                    { href: "/franchise-opportunities", text: "Franchise Opportunities" },
                                ].map(({ href, text }, i) => (
                                    <li key={i}><Link href={href}>{text}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div className="card-1">
                            <div className="section-paragraph">
                                <p>Legal</p>
                            </div>
                            <ul className="sitemaps-links-ul">
                                {[
                                    { href: "/privacy-policy", text: "Privacy Policy" },
                                    { href: "/terms-and-conditions", text: "Terms & Conditions" },
                                    { href: "/disclaimer", text: "Disclaimer" },
                                ].map(({ href, text }, i) => (
                                    <li key={i}><Link href={href}>{text}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

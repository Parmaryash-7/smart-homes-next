'use client';

import React, { useEffect, useState } from 'react';

export default function DisclaimerPopup() {
    const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

    useEffect(() => {
        const agreed = localStorage.getItem('disclaimer_agreed');
        if (!agreed) {
            setIsDisclaimerOpen(true);
        }
    }, []);

    useEffect(() => {
        const handleKeyUp = (event) => {
            if (event.key === 'Escape') {
                setIsDisclaimerOpen(false);
                localStorage.setItem('disclaimer_agreed', 'true');
                
            }
        };
        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    }, []);

    const disclaimerCloseClick = () => {
        setIsDisclaimerOpen(false);
        localStorage.setItem('disclaimer_agreed', 'true');
    };

    return (
        <div className={`disclaimerPopup ${isDisclaimerOpen ? 'active' : ''}`}>
            <div className="inner-flex inner-flex-small">
                <div className="section-title flex-row alc j-c-sb">
                    <h2 className="secondary-highlight-color">
                        Disclaimer
                    </h2>
                </div>
                <div className="section-text">
                    <p>
                        The information provided on this website is for general informational purposes only
                        and should not be considered legal or financial advice. While we strive for accuracy,
                        we do not guarantee the completeness, reliability, or suitability of the details regarding
                        properties, prices, or availability.
                        <br /><br />
                        All images, layouts, and specifications are for illustrative purposes only and may
                        differ from actual offerings. Prices, offers, and availability are subject to change
                        without prior notice. Buyers should verify all details, including project approvals,
                        directly with authorized company representatives. We are not responsible for third-
                        party links, content, or claims made by any external parties.
                        <br /><br />
                        RERA Compliance
                        <br /><br />
                        The Real Estate (Regulation and Development) Act, 2016 (RERA) was introduced to
                        enhance transparency and accountability in the real estate sector. However, it is
                        important to understand where and how this law applies, as its applicability varies
                        depending on the type of real estate transaction. RERA primarily regulates residential
                        and commercial real estate projects, but it does not apply to the sale of land or plots
                        without construction obligations. In areas like Dholera SIR, transactions involving
                        final plots (designated land parcels) do not fall under RERA's scope. Similarly,
                        agricultural land, industrial land, and other specific land transactions may not come
                        under its jurisdiction.
                        <br /><br />
                        Understanding these distinctions helps buyers and investors make informed decisions
                        based on the nature of their real estate dealings.
                    </p>
                </div>
                <div className={`flex-row flex-col-mob j-c-sb ${!isMobileScreen() ? 'alc' : ''}`}>
                    <div className="section-content">
                        <p>I have Read & Understand the Disclaimer</p>
                    </div>
                    <button
                        className="reecosys-template-button button-style-secondary"
                        onClick={disclaimerCloseClick}
                    >
                        <p>Agree</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

// Utility function like AngularJS `$rootScope.isMobilescreen`
function isMobileScreen() {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
}

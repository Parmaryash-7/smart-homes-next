import Link from "next/link";
import React from "react";

export default function NotFound() {
    return (
        <div className="reecosys-main-wrapper" id="reecosys-thankyou-wrapper">
            <section className="reecosys-section relative" id="reecosys-thankyou-section-1">
                <div className="mini-container">
                    <div className="thankyou_wrapper inner-flex alc j-c-c text-center">
                        <div className="inner-flex">
                            <div className="thankyou-title">
                                <h1>404</h1>
                            </div>
                            <div className="section-title">
                                <h2>Page Not Found</h2>
                            </div>
                            <div className="section-content">
                                <p className="capitalize">
                                    Oops! The page you're looking for can't be found. It may have been moved,
                                    deleted, or the URL might be incorrect.
                                </p>
                            </div>
                            <div className="section-content BacktoHome">
                                <Link href="/">
                                    <button
                                        className="reecosys-template-button button-style-secondary"
                                        style={{
                                            width: "fit-content",
                                            margin: "0 auto",
                                            display: "block",
                                        }}
                                    >
                                        <p>Back to Home</p>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

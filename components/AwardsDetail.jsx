"use client";

import React, { useEffect } from "react";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

export default function AwardsDetail({ awardObj }) {
    useEffect(() => {
        if (awardObj?.gallery?.length) {
            Fancybox.bind("[data-fancybox='awardImgs']", {
                Thumbs: true,
            });
        }
    }, [awardObj]);

    if (!awardObj) return <div>Loading award...</div>;

    return (
        <div className="reecosys-main-wrapper" id="reecosys-main-wrapper">
            <div className="awards-wrapper-main">

                <section className="reecosys-section relative" data-aos="fade-up"
                    data-aos-delay="300"
                    data-aos-duration="600" id="reecosys-contact-us-section-1">
                    <div className="section-padding main-container-fluid visible-xs">
                        <div className="banner-title-big text-center">
                            <h1 className="capitalize">{awardObj.bannerTitle}</h1>
                        </div>
                    </div>
                    <div className="common-listing-banner relative">
                        <img src="/images/awards/awards-banner.png" alt="" />
                        <div className="common-banner-title-abs hidden-xs">
                            <div className="banner-title-big">
                                <h1 className="white-color capitalize">{awardObj.bannerTitle}</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="reecosys-section section-padding relative" id="reecosys-awards-section-2">
                    <div className="main-container-fluid">
                        <div className="flex-row w100 inner-flex-medium alc inner-flex-mob">
                            <div className="flex30">
                                <div className="awardImg">
                                    <img src={awardObj.image} alt="" />
                                </div>
                            </div>
                            <div className="flex70 inner-flex inner-flex-common">
                                <div className="section-title">
                                    <h2 className="medium-fonts secondary-color">{awardObj.name}</h2>
                                </div>
                                <div className="section-content">
                                    <p className="medium-fonts">{awardObj.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="reecosys-section section-padding relative" id="reecosys-awards-section-2">
                    <div className="main-container-fluid">
                        <div className="inner-flex inner-flex-big">
                            <div className="section-title">
                                <h2 className="secondary-color">Image Gallery</h2>
                            </div>
                            <div className="award-img-grid inner-flex-small">
                                {awardObj.gallery?.map((data, i) => (
                                    <div key={i}>
                                        <a data-fancybox="awardImgs" href={data.img} target="_self">
                                            <img src={data.img} style={{ height: "100%" }} alt="" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

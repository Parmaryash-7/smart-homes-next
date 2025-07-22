"use client";

import React, { useState } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import InquiryForm from "./InquiryForm";
import './Disclaimer.css'

export default function DholeraSIR() {
    const [townPlanningClickF, setTownPlanningClickF] = useState(1);
    const [tabClickF, setTabClickF] = useState(1);
    const [activeId, setActiveId] = useState(1);
    const [activeTab, setActiveTab] = useState(1);
    const [countryFlag, setCountryFlag] = useState(false);
    const key_area = [
        { title: "Six Town Planning (TP) Schemes", desc: "Well-structured and phased development" },
        { title: "Residential & Commercial Spaces", desc: "Ideal for living, working, and business growth" },
        { title: "Industrial Hub", desc: "Boosting manufacturing and trade" },
        { title: "Recreational Areas", desc: "Green spaces, parks, and entertainment zones" },
        { title: "Public Utilities & Infrastructure", desc: "Smart roads, power, and water facilities" },
        { title: "Seamless Connectivity", desc: "Robust transport and logistics network" },
    ];
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    const asked_questions = [
        {
            id: 1,
            img: "/images/dholera-sir/twon-planning.jpg",
            img_mob: "/images/dholera-sir/twon-planning-mob.jpg",
            question: "Town Planning Schemes of Dholera SIR",
            answer: "Dholera SIR is being developed in a phased manner, with all six draft Town Planning schemes already notified. The finalization process is underway, covering 422 sq. km. of land earmarked for development out of the total 580 sq. km., while 158 sq. km. has been designated for agriculture.",
        },
        {
            id: 2,
            img: "/images/dholera-sir/dholera-town-schemes.jpg",
            img_mob: "/images/dholera-sir/dholera-town-schemes-mob.jpg",
            question: "Dholera Town Planning Schemes",
            answer: "Total Area 91,970 Ha (920 sq km)",
        }
    ];
    const specificationsData = [{
        image_full: "/images/dholera-sir/town-buildings.svg",
        title: "Residential Zone",
        description: "Designed for sustainable urban living"
    },
    {
        image_full: "/images/dholera-sir/town-industrial.svg",
        title: "Industrial Zone",
        description: "Supporting manufacturing and business expansion"
    },
    {
        image_full: "/images/dholera-sir/town-it.svg",
        title: "Knowledge & IT Zone",
        description: "A hub for innovation and technology"
    },
    {
        image_full: "/images/dholera-sir/twon-green-area.svg",
        title: "Green Zone",
        description: "Dedicated to environmental sustainability"
    },
    {
        image_full: "/images/dholera-sir/town-renewable-energy.svg",
        title: "Solar Zone",
        description: "Promoting renewable energy initiatives"
    },
    {
        image_full: "/images/dholera-sir/twon-sport.svg",
        title: "Sports, Entertainment & Recreational Zone",
        description: "Enhancing lifestyle and leisure activities"
    }
    ]

    const twon_plannig = [{
        img: "/images/dholera-sir/twon-planning-2.jpg",
        title: "Town Planning 2",
        tagline: "Town Planning 2 comprises seven sub-Town Planning (TP) schemes, namely: <span class=\"medium-fonts\">TP 2A, TP 2B1, TP 2B2, TP 2B3, TP 2B4, TP 2B5, and TP 2B6</span>",
        discription: "<li> TP 2A falls under the Activation Area and has already been developed. The remaining sub-TPs are planned for phased development. </li> <li> This planning zone includes various sectors such as the Residential Zone, High Access Corridor Zone, City Centre Zone, Green Zone, and Public Facilities Zone. </li> <li> The villages covered under Town Planning 2 include Kadipur, Bhadiyad, Gorasu, Otariya, Dholera, Khun, Bhimtalav, Rahatalav, Mundi, and Sandhida. </li>"
    },
    {
        img: "/images/dholera-sir/twon-planning-3.jpg",
        title: "Town Planning 3",
        tagline: "Town Planning 3 consists of four sub-Town Planning (TP) schemes: <span class=\"medium-fonts\">TP 3A, TP 3B, TP 3C, and TP 3D</span>",
        discription: "<li>This zone is planned for mixed-use development, including residential, commercial, public facilities, and green spaces.</li> <li>The villages covered under Town Planning 3 include Sodhi, Sangasar, Otariya, Sandhida, Dholera, Mundi, Panchi, and Cher.</li> <li>Additionally, the Dholera-Bhimnath Railway Line will pass through Town Planning 3 and Town Planning 4, enhancing connectivity and industrial growth in the region.</li>"
    },
    {
        img: "/images/dholera-sir/twon-planning-4.jpg",
        title: "Town Planning 4",
        tagline: "Town Planning 4 (TP4) comprises multiple zones, including Residential, High Access Corridor, City Centre, Green, and Public Facilities Zones. It consists of the following sub-town planning schemes:",
        discription: "<li> TP4A (part of the Activation Area and fully developed, allowing industries to commence operations), TP4B1, TP4B2</li> <li>The villages that fall within TP4 include Dholera, Mundi, Panchi, Sandhida, Hebatpur, Zankhi, Bhangadh, and Mahadevpura.</li>"
    },
    {
        img: "/images/dholera-sir/twon-planning-5.jpg",
        title: "Town Planning 5",
        tagline: "Town Planning 5 includes the following sub-town planning schemes: <span class=\"medium-fonts\"> TP5A, TP5B, TP5C, TP5D</span>",
        discription: "<li>The villages that fall within TP5 include Panchi, Bavaliyari, Sodhi, Sangasar, and Hebatpur.</li>"
    },
    {
        img: "/images/dholera-sir/twon-planing-6.jpg",
        title: "Town Planning 6",
        tagline: "Town Planning 6 consists of the <span class=\"medium-fonts\"> TP6A and TP6B </span> sub-town planning schemes:  ",
        discription: "<li>The villages that fall within TP6 include Zankhi, Bavaliyari, Bhangadh, Mingalpur, and Hebatpur.</li>"
    }
    ];

    const strategicLocationData = [{
        id: 1,
        title: "Strategic Location and Connectivity",
        discription: "Dholera SIR's prime location offers unparalleled connectivity. The region is well-linked by National Highway 8, connecting it to major cities like Ahmedabad, Bhavnagar, and Mumbai. Additionally, the Mumbai-Ahmedabad-Vadodara Expressway, part of the Golden Quadrilateral, enhances accessibility. Plans are underway to establish a dedicated rail connection to Dholera, complementing the nearest broad gauge station at Tarapur, 103 kilometers away. The development of a new international airport near Navagam further positions Dholera as a significant player in global trade and logistics.",
        img: "/images/dholera-sir/Strategic Location and Connectivity.jpg"
    },
    {
        id: 2,
        title: "World-Class Infrastructure",
        discription: "At the heart of Dholera SIR's development is the Administration and Business Center for Dholera (ABCD) Building. This facility serves as the central hub for administrative operations, business activities, and governance, embodying the efficient and structured planning that defines the region. The city's infrastructure is meticulously designed to support industrial growth, with a focus on sustainability and smart urban planning. The Activation Area, covering 22.5 square kilometers, is equipped with ready-to-use facilities, enabling businesses to establish operations swiftly and efficiently.",
        img: "/images/dholera-sir/World-Class Infrastructure.jpg"
    },
    {
        id: 3,
        title: "Sustainable Development Initiatives",
        discription: "Dholera SIR is committed to environmental sustainability. The region is set to host one of India's largest solar power projects, the Dholera Solar Park, with a planned capacity of 5,000 MW. This initiative not only promotes renewable energy but also aims to create significant employment opportunities and reduce transmission costs. Furthermore, the city is equipped with advanced infrastructure, including a Common Effluent Treatment Plant (CEPT), Sewage Treatment Plant (STP), and Water Treatment Plant (WTP), ensuring eco-friendly waste management and a clean, green urban environment.",
        img: "/images/dholera-sir/Sustainable Development Initiatives.jpg"
    },
    {
        id: 4,
        title: "Economic and Industrial Growth",
        discription: "Dholera SIR is poised to become a catalyst for economic growth. The region is designed to double employment potential, triple industrial output, and quadruple exports over the next five years. The presence of the Tata Solar Plant and plans for semiconductor manufacturing facilities underscore Dholera's appeal to major corporations and investors. The government's proactive approach, including the enactment of the Special Investment Region Act 2009 and the formation of the Dholera Industrial City Development Limited (DICDL), provides a robust framework for private sector participation and public-private partnerships.",
        img: "/images/dholera-sir/Economic and Industrial Growth.jpg"
    },
    {
        id: 5,
        title: "Cultural and Heritage Significance",
        discription: "Beyond its industrial and economic prospects, Dholera SIR is rich in cultural heritage. Proximity to historical sites like Lothal, one of the world's oldest dockyards, adds a unique dimension to the region. The upcoming National Maritime Heritage Complex (NMHC) at Lothal aims to showcase India's maritime legacy, boosting tourism and preserving cultural heritage. <br>Dholera Special Investment Region represents a harmonious blend of strategic planning, sustainable development, and economic ambition. With its state-of-the-art infrastructure, strategic location, and government-backed initiatives, Dholera SIR is set to emerge as a global hub for manufacturing, trade, and innovation, offering unparalleled opportunities for investors, businesses, and residents alike.",
        img: "/images/dholera-sir/Cultural and Heritage Significance.jpg"
    }
    ]

    const handleClick = (id) => {
        setActiveId(id);
    };

    return (
        <div className="reecosys-main-wrapper" id="reecosys-main-wrapper">
            <div id="reecosys-dholera-sir-wrapper">

                <section className="reecosys-section relative wow fadeIn" data-wow-delay="0.6s" data-wow-duration="0.4s" id="reecosys-contact-us-section-1">
                    <div className="common-listing-banner relative">
                        <Image src="/images/dholera-sir/banner.jpg" alt="Dholera SIR banner" width={1920} height={1080} />
                    </div>
                </section>

                <section className="section-padding relative">
                    <div className="main-container">
                        <div className="two-grid inner-flex-tab">
                            <div className="section-title">
                                <h2 className="highlight-color">
                                    Dholera Special Investment <br className="hide-tab-mobile" />
                                    Region (SIR): India's First <br className="hide-tab-mobile" />
                                    Greenfield Smart City
                                </h2>
                            </div>
                            <div className="inner-flex inner-flex-small">
                                <div className="section-content dholrera-special-region">
                                    <p className="regular-fonts">
                                        Dholera Special Investment Region (Dholera SIR) is a groundbreaking
                                        initiative by the Government of Gujarat, designed to elevate a once-modest
                                        town into a world-class manufacturing and trade hub. Strategically
                                        positioned approximately 100 kilometers southwest of Ahmedabad, Dholera SIR
                                        spans 920 square kilometers, making it India's largest greenfield smart
                                        city. This visionary project, a joint effort between the central and state
                                        governments, is set to drive economic growth through cutting-edge
                                        infrastructure, seamless connectivity, and sustainable urban planning.
                                    </p>
                                </div>
                                <div>
                                    <button className="reecosys-template-button button-style-secondary"
                                        onClick={() => {
                                            const elem = document.getElementById("homeInquirySEction-form");
                                            if (elem) elem.scrollIntoView({ behavior: "smooth" });
                                        }}
                                    >
                                        <span className="material-symbols-outlined">chat</span>
                                        <p className="capitalize">Inquire Now</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Area Divisions */}
                <section className="reecosys-template-about-section-6 light-green-bg reecosys-template-section section-padding relative" id="reecosys-template-about-section-6">
                    <div className="main-container inner-flex inner-flex-big">
                        <div className="inner-flex inner-flex-medium">
                            <div className="section-information inner-flex">
                                <div className="section-title">
                                    <h2 className="highlight-color text-center wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.6s">
                                        Dholera Smart City - Key Area Divisions
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="flex-row inner-flex-mob alc inner-flex-big">
                            <div className="flex60">
                                <Image src="/images/dholera-sir/key-area.jpg" alt="Key Area" width={1000} height={600} />
                            </div>
                            <div className="detail-accordion dholera-sir-accordion flex40" id="accordion">
                                {key_area.map((item, index) => {
                                    const isOpen = activeIndex === index;

                                    return (
                                        <div
                                            className={`accordian-title accordion-block ${isOpen ? "active" : ""}`}
                                            data-aos-duration="1s"
                                            data-aos-delay={`0.${index + 2}s`}
                                            key={index}
                                        >
                                            <div
                                                className="flex-row j-c-sb alc w100 accordion_click accordion_click_relative"
                                                onClick={() => toggleAccordion(index)}
                                            >
                                                <div className="w100 section-paragraph">
                                                    <p className="medium-fonts">{item.title}</p>
                                                </div>
                                                <div className="accordian-icon">
                                                    <img
                                                        src="/images/icon/minus.svg"
                                                        alt="-"
                                                        className="minusimg"
                                                        style={{ display: isOpen ? "block" : "none" }}
                                                    />
                                                    <img
                                                        src="/images/icon/plus.svg"
                                                        alt="+"
                                                        className="plusimg"
                                                        style={{ display: isOpen ? "none" : "block" }}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className={`content_accordian section-content accordion-dec-padding w100 ${isOpen ? "open" : ""
                                                    }`}
                                            >
                                                <p className="secondary-color regular-fonts">{item.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Town Planning Accordion */}
                <section className="section-padding" style={{ background: "#fafafa" }} >
                    <div className="main-container">
                        <div className="two-grid inner-flex-small inner-flex-tab alc">
                            {asked_questions.map((data, i) => (
                                <div
                                    key={i}
                                    className={`border-reduis town-panning-img ${activeId === data.id ? "active" : ""}`}
                                    onClick={() => handleClick(data.id)}
                                >
                                    <img src={data.img} alt="" className="hide-tab-mobile" />
                                    <img src={data.img_mob} alt="" className="visible-tab-mobile" />
                                </div>
                            ))}
                            <div className="frequently-accordion" id="accordionvision">
                                <div className="inner-flex" style={{ gap: 0 }}>
                                    {asked_questions.map((data, index) => (
                                        <div
                                            key={data.id}
                                            className="accordian-title accordion-block wow fade_top"
                                            data-wow-duration="1s"
                                            data-wow-delay={`0.${index + 2}s`}
                                        >
                                            <div className={`flex-row j-c-sb alc w100 accordion_click ${activeId === data.id ? 'active' : ''} accordion_click_relative`} onClick={() => handleClick(data.id)}>
                                                <div className="w100 section-subtitle">
                                                    <h4 className="bold-fonts">{data.question}</h4>
                                                </div>
                                            </div>
                                            {activeId === data.id && (
                                                <div className={`${activeId === data.id ? "content_accordian_open" : "content_accordian_close"} section-content accordion-dec-padding w100`}>
                                                    <p className="ng-binding" dangerouslySetInnerHTML={{ __html: data.answer }}></p>
                                                </div>
                                            )}
                                            <style dangerouslySetInnerHTML={{
                                                __html: `
                                                .content_accordian_close {
                                                    max-height: 0;
                                                    height: 0;
                                                    transition: all 1s ease;
                                                    
                                                }

                                                .content_accordian_open {
                                                    max-height: fit-content;
                                                    height: fit-content;
                                                    transition: all 1s ease;
                                                }
                                            
                                            `}} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TP Scheme Section */}
                <section className="section-padding light-green-bg">
                    <div className="main-container">
                        <div className="inner-flex inner-flex-small">
                            <div className="two-grid inner-flex-small inner-flex-mob">
                                <div className="activation-area-box section-subtitle">
                                    <h4 className="highlight-color">Dholera SIR - TP1 to TP6</h4>
                                </div>
                                <div className="activation-area-box section-subtitle hidden-xs">
                                    <h4 className="highlight-color">
                                        Activation Area, <br /> Town Planning Scheme 2A and 4A
                                    </h4>
                                </div>
                            </div>

                            <div>
                                <img src="/images/dholera-sir/cards.png" alt="Dholera cards" className="hide-tab-mobile" />
                                <img src="/images/dholera-sir/cards-mob.png" alt="Dholera mobile cards" className="visible-tab-mobile" />
                            </div>

                            <div className="activation-area-box section-subtitle visible-xs">
                                <h4 className="highlight-color">
                                    Activation Area, <br /> Town Planning Scheme 2A and 4A
                                </h4>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="reecosys-section section-padding relative"
                    id="reecosys-dholera-sir-section-6"
                >
                    <div className="main-container">
                        <div className="inner-flex inner-flex-medium">
                            <div className="flex-row w100 j-c-sb alc inner-flex-mob alend">
                                <div className="section-title section-content inner-flex inner-flex-common">
                                    <h2 className="highlight-color">Town Planning 1</h2>
                                    <p className="regular-fonts">
                                        Town Planning 1 consists of six sub-Town Planning (TP) schemes,
                                        which are:{" "}
                                        <span>
                                            TP 1A1, TP 1A2, TP 1A3, TP 1A4, TP 1A5, and TP 1B
                                            <br className="hide-tab-mobile" />
                                            The villages that fall within Town Planning 1 include Kadipur,
                                            Aambli, Bhadiyad, and Gogla.
                                        </span>
                                    </p>
                                </div>

                                {/* Swiper Arrows - Mobile only */}
                                <div className="visible-tab-mobile">
                                    <div className="timeline-navigation flex-row alc">
                                        <div className="swiper-button-prev amenities-button">
                                            <img
                                                src="/images/icon/left-arrow.svg"
                                                alt="Left"
                                            />
                                        </div>
                                        <div className="swiper-button-next amenities-button">
                                            <img
                                                src="/images/icon/right-arrow.svg"
                                                alt="Right"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="inner-flex inner-flex-medium">
                                {/* Mobile Swiper */}
                                <div className="visible-sm visible-xs w100">
                                    <Swiper
                                        modules={[Navigation]}
                                        navigation={{
                                            nextEl: ".swiper-button-next.amenities-button",
                                            prevEl: ".swiper-button-prev.amenities-button",
                                        }}
                                        spaceBetween={32}
                                        breakpoints={{
                                            1152: { slidesPerView: 3, spaceBetween: 16 },
                                            767: { slidesPerView: 2, spaceBetween: 16 },
                                            0: { slidesPerView: 1, spaceBetween: 16 },
                                        }}
                                        slidesPerView={4}
                                        className="swiper-wrapper swiper-container"
                                    >
                                        {specificationsData.map((spec, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div className="town-plannig-swiper">
                                                    <div className="flex-row alc">
                                                        <div className="specificationIcon">
                                                            <img src={spec.image_full} alt={spec.title} />
                                                        </div>
                                                    </div>
                                                    <div className="specificationContent">
                                                        <div className="section-paragraph">
                                                            <p className="highlight-color medium-fonts">
                                                                {spec.title}
                                                            </p>
                                                        </div>
                                                        <div className="section-content">
                                                            <p className="highlight-color">{spec.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                {/* Desktop Grid */}
                                <div
                                    className="town-plannig-grid amenities-grid specification-grid two-col wow fade_top hidden-sm hidden-xs"
                                    data-wow-duration="1s"
                                    data-wow-delay="0.6s"
                                >
                                    {specificationsData.map((spec, idx) => (
                                        <div key={idx} className="light-green-bg">
                                            <div className="flex-row alc">
                                                <div className="specificationIcon">
                                                    <img src={spec.image_full} alt={spec.title} />
                                                </div>
                                            </div>
                                            <div className="specificationContent">
                                                <div className="section-paragraph">
                                                    <p className="highlight-color medium-fonts">
                                                        {spec.title}
                                                    </p>
                                                </div>
                                                <div className="section-content">
                                                    <p className="highlight-color">{spec.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-padding-bottom twon-plannig-secttion">
                    <div className="main-container">
                        <div className="inner-flex inner-flex-common">
                            {twon_plannig.map((data, idx) => (
                                <div className="twon-plannig-sectiongrid" key={idx}>
                                    <div>
                                        <img src={data.img} alt="" />
                                    </div>
                                    <div className="inner-flex">
                                        <div className="section-title">
                                            <h2 className="highlight-color">{data.title}</h2>
                                        </div>
                                        <div className="inner-flex inner-flex-small">
                                            <div
                                                className="section-paragraph"
                                                dangerouslySetInnerHTML={{ __html: data.tagline }}
                                            />
                                            <div>
                                                <ul
                                                    className="inner-flex inner-flex-smallest town-planing-ul section-content"
                                                    dangerouslySetInnerHTML={{ __html: data.discription }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="development-plan-flex">
                        <div className="main-container flex-row inner-flex-small">
                            {strategicLocationData.map((data) => (
                                <div
                                    className="development-plan-link section-content"
                                    key={data.id}
                                >
                                    <p
                                        className={`wmc ${activeTab === data.id ? "active" : ""}`}
                                        onClick={() => setActiveTab(data.id)}
                                    >
                                        {data.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="main-container">
                        <div className="section-padding">
                            {strategicLocationData.map((data) => (
                                <div
                                    key={data.id}
                                    className={`two-grid alc strategicLocation inner-flex-tab revs-col-tab ${activeTab === data.id ? "active" : ""
                                        }`}
                                >
                                    <div className="inner-flex inner-flex-small">
                                        <div className="section-title">
                                            <h2 className="highlight-color">{data.title}</h2>
                                        </div>
                                        {/* <div className="section-content" dangerouslySetInnerHTML={{ __html: data.discription }} /> */}
                                        <div className="section-content">
                                            <p dangerouslySetInnerHTML={{ __html: data.discription }} className="gray-color">
                                            </p>
                                        </div>

                                    </div>
                                    <div>
                                        <img src={data.img} alt="" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="section-padding " style={{ backgroundColor: "#ffffff" }} id="homeInquirySEction-form">
                    <div className="main-container">
                        <div className="contactFormWrapper  relative" style={{ zIndex: 2 }}>
                            <div className="section-title" data-aos-delay="300" data-aos-duration="600">
                                <h2 className="highlight-color">
                                    Get in touch
                                </h2>
                            </div>
                            <div className="contactForm detailForm homeForm w100  wow fadeIn" data-aos-delay="400" data-aos-duration="600">
                                <InquiryForm
                                    // pageDetail={projectDetail}
                                    countryFlag={countryFlag}
                                    setCountryFlag={setCountryFlag}
                                    isInq={true}

                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Pagination,
    Keyboard,
    Mousewheel,
    Autoplay,
    Navigation,
    FreeMode,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";
// import InquiryForm from "../components/InquiryForm"; 

export default function Home({
    // setInquiryPopupObj,
    // inquiryPopup,
    // setInquiryPopup,
    homeDetails,
    propertylist,
    completedPropertylist,
    pageList,
    blogData,
}) {
    const [isMobilescreen, setMobileScreen] = useState(false);
    const [homeDetailsData, setHomeDetail] = useState(homeDetails || null);
    const [filterType, setFilterType] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [awardsList, setAwardsList] = useState([]);
    const [timelineData, setTimelineData] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [latestNews, setLatestNews] = useState([]);
    const [tagType, setTagType] = useState("");
    const [blogsTypesList, setBlogsTypesList] = useState([]);
    const [countryFlag, setCountryFlag] = useState(false);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const validBlogData = Array.isArray(blogData) ? blogData : [];

        const enrichedData = validBlogData.map((item) => ({
            ...item,
            tags_commaseparted: item.tags?.map((t) => t.text).join(",") || "",
        }));

        if (tagType !== "") {
            const filtered = enrichedData.filter((blog) =>
                blog.tags?.some((tag) => tag.text === tagType)
            );
            setBlogsTypesList(filtered);
        } else {
            setBlogsTypesList(enrichedData);
        }
    }, [tagType, blogData]);

    useEffect(() => {
        const filteredLatestNews = blogsTypesList
            .filter(
                (item) =>
                    item.tags_commaseparted &&
                    item.tags_commaseparted.includes("Latest-News")
            )
            .slice(0, 3);
        setLatestNews(filteredLatestNews);
    }, [blogsTypesList]);

    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth < 767) {
            setMobileScreen(true);
        }
    }, []);

    const allProjects = useMemo(
        () => [...(propertylist || []), ...(completedPropertylist || [])],
        [propertylist, completedPropertylist]
    );

    useEffect(() => {
        setFilteredProjects(
            allProjects.filter(
                (project) => filterType === "" || project.category === filterType
            )
        );
    }, [allProjects, filterType]);

    const otherBannerList = useMemo(() => {
        if (!homeDetailsData?.other_page_banner || !pageList?.length) return [];
        return pageList.filter((item) =>
            homeDetailsData.other_page_banner.includes(item.admin_slug)
        );
    }, [homeDetailsData, pageList]);

    useEffect(() => {
        fetch("/awards.json")
            .then((res) => res.json())
            .then((data) => {
                if (data?.awards?.length) {
                    setAwardsList(data.awards);
                }
            })
            .catch((err) => {
                console.error("Error loading awards:", err);
            });
    }, []);

    if (!homeDetailsData) {
        return <div>Error loading data</div>;
    }

    useEffect(() => {
        setTimelineData([
            { year: "2024", description: "- Dholera Forest Estate" },
            {
                year: "2023",
                description:
                    "- Dholera Expressway Avenue -l, IV <br> - Dholera Expressway Avenue Township (1,11) <br> - Dholera International Airport city - 11, Ill, IV",
            },
            {
                year: "2022",
                description:
                    "- Orchard Enclave-I <br> - Dholera Expressway City-I <br> - Dholera Expressway City Township (11, Ill, IV)",
            },
            {
                year: "2021",
                description: "- ABCD Enclave-IV <br> - Piccadilly square-II",
            },
            {
                year: "2019",
                description:
                    "- ABCD Enclave-I <br>- ABCD Enclave -11 <br>- ABCD Enclave-lil <br>- ABCD Greens-I ",
            },
            {
                year: "2018",
                description: "- Orange County <br>- Olive Garden <br>- Mulberry Park",
            },
            {
                year: "2017",
                description: "- Dholera international Airport City -l ",
            },
            {
                year: "2015",
                description: "- Maple Garden",
            },
        ]);
    }, []);

    const testimonials = [
        {
            name: "amoghshastri  shastri",
            img: "/images/testimonials/amoghshastri.png",
            link: "https://maps.app.goo.gl/ybt8Yz2LSXHx8eVw6",
            discription:
                "Thank you so much, Mayuri Ji, for your excellent guidance, which played a key role in my decision to invest in Smart Home. When I was considering investing in Dholera, several other builders approached me, but your clear and detailed explanation of the entire project helped me make a confident decision. Your efforts are truly commendable & appreciated.  Today's site visit was impressive, and I am eagerly looking forward to the project's completion. Once the registration process is complete, I will certainly recommend Smart Home to both my professional and personal circles as the ideal choice for investing in Dholera. Once again, thank you for all your efforts. Warm regards,Amogh Shastri",
            postTime: "2 months ago",
        },
        {
            name: "Ashish  Shukla",
            link: "https://maps.app.goo.gl/4io869U7wpnRjgbo9",
            img: "/images/testimonials/as.png",
            discription:
                'I want to express my deepest gratitude to Smart Homes Infrastructure Pvt. Ltd. The level of professionalism and care from their staff has been outstanding. The deals they provided were not only fair but incredibly considerate of my needs. From the moment I started dealing with Smart Homes Infrastructure Pvt. Ltd, I felt completely supported and valued. The deals you offered were exactly what I needed, and I cannot thank you enough for your trustworthiness and transparency. The kindness and professionalism of your staff (special thanks to Ms. Monika) have truly made my experience remarkable. It\'s rare to find a company that is so trustworthy and genuinely supportive. The owners and their entire team went above and beyond to ensure everything was seamless. I highly recommend "Smart Homes Infrastructure Pvt. Ltd" to anyone looking for a Plots/Homes/Commercial Land in Dholera (Gujrat) that values integrity and customer satisfaction. I look forward to continuing our relationship. Thank you for your exceptional service! Thanks and Regards, Ashish Shukla',
            postTime: "4 months ago",
        },
        {
            name: "Tejal  Shah",
            link: "https://www.google.com/maps/contrib/105016448705218674963/reviews?hl=en-GB",
            img: "/images/testimonials/tejal-shah.png",
            discription:
                "I very rarely leave reviews however this is one business most deserving of one! I can't speak highly enough of Smart Homes, they are unmatched, Meenakshi and Rupinder, they are absolute professionals that really understand the Dholera market and how to get the very best outcome for their clients by going out of their way to get things done properly and their service level is really top-notch and beyond that it's the details that makes the difference. Their dedication towards the real estate business in Dholera inspired us to invest with them. Completely impressed with their professionalism and amazing customer service. They abide by their commitments, are reliable, honest and operate with integrity. Exceeding my expectations every time as we made multiple purchases with them. Me and my husband Dr. Himanshu shah 100% recommend Smart Homes for anyone who is looking for property in Dholera. Thanks to each of you for all your efforts and the above and beyond assistance you provided during the sale process, much appreciated and looking forward to working with you on the next deal!",
            postTime: "6 months ago",
        },
        {
            name: "Ravindra  Rohit",
            img: "/images/testimonials/ravindra-rohit.png",
            link: "https://www.google.com/maps/contrib/111431291459805060236/reviews?hl=en-GB",
            discription:
                "We are extremely grateful to Smart Homes Team for their outstanding support for best investment. From the initial consultant to the final closing, they provide expert Guidance. Their negotiation skills were impressive. I highly recommend Smart Homes Team to anyone looking for a reliable and knowledgeable real estate agent.  Thank You So Much Smart Homes Team.",
            postTime: "8 months ago",
        },
        {
            name: "Sanjay  Singh",
            img: "/images/testimonials/sanjay.png",
            link: "https://www.google.com/maps/contrib/114776251593127063778/reviews?hl=en-GB",

            discription:
                "I bought a plot with smart homes.. trust they are highly professional builders..with very cooperative nature. I definitely share would like to recommend people to use there services. Extremely talented workforce.",
            postTime: "2 months ago",
        },
        {
            name: "nitin  gupta",
            img: "/images/testimonials/nitin-gupra.png",
            link: "https://www.google.com/maps/contrib/103012680575693447457/reviews?hl=en-GB",

            discription:
                "In Feb 2023 I visited Dholera. There I came in contact with this company executive named Ami Patel. She guided me in purchasing plot inside Dholera SIR. I met Mrs Meenakshi also. Companies employees are very supportive. System is very transparent. On very first day of purchase, Ami Patel given me total cost of purchase. No hidden charges after that. From purchase till registry every step was smooth.This appealed me very much. So I trusted this company very much. I purchased plot inside and outside dholera SIR from this company. In future also I will invest through this company. Thanks to Ami Patel.",
            postTime: "10 months ago",
        },
        {
            name: "Saurav  Prasad",
            img: "/images/testimonials/saurav.png",
            link: "https://www.google.com/maps/contrib/101211615968242127020/reviews?hl=en-GB",
            discription:
                "As per the name SMARTHOMES, the team is also smart and feel like home while talking to the team. Young team with lots of energy and full of enthusiasm ready to help anytime. Cristal and clear policies and everything available online. Each and every updates shared by teams they keep updating regarding the recent development. I specially thanks to Miss Monika Patel  She has helped me with each and every details of dholera (as I m very far away from Dholera) & helped me to book the plots online and provided endless support to me. Never feel like the team is not supporting me. And I cn say abt Monika she can sell anything to anyone. She is too good in Marketing. Proud to be a part of Smarthomes and Dholera.",
            postTime: "10 months ago",
        },
        {
            name: "Rashmi  Panda",
            img: "/images/testimonials/rashmi.png",
            link: "https://www.google.com/maps/contrib/116935697609515114814/reviews?hl=en-GB",

            discription:
                "My aquaintance with SmartHomes Infra Pvt Ltd began with my interest in Dholera,one of the biggest development initiative of our pride Honourable PM Modiji. I visited their office and was introduced to miss Monica Patel.I had nearly one hour+ discussion with her,she bringing out details Dholera and about their project.One thing I liked about our discussion is listening customer point of view.I did visit other developers on same day, but my discussion with Monica was very good and I finalized on that day to book my sites and it was completed within 15 days time.She has been in touch with me till date with regular updates on Dholera and the progress. That was first booking and this Feb '24, I did a second booking in another project,again with her support She has been very supportive and I recommend prospective investors reaching out to her for getting required help on your investment plans.   SmartHomes Infra as a company is great and is transparent.If you are trying to invest in a project, you can check their portal for title docs,plan,NoC etc or you may do a office visit to get your necesarry clarification. Only thing what I wish is let Dholera work progress at a very rapid rate and create new job opportunities of talented Indians",
            postTime: "10 months ago",
        },
        {
            name: "Jayendra  Zala",
            img: "/images/testimonials/jayendra.png",
            link: "https://www.google.com/maps/contrib/116126556056601344618/reviews?hl=en-GB",

            discription:
                "I was completely impressed with their professionalism and customer service,Their staff is not only friendly but also highly skilled. Pricing is fair and transparent - definitely value for money.Efficiency and punctuality are hallmarks of their service. They are reliable, honest and operate with integrity. Special thanks to Siddharth ji and Mayuri ji for the great investment deal...for the future..secure .......best of luck for the future projects of smart home team....thank you once again.",
            postTime: "10 months ago",
        },
        {
            name: "bj  misra",
            img: "/images/testimonials/bj-misra.png",
            link: "https://www.google.com/maps/contrib/118307461666731404093/reviews?hl=en-GB",

            discription:
                "Nice cordial attitude of the relationship manager. Smart is smart - it holds its name diligently. Thanks for all their support. Today because of them I have a plot in Dholera.   Thanks",
            postTime: "10 months ago",
        },
    ];

    const seoMetaData = homeDetailsData && {
        page_title: homeDetailsData.page_title || "",
        page_description: homeDetailsData.page_description || "",
        page_keywords: homeDetailsData.page_keywords || "",
        slug: "/",
        image: homeDetailsData.page_image_full
            ? homeDetailsData.page_image_full.includes("?")
                ? `${homeDetailsData.page_image_full}&w=1280&h=640`
                : `${homeDetailsData.page_image_full}?w=1280&h=640`
            : "//images/og-image.png",
    };
    const interleaveOffset = 0.5;

    const overviewParts = homeDetailsData.home_overview
        ? homeDetailsData.home_overview.split("\n\n")
        : [];

    const defaultPodcastData = [
        {
            url: "https://youtu.be/sgJ6qg6yvVc?si=L8WNTjM1PMpk3t6A",
            type: "podcast",
            name: "Unveiling the Truth About Dholera",
            image: "/images/podcast/podcast-1.jpg",
        },
        {
            url: "https://youtu.be/v36StApHVMA?si=KdxHCp4gC7bg1pnr",
            type: "podcast",
            name: "Know All from Dholera's Dynamic Duo!",
            image: "/images/podcast/podcast-2.jpg",
        },
        { url: "https://youtu.be/zZv9vnUM1Eg" },
        { url: "https://youtu.be/f1FW3lBwqkE?si=gdSgvy3fIjXPvggb" },
        { url: "https://youtu.be/v36StApHVMA?si=2muul_KuNvzAaomQ" },
        { url: "https://youtu.be/sgJ6qg6yvVc?si=6riQ4ynLesNW3n9s" },
        { url: "https://youtu.be/3tAOAX0vuLg?si=Q6_beo7bI7LE90XQ" },
        { url: "https://youtu.be/2DvmNqfcMOM?si=j1iVta839vSP06Ge" },
        { url: "https://youtu.be/97Xw4mk_uFk?si=_0UYRAMFZKCubKAo" },
        { url: "https://youtu.be/JDGic5YCiq4?si=TFqxip08g8hPe4Mj" },
        { url: "https://youtu.be/4bvoIwvT13o?si=G44RgQHpseTJ8h60" },
        { url: "https://youtu.be/MfjJGXfmUgs?si=rsMV5hlhowpQ94sW" },
        { url: "https://youtu.be/x5utkc2OdOM?si=q1CO3NJFDjCgrKi-" },
        { url: "https://youtu.be/TX06Q4rYsIk?si=Ed5wUjm_nAj-r6E1" },
        { url: "https://youtu.be/jfpje_IKW2w?si=9ZhFEvmqRCRttb8x" },
        { url: "https://youtu.be/i2l0hW630_k?si=vX9fkkC-UE9IMab-" },
        { url: "https://youtu.be/bXS93D2N5PI?si=ug8cpNf5AGO1k5qu" },
        { url: "https://youtu.be/GXi6o5t0zfE?si=P9FOiETLDRnn46Bl" },
        { url: "https://youtu.be/cWEAQdwF5RE?si=oqDfmtQ6SOHpaGv2" },
        { url: "https://youtu.be/aCVxsBYfQmw?si=dnt473P0v1ShkmPx" },
    ];
    const faqData = [
        {
            title: "What is the Dholera Special Investment Region (Dholera SIR)?",
            description:
                ' Dholera SIR: Ambitious Project of Central Govt. & Gujarat Govt. Funding by Delhi Mumbai Industrial Corridor (DMIC) an aim to make it a "Global Manufacturing & Trading hub" supported by World Class infrastructure & Amenities. Area: 920 Sq. Km. 6 Town planning Scheme (TP), 22 villages covered in DHOLERA SIR. Phase-wise development plan. The dedicated area allotted in TP Schemes for Residential purposes, City Centre, Knowledge & IT Zone, Industrial Zone, High access Corridor, Solar & Renewal Energy, green belt, Sport & Recreation zone, Logistic Zone.',
        },

        {
            title:
                "What is the advantage of Inside Dholera SIR, Town Planning Scheme? What does it mean outside the Dholera SIR boundary?",
            description:
                "Land/Plot owner: INSIDE Dholera SIR, Town Planning scheme (1 to 6) area will get World Class Infrastructure, Amenities, Services & Benefits. Such as ICT enable Traffic Management, Smart City Monitoring, Power, Wide Roads, Smart and sustainable Pollution free environment, greenbelt & Plantations, Drinking Water Treatment through WTP, Solid Waste Management, Storm Water Management available on Plug and Play systems at Plot gate. Rapid Transit like Metro and Rapid Bus.",
        },

        {
            title: "Why Invest with Smart Homes?",
            description:
                "Our team has been at the forefront of shaping the real estate landscape in Dholera since 2015. As one of the first developers in this region, we have a deep understanding of the area's growth potential and infrastructure development. <br>Investing with us means choosing a partner that prioritizes transparency and trust.We believe in providing genuine value for your investment and ensuring that every step of the process is smooth and hassle- free.From paperwork to project delivery, our transparent approach guarantees that you are always in the loop and that your investment is protected. <br>From energy - efficient homes to eco - friendly infrastructure, every property we develop is a step towards a more sustainable and connected lifestyle.Whether it's integrating renewable energy sources, water conservation, or smart home automation, our developments are designed to be future - ready and eco - conscious.",
        },

        {
            title: "Where is Dholera located?",
            description:
                " Dholera is located near major cities such as Ahmedabad and Surat and is well-connected to major Ports and Airports. Dholera is a Special Investment Region (SIR) under the DMIC Project, which will help to improve the overall infrastructure and ease of doing business in the region. Sitaram Infra is one of the top real estate and infrastructure firm.",
        },
        {
            title: "What is the Dholera project area?",
            description:
                "The total project area encompasses 920 sq. km and offers immense growth and development possibilities including high-tech infrastructure, great connectivity, along with the overall sustainable development of the region including ample greenery all around. The entire smart city in Dholera project area will be developed in three phases.",
        },
        {
            title: "What is Dholera smart city?",
            description:
                "Dholera is a new smart city project in India, which is set to become the country's largest city development. It will span a total area of 2,937 sq km and accommodate a population of 1.1 million people. Dholera Smart City represents an ambitious government initiative in Gujarat, India, aimed at establishing a cutting-edge urban center. <br> Dholera Special Investment Region is a greenfield industrial smart city planned and located approximately 100 km southwest of Ahmedabad. It is envisioned as India's most attractive location for manufacturing and industrial development. <br>  - Dream Project of Mr. Narendra Modi envisaged when he was the Chief Minister of Gujarat. <br> - Identified as the first Smart City of India. <br> - To be developed 2 times the size of Delhi and Six times that of Shanghai. <br> - Rated by Forbes as one of its kind cities in India and one amongst Top 12 fastest growing cities in the world. <br> - A Special Investment node along the DMIC corridor making it a site for fast-track trading and manufacturing activities. <br> - Development plans undertaken jointly by Gujarat State Government and Central Government. <br> - Excellent connectivity through rail, road, express highway, international airport, metro and port which collectively links the city on both national and global front. <br> - Initial funding of Rs. 3,000 crores received from government which shall result in attracting FDI's and private investors. <br> - Availability of abundant land at lower valuation makes it a value proposition for retail and international investors. <br> - First choice for smart investors owing to its strategic location, current prices and thrust from the government. <br> By and large, it is very much advised by experts who are observing Dholera Real Estate markets very closely that investing in Dholera at present will surely yield very good returns. ",
        },
    ];

    // const handleExploreMoreClick = () => {
    //     if (defaultPodcastData.length > 0) {
    //         let url = [];
    //         defaultPodcastData.forEach((item, i) => {
    //             url.push(item.url);
    //         });
    //         console.log(url);
    //         // Fancybox.show([
    //         //     {
    //         //         src: ,
    //         //         type: "iframe",
    //         //     },
    //         // ]);
    //     }
    // };
    // useEffect(() => {
    //     Fancybox.bind('[data-fancybox="podcastGallery"]', {
    //         Thumbs: true,
    //         Toolbar: true,
    //     });
    // }, []);

    const handleExploreMoreClick = () => {
        if (defaultPodcastData.length > 0) {
            const galleryItems = defaultPodcastData.map((item) => ({
                src: item.url,
                type: "iframe",
            }));

            Fancybox.show(galleryItems, {
                Thumbs: true,
                Toolbar: true,
            });
        }
    };


    return (
        <>
            <style>{`
        .bannerCard img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      `}</style>

            <div
                className="reecosys-template-page-wrapper"
                id="home-page-wrapper-reecosys-template"
                onClick={() => {
                    setCountryFlag(false);
                }}
            >
                <section
                    id="piramyd-banner-section overflow_section"
                    className="piramyd-banner-section relative pt0"
                >
                    <div className="banner-swiper homeBannerSwiper relative">
                        <Swiper
                            modules={[Pagination, Keyboard, Mousewheel, Autoplay]}
                            observer={true}
                            observeParents={true}
                            loop={true}
                            loopAdditionalSlides={0}
                            speed={1000}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                el: ".swiper-pagination.homeSwiperPagination",
                                clickable: true,
                            }}
                            grabCursor={false}
                            watchSlidesProgress={true}
                            keyboard={{ enabled: true }}
                            mousewheel={{ forceToAxis: true }}
                            on={{
                                progress(swiper) {
                                    swiper.slides.forEach((slide) => {
                                        const slideProgress = slide.progress;
                                        const innerOffset = swiper.width * interleaveOffset;
                                        const innerTranslate = slideProgress * innerOffset;
                                        const inner = slide.querySelector(".slide-inner");
                                        if (inner) {
                                            inner.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
                                        }
                                    });
                                },
                                touchStart(swiper) {
                                    swiper.slides.forEach((slide) => {
                                        slide.style.transition = "";
                                    });
                                },
                                setTransition(swiper, speed) {
                                    swiper.slides.forEach((slide) => {
                                        slide.style.transition = `${speed}ms`;
                                        const inner = slide.querySelector(".slide-inner");
                                        if (inner) {
                                            inner.style.transition = `${speed}ms`;
                                        }
                                    });
                                },
                            }}
                            className="homeBannerSwiper"
                        >
                            {!isMobilescreen && (
                                <SwiperSlide>
                                    <div className="bannerCard relative slide-inner">
                                        <img
                                            src="https://ik.imagekit.io/yfswm0s2t1o/smart-homes/homepage-banner_zzGXAr3K7.jpg?updatedAt=1745243437680"
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>
                            )}

                            {isMobilescreen && (
                                <SwiperSlide>
                                    <div className="bannerCard relative slide-inner">
                                        <img
                                            src="https://ik.imagekit.io/yfswm0s2t1o/smart-homes/homepage-banner-mob_3DmGnwr1v.webp?updatedAt=1745316401441"
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>
                            )}

                            {propertylist &&
                                propertylist.length > 0 &&
                                propertylist
                                    .filter((data) =>
                                        [722, 724, 726, 735].includes(data.project_id)
                                    )
                                    .map((data) => (
                                        <SwiperSlide key={data.project_id}>
                                            <Link href={data.slug}>
                                                <div className="bannerCard relative slide-inner">
                                                    <img
                                                        src={`${data.banners_data.images[0].image_web_full}&w=1920&h=1080&q=100`}
                                                        alt=""
                                                    />
                                                    <div className="homeBannerOverlayOne hidden-xs"></div>
                                                    <div className="homeBannerOverlaytwo"></div>
                                                    <div className="bannerText homeBannerText  overflow_section">
                                                        <div className="inner-flex w100">
                                                            <div className="section-content">
                                                                <p className="statusTag uppercase white-color light-fonts relative wfc">
                                                                    {data.status === "under construction"
                                                                        ? "Ongoing"
                                                                        : data.status}
                                                                </p>
                                                            </div>
                                                            <div className="section-title overflow_section w60">
                                                                <h1 className="white-color">
                                                                    {data.project_title}
                                                                </h1>
                                                            </div>
                                                            <div className="section-content overflow_section">
                                                                <p
                                                                    className="capitalize white-color light-fonts"
                                                                    style={{ lineHeight: 2 }}
                                                                >
                                                                    {data.size_price}
                                                                    {data.size_price && (
                                                                        <>
                                                                            <br className="visible-xs" />
                                                                            <span className="white-color hidden-xs">
                                                                                {" "}
                                                                                &nbsp; | &nbsp;{" "}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                    {data.total_area}
                                                                    {data.total_area && (
                                                                        <>
                                                                            <br className="visible-xs" />
                                                                            <span className="white-color hidden-xs">
                                                                                {" "}
                                                                                &nbsp; | &nbsp;{" "}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                    {data.location}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                        </Swiper>
                        <div
                            className="swiper-pagination homeSwiperPagination"
                            style={{ bottom: "10%", width: "91.5%", left: "50%" }}
                        ></div>
                    </div>
                </section>

                <section
                    className="reecosys-template-section section-padding relative"
                    id="reecosys-template-home-section-2"
                >
                    <div className="main-container-fluid">
                        <div className="inner-flex inner-flex-medium">
                            <div
                                className="link-font-size"
                                data-aos="fade-up"
                                data-aos-delay="300"
                                data-aos-duration="600"
                            >
                                <p className="secondary-color uppercase bold-fonts">
                                    {homeDetailsData.home_title}
                                </p>
                            </div>

                            <div className="two-grid inner-flex-small inner-flex-tab revs-col-tab">
                                <div className="inner-flex inner-flex-medium">
                                    {homeDetailsData.home_overview && (
                                        <div className="section-information inner-flex">
                                            <div className="section-title">
                                                <h2
                                                    className="secondary-color"
                                                    data-aos="fade-up"
                                                    data-aos-delay="400"
                                                    data-aos-duration="600"
                                                >
                                                    {overviewParts[0]}
                                                </h2>
                                            </div>

                                            <div className="section-content">
                                                <p
                                                    className=""
                                                    data-aos="fade-up"
                                                    data-aos-delay="400"
                                                    data-aos-duration="600"
                                                >
                                                    {overviewParts[1]}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {homeDetailsData.highlights_array &&
                                        homeDetailsData.highlights_array.length > 0 && (
                                            <div className="highlights-grid inner-flex inner-flex-medium">
                                                {homeDetailsData.highlights_array.map((data, index) => (
                                                    <div
                                                        className="inner-flex inner-flex-smallest"
                                                        data-aos="fade-in"
                                                        data-aos-delay="800"
                                                        data-aos-duration="600"
                                                        key={index}
                                                    >
                                                        <div className="section-title">
                                                            <h2>{data.name}</h2>
                                                        </div>
                                                        <div className="section-content">
                                                            <p>{data.tag_line}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                    <div className="about-btn-home outline-div-button button-div wfc">
                                        <Link href="/about-us">
                                            <div
                                                className={`wow ${isMobilescreen ? "fadeIn" : "fadeInUp"
                                                    }`}
                                                data-aos="fade-in"
                                                data-aos-delay="700"
                                                data-aos-duration="600"
                                            >
                                                <button className="reecosys-template-button button-style-secondary">
                                                    <p>About Us</p>
                                                </button>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div
                                    className="home-sect-img"
                                    data-aos="zoom-in"
                                    data-aos-delay="400"
                                    data-aos-duration="600"
                                >
                                    <img src="/images/about/about-img.webp" alt="smart-homes" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="reecosys-template-section section-padding relative"
                    id="reecosys-template-home-section-6"
                >
                    <div className="main-container">
                        <div className="inner-flex inner-flex-medium">
                            <div
                                className="link-font-size"
                                data-aos="fade-in"
                                data-aos-delay="300"
                                data-aos-duration="600"
                            >
                                <p className="secondary-color uppercase bold-fonts">
                                    Our Podcasts
                                </p>
                            </div>
                            <div className="section-information inner-flex">
                                <div className="section-title">
                                    <h2
                                        className="secondary-color"
                                        data-aos="fade-in"
                                        data-aos-delay="400"
                                        data-aos-duration="600"
                                    >
                                        Dive into the world of real estate and smart living with our
                                        insightful podcasts. Stay informed with expert opinions,
                                        project updates, and inspiring stories from Dholera and
                                        beyond.
                                    </h2>
                                </div>
                            </div>

                            {/* <div className="project-list-grid project-list-grid-2-column">
                                {defaultPodcastData.slice(0, 2).map((podcast, index) => (
                                    <div className="project-list-card relative" key={index}>
                                        <a
                                            data-fancybox="podcastFancybox"
                                            href={podcast.url}
                                            target="_self"
                                            rel="noopener noreferrer"
                                        >
                                            <div
                                                className="relative wow fadeIn"
                                                data-wow-delay={`0.${index + 4}s`}
                                                data-wow-duration="0.6s"
                                            >
                                                <div className="project-img-list overflow relative">
                                                    <img
                                                        src={
                                                            podcast.image ||
                                                            "/images/dummy-image/dummy-image-1320X750.png"
                                                        }
                                                        alt={podcast.name || "Podcast image"}
                                                    />
                                                </div>
                                                <div className="youtubeIcon">
                                                    <img
                                                        src="/images/icon/youtube-icon.svg"
                                                        alt="youtube icon"
                                                    />
                                                </div>
                                                <div className="podcastOverlay"></div>
                                            </div>

                                            {podcast.name && (
                                                <div className="podcastText">
                                                    <div className="inner-flex inner-flex-smallest">
                                                        <div className="link-font-size">
                                                            <p className="white-color uppercase">
                                                                {podcast.type}
                                                            </p>
                                                        </div>
                                                        <div className="section-subtitle">
                                                            <h4 className="white-color">{podcast.name}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </a>
                                    </div>
                                ))}
                            </div> */}
                            <div className="project-list-grid project-list-grid-2-column">
                                {defaultPodcastData.slice(0, 2).map((podcast, index) => (
                                    <div className="project-list-card relative" key={index}>
                                        <a
                                            // data-fancybox="podcastGallery"
                                            onClick={(e) => { e.preventDefault(), handleExploreMoreClick() }}
                                            href={podcast.url}
                                            target="_self"
                                        >
                                            <div
                                                className="relative"
                                                data-aos="fade-in"
                                                data-aos-delay="400"
                                                data-aos-duration="600"
                                            >
                                                <div className="project-img-list overflow relative">
                                                    <img
                                                        src={
                                                            podcast.image ||
                                                            "/images/dummy-image/dummy-image-1320X750.png"
                                                        }
                                                        alt={podcast.name || "Podcast image"}
                                                    />
                                                </div>
                                                <div className="youtubeIcon">
                                                    <img
                                                        src="/images/icon/youtube-icon.svg"
                                                        alt="youtube icon"
                                                    />
                                                </div>
                                                <div className="podcastOverlay"></div>
                                            </div>

                                            {podcast.name && (
                                                <div className="podcastText">
                                                    <div className="inner-flex inner-flex-smallest">
                                                        <div className="link-font-size">
                                                            <p className="white-color uppercase">{podcast.type}</p>
                                                        </div>
                                                        <div className="section-subtitle">
                                                            <h4 className="white-color">{podcast.name}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div className="wfc m0auto">
                                {defaultPodcastData.length > 0 && (
                                    <button
                                        className={`reecosys-template-button button-style-secondary-outline ${isMobilescreen ? "w100" : ""
                                            }`}
                                        onClick={handleExploreMoreClick}
                                    >
                                        <p>Explore More</p>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="reecosys-template-section section-padding relative highlight-bg"
                    id="reecosys-template-home-section-experience"
                >
                    <div className="main-container-fluid">
                        <div className="inner-flex">
                            <div
                                className="section-title experienceText "
                                data-aos="fade-in"
                                data-aos-delay="400"
                                data-aos-duration="600"
                            >
                                <h2 className="white-color">
                                    Marriott Hotels Partners With SmartHomes Infrastructure to
                                    Launch Dholera Smart City's First 5-Star Hotel
                                </h2>
                            </div>
                            <div
                                className="section-content hashText"
                                data-aos="fade-in"
                                data-aos-delay="500"
                                data-aos-duration="600"
                            >
                                <p className="text-right">#SmartHomesDholera</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="reecosys-template-section section-padding relative"
                    id="reecosys-template-home-section-3"
                >
                    <div className="list-grid-block main-container-fluid active">
                        <div className="inner-flex inner-flex-medium">
                            <div>
                                <div className="inner-flex inner-flex-medium">
                                    <div
                                        className="link-font-size "
                                        data-aos="fade-in"
                                        data-aos-delay="200"
                                        data-aos-duration="600"
                                    >
                                        <p className="secondary-color uppercase bold-fonts">
                                            Our Projects
                                        </p>
                                    </div>
                                    <div
                                        className=""
                                        data-aos="fade-in"
                                        data-aos-delay="300"
                                        data-aos-duration="600"
                                    >
                                        <div className="section-title wfc relative">
                                            <h2 className="secondary-color">
                                                From completed landmarks to ongoing ventures, explore
                                                our portfolio and discover how we are shaping the future
                                                of residential and commercial spaces.
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-row inner-flex-small filter-btn-grid">
                                {["", "Residential", "Commercial"].map((type, index) => (
                                    <div
                                        className={`wfc ${index === 0 ? "fadeIn" : "fadeInUp"}`}
                                        data-aos="fade-in"
                                        data-aos-delay="400"
                                        data-aos-duration="600"
                                        key={type}
                                    >
                                        <button
                                            className={`reecosys-template-button button-style-secondary-outline ${filterType === type ? "active" : ""
                                                }`}
                                            onClick={() => setFilterType(type)}
                                        >
                                            <p>{type === "" ? "All Projects" : type}</p>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="project-list-grid project-list-grid-2-column">
                                {filteredProjects.slice(0, 6).map((project, index) => {
                                    const imgUrl = project.banner_data?.image_web_full || "";
                                    const separator = imgUrl.includes("?") ? "&" : "?";
                                    const finalImgUrl = `${imgUrl}${separator}h=580&w=1030&q=100`;

                                    return (
                                        <div className="project-list-card relative" key={index}>
                                            <Link
                                                href={project.slug}
                                                className="inner-flex "
                                                data-aos="fade-in"
                                                data-aos-delay="400"
                                                data-aos-duration="600"
                                            >
                                                <div className="relative">
                                                    {project.banner_data?.image_web_type === "image" ? (
                                                        <div className="project-img-list overflow relative">
                                                            <img
                                                                src={finalImgUrl}
                                                                alt={project.project_title || "Project Image"}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="project-img-list relative">
                                                            <video autoPlay muted loop playsInline>
                                                                <source
                                                                    src={project.banner_data?.image_web_full}
                                                                    type="video/mp4"
                                                                />
                                                            </video>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="project-info-list">
                                                    <div className="inner-flex inner-flex-smallest">
                                                        <div className="section-paragraph">
                                                            <p className="bold-fonts capitalize">
                                                                {project.project_title}
                                                            </p>
                                                        </div>
                                                        <div className="flex-row inner-flex-common flex-col-teb">
                                                            {project.size_price && (
                                                                <div
                                                                    className={`project-information-div flex-row alc inner-flex-smallest ${isMobilescreen ? "w100" : ""
                                                                        }`}
                                                                >
                                                                    <div className="building-icon common-icon">
                                                                        <img
                                                                            src="/images/icon/detail-icons/building.svg"
                                                                            alt="reecosys"
                                                                        />
                                                                    </div>
                                                                    <div className="link-font-size ellipsis-1">
                                                                        <p className="secondary-color medium-fonts">
                                                                            {project.size_price}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {project.total_area && (
                                                                <div
                                                                    className={`project-information-div flex-row alc inner-flex-smallest ${isMobilescreen ? "w100" : ""
                                                                        }`}
                                                                >
                                                                    <div className="building-icon common-icon">
                                                                        <img
                                                                            src="/images/icon/detail-icons/area.svg"
                                                                            alt="reecosys"
                                                                        />
                                                                    </div>
                                                                    <div className="link-font-size ellipsis-1">
                                                                        <p className="secondary-color medium-fonts">
                                                                            Total Area of {project.total_area}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {project.location && (
                                                                <div
                                                                    className={`project-information-div flex-row alc inner-flex-smallest ${isMobilescreen ? "w100" : ""
                                                                        }`}
                                                                >
                                                                    <div className="building-icon common-icon">
                                                                        <img
                                                                            src="/images/icon/detail-icons/location.svg"
                                                                            alt="reecosys"
                                                                        />
                                                                    </div>
                                                                    <div className="link-font-size ellipsis-1">
                                                                        <p className="secondary-color medium-fonts">
                                                                            {project.location}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="wfc m0auto" style={{ marginTop: "2rem" }}>
                                <Link href="/projects">
                                    <div
                                        className={` ${isMobilescreen ? "fadeIn" : "fadeInUp"}`}
                                        data-aos="fade-in"
                                        data-aos-delay="700"
                                        data-aos-duration="600"
                                    >
                                        <button className="reecosys-template-button button-style-secondary-outline">
                                            <p>View All Projects</p>
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="reecosys-template-section section-padding lightgray-bg relative"
                    id="reecosys-template-home-section-8"
                >
                    <div className="main-container-fluid">
                        <div className="inner-flex inner-flex-medium">
                            <div
                                className="link-font-size"
                                data-aos="fade-in"
                                data-aos-delay="300"
                                data-aos-duration="600"
                            >
                                <p className="uppercase bold-fonts secondary-color">
                                    Let's Work Together
                                </p>
                            </div>
                            <div className="section-information inner-flex">
                                <div className="section-title">
                                    <h2
                                        className="secondary-color"
                                        data-aos="fade-up"
                                        data-aos-delay="400"
                                        data-aos-duration="600"
                                    >
                                        Feel Free to contact us!
                                    </h2>
                                </div>
                            </div>

                            <div className="togetherGrid">
                                {otherBannerList.map((data) => {
                                    let link =
                                        data.slug === "channelpartner"
                                            ? "channel-partners"
                                            : data.slug === "nricorner"
                                                ? "nri-corner"
                                                : data.slug;

                                    return (
                                        <div
                                            key={data.slug}
                                            className="togetherItem relative"
                                            data-aos="fade-in"
                                            data-aos-delay="400"
                                            data-aos-duration="600"
                                        >
                                            <Link href={`/${link}`} className="inner-flex j-c-sb h100">
                                                <div className="relative">
                                                    <div>
                                                        <img
                                                            src={`${data.banner_web_full}&w=855&h=480`}
                                                            alt={data.page_name}
                                                        />
                                                    </div>
                                                    <div className="career-sect-abs inner-flex inner-flex-small">
                                                        <div className="section-title">
                                                            <h2 className="white-color capitalize">
                                                                {data.page_name}
                                                            </h2>
                                                        </div>
                                                        <div>
                                                            <button className="reecosys-template-button button-style-white white-text">
                                                                <p>Know More</p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="black_overlay"></div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}

                                {/* Static Franchise Card */}
                                <div
                                    className="togetherItem relative "
                                    data-aos="fade-in"
                                    data-aos-delay="700"
                                    data-aos-duration="600"
                                >
                                    <Link
                                        href="/franchise-opportunities"
                                        className="inner-flex j-c-sb h100"
                                    >
                                        <div className="relative">
                                            <div>
                                                <img
                                                    src="https://ik.imagekit.io/yfswm0s2t1o/smart-homes/Franchise_pjR3lOB1LI.webp?updatedAt=1745243437646"
                                                    alt="Franchise Opportunities"
                                                />
                                            </div>
                                            <div className="career-sect-abs inner-flex inner-flex-small">
                                                <div className="section-title">
                                                    <h2 className="white-color">
                                                        Franchise Opportunities
                                                    </h2>
                                                </div>
                                                <div>
                                                    <button className="reecosys-template-button button-style-white white-text">
                                                        <p>Know More</p>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="black_overlay"></div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="reecosys-template-section reecosys-home-section-4 section-padding relative"
                    id="reecosys-template-home-section-4"
                >
                    <div className="inner-flex inner-flex-medium">
                        <div className="main-container-fluid inner-flex inner-flex-medium">
                            <div
                                className="link-font-size"
                                data-aos="fade-in"
                                data-aos-delay="300"
                                data-aos-duration="600"
                            >
                                <p className="secondary-color uppercase bold-fonts">Awards</p>
                            </div>
                            <div className="section-information inner-flex">
                                <div className="section-title">
                                    <h2
                                        className="secondary-color"
                                        data-aos="fade-in"
                                        data-aos-delay="400"
                                        data-aos-duration="600"
                                    >
                                        Our achievements are a reflection of our dedication to
                                        excellence and innovation. Explore the accolades and
                                        recognitions that celebrate our commitment to delivering
                                        outstanding developments and creating lasting value.
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="awardsSwiper">
                            <Swiper
                                className="swiper-container"
                                modules={[Pagination]}
                                observer={true}
                                observeParents={true}
                                freeMode={true}
                                speed={1000}
                                pagination={{
                                    el: ".swiper-pagination.awards-pagination",
                                    clickable: true,
                                }}
                                navigation={
                                    !isMobilescreen && {
                                        nextEl: ".swiper-button-next.awards-pagination",
                                        prevEl: ".swiper-button-prev.awards-pagination",
                                    }
                                }
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                        spaceBetween: 16,
                                    },
                                    768: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 20,
                                    },
                                    992: {
                                        slidesPerView: 2.5,
                                        spaceBetween: 24,
                                    },
                                    1152: {
                                        slidesPerView: 3,
                                        spaceBetween: 32,
                                    },
                                }}
                            >
                                {awardsList.map((award, index) => (
                                    <SwiperSlide key={award.slug}>
                                        <Link
                                            href={`/awards/${award.slug}`}
                                            className=""
                                            data-aos="fade-in"
                                            data-aos-delay="300"
                                            data-aos-duration="600"
                                        >
                                            <div className="awardCard inner-flex inner-flex-small">
                                                <div className="awardImg">
                                                    <img src={award.image} alt={award.name} />
                                                </div>
                                                <div className="awardContent inner-flex inner-flex-smallest">
                                                    <div className="section-paragraph">
                                                        <p>{award.name}</p>
                                                    </div>
                                                    <div className="link-font-size ellipsis-3">
                                                        <p>{award.description}</p>
                                                    </div>
                                                </div>
                                                <div className="wfc">
                                                    <button className="reecosys-template-button button-style-secondary-outline">
                                                        <p>View Details</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                                {/* <div className="swiper-pagination awards-pagination"></div> */}
                            </Swiper>
                        </div>
                    </div>
                </section>

                <section
                    className="reecosys-template-section highlight-bg section-padding relative"
                    id="reecosys-template-home-section-5"
                >
                    <div className="inner-flex inner-flex-medium">
                        <div className="main-container inner-flex inner-flex-medium">
                            <div
                                className="link-font-size"
                                data-aos="fade-in"
                                data-aos-delay="700"
                                data-aos-duration="600"
                            >
                                <p className="white-color uppercase bold-fonts">Timeline</p>
                            </div>

                            <div className="flex-row alend j-c-sb w100">
                                <div className="section-information inner-flex">
                                    <div className="section-title">
                                        <h2
                                            className="white-color"
                                            data-aos="fade-in"
                                            data-aos-delay="400"
                                            data-aos-duration="600"
                                        >
                                            Smart Homes Timeline
                                        </h2>
                                    </div>
                                </div>

                                <div className="timeline-navigation flex-row alc">
                                    <div className="swiper-button-prev timeline-button">
                                        <img src="/images/icon/left-arrow.svg" alt="Prev" />
                                    </div>
                                    <div className="swiper-button-next timeline-button">
                                        <img src="/images/icon/right-arrow.svg" alt="Next" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="timelineSwiper">
                            <Swiper
                                className="swiper-container"
                                modules={[Navigation]}
                                observer={true}
                                observeParents={true}
                                slidesPerView={3.5}
                                spaceBetween={16}
                                freeMode={true}
                                navigation={{
                                    prevEl: ".swiper-button-prev.timeline-button",
                                    nextEl: ".swiper-button-next.timeline-button",
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                        spaceBetween: 16,
                                    },
                                    768: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 20,
                                    },
                                    992: {
                                        slidesPerView: 2.5,
                                        spaceBetween: 24,
                                    },
                                    1152: {
                                        slidesPerView: 3,
                                        spaceBetween: 32,
                                    },
                                }}
                            >
                                {timelineData.map((timeline, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className="timelineCard inner-flex inner-flex-medium "
                                            data-aos="fade-in"
                                            data-aos-delay="300"
                                            data-aos-duration="600"
                                        >
                                            <div className="flex-row alc w100">
                                                <div className="section-title">
                                                    <h2 className="white-color">{timeline.year}</h2>
                                                </div>
                                                <div className="timeline-border"></div>
                                            </div>
                                            <div className="link-font-size">
                                                <p
                                                    className=""
                                                    dangerouslySetInnerHTML={{
                                                        __html: timeline.description,
                                                    }}
                                                ></p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>

                <section
                    className="reecosys-template-section lightgray-bg section-padding relative"
                    id="reecosys-template-home-section-5"
                >
                    <div className="inner-flex inner-flex-medium">
                        <div className="main-container inner-flex inner-flex-medium">
                            <div className="flex-row alend j-c-c w100">
                                <div className="section-information inner-flex">
                                    <div className="section-title text-center">
                                        <h2
                                            className="highlight-color "
                                            data-aos="fade-up"
                                            data-aos-delay="400"
                                            data-aos-duration="600"
                                        >
                                            Customer Testimonials
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="timelineSwiper testimonialsSwiper">
                            <Swiper
                                className="swiper-container"
                                modules={[Navigation, FreeMode]}
                                spaceBetween={16}
                                slidesPerView={1.2}
                                freeMode={true}
                                navigation={
                                    !isMobilescreen && {
                                        nextEl: ".swiper-button-next.testimonial-button",
                                        prevEl: ".swiper-button-prev.testimonial-button",
                                    }
                                }
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                        spaceBetween: 16,
                                    },
                                    768: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 20,
                                    },
                                    992: {
                                        slidesPerView: 2.5,
                                        spaceBetween: 24,
                                    },
                                    1152: {
                                        slidesPerView: 3,
                                        spaceBetween: 32,
                                    },
                                }}
                            >
                                {testimonials.map((data, index) => (
                                    <SwiperSlide key={index}>
                                        <Link
                                            href={data.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div className="testimonialCard border-radius inner-flex-small inner-flex">
                                                <div className="inner-flex inner-flex-common">
                                                    <div className="flex-row inner-flex-common alc">
                                                        <div className="testimonial-img">
                                                            <img src={data.img} alt={data.name} />
                                                        </div>
                                                        <div className="section-content">
                                                            <p>{data.name}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex-row inner-flex-small">
                                                        <div className="flex-row starimg">
                                                            {[...Array(5)].map((_, i) => (
                                                                <img
                                                                    key={i}
                                                                    src="/images/icon/star.svg"
                                                                    alt="star"
                                                                />
                                                            ))}
                                                        </div>
                                                        <div className="section-content">
                                                            <p className="gray-color">{data.postTime}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="section-content text-left">
                                                    <p className="ellipse-6">{data.discription}</p>
                                                </div>
                                                <div className="section-content text-left">
                                                    <p className="highlight-color">Show more</p>
                                                </div>
                                                <div className="flex-row alc">
                                                    <div className="smallest-font">
                                                        <p className="gray-color">Posted on</p>
                                                    </div>
                                                    <div className="common-icon">
                                                        <img src="/images/icon/google.svg" alt="Google" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="j-c-c flex-row alc">
                            <div className="swiper-button-prev testimonial-button">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </div>
                            <div className="swiper-button-next testimonial-button">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="reecosys-template-section section-padding relative"
                    id="reecosys-template-home-section-9"
                    style={{ background: "#FAFAFA" }}
                >
                    <div className="main-container inner-flex inner-flex-medium">
                        <div className="faqGrid">
                            <div className="inner-flex inner-flex-medium">
                                <div
                                    className="link-font-size"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                    data-aos-duration="600"
                                >
                                    <p className="uppercase bold-fonts secondary-color">
                                        Got Questions?
                                    </p>
                                </div>
                                <div className="section-information inner-flex">
                                    <div className="section-title">
                                        <h2
                                            className="secondary-color"
                                            data-aos="fade-up"
                                            data-aos-delay="400"
                                            data-aos-duration="600"
                                        >
                                            Frequently Asked <br className="hide-tab-mobile" />{" "}
                                            Questions
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="inner-flex inner-flex-medium">
                                <div
                                    className="faqAccordion"
                                    data-aos="fade-in"
                                    data-aos-delay="500"
                                    data-aos-duration="600"
                                    id="accordion"
                                >
                                    {faqData.map((faq, index) => (
                                        <div
                                            className="faqAccordionBlock accordion-block"
                                            key={index}
                                        >
                                            <div
                                                className="accordion_click flex-row alc j-c-sb section-paragraph"
                                                onClick={() => toggleAccordion(index)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <p>{faq.title}</p>
                                                <span className="material-symbols-outlined secondary-color">
                                                    {openIndex === index ? "remove" : "add"}
                                                </span>
                                            </div>

                                            <div
                                                className={`content_accordian section-paragraph ${openIndex === index ? "open" : ""
                                                    }`}
                                            >
                                                <p
                                                    className="secondary-color"
                                                    dangerouslySetInnerHTML={{ __html: faq.description }}
                                                ></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div
                            className="wfc m0auto"
                            data-aos="fade-in"
                            data-aos-delay="600"
                            data-aos-duration="600"
                        >
                            <Link href="/faqs">
                                <button className="reecosys-template-button button-style-secondary-outline">
                                    <p>View All</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section
                    className="reecosys-template-section section-padding highlight-bg relative"
                    id="reecosys-template-home-section-article"
                >
                    <div className="main-container">
                        <div className="inner-flex inner-flex-medium">
                            <div
                                className="link-font-size"
                                data-aos="fade-up"
                                data-aos-delay="700"
                                data-aos-duration="600"
                            >
                                <p className="white-color uppercase bold-fonts">
                                    NEWS & ARTICLES
                                </p>
                            </div>

                            <div className="section-information inner-flex">
                                <div className="section-title">
                                    <h2
                                        className="white-color"
                                        data-aos="fade-up"
                                        data-aos-delay="400"
                                        data-aos-duration="600"
                                    >
                                        Stay in the know with the latest news and updates from
                                        SmartHomes Dholera. From project milestones to industry
                                        insights, explore everything happening in and around our
                                        community.
                                    </h2>
                                </div>
                            </div>

                            {!isMobilescreen ? (
                                <div className="blog-list-grid">
                                    {latestNews.map((data, index) => (
                                        <div className="blog-list-card relative" key={index}>
                                            <Link
                                                href={data.banner_title}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <div
                                                    className="relative"
                                                    data-aos="fade-in"
                                                    data-aos-delay="300"
                                                    data-aos-duration="600"
                                                >
                                                    <div className="blog-img overflow relative">
                                                        <img
                                                            src={`${data.image_full}&h=228&w=437&q=100`}
                                                            alt={data.title}
                                                        />
                                                    </div>
                                                    <div className="blogText inner-flex inner-flex-smallest">
                                                        <div className="link-font-size">
                                                            <p className="white-color">
                                                                {data.published_date}
                                                            </p>
                                                        </div>
                                                        <div className="section-paragraph ellipsis-2">
                                                            <p className="white-color">{data.title}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Swiper
                                    style={{ width: "100%" }}
                                    modules={[Pagination]}
                                    pagination={{
                                        clickable: true,
                                        el: ".swiper-pagination.article-pagination",
                                    }}
                                    slidesPerView={1}
                                    spaceBetween={20}
                                >
                                    {latestNews.map((data, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="blog-list-card relative">
                                                <Link
                                                    href={data.banner_title}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <div
                                                        className="relative"
                                                        data-aos="fade-in"
                                                        data-aos-delay="300"
                                                        data-aos-duration="600"
                                                    >
                                                        <div className="blog-img overflow relative">
                                                            <img
                                                                src="assets//images/dummy-image/dummy-image-1320X750.png"
                                                                data-aos-delay={`0.${index + 3}s`}
                                                                srcSet={`${data.image_full}&h=228&w=437&q=100`}
                                                            />
                                                        </div>
                                                        <div className="blogText inner-flex inner-flex-smallest">
                                                            <div className="link-font-size">
                                                                <p className="white-color">
                                                                    {data.published_date}
                                                                </p>
                                                            </div>
                                                            <div className="section-paragraph ellipsis-2">
                                                                <p className="white-color">{data.title}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}

                            <div className="swiper-pagination article-pagination"></div>

                            <div
                                className="wfc m0auto"
                                data-aos="fade-in"
                                data-aos-delay="600"
                                data-aos-duration="600"
                            >
                                <Link href="/faqs">
                                    <div>
                                        <button className="reecosys-template-button button-style-white-fill white-border">
                                            <p>View More</p>
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="section-padding "
                    style={{ backgroundColor: "white !important" }}
                >
                    <div className="main-container">
                        <div className="contactFormWrapper  relative" style={{ zIndex: 2 }}>
                            <div
                                className="section-title aos fadeInUp"
                                data-aos-duration="400"
                                data-aos-delay="600"
                            >
                                <h2>Inquire Now</h2>
                            </div>
                            <div
                                className="contactForm detailForm w100 aos fadeIn"
                                data-aos-duration="500"
                                data-aos-delay="600"
                            >
                                {/* <InquiryForm
                                    //   pageDetail={projectDetail}
                                    countryFlag={countryFlag}
                                    setCountryFlag={setCountryFlag}
                                    isHome={true}
                                /> */}
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="reecosys-template-section relative"
                    id="reecosys-template-home-section-10"
                >
                    <div className="    ">
                        <div className="homeContactForm relative j-c-sb">
                            <div
                                className="inner-flex j-c-sb  relative"
                                style={{ zIndex: 2 }}
                            >
                                <div
                                    className="section-title"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                    data-aos-duration="600"
                                >
                                    <h2 className="white-color">
                                        Prefer connecting directly? Get in touch with us via phone,
                                        email, or visit us at our office—we're here to help!
                                    </h2>
                                </div>
                            </div>
                            <div
                                className="flex-row alc contactBtnFlex   relative"
                                style={{ zIndex: 2 }}
                            >
                                <a href="tel:+917096961250">
                                    <button
                                        className="reecosys-template-button button-style-white white-text"
                                        data-aos="fade-up"
                                        data-aos-delay="300"
                                        data-aos-duration="600"
                                    >
                                        <span className="material-symbols-outlined">
                                            phone_in_talk
                                        </span>
                                        <p>Call Us</p>
                                    </button>
                                </a>
                                <a href="mailto:info@smarthomesinfra.com">
                                    <button
                                        className="reecosys-template-button button-style-white white-text"
                                        data-aos="fade-up"
                                        data-aos-delay="400"
                                        data-aos-duration="600"
                                    >
                                        <span className="material-symbols-outlined">drafts</span>
                                        <p>Send an email</p>
                                    </button>
                                </a>
                                <a
                                    href="https://maps.app.goo.gl/4CYF8dhjXH65BjNK7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button
                                        className="reecosys-template-button button-style-white white-text"
                                        data-aos="fade-up"
                                        data-aos-delay="500"
                                        data-aos-duration="600"
                                    >
                                        <span className="material-symbols-outlined">distance</span>
                                        <p>Visit Our Office</p>
                                    </button>
                                </a>
                            </div>

                            <div className="homeContactFormOverlay"></div>
                        </div>
                    </div>
                </section>

                <div className="">
                    <button className="reecosys-template-button button-style-secondary" data-wow-duration="0.6s" data-wow-delay="0.6s"
                        ng-click="inquire_popup_click();  inquiry_from_click(); " style={{ position: "fixed", bottom: '2rem', left: "50%", width: "fit-content", transform: "translateX(-50%)", zIndex: "9999" }}>
                        <span className="material-symbols-outlined"> chat </span>
                        <p className="capitalize">Inquire Now</p>
                    </button>
                </div>
            </div>
        </>
    );
}

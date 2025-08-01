'use client';
import React, { useState, useEffect, useTransition } from 'react';
import Blogs from '../components/Blogs';
import Latestnews from '../components/Latestnews';
import './BlogsTab.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ThreeDot } from 'react-loading-indicators';
// import { useSearchParams } from 'react-router-dom';

export default function BlogsTab({ pageList, blogs_types_list, activeTabId, All_blogs_length }) {
    const pathname = usePathname();
    console.log('client tab: ', activeTabId);
    const [activeTab, setActiveTab] = useState(null);
    // console.log('client tab: ', activeTabId);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const numbers = Array.from({ length: All_blogs_length }, (_, i) => i + 1);

    const [activePage, setActivePage] = useState(1)
    // const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setActiveTab(activeTabId)
    }, [activeTabId])

    useEffect(() => {
        // const el = document.getElementById('reecosys-contact-wrapper');
        // if (el) {
        //     el.scrollIntoView({ behavior: 'smooth' });
        // }
        window.scrollTo(0, 0)
    }, [activePage])

    const handleAddParam = (value) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set('tab', value);
        params.set('page', '1');
        setActivePage(1)

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            setActiveTab(value);
        });
    };

    const handleAddParamPage = (value) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set('page', value);
        setActivePage(value)

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            // setActiveTab(value);
        });
    };

    // console.log(activeTabId);
    // useEffect(() => {
    //     setActiveTab(activeTabId || 'blogs')
    // if (pathname === '/latest-news') {
    //     setActiveTab('latest-news');
    // } else {
    //     setActiveTab('blogs');
    // }
    // }, [pathname, activeTabId]);

    return (
        <div id="reecosys-contact-wrapper" className="inner-flex inner-flex-big">
            <section
                className="reecosys-section relative"
                data-aos="fade-in"
                data-aos-delay="600"
                data-aos-duration="400"
                id="reecosys-contact-us-section-1"
            >
                <div className="common-listing-banner relative">
                    <img src="/images/detail/blog_img.jpg" alt="" />
                    <div className="common-list-overlay"></div>
                </div>
                <div className="top-left-overlay-new"></div>
            </section>

            <div className="main-container" >
                <div className="flex-row articles-tab">
                    <div
                        className="section-title flex items-center gap-4"
                        style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
                    >
                        <h2
                            className={`cursor-pointer ${activeTab === 'blogs' ? 'secondary-color' : 'opacity-50'}`}
                            onClick={() => { handleAddParam('blogs') }}
                        >
                            Blogs
                        </h2>

                        <span className="section-title-2"> / </span>

                        <h2
                            className={`cursor-pointer ${activeTab === 'latest-news' ? 'secondary-color' : 'opacity-50'}`}
                            onClick={() => { handleAddParam('latest-news') }}
                        >
                            Latest News
                        </h2>
                    </div>
                </div>
            </div>

            <div className="blogs-wrapper">
                {activeTab === 'blogs' ? (
                    !isPending ? <Blogs pageList={pageList} blogs_types_list={blogs_types_list} /> : <div className="center-loading"><ThreeDot color="#004A18" size="medium" text="" textColor="#004A18" /></div>
                ) : (
                    !isPending ? <Latestnews blogs_types_list={blogs_types_list} isActive={true} /> : <div className="center-loading">
                        <ThreeDot color="#004A18" size="medium" text="" textColor="#004A18" />
                    </div>
                )}
            </div>
            <div className="pagination">
                {numbers.map((i) => (
                    <button
                        key={i}
                        disabled={i == activePage}
                        onClick={() => { handleAddParamPage(i) }}
                        className={i === activePage ? 'active' : ''}
                    >
                        {i}
                    </button>
                ))}
            </div>


        </div>
    );
}

'use client';
import React, { useState } from 'react';
import Blogs from '../components/Blogs';
import Latestnews from '../components/Latestnews';
import './BlogsTab.css'

export default function BlogsTab({ pageList, blogs_types_list }) {
    const [activeTab, setActiveTab] = useState('blogs');

    return (
        <>
            <div
                id="reecosys-contact-wrapper"
                className=" inner-flex inner-flex-big"
            >
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

                <div className="main-container">
                    <div className="flex-row articles-tab">
                        <div className="section-title flex items-center gap-4" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <h2
                                className={`cursor-pointer ${activeTab === 'blogs' ? 'secondary-color' : 'opacity-50'}`}
                                onClick={() => setActiveTab('blogs')}
                            >
                                Blogs
                            </h2>

                            <span className='section-title-2'> / </span>

                            <h2
                                className={`cursor-pointer ${activeTab === 'latest-news' ? 'secondary-color' : 'opacity-50'}`}
                                onClick={() => setActiveTab('latest-news')}
                            >
                                Latest News
                            </h2>
                        </div>


                    </div>
                </div>

                <div className="blogs-wrapper">
                    {activeTab === 'blogs' ? (
                        <Blogs pageList={pageList} blogs_types_list={blogs_types_list} />
                    ) : (
                        <Latestnews blogs_types_list={blogs_types_list} isActive={true} />
                    )}
                </div>
            </div>
        </>
    );
}

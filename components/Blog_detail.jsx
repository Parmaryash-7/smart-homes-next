"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import DOMPurify from "dompurify";

export default function Blog_detail({ recent_blog_init_data, blogs_types_list, slug }) {
    const [isMobilescreen, setIsMobilescreen] = useState(false);
    const [blog_data, setBlog_data] = useState(null);
    const [recent_blog_data, setRecentBlogData] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth < 767) {
            setIsMobilescreen(true);
        }

        if (blogs_types_list && slug) {
            const blogData = blogs_types_list.find((data) => data.slug === slug);
            setBlog_data(blogData);

            const recentBlogs = blogs_types_list
                .filter((data) => data.slug !== slug && data.published_time)
                .sort((a, b) => b.published_time - a.published_time);

            setRecentBlogData(recentBlogs.slice(0, 3));
        }
    }, [blogs_types_list, slug]);

    if (!blog_data) {
        return <div>Loading blog...</div>;
    }
    return (
        <>
            <div className="blog_detail_wrapper">
                {/* ng-if="!is_blog_data_loading" */}
                <div className="reecosys-main-wrapper" id="reecosys-main-wrapper">
                    <div
                        id="reecosys-contact-wrapper"
                        className="relative inner-flex inner-flex-big "
                    >
                        <section
                            className="reecosys-section relative"
                            data-aos="fade-in"
                            data-aos-delay="400"
                            data-aos-duration="400"
                            id="reecosys-contact-us-section-1"
                        ></section>
                        {blog_data ? (
                            <section
                                className="reecosys-section relative"
                                id="reecosys-blog-detail-section-2"
                            >
                                <div className="mini-container">
                                    <div className="inner-flex">
                                        {!isMobilescreen && recent_blog_data?.length > 0 && (
                                            <div className="blog-grid">
                                                <div
                                                    className="blog-grid-one"
                                                    style={{ opacity: 0, visibility: "hidden" }}
                                                ></div>
                                                <div className="blog-grid-two">
                                                    <div className="section-paragraph recent_post_title">
                                                        <p className="capitalize">Recent Post</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="blog-grid">
                                            <div className="blog-grid-one">
                                                <div className="inner-flex">
                                                    <div className="section-information">
                                                        {blog_data.title && (
                                                            <div className="section-title blog-title">
                                                                <h1 className="capitalize">
                                                                    {blog_data.title}
                                                                </h1>
                                                            </div>
                                                        )}
                                                        <br />
                                                        {blog_data.published_date && (
                                                            <div className="published_blog_date">
                                                                <p>{blog_data.published_date}</p>
                                                            </div>
                                                        )}
                                                        <br />
                                                        <br />
                                                        <br />
                                                        <div className="blog-banner  relative">
                                                            <img
                                                                src={`${blog_data.image_full}&h=1080&w=1903&q=100`}
                                                                alt={blog_data.title}
                                                                className="lazyload"
                                                                ng-if="blog_data.image_full"
                                                            />
                                                        </div>
                                                        <br />
                                                        <br />
                                                        <br />
                                                    </div>
                                                    {blog_data.description && (
                                                        <div className="blog_bind_data">
                                                            {/* <div
                                dangerouslySetInnerHTML={{
                                  __html: blog_data.description,
                                }}
                              ></div> */}
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: DOMPurify.sanitize(
                                                                        blog_data.description,
                                                                        {
                                                                            FORBID_TAGS: ["style", "script"],
                                                                            FORBID_ATTR: ["style", "class"],
                                                                        }
                                                                    ),
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {recent_blog_data.length > 0 && (
                                                <div className="blog-grid-two">
                                                    <div className="inner-flex">
                                                        {isMobilescreen && (
                                                            <div className="section-paragraph recent_post_title">
                                                                <p className="capitalize">Recent Post</p>
                                                            </div>
                                                        )}
                                                        <div className="recent_blog_grids inner-flex inner-flex-small">
                                                            {recent_blog_data?.map((data, i) => (
                                                                <div className="recent_blogs_details " key={i}>
                                                                    <Link href={`/blog/${data.slug}`}>
                                                                        <div className="inner-flex">
                                                                            <div className="recent_blog_image">
                                                                                <img
                                                                                    src={`${data.image_full}&h=200&w=400`}
                                                                                    alt=""
                                                                                />
                                                                            </div>
                                                                            <div className="section-content flex-row j-c-sb ">
                                                                                <div>
                                                                                    <p>{data.title}</p>
                                                                                    <p className="recent_blog_date">
                                                                                        {data.published_date}
                                                                                    </p>
                                                                                </div>
                                                                                <div className="recent-arrow-icon common-icon">
                                                                                    <img
                                                                                        src="/images/icon/right_arrow_line.svg"
                                                                                        alt="Blog"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <div className="section-title">
                                <h1>Loading data...</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
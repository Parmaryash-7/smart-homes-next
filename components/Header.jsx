'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Header.css'
import { useSelector } from 'react-redux'

export default function Header({ propertylist, socialList }) {
  const pathname = usePathname()
  const activePath = pathname

  const inquire_popup = useSelector((state) => state.inquiry.isOpen)

  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [megaMenuCategory, setMegaMenuCategory] = useState('')
  const [megaMenuList, setMegaMenuList] = useState([])
  const [megaMenuActive, setMegaMenuActive] = useState(false)
  const [openContactDropdown, setOpenContactDropdown] = useState(false)
  const [mobileMenuToggle, setMobileMenuToggle] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [isHidden, setIsHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  useEffect(() => {
    if (window.innerWidth < 767) {
      setIsMobileScreen(true)
    }

    if (Array.isArray(propertylist)) {
      getCategory()
    }
  }, [propertylist])

  async function getCategory() {
    try {
      const categorySet = new Set()
      const categoryArray = []

      propertylist.forEach((value) => {
        if (!categorySet.has(value.category)) {
          categoryArray.push({ category: value.category })
          categorySet.add(value.category)
        }
      })

      setCategoryList(categoryArray)
    } catch (error) {
      console.error('Error fetching property details:', error)
    }
  }

  // useEffect(() => {
  // 	const handleScroll = () => {
  // 		const currentScroll = window.scrollY;
  // 		if (currentScroll > 100) {
  // 			setIsHidden(currentScroll > prevScrollY);
  // 		} else {
  // 			setIsHidden(false);
  // 		}
  // 		setIsScrolled(currentScroll > 250);
  // 		setPrevScrollY(currentScroll);
  // 	};

  // 	window.addEventListener("scroll", handleScroll);
  // 	return () => window.removeEventListener("scroll", handleScroll);
  // }, [prevScrollY]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuToggle ? 'hidden' : 'auto'
  }, [mobileMenuToggle])

  // const megaMenuClick = (category) => {
  // 	if (megaMenuCategory === category) {
  // 		setMegaMenuCategory("");
  // 		setMegaMenuActive(false);
  // 	} else {
  // 		setMegaMenuCategory(category);
  // 		setMegaMenuActive(true);
  // 		const filteredList = propertylist.filter(item => item.category === category);
  // 		setMegaMenuList(filteredList);
  // 	}
  // };

  const handleScroll = () => {
    setMegaMenuCategory('')
    setMegaMenuActive(false)
    window.removeEventListener('scroll', handleScroll)
  }

  const megaMenuClick = (category) => {
    if (megaMenuCategory === category) {
      // Close the menu
      setMegaMenuCategory('')
      setMegaMenuActive(false)
      window.removeEventListener('scroll', handleScroll)
    } else {
      // Open the menu
      setMegaMenuCategory(category)
      setMegaMenuActive(true)

      const filteredList = propertylist.filter(
        (item) =>
          item.category === category &&
          item.project_id != 756 &&
          item.project_id != 814
      )
      setMegaMenuList(filteredList)

      // Add scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
  }

  const megaMenuClickClose = () => {
    setMegaMenuCategory('')
    setMegaMenuActive(false)
    window.removeEventListener('scroll', handleScroll)
  }

  // if (!categoryList.length) return null;

  return (
    <div className={`header-wrapper ${inquire_popup ? 'webmenu_hidden2' : ''}`}>
      <div className="main-container" onClick={() => setMegaMenuActive(false)}>
        <div className="header-flex" onClick={(e) => e.stopPropagation()}>
          <div
            className="header-logo"
            onClick={() => setMobileMenuToggle(false)}
            style={{ zIndex: 999 }}
          >
            <Link href="/">
              <img
                src="/images/logo/smart-homes-logo.svg"
                alt="Smart Homes Infrastructure"
                loading="lazy"
              />
            </Link>
          </div>

          <div
            className="header-links-ul"
            style={{ minHeight: '1.5rem', zIndex: 999 }}
          >
            <ul className="link-font-size hidden-xs hidden-sm">
              {categoryList.map(({ category }, index) => (
                <li
                  key={index}
                  className="hide-tab-mobile"
                  onClick={(e) => {
                    megaMenuClick(category)
                    e.stopPropagation()
                  }}
                >
                  <a
                    href="#"
                    className={megaMenuCategory === category ? 'active' : ''}
                    onClick={(e) => e.preventDefault()}
                    style={{ cursor: 'pointer' }}
                  >
                    <p
                      className={`capitalize ${megaMenuCategory === category ? 'secondary-color' : ''
                        }`}
                    >
                      {category}
                    </p>
                    <span className="material-symbols-outlined">
                      keyboard_arrow_down
                    </span>
                  </a>
                </li>
              ))}

              <li>
                <Link href="/bulk-land-in-dholera/">
                  <p
                    className={`capitalize ${activePath === '/bulk-land-in-dholera'
                      ? 'secondary-color'
                      : ''
                      }`}
                  >
                    Bulk Land
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/about-us/">
                  <p
                    className={`capitalize ${activePath === '/about-us' ? 'secondary-color' : ''
                      }`}
                  >
                    About
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/channel-partners/">
                  <p
                    className={`capitalize ${activePath === '/channel-partners'
                      ? 'secondary-color'
                      : ''
                      }`}
                  >
                    Channel Partners
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/nri-corner/">
                  <p
                    className={`capitalize ${activePath === '/nri-corner' ? 'secondary-color' : ''
                      }`}
                  >
                    NRI Corner
                  </p>
                </Link>
              </li>
              <li className="headerBtn">
                <Link href="/contact-us/">
                  <button className="reecosys-template-button button-style-secondary">
                    <p>Contact Us</p>
                  </button>
                </Link>
              </li>
            </ul>

            <div className="visible-tab-mobile">
              <ul>
                <li>
                  <div
                    onClick={() => {
                      setOpenContactDropdown(true)
                      setMobileMenuToggle(false)
                    }}
                    className="blink-background"
                  >
                    <img src="/images/icon/call-green.svg" alt="" />
                  </div>
                </li>
                <li>
                  <div
                    className={`menubar ${mobileMenuToggle ? 'active' : ''}`}
                    onClick={() => {
                      setMobileMenuToggle(!mobileMenuToggle)
                      setOpenContactDropdown(false)
                    }}
                  >
                    <div className="bar bar-top"></div>
                    <div className="bar bar-middle"></div>
                    <div className="bar bar-bottom"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`header_contact_dropdown ${openContactDropdown ? 'active' : ''
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <ul className="header_contact_list inner-flex">
            <li>
              <a href="tel:+917096961250">
                <div className="header_contact_content flex-row alc">
                  <span className="material-symbols-outlined">call</span>
                  <div className="header_contact_dropdown_text">
                    <p>Call</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=917096961250"
                target="_blank"
                rel="noreferrer"
              >
                <div className="header_contact_content flex-row alc">
                  <div className="header_contact_dropdown_img common-icon">
                    <img src="/images/icon/whatsapp.svg" alt="" />
                  </div>
                  <div className="header_contact_dropdown_text">
                    <p>WhatsApp</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="mailto:info@smarthomesinfra.com">
                <div className="header_contact_content flex-row alc">
                  <span className="material-symbols-outlined">mail</span>
                  <div className="header_contact_dropdown_text">
                    <p>Email</p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          {isMobileScreen && (
            <div
              className="close_contact"
              onClick={() => setOpenContactDropdown(false)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src="/images/icon/close.svg"
                style={{ filter: 'invert(1)' }}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      {megaMenuActive && (
        <div
          className="megamenu-wrapper"
          id="megamenu-wrapper"
          onClick={() => setMegaMenuActive(false)}
        >
          <div className="megamenugrid">
            <div
              className="megamenuTitle inner-flex inner-flex-big j-c-sb"
              style={{ height: '100%' }}
            >
              <div className="section-title">
                <h2 className="medium-fonts uppercase">
                  {megaMenuCategory} <br /> Projects
                </h2>
              </div>
              <div className="wfc" style={{ marginTop: '2rem' }}>
                <Link href="/projects/">
                  <button className="reecosys-template-button button-style-primary">
                    <p>View All Projects</p>
                  </button>
                </Link>
              </div>
            </div>
            <div className="megamenuContent">
              {megaMenuList.map((data, idx) => (
                <div
                  key={idx}
                  className={`megamenuItem relative inner-flex ${activePath === `/${data.slug}` ? 'active' : ''
                    }`}
                  onClick={() => megaMenuClickClose()}
                >
                  <Link href={`/${data.slug}/`}>
                    {data.status && (
                      <div className="megamenuStatus statusText">
                        <p className="text-uppercase white-color">
                          {data.status === 'under construction'
                            ? 'Ongoing'
                            : data.status}
                        </p>
                      </div>
                    )}
                    {/* {data.project_id} */}
                    <div className="megamenuImg relative overflow small-border-radius">
                      <img
                        style={{ aspectRatio: '1/1' }}
                        src={`${data.banner_data.image_web_full}&h=350&w=350&q=100`}
                        alt={data.project_title}
                        loading="lazy"
                      />
                      <div className="megamenu_overlay"></div>
                      <div className="megamenu_overlay_2"></div>
                    </div>
                    <div className="megamenuText">
                      <div className="section-paragraph">
                        <p className="medium-fonts text-uppercase white-color">
                          {data.project_title}
                        </p>
                      </div>
                      <div className="inner-flex inner-flex-smallest">
                        {data.size_price && (
                          <div className="project-info-flex flex-row alc">
                            <div className="project_list_icon common-icon">
                              <img
                                src="/images/icon/building.svg"
                                alt={data.project_title}
                                className="filterIcon"
                              />
                            </div>
                            <p className="white-color">{data.size_price}</p>
                          </div>
                        )}
                        {data.location && (
                          <div className="project-info-flex flex-row alc">
                            <div className="project_list_icon common-icon">
                              <img
                                src="/images/icon/location.svg"
                                alt={data.project_title}
                                className="filterIcon"
                              />
                            </div>
                            <p className="white-color">{data.location}</p>
                          </div>
                        )}
                        {data.construction && (
                          <div className="project-info-flex small_content ellips2 flex-row alc">
                            <div className="progress-status-list">
                              {data.construction.progress_percent > 0 ? (
                                <div
                                  className="progress"
                                  data-percentage={
                                    data.construction.progress_percent
                                  }
                                >
                                  <span className="progress-left">
                                    <span className="progress-bar"></span>
                                  </span>
                                  <span className="progress-right">
                                    <span className="progress-bar"></span>
                                  </span>
                                  <div className="progress-value">
                                    <p className="white-color">
                                      {data.construction.progress_percent}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="iconimg">
                                  <img
                                    src="/images/icon/construction.svg"
                                    className="filterIcon"
                                    alt="Construction Image"
                                  />
                                </div>
                              )}
                            </div>
                            <p className="white-color capitalize">
                              {data.status}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isMobileScreen && (
        <div
          className={`mobile_menu_wrapper inner-flex inner-flex-medium j-c-sb ${mobileMenuToggle ? 'mobileMenuActive' : ''
            } `}
        >
          <div className="header-navigation-links">
            <ul>
              {
                <li
                  className={`${activePath == 'about-us/' ? 'active' : ''}`}
                  onClick={() => {
                    setMobileMenuToggle(false)
                  }}
                >
                  <Link href="/about-us/">
                    <div className="flex-row j-c-sb header_accordion accordion_click">
                      <div className="section-paragraph">
                        <p className="capitalize">About</p>
                      </div>
                    </div>
                  </Link>
                </li>
              }
              {categoryList &&
                categoryList.map((category_data, categoryIndex) => (
                  <li
                    className="inner-flex inner-flex-small accordion-block"
                    style={{ gap: '0px' }}
                    key={categoryIndex}

                  >
                    <div
                      className={`flex-row j-c-sb header_accordion accordion_click ${activeIndex == category_data.category ? 'active' : ''
                        } `}
                      onClick={() => {
                        toggleAccordion(category_data.category)
                      }}

                    >
                      <div className="section-paragraph">
                        <p className="capitalize">{category_data.category}</p>
                      </div>
                      <div>
                        <img
                          src="/images/icon/down-arrow.svg"
                          alt=""
                          className="manu-accordian-downarrow"
                        />
                        <img
                          src="/images/icon/up-arrow.svg"
                          alt=""
                          className="manu-accordian-uparrow"
                        />
                      </div>
                    </div>
                    <div
                      className={`content_accordian ${activeIndex == category_data.category ? 'active' : ''
                        } `}
                    >
                      <div>
                        <div
                          className="inner-flex projectList_li inner-flex-zero"
                          onClick={() => {
                            setMobileMenuToggle(false)
                          }}
                        >
                          {propertylist
                            .filter(
                              (data) =>
                                category_data.category == data.category &&
                                data.project_id != 744 &&
                                data.project_id != 814
                            )
                            .map((data, index) => (
                              <div
                                key={index}
                                className={index == 0 ? 'pt0' : ''}
                              >
                                {category_data.category != 'Commercial' && (
                                  <Link
                                    href={`/${data.slug}/`}
                                    className="header-hover"
                                    style={{ display: 'block', width: '100%', maxWidth: '100%' }}
                                  >
                                    <div className="flex-row flex-gap-small">
                                      <div className="flex-30">
                                        <img
                                          src={`${data.banner_data.image_web_full}&h=250&w=250`}
                                          alt="reecosys"
                                          loading="lazy"
                                        />
                                      </div>
                                      <div className="flex-70 inner-flex">
                                        <div className="section-paragraph">
                                          <p className="header-title capitalize">
                                            {data.project_title}
                                          </p>
                                        </div>
                                        <div className="inner-flex inner-flex-smallest">
                                          {data.size_price && (
                                            <div className="flex-row alc">
                                              <div className="iconimg">
                                                <img
                                                  src="/images/icon/detail-icons/building.svg"
                                                  alt="building-icon"
                                                />
                                              </div>
                                              <div className="section-content">
                                                <span className="ellipsis-1 uppercase secondary-color">
                                                  {data.size_price}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                          {data.total_area &&
                                            data.total_area != ' ' && (
                                              <div className="flex-row alc">
                                                <div className="iconimg">
                                                  <img
                                                    src="/images/icon/detail-icons/area.svg"
                                                    alt="area-icon"
                                                  />
                                                </div>
                                                <div className="section-content">
                                                  <span className="ellipsis-1 uppercase secondary-color">
                                                    {data.total_area}
                                                  </span>
                                                </div>
                                              </div>
                                            )}
                                          {data.location && (
                                            <div className="flex-row alc">
                                              <div className="iconimg">
                                                <img
                                                  src="/images/icon/detail-icons/location.svg"
                                                  alt="location-icon"
                                                />
                                              </div>
                                              <div className="section-content">
                                                <span className="ellipsis-1 uppercase secondary-color">
                                                  {data.location}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                )}
                                {category_data.category == 'Commercial' && (
                                  <Link
                                    href={`/${data.slug}/`}
                                    className="header-hover"
                                  >
                                    <div className="flex-row flex-gap-small">
                                      <div className="flex-30">
                                        <img
                                          src={`${data.banner_data.image_web_full}&h=250&w=250`}
                                          alt="reecosys"
                                          loading="lazy"
                                        />
                                      </div>
                                      <div className="flex-70 inner-flex">
                                        <div className="section-paragraph">
                                          <p className="header-title capitalize">
                                            {data.project_title}
                                          </p>
                                        </div>
                                        <div className="inner-flex inner-flex-smallest">
                                          {data.size_price && (
                                            <div className="flex-row alc">
                                              <div className="iconimg">
                                                <img
                                                  src="/images/icon/detail-icons/building.svg"
                                                  alt="building-icon"
                                                />
                                              </div>
                                              <div className="section-content">
                                                <span className="ellipsis-1 uppercase secondary-color">
                                                  {data.size_price}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                          {data.total_area &&
                                            data.total_area != ' ' && (
                                              <div className="flex-row alc">
                                                <div className="iconimg">
                                                  <img
                                                    src="/images/icon/detail-icons/area.svg"
                                                    alt="area-icon"
                                                  />
                                                </div>
                                                <div className="section-content">
                                                  <span className="ellipsis-1 uppercase secondary-color">
                                                    {data.total_area}
                                                  </span>
                                                </div>
                                              </div>
                                            )}
                                          {data.location && (
                                            <div
                                              className="flex-row alc"
                                              ng-if=""
                                            >
                                              <div className="iconimg">
                                                <img
                                                  src="/images/icon/detail-icons/location.svg"
                                                  alt="location-icon"
                                                />
                                              </div>
                                              <div className="section-content">
                                                <span className="ellipsis-1 uppercase secondary-color">
                                                  {data.location}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}

              <li>
                <div>
                  <Link
                    href="/bulk-land-in-dholera/"
                    className={`capitalize section-paragraph ${activePath == '/bulk-land-in-dholera' ? 'active_page' : ''
                      }`}
                    onClick={() => {
                      setMobileMenuToggle(false)
                    }}
                    title="bulk-land-in-Dholera"
                  >
                    <p>Bulk Land</p>
                  </Link>
                </div>
              </li>
              <li>
                <div>
                  <Link
                    href="/completed-projects/"
                    className={`capitalize section-paragraph ${activePath == '/completed-projects' ? 'active_page' : ''
                      }`}
                    onClick={() => {
                      setMobileMenuToggle(false)
                    }}
                    title="completed-projects"
                  >
                    <p>completed-projects</p>
                  </Link>
                </div>
              </li>
              <li>
                <div>
                  <Link
                    href="/channel-partners/"
                    className={`capitalize section-paragraph ${activePath == '/channel-partners' ? 'active_page' : ''
                      }`}
                    onClick={() => {
                      setMobileMenuToggle(false)
                    }}
                    title="Channel Partners"
                  >
                    <p>Channel Partners</p>
                  </Link>
                </div>
              </li>

              <li>
                <div>
                  <Link
                    href="/nri-corner/"
                    className={`capitalize section-paragraph ${activePath == '/nri-corner' ? 'active_page' : ''
                      }`}
                    onClick={() => {
                      setMobileMenuToggle(false)
                    }}
                    title="Construction Updates"
                  >
                    <p>NRI Corner</p>
                  </Link>
                </div>
              </li>

              <li>
                <div>
                  <Link
                    href="/contact-us/"
                    className={`capitalize section-paragraph ${activePath == '/contact-us' ? 'active_page' : ''
                      }`}
                    onClick={() => {
                      setMobileMenuToggle(false)
                    }}
                    title="Contact Us"
                  >
                    <p>Contact Us</p>
                  </Link>
                </div>
              </li>

              <li className="flex-row alc no-border">
                {socialList &&
                  socialList.map((social, index) => (
                    <div key={index} className="navigation-mobile-icon">
                      {social.name == 'facebook' && (
                        <a href={social.slug} target="_blank">
                          <img
                            src="/images/icon/social-icons/facebook.svg"
                            alt="facebook"
                          />
                        </a>
                      )}
                      {social.name == 'instagram' && (
                        <a href={social.slug} target="_blank">
                          <img
                            src="/images/icon/social-icons/instagram.svg"
                            alt="instagram"
                          />
                        </a>
                      )}
                      {social.name == 'twitter' && (
                        <a href={social.slug} target="_blank">
                          <img
                            src="/images/icon/social-icons/twitter.svg"
                            alt="twitter"
                          />
                        </a>
                      )}
                      {social.name == 'linkedin' && (
                        <a href={social.slug} target="_blank">
                          <img
                            src="/images/icon/social-icons/linkedin.svg"
                            alt="linkedin"
                          />
                        </a>
                      )}
                      {social.name == 'youtube' && (
                        <a href={social.slug} target="_blank">
                          <img
                            src="/images/icon/social-icons/youtube.svg"
                            alt="youtube"
                          />
                        </a>
                      )}
                    </div>
                  ))}
              </li>
            </ul>
          </div>
        </div>
      )}
      <div
        className={`click-overlay  ${megaMenuActive || openContactDropdown || mobileMenuToggle
          ? 'active'
          : ''
          } `}
        onClick={() => {
          megaMenuClickClose(),
            setOpenContactDropdown(false),
            setMobileMenuToggle(false)
        }}
      ></div>
      <a
        href="https://api.whatsapp.com/send?phone=917096961250"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className={`whatsapp_connect  ${megaMenuActive || openContactDropdown || mobileMenuToggle
            ? 'active'
            : ''
            } `}
        >
          <div className="whatsapp-icon">
            <img src="/images/icon/Whatsapp.png" alt="smarthomes" />
          </div>
        </div>
      </a>

    </div>
  )
}

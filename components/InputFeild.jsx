"use client"

import React from "react";

export default function InputField({
  row,
  tag,
  placeholder,
  selectList,
  id,
  type,
  name,
  value,
  handleChange,
  errors,
  label,
  flag,
  country,
  handleCountrySelect,
  countryList,
  setSearch,
  search,
  setCountryFlag,
  countryFlag,
  isHome,
}) {
  return (
    <>
      {tag === "input" && name !== "client_contact_no_display" && (
        <div className="contact_lable">
          <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className={`form-control ${errors?.[name] ? "error" : ""}`}
          />
          <label className="md-lable" htmlFor={id}>
            {label}
          </label>
        </div>
      )}

      {tag === "input" && name === "client_contact_no_display" && (
        <div className="contact_lable">
          <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className={`form-control contact-form ${errors?.[name] ? "error" : ""
              }`}
            minLength={10}
            maxLength={10}
          />
          <label className="md-lable" htmlFor={id}>
            {label}
          </label>
          <div className="conatct_number_input">
            <div
              className="country_code_data"
              onClick={(e) => {
                setCountryFlag(!countryFlag), e.stopPropagation();
              }}
            >
              <div className="section-paragraph">
                <span>
                  <img src={flag} alt="" />
                </span>
                <p>+{country}</p>
                <p>|</p>
              </div>
            </div>
          </div>
          {countryFlag && (
            <div
              className="country_code_list_data active"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="search_c-code">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                />
              </div>
              <ul>
                {countryList
                  .filter(
                    (item) =>
                      item.phonecode.toString().includes(search) ||
                      item.nicename.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((data, i) => (
                    <li
                      key={i}
                      onClick={() =>
                        handleCountrySelect(data.phonecode, data.flag)
                      }
                    >
                      <div>
                        <img src={data.flag} alt="flag" />
                        <span className="display_country_code">
                          +{data.phonecode}
                        </span>
                        | &nbsp; {data.nicename}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {tag === "select" && name === "project_id" && (
        <div className="contact_lable select_option select_apr relative">
          <select
            id={id}
            name={name}
            value={value}
            defaultValue=""
            onChange={handleChange}
            className={`form-control ${errors?.[name] ? "error" : ""} `}
          >
            <option disabled>{placeholder}</option>
            {selectList
              .filter((p) => p.project_id !== "744" && p.project_id !== "814")
              .map((data) => (
                <option key={data.project_id} value={data.project_id}>
                  {data.project_title}
                </option>
              ))}
          </select>
          <label className="md-lable">{label}</label>
          {/* <KeyboardArrowDownIcon className="fa-icon" /> */}
          <span className="material-symbols-outlined fa-icon">
            keyboard_arrow_down
          </span>
        </div>
      )}

      {tag === "select" && name !== "project_id" && (
        <div className="contact_lable select_option select_apr relative">
          <select
            id={id}
            name={name}
            value={value}
            defaultValue=""
            onChange={handleChange}
            className={`form-control ${errors?.[name] ? "error" : ""} `}
          >
            {selectList.map((data, index) => (
              <option
                key={index}
                disabled={data.value == ""}
                value={data.value}
              >
                {data.name}
              </option>
            ))}
          </select>
          <label className="md-lable">{label}</label>
          {/* <KeyboardArrowDownIcon className="fa-icon" /> */}
          <span className="material-symbols-outlined fa-icon">
            keyboard_arrow_down
          </span>
        </div>
      )}

      {tag === "textarea" && (
        <div
          className="contact_lable select_option select_apr relative"
          style={isHome ? { gridColumn: "1 / span 2" } : {}}
        >
          <textarea
            id={id}
            rows={row}
            name={name}
            value={value}
            onChange={handleChange}
            className={`form-control ${errors?.[name] ? "error" : ""}`}
          ></textarea>
          <label className="md-lable">{label}</label>
        </div>
      )}
    </>
  );
}

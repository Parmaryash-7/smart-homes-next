"use client"

import React from 'react';
import { useState } from 'react';

export default function ReadMore({ text, maxLength = 0 }) {
  const [collapsed, setCollapsed] = useState(false);

  if (!text) return null;

  const firstPart = text.substring(0, maxLength);
  const secondPart = text.substring(maxLength);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
        <span dangerouslySetInnerHTML={{ __html: firstPart }} ></span>
        {secondPart && collapsed && (
          <>
            <span dangerouslySetInnerHTML={{ __html: secondPart }} ></span>
            <br className="readmore_para" />
          </>
        )}
        {secondPart && (
          <span
            className="readmore_click"
            onClick={toggle}
            style={{ cursor: 'pointer', color: '#007bff' }}
          >
            {collapsed ? ' Read Less' : '... Read More'}
          </span>
        )}
        </>
  );
}

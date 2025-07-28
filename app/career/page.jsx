// app/careers/page.jsx

import React from 'react';
import Career from '../../components/Career';
import InquiryCareer from '../../components/InquiryCareer'; 
import api from '../../lib/api.interceptor';

export const dynamic = 'force-dynamic';

const CareersPage = async () => {
    const career_full_list = await api.CareerPage();
    const pageList = await api.PageList();

    return (
        <>
            <Career
                career_full_list={career_full_list}
                pageList={pageList}
            />
            <InquiryCareer /> 
        </>
    );
};

export default CareersPage;

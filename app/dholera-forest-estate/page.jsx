import DholeraForestEstate from "components/DholeraForestEstate";
// import getPropertyList from "lib/PropertList";
// import getPageList from "lib/PageList";
import api from "lib/api.interceptor";


export default async function DholeraForestEstatePage() {

    // const pageList = await getPageList();
    // const propertylist = await getPropertyList();
    const pageList = await api.PageList();
    const propertylist = await api.Propertylist();

    const projectData = propertylist.find(
        (p) => p.slug === "dholera-forest-estate"
    );

    return (
        <DholeraForestEstate
            projectData={projectData}
            propertylist={propertylist}
            pageList={pageList}
        // isAmenityOpen={false}
        // setAmenityToggle={() => { }}
        // inquiryPopupObj={{}}
        // setInquiryPopupObj={() => { }}
        // inquiryPopup={false}
        // setInquiryPopup={() => { }}
        />
    );
}

import AboutUs from "components/AboutUs";
import api from 'lib/api.interceptor'
// import getPageList from "lib/PageList";
// import getPropertyList from "lib/PropertList";

export default async function AboutUsPage() {
    const propertylist = await api.Propertylist()
    const pageList = await api.PageList();
    const aboutDetails = pageList.find((page) => page.slug === "about-us");
    return (
        <AboutUs
            propertyList={propertylist}
            aboutDetails={aboutDetails}
            pageList={pageList}
        />
    );
}

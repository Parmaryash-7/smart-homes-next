import AboutUs from "components/AboutUs";
import getPageList from "lib/PageList";

export default async function AboutUsPage() {
    const pageList = await getPageList();
    const aboutDetails = pageList.find((page) => page.slug === "about-us");

    return (
        <AboutUs
            aboutDetails={aboutDetails}
            pageList={pageList}
        />
    );
}

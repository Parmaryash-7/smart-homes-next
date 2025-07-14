import Projects from "components/Projects";
import api from "lib/api.interceptor";
// import getPageList from "lib/PageList";
// import getPropertyList from "lib/PropertList";

export default async function ProjectsPage() {
    // const pageList = await getPageList();
    // const propertylist = await getPropertyList();
    const pageList = await api.PageList();
    const propertylist = await api.Propertylist();

    return (
        <Projects
            propertylist={propertylist}
            pageList={pageList}
        />
    );
}

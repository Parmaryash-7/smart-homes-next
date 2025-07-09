import Projects from "components/Projects";
import getPageList from "lib/PageList";
import getPropertyList from "lib/PropertList"; 

export default async function ProjectsPage() {
    const pageList = await getPageList();
    const propertylist = await getPropertyList();

    return (
        <Projects
            propertylist={propertylist}
            pageList={pageList}
        />
    );
}

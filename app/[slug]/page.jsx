import Detail from "components/Detail";
import getPropertyList from "lib/PropertList";
import getPageList from "lib/PageList";
import { redirect } from "next/navigation"; 

export default async function ProjectDetailPage({ params }) {
    const { slug } = params;

    const pageList = await getPageList();
    const propertylist = await getPropertyList();

    const projectData = propertylist.find((p) => p.slug === slug);

    if (!projectData) {
        redirect('/'); 
    }

    return (
        <Detail
            projectDetail={projectData}
            propertylist={propertylist}
            pageList={pageList}
        />
    );
}

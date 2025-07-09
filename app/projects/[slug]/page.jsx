import Detail from "components/Detail";
import getPropertyList from "lib/PropertList";
import getPageList from "lib/PageList";
import { redirect } from "next/dist/server/api-utils";

export default async function ProjectDetailPage({ params }) {
    const { slug } = params;

    const pageList = await getPageList();
    const propertylist = await getPropertyList();

    const projectData = propertylist.find((p) => p.slug === slug);
    if (!projectData) {
        redirect('/');
        return
    }
    
    return (
        <Detail
            projectData={projectData}
            propertylist={propertylist}
            pageList={pageList}
        />
    );
}

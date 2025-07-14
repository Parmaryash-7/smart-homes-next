import Detail from "components/Detail";
// import getPropertyList from "lib/PropertList";
// import getPageList from "lib/PageList";
import { redirect } from "next/navigation";
import api from 'lib/api.interceptor'

export default async function ProjectDetailPage({ params }) {

    const propertylist = await api.Propertylist()
    const { slug } = params;

    const pageList = await api.PageList();

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

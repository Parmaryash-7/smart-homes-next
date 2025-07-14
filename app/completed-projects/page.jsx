import CompletedProjects from "components/CompletedProjects";

import api from 'lib/api.interceptor'
// import getPageList from "lib/PageList";
// import getCompletedPropertyList from "lib/CompletedPropertyList"; 

export default async function CompletedProjectsPage() {


    const pageList = await api.PageList();
    const completedPropertylist = await api.CompletedPropertyList();
    // const pageList = await getPageList();
    // const completedPropertylist = await getCompletedPropertyList();

    return (
        <CompletedProjects
            completedPropertylist={completedPropertylist}
            pageList={pageList}
        />
    );
}

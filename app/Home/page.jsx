import Home from "components/Home";

import getHomeDetail from "lib/HomeDetail";
import getPropertyList from 'lib/PropertList';
import getCompletedPropertyList from "lib/CompletedPropertyList";
import getPageList from "lib/PageList";
import getBlogDetail from "lib/BlogDetail";

export default async function HomePage() {
    const homeDetails = await getHomeDetail();
    const completedPropertylist = await getCompletedPropertyList();
    const pageList = await getPageList();
    const blogData = await getBlogDetail();
    const propertylist = await getPropertyList();

    return (
        <Home

            homeDetails={homeDetails}
            propertylist={propertylist}
            completedPropertylist={completedPropertylist}
            pageList={pageList} 
            blogData={blogData}
        />
    );
}

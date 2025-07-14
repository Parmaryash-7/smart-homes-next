import Home from "components/Home";
import api from "lib/api.interceptor";
// import getHomeDetail from "lib/HomeDetail";
// import getPropertyList from 'lib/PropertList';
// import getCompletedPropertyList from "lib/CompletedPropertyList";
// import getPageList from "lib/PageList";
// import getBlogDetail from "lib/BlogDetail";

export default async function HomePage() {
    const homeDetails = await api.HomeDetail();
    const completedPropertylist = await api.CompletedPropertyList();
    const pageList = await api.PageList();
    const blogData = await api.BlogDetail();
    const propertylist = await api.Propertylist();
    // const homeDetails = await getHomeDetail();
    // const completedPropertylist = await getCompletedPropertyList();
    // const pageList = await getPageList();
    // const blogData = await getBlogDetail();
    // const propertylist = await getPropertyList();

    // console.log("IN HOME");
    // console.log(propertylist);
    // console.log("IN HOME");

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

import Awards from "components/Awards";
import api from 'lib/api.interceptor'
// import getPageList from "lib/PageList";
// import propertyList from "lib/PropertList";

export default async function AwardsPage() {
    // const pageList = await getPageList();
    // const propertylist = await propertyList();

    const pageList = await api.PageList();
    const propertylist = await api.Propertylist();

    return <Awards pageList={pageList} propertylist={propertylist} />;
}

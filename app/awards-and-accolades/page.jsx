import Awards from "components/Awards";
import getPageList from "lib/PageList";
import propertyList from "lib/PropertList"; 

export default async function AwardsPage() {
    const pageList = await getPageList();
    const propertylist = await propertyList(); 

    return <Awards pageList={pageList} propertylist={propertylist} />;
}

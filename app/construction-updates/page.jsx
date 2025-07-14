import ConstructionUpdate from "components/ConstructionUpdate";
import getPageList from "lib/PageList";
import api from "lib/api.interceptor";

export default async function ConstructionUpdatesPage() {
    // const pageList = await getPageList();
    const pageList = await api.PageList();

    return <ConstructionUpdate pageList={pageList} />;
}

import ConstructionUpdate from "components/ConstructionUpdate";
import getPageList from "lib/PageList";

export default async function ConstructionUpdatesPage() {
    const pageList = await getPageList();

    return <ConstructionUpdate pageList={pageList} />;
}

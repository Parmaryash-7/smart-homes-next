import NriCorner from "components/NriCorner";
import getPageList from "lib/PageList";

export default async function NriCornerPage() {
    const pageList = await getPageList();

    return <NriCorner pageList={pageList} />;
}

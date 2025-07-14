import NriCorner from "components/NriCorner";
import getPageList from "lib/PageList";
import api from "lib/api.interceptor";

export default async function NriCornerPage() {
    // const pageList = await getPageList();
    const pageList = await api.PageList();

    return <NriCorner pageList={pageList} />;
}

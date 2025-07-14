import Disclaimer from "components/Disclaimer";
import getPageList from "lib/PageList";
import api from "lib/api.interceptor";

export default async function DisclaimerPage() {

    // const pageList = await getPageList();
    const pageList = await api.PageList();

    return <Disclaimer pageList={pageList} />;
}

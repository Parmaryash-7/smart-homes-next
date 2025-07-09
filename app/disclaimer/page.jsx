import Disclaimer from "components/Disclaimer";
import getPageList from "lib/PageList";

export default async function DisclaimerPage() {
    const pageList = await getPageList();

    return <Disclaimer pageList={pageList} />;
}

import ChannelPartner from "components/ChannelPartner";
import getPageList from "lib/PageList";

export default async function ChannelPartnersPage() {
    const pageList = await getPageList();

    return <ChannelPartner pageList={pageList} />;
}

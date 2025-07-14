import ChannelPartner from "components/ChannelPartner";
import getPageList from "lib/PageList";
import api from 'lib/api.interceptor'

export default async function ChannelPartnersPage() {
    // const pageList = await getPageList();
    const pageList = await api.PageList();

    return <ChannelPartner pageList={pageList} />;
}

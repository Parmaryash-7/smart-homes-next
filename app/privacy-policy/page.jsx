import Privacy from "components/Privacy";
import api from "lib/api.interceptor";

// import getPageList from "lib/PageList";

export default async function PrivacyPolicyPage() {
    // const pageList = await getPageList();
    const pageList = await api.PageList();

    return <Privacy pageList={pageList} />;
}

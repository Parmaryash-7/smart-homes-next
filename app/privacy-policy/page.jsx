import Privacy from "components/Privacy";
import getPageList from "lib/PageList";

export default async function PrivacyPolicyPage() {
    const pageList = await getPageList();

    return <Privacy pageList={pageList} />;
}
